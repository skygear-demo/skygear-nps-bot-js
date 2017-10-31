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

  distribute(survey) {
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

      return _this6.sendToUsers(survey.targetsID, '', [{
        title: message.survey.title,
        text: 'What do you think about the company?' + closingNotice,
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
      }]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsImNsb3NpbmdOb3RpY2UiLCJmcmVxdWVuY3kiLCJ0YXJnZXRzSUQiLCJ0aXRsZSIsInRleHQiLCJmYWxsYmFjayIsImNhbGxiYWNrX2lkIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhbGxiYWNrIiwiYWN0aW9ucyIsInR5cGUiLCJ2YWx1ZSIsInN0eWxlIiwiY29uZmlybSIsIm9rX3RleHQiLCJvcGVuU3VydmV5RGlhbG9nIiwic3VydmV5SUQiLCJ0cmlnZ2VySWQiLCJyZXNwb25zZVVSTCIsImRpYWxvZyIsInVybCIsImVsZW1lbnRzIiwibGFiZWwiLCJoaW50IiwicXVlc3Rpb25zIiwib3B0aW9ucyIsIm9wdGlvbmFsIiwibWF4X2xlbmd0aCIsIm9wZW4iLCJ1cGxvYWQiLCJyZXBvcnQiLCJmaWxlbmFtZSIsInVzZXJJRCIsImZpbGVzIiwiY2hhbm5lbHMiLCJjb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxTQUFGLEtBQWdCQyxRQUFRLGVBQVIsQ0FBdEI7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFdBQVIsQ0FB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ZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2UnKVxuY29uc3QgeyBleHRyYWN0SURzIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL21ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCb3Qge1xuICBjb25zdHJ1Y3RvciAodG9rZW4pIHtcbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViQ2xpZW50KHRva2VuKVxuICB9XG5cbiAgLy8gQVBJIHdyYXBwZXJzXG4gIGFzeW5jIGZldGNoVXNlcnMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5saXN0KClcbiAgICAvLyBuZWl0aGVyIGEgYm90IG9yIGEgZm9ybWVyIG1lbWJlclxuICAgIHJldHVybiByZXMubWVtYmVycy5maWx0ZXIobWVtYmVyID0+ICEobWVtYmVyLmlzX2JvdCB8fCBtZW1iZXIubmFtZSA9PT0gJ3NsYWNrYm90JyB8fCBtZW1iZXIuZGVsZXRlZCkpXG4gIH1cblxuICBhc3luYyBmZXRjaFVzZXIgKGlkKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmluZm8oaWQpXG4gICAgcmV0dXJuIHJlcy51c2VyXG4gIH1cblxuICBhc3luYyBmZXRjaElNcyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LmltLmxpc3QoKVxuICAgIHJldHVybiByZXMuaW1zXG4gIH1cblxuICBzZW5kVG9DaGFubmVsIChpZCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKGlkLCBtZXNzYWdlLCB7IGF0dGFjaG1lbnRzIH0pXG4gIH1cblxuICAvLyBEZXJpdmVkIG1ldGhvZHNcbiAgYXN5bmMgZmV0Y2hJTXNPZiAodXNlcnNJRCkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXMoKVxuICAgIHJldHVybiBpbXMuZmlsdGVyKGltID0+IHVzZXJzSUQuaW5jbHVkZXMoaW0udXNlcikpXG4gIH1cblxuICBhc3luYyBzZW5kVG9Vc2VycyAodXNlcnNJRCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXNPZih1c2Vyc0lEKVxuICAgIGNvbnN0IGltc0lEID0gZXh0cmFjdElEcyhpbXMpXG4gICAgZm9yIChsZXQgaW1JRCBvZiBpbXNJRCkge1xuICAgICAgdGhpcy5zZW5kVG9DaGFubmVsKGltSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRpc3RyaWJ1dGUgKHN1cnZleSkge1xuICAgIGxldCBjbG9zaW5nTm90aWNlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgd2VlayknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IG1vbnRoKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBxdWFydGVyKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnJ1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbmRUb1VzZXJzKHN1cnZleS50YXJnZXRzSUQsICcnLCBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLnN1cnZleS50aXRsZSxcbiAgICAgICAgdGV4dDogJ1doYXQgZG8geW91IHRoaW5rIGFib3V0IHRoZSBjb21wYW55PycgKyBjbG9zaW5nTm90aWNlLFxuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGFuc3dlciB0aGUgc3VydmV5JyxcbiAgICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjYWxsYmFjazogJ2Fuc3dlclN1cnZleScsXG4gICAgICAgICAgaWQ6IHN1cnZleS5pZFxuICAgICAgICB9KSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Fuc3dlcicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgIHN0eWxlOiAncHJpbWFyeSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ25vJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0pXG4gIH1cblxuICBhc3luYyBvcGVuU3VydmV5RGlhbG9nIChzdXJ2ZXlJRCwgdHJpZ2dlcklkLCByZXNwb25zZVVSTCkge1xuICAgIGxldCBkaWFsb2cgPSB7XG4gICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjYWxsYmFjazogJ3N1Ym1pdFN1cnZleScsXG4gICAgICAgIGlkOiBzdXJ2ZXlJRCxcbiAgICAgICAgdXJsOiByZXNwb25zZVVSTFxuICAgICAgfSksXG4gICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdTY29yZScsXG4gICAgICAgICAgbmFtZTogJ3Njb3JlJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICBoaW50OiBtZXNzYWdlLnN1cnZleS5xdWVzdGlvbnNbMF0sXG4gICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzEwIChtb3N0IHJlY29tbWVuZGVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMTAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzgnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzYnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzUnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzQnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzMnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzInLFxuICAgICAgICAgICAgICB2YWx1ZTogJzInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzEgKGxlYXN0IHJlY29tbWVuZWQpJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcxJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnUmVhc29uJyxcbiAgICAgICAgICBuYW1lOiAncmVhc29uJyxcbiAgICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxuICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgIG1heF9sZW5ndGg6IDUwMCxcbiAgICAgICAgICBoaW50OiBtZXNzYWdlLnN1cnZleS5xdWVzdGlvbnNbMV1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmRpYWxvZy5vcGVuKEpTT04uc3RyaW5naWZ5KGRpYWxvZyksIHRyaWdnZXJJZClcbiAgfVxuXG4gIGFzeW5jIHVwbG9hZCAocmVwb3J0LCBmaWxlbmFtZSwgdXNlcklEKSB7XG4gICAgY29uc3QgaW0gPSAoYXdhaXQgdGhpcy5mZXRjaElNc09mKFt1c2VySURdKSlbMF1cbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmZpbGVzLnVwbG9hZChmaWxlbmFtZSArICcuY3N2Jywge1xuICAgICAgY2hhbm5lbHM6IGltLmlkLFxuICAgICAgY29udGVudDogcmVwb3J0XG4gICAgfSlcbiAgfVxufVxuIl19