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
      // neither a bot or a former member
      return res.members.filter(function (member) {
        return !(member.is_bot || member.name === 'slackbot' || member.deleted);
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
        text: 'Help give a 10 seconds feedback to the team?' + closingNotice,
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

  upload(report, filename, userID) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const im = (yield _this8.fetchIMsOf([userID]))[0];
      return _this8._client.files.upload(filename + '.csv', {
        channels: im.id,
        content: report
      });
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsInRhcmdldHNJRCIsImNsb3NpbmdOb3RpY2UiLCJmcmVxdWVuY3kiLCJ0aXRsZSIsInRleHQiLCJmYWxsYmFjayIsImNhbGxiYWNrX2lkIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhbGxiYWNrIiwiYWN0aW9ucyIsInR5cGUiLCJ2YWx1ZSIsInN0eWxlIiwiY29uZmlybSIsIm9rX3RleHQiLCJvcGVuU3VydmV5RGlhbG9nIiwic3VydmV5SUQiLCJ0cmlnZ2VySWQiLCJyZXNwb25zZVVSTCIsImRpYWxvZyIsInVybCIsImVsZW1lbnRzIiwibGFiZWwiLCJoaW50IiwicXVlc3Rpb25zIiwib3B0aW9ucyIsIm9wdGlvbmFsIiwibWF4X2xlbmd0aCIsIm9wZW4iLCJ1cGxvYWQiLCJyZXBvcnQiLCJmaWxlbmFtZSIsInVzZXJJRCIsImZpbGVzIiwiY2hhbm5lbHMiLCJjb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxTQUFGLEtBQWdCQyxRQUFRLGVBQVIsQ0FBdEI7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFdBQVIsQ0FB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QUVsRHNELGlCQUFTTDtBQUZ5QyxPQUE3QyxDQUFQO0FBRnNDO0FBTXZDO0FBNUt3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlJylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9tZXRob2RzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQm90IHtcbiAgY29uc3RydWN0b3IgKHRva2VuKSB7XG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYkNsaWVudCh0b2tlbilcbiAgfVxuXG4gIC8vIEFQSSB3cmFwcGVyc1xuICBhc3luYyBmZXRjaFVzZXJzICgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMubGlzdCgpXG4gICAgLy8gbmVpdGhlciBhIGJvdCBvciBhIGZvcm1lciBtZW1iZXJcbiAgICByZXR1cm4gcmVzLm1lbWJlcnMuZmlsdGVyKG1lbWJlciA9PiAhKG1lbWJlci5pc19ib3QgfHwgbWVtYmVyLm5hbWUgPT09ICdzbGFja2JvdCcgfHwgbWVtYmVyLmRlbGV0ZWQpKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hVc2VyIChpZCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5pbmZvKGlkKVxuICAgIHJldHVybiByZXMudXNlclxuICB9XG5cbiAgYXN5bmMgZmV0Y2hJTXMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC5pbS5saXN0KClcbiAgICByZXR1cm4gcmVzLmltc1xuICB9XG5cbiAgc2VuZFRvQ2hhbm5lbCAoaWQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZShpZCwgbWVzc2FnZSwgeyBhdHRhY2htZW50cyB9KVxuICB9XG5cbiAgLy8gRGVyaXZlZCBtZXRob2RzXG4gIGFzeW5jIGZldGNoSU1zT2YgKHVzZXJzSUQpIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zKClcbiAgICByZXR1cm4gaW1zLmZpbHRlcihpbSA9PiB1c2Vyc0lELmluY2x1ZGVzKGltLnVzZXIpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvVXNlcnMgKHVzZXJzSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zT2YodXNlcnNJRClcbiAgICBjb25zdCBpbXNJRCA9IGV4dHJhY3RJRHMoaW1zKVxuICAgIGZvciAobGV0IGltSUQgb2YgaW1zSUQpIHtcbiAgICAgIHRoaXMuc2VuZFRvQ2hhbm5lbChpbUlELCBtZXNzYWdlLCBhdHRhY2htZW50cylcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXN0cmlidXRlIChzdXJ2ZXksIHRhcmdldHNJRCkge1xuICAgIGxldCBjbG9zaW5nTm90aWNlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgd2VlayknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IG1vbnRoKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBxdWFydGVyKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnJ1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICAgIHRleHQ6ICdIZWxwIGdpdmUgYSAxMCBzZWNvbmRzIGZlZWRiYWNrIHRvIHRoZSB0ZWFtPycgKyBjbG9zaW5nTm90aWNlLFxuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGFuc3dlciB0aGUgc3VydmV5JyxcbiAgICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjYWxsYmFjazogJ2Fuc3dlclN1cnZleScsXG4gICAgICAgICAgaWQ6IHN1cnZleS5pZFxuICAgICAgICB9KSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Fuc3dlcicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgIHN0eWxlOiAncHJpbWFyeSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ25vJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF1cblxuICAgIHJldHVybiB0YXJnZXRzSUQgPyB0aGlzLnNlbmRUb1VzZXJzKHRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKSA6IHRoaXMuc2VuZFRvVXNlcnMoc3VydmV5LnRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKVxuICB9XG5cbiAgYXN5bmMgb3BlblN1cnZleURpYWxvZyAoc3VydmV5SUQsIHRyaWdnZXJJZCwgcmVzcG9uc2VVUkwpIHtcbiAgICBsZXQgZGlhbG9nID0ge1xuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdzdWJtaXRTdXJ2ZXknLFxuICAgICAgICBpZDogc3VydmV5SUQsXG4gICAgICAgIHVybDogcmVzcG9uc2VVUkxcbiAgICAgIH0pLFxuICAgICAgdGl0bGU6IG1lc3NhZ2Uuc3VydmV5LnRpdGxlLFxuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnU2NvcmUnLFxuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzBdLFxuICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxMCAobW9zdCByZWNvbW1lbmRlZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc5JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc4JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc2JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc1JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICczJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICczJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxIChsZWFzdCByZWNvbW1lbmVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1JlYXNvbicsXG4gICAgICAgICAgbmFtZTogJ3JlYXNvbicsXG4gICAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICBtYXhfbGVuZ3RoOiA1MDAsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzFdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5kaWFsb2cub3BlbihKU09OLnN0cmluZ2lmeShkaWFsb2cpLCB0cmlnZ2VySWQpXG4gIH1cblxuICBhc3luYyB1cGxvYWQgKHJlcG9ydCwgZmlsZW5hbWUsIHVzZXJJRCkge1xuICAgIGNvbnN0IGltID0gKGF3YWl0IHRoaXMuZmV0Y2hJTXNPZihbdXNlcklEXSkpWzBdXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5maWxlcy51cGxvYWQoZmlsZW5hbWUgKyAnLmNzdicsIHtcbiAgICAgIGNoYW5uZWxzOiBpbS5pZCxcbiAgICAgIGNvbnRlbnQ6IHJlcG9ydFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==