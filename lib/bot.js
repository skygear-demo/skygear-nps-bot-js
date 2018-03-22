'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const message = require('./message');
const { extractIDs } = require('./util');

/**
 * @see https://api.slack.com/methods
 */
module.exports = class Bot {
  constructor(token) {
    this._client = new WebClient(token);
  }

  // API wrappers
  fetchUsers() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const res = yield _this._client.users.list();
      // neither a bot or a former member or a guest user
      return res.members.filter(function (member) {
        return !(member.is_bot || member.name === 'slackbot' || member.deleted || member.is_restricted);
      });
    })();
  }

  fetchUser(id) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const res = yield _this2._client.users.info(id);
      return res.user;
    })();
  }

  fetchIMs() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const res = yield _this3._client.im.list();
      return res.ims;
    })();
  }

  sendToChannel(id, message, attachments = []) {
    this._client.chat.postMessage(id, message, { attachments });
  }

  // Derived methods
  fetchIMsOf(usersID) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const ims = yield _this4.fetchIMs();
      return ims.filter(function (im) {
        return usersID.includes(im.user);
      });
    })();
  }

  sendToUsers(usersID, message, attachments = []) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const ims = yield _this5.fetchIMsOf(usersID);
      const imsID = extractIDs(ims);
      for (let imID of imsID) {
        _this5.sendToChannel(imID, message, attachments);
      }
    })();
  }

  distribute(survey, targetsID) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      let closingNotice;
      switch (survey.frequency) {
        case 'weekly':
          closingNotice = '\n(the survey will be closed at next week)';
          break;
        case 'monthly':
          closingNotice = '\n(the survey will be closed at next month)';
          break;
        case 'quarterly':
          closingNotice = '\n(the survey will be closed at next quarter)';
          break;
        default:
          closingNotice = '';
      }

      const attachments = [{
        title: message.survey.title,
        text: 'Please Help give 10 seconds feedback to the team?' + closingNotice,
        fallback: 'You are unable to answer the survey',
        callback_id: JSON.stringify({
          callback: 'answerSurvey',
          id: survey.id
        }),
        actions: [{
          name: 'choice',
          text: 'Answer',
          type: 'button',
          value: 'yes',
          style: 'primary'
        }, {
          name: 'choice',
          text: 'Skip',
          type: 'button',
          value: 'no',
          style: 'danger',
          confirm: {
            title: 'Are you sure?',
            text: 'The team needs your opinions to improve!',
            ok_text: 'Maybe next time'
          }
        }]
      }];

      return targetsID ? _this6.sendToUsers(targetsID, '', attachments) : _this6.sendToUsers(survey.targetsID, '', attachments);
    })();
  }

  openSurveyDialog(surveyID, triggerId, responseURL) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      let dialog = {
        callback_id: JSON.stringify({
          callback: 'submitSurvey',
          id: surveyID,
          url: responseURL
        }),
        title: message.survey.title,
        elements: [{
          label: 'Score',
          name: 'score',
          type: 'select',
          hint: message.survey.questions[0],
          options: [{
            label: '10 (most recommended)',
            value: '10'
          }, {
            label: '9',
            value: '9'
          }, {
            label: '8',
            value: '8'
          }, {
            label: '7',
            value: '7'
          }, {
            label: '6',
            value: '6'
          }, {
            label: '5',
            value: '5'
          }, {
            label: '4',
            value: '4'
          }, {
            label: '3',
            value: '3'
          }, {
            label: '2',
            value: '2'
          }, {
            label: '1 (least recommened)',
            value: '1'
          }]
        }, {
          label: 'Reason',
          name: 'reason',
          type: 'textarea',
          optional: true,
          max_length: 500,
          hint: message.survey.questions[1]
        }]
      };
      return _this7._client.dialog.open(JSON.stringify(dialog), triggerId);
    })();
  }

  upload(report, comment, filename, userID) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const im = (yield _this8.fetchIMsOf([userID]))[0];
      return _this8._client.files.upload(filename + '.csv', {
        channels: im.id,
        content: report,
        initial_comment: comment
      });
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImlzX3Jlc3RyaWN0ZWQiLCJmZXRjaFVzZXIiLCJpZCIsImluZm8iLCJ1c2VyIiwiZmV0Y2hJTXMiLCJpbSIsImltcyIsInNlbmRUb0NoYW5uZWwiLCJhdHRhY2htZW50cyIsImNoYXQiLCJwb3N0TWVzc2FnZSIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJzZW5kVG9Vc2VycyIsImltc0lEIiwiaW1JRCIsImRpc3RyaWJ1dGUiLCJzdXJ2ZXkiLCJ0YXJnZXRzSUQiLCJjbG9zaW5nTm90aWNlIiwiZnJlcXVlbmN5IiwidGl0bGUiLCJ0ZXh0IiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0eXBlIiwidmFsdWUiLCJzdHlsZSIsImNvbmZpcm0iLCJva190ZXh0Iiwib3BlblN1cnZleURpYWxvZyIsInN1cnZleUlEIiwidHJpZ2dlcklkIiwicmVzcG9uc2VVUkwiLCJkaWFsb2ciLCJ1cmwiLCJlbGVtZW50cyIsImxhYmVsIiwiaGludCIsInF1ZXN0aW9ucyIsIm9wdGlvbnMiLCJvcHRpb25hbCIsIm1heF9sZW5ndGgiLCJvcGVuIiwidXBsb2FkIiwicmVwb3J0IiwiY29tbWVudCIsImZpbGVuYW1lIiwidXNlcklEIiwiZmlsZXMiLCJjaGFubmVscyIsImNvbnRlbnQiLCJpbml0aWFsX2NvbW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLFNBQUYsS0FBZ0JDLFFB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Q0FBYWtFLEtBQWIsQ0FBbUJMLE1BQW5CLENBQTBCRyxXQUFXLE1BQXJDLEVBQTZDO0FBQ2xERyxrQkFBVWxELEdBQUdKLEVBRHFDO0FBRWxEdUQsaUJBQVNOLE1BRnlDO0FBR2xETyx5QkFBaUJOO0FBSGlDLE9BQTdDLENBQVA7QUFGK0M7QUFPaEQ7QUE3S3dCLENBQTNCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2UnKVxuY29uc3QgeyBleHRyYWN0SURzIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL21ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCb3Qge1xuICBjb25zdHJ1Y3RvciAodG9rZW4pIHtcbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViQ2xpZW50KHRva2VuKVxuICB9XG5cbiAgLy8gQVBJIHdyYXBwZXJzXG4gIGFzeW5jIGZldGNoVXNlcnMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5saXN0KClcbiAgICAvLyBuZWl0aGVyIGEgYm90IG9yIGEgZm9ybWVyIG1lbWJlciBvciBhIGd1ZXN0IHVzZXJcbiAgICByZXR1cm4gcmVzLm1lbWJlcnMuZmlsdGVyKG1lbWJlciA9PiAhKG1lbWJlci5pc19ib3QgfHwgbWVtYmVyLm5hbWUgPT09ICdzbGFja2JvdCcgfHwgbWVtYmVyLmRlbGV0ZWQgfHwgbWVtYmVyLmlzX3Jlc3RyaWN0ZWQpKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hVc2VyIChpZCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5pbmZvKGlkKVxuICAgIHJldHVybiByZXMudXNlclxuICB9XG5cbiAgYXN5bmMgZmV0Y2hJTXMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC5pbS5saXN0KClcbiAgICByZXR1cm4gcmVzLmltc1xuICB9XG5cbiAgc2VuZFRvQ2hhbm5lbCAoaWQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZShpZCwgbWVzc2FnZSwgeyBhdHRhY2htZW50cyB9KVxuICB9XG5cbiAgLy8gRGVyaXZlZCBtZXRob2RzXG4gIGFzeW5jIGZldGNoSU1zT2YgKHVzZXJzSUQpIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zKClcbiAgICByZXR1cm4gaW1zLmZpbHRlcihpbSA9PiB1c2Vyc0lELmluY2x1ZGVzKGltLnVzZXIpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvVXNlcnMgKHVzZXJzSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zT2YodXNlcnNJRClcbiAgICBjb25zdCBpbXNJRCA9IGV4dHJhY3RJRHMoaW1zKVxuICAgIGZvciAobGV0IGltSUQgb2YgaW1zSUQpIHtcbiAgICAgIHRoaXMuc2VuZFRvQ2hhbm5lbChpbUlELCBtZXNzYWdlLCBhdHRhY2htZW50cylcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXN0cmlidXRlIChzdXJ2ZXksIHRhcmdldHNJRCkge1xuICAgIGxldCBjbG9zaW5nTm90aWNlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgd2VlayknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IG1vbnRoKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBxdWFydGVyKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnJ1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICAgIHRleHQ6ICdIZWxwIGdpdmUgYSAxMCBzZWNvbmRzIGZlZWRiYWNrIHRvIHRoZSB0ZWFtPycgKyBjbG9zaW5nTm90aWNlLFxuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGFuc3dlciB0aGUgc3VydmV5JyxcbiAgICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjYWxsYmFjazogJ2Fuc3dlclN1cnZleScsXG4gICAgICAgICAgaWQ6IHN1cnZleS5pZFxuICAgICAgICB9KSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Fuc3dlcicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgIHN0eWxlOiAncHJpbWFyeSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ25vJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF1cblxuICAgIHJldHVybiB0YXJnZXRzSUQgPyB0aGlzLnNlbmRUb1VzZXJzKHRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKSA6IHRoaXMuc2VuZFRvVXNlcnMoc3VydmV5LnRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKVxuICB9XG5cbiAgYXN5bmMgb3BlblN1cnZleURpYWxvZyAoc3VydmV5SUQsIHRyaWdnZXJJZCwgcmVzcG9uc2VVUkwpIHtcbiAgICBsZXQgZGlhbG9nID0ge1xuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdzdWJtaXRTdXJ2ZXknLFxuICAgICAgICBpZDogc3VydmV5SUQsXG4gICAgICAgIHVybDogcmVzcG9uc2VVUkxcbiAgICAgIH0pLFxuICAgICAgdGl0bGU6IG1lc3NhZ2Uuc3VydmV5LnRpdGxlLFxuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnU2NvcmUnLFxuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzBdLFxuICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxMCAobW9zdCByZWNvbW1lbmRlZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc5JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc4JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc2JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc1JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICczJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICczJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxIChsZWFzdCByZWNvbW1lbmVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1JlYXNvbicsXG4gICAgICAgICAgbmFtZTogJ3JlYXNvbicsXG4gICAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICBtYXhfbGVuZ3RoOiA1MDAsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzFdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5kaWFsb2cub3BlbihKU09OLnN0cmluZ2lmeShkaWFsb2cpLCB0cmlnZ2VySWQpXG4gIH1cblxuICBhc3luYyB1cGxvYWQgKHJlcG9ydCwgY29tbWVudCwgZmlsZW5hbWUsIHVzZXJJRCkge1xuICAgIGNvbnN0IGltID0gKGF3YWl0IHRoaXMuZmV0Y2hJTXNPZihbdXNlcklEXSkpWzBdXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5maWxlcy51cGxvYWQoZmlsZW5hbWUgKyAnLmNzdicsIHtcbiAgICAgIGNoYW5uZWxzOiBpbS5pZCxcbiAgICAgIGNvbnRlbnQ6IHJlcG9ydCxcbiAgICAgIGluaXRpYWxfY29tbWVudDogY29tbWVudFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==