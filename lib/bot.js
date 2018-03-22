'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const message = require('./message');

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
    this._client.chat.postMessage(id, message, { attachments }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
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

  openDirectMessage(userID) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const res = yield _this5._client.im.open(userID);
      return res;
    })();
  }

  sendToUsers(usersID, message, attachments = []) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      for (var uid of usersID) {
        _this6.openDirectMessage(uid).then(function (res) {
          const channelID = res.channel.id;
          _this6.sendToChannel(channelID, message, attachments);
          console.log('sent to ' + channelID);
        }).catch(function (err) {
          console.log(err);
        });
      }
    })();
  }

  distribute(survey, targetsID) {
    var _this7 = this;

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
        text: 'Please give a 10-second feedback to the team: How likely would you recommend this company as a place to work to your friends?' + closingNotice,
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

      return targetsID ? _this7.sendToUsers(targetsID, '', attachments) : _this7.sendToUsers(survey.targetsID, '', attachments);
    })();
  }

  openSurveyDialog(surveyID, triggerId, responseURL) {
    var _this8 = this;

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
      return _this8._client.dialog.open(JSON.stringify(dialog), triggerId);
    })();
  }

  upload(report, comment, filename, userID) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      const im = (yield _this9.fetchIMsOf([userID]))[0];
      return _this9._client.files.upload(filename + '.csv', {
        channels: im.id,
        content: report,
        initial_comment: comment
      });
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwiQm90IiwiY29uc3RydWN0b3IiLCJ0b2tlbiIsIl9jbGllbnQiLCJmZXRjaFVzZXJzIiwicmVzIiwidXNlcnMiLCJsaXN0IiwibWVtYmVycyIsImZpbHRlciIsIm1lbWJlciIsImlzX2JvdCIsIm5hbWUiLCJkZWxldGVkIiwiaXNfcmVzdHJpY3RlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVyciIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJvcGVuRGlyZWN0TWVzc2FnZSIsInVzZXJJRCIsIm9wZW4iLCJzZW5kVG9Vc2VycyIsInVpZCIsImNoYW5uZWxJRCIsImNoYW5uZWwiLCJkaXN0cmlidXRlIiwic3VydmV5IiwidGFyZ2V0c0lEIiwiY2xvc2luZ05vdGljZSIsImZyZXF1ZW5jeSIsInRpdGxlIiwidGV4dCIsImZhbGxiYWNrIiwiY2FsbGJhY2tfaWQiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FsbGJhY2siLCJhY3Rpb25zIiwidHlwZSIsInZhbHVlIiwic3R5bGUiLCJjb25maXJtIiwib2tfdGV4dCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJzdXJ2ZXlJRCIsInRyaWdnZXJJZCIsInJlc3BvbnNlVVJMIiwiZGlhbG9nIiwidXJsIiwiZWxlbWVudHMiLCJsYWJlbCIsImhpbnQiLCJxdWVzdGlvbnMiLCJvcHRpb25zIiwib3B0aW9uYWwiLCJtYXhfbGVuZ3RoIiwidXBsb2FkIiwicmVwb3J0IiwiY29tbWVudCIsImZpbGVuYW1lIiwiZmlsZXMiLCJjaGFubmVscyIsImNvbnRlbnQiLCJpbml0aWFs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QU1FSixnQkFBTXRFLFFBQVE2QyxNQUFSLENBQWUwQixTQUFmLENBQXlCLENBQXpCO0FBTlIsU0FqRFE7QUFQQyxPQUFiO0FBa0VBLGFBQU8sT0FBS2pFLE9BQUwsQ0FBYTRELE1BQWIsQ0FBb0IzQixJQUFwQixDQUF5QmMsS0FBS0MsU0FBTCxDQUFlWSxNQUFmLENBQXpCLEVBQWlERixTQUFqRCxDQUFQO0FBbkV3RDtBQW9FekQ7O0FBRUtXLFFBQU4sQ0FBY0MsTUFBZCxFQUFzQkMsT0FBdEIsRUFBK0JDLFFBQS9CLEVBQXlDeEMsTUFBekMsRUFBaUQ7QUFBQTs7QUFBQTtBQUMvQyxZQUFNZixLQUFLLENBQUMsTUFBTSxPQUFLVyxVQUFMLENBQWdCLENBQUNJLE1BQUQsQ0FBaEIsQ0FBUCxFQUFrQyxDQUFsQyxDQUFYO0FBQ0EsYUFBTyxPQUFLaEMsT0FBTCxDQUFheUUsS0FBYixDQUFtQkosTUFBbkIsQ0FBMEJHLFdBQVcsTUFBckMsRUFBNkM7QUFDbERFLGtCQUFVekQsR0FBR0osRUFEcUM7QUFFbEQ4RCxpQkFBU0wsTUFGeUM7QUFHbERNLHlCQUFpQkw7QUFIaUMsT0FBN0MsQ0FBUDtBQUYrQztBQU9oRDtBQXRMd0IsQ0FBM0IiLCJmaWxlIjoiYm90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBXZWJDbGllbnQgfSA9IHJlcXVpcmUoJ0BzbGFjay9jbGllbnQnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4vbWVzc2FnZScpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vbWV0aG9kc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJvdCB7XG4gIGNvbnN0cnVjdG9yICh0b2tlbikge1xuICAgIHRoaXMuX2NsaWVudCA9IG5ldyBXZWJDbGllbnQodG9rZW4pXG4gIH1cblxuICAvLyBBUEkgd3JhcHBlcnNcbiAgYXN5bmMgZmV0Y2hVc2VycyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmxpc3QoKVxuICAgIC8vIG5laXRoZXIgYSBib3Qgb3IgYSBmb3JtZXIgbWVtYmVyIG9yIGEgZ3Vlc3QgdXNlclxuICAgIHJldHVybiByZXMubWVtYmVycy5maWx0ZXIobWVtYmVyID0+ICEobWVtYmVyLmlzX2JvdCB8fCBtZW1iZXIubmFtZSA9PT0gJ3NsYWNrYm90JyB8fCBtZW1iZXIuZGVsZXRlZCB8fCBtZW1iZXIuaXNfcmVzdHJpY3RlZCkpXG4gIH1cblxuICBhc3luYyBmZXRjaFVzZXIgKGlkKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmluZm8oaWQpXG4gICAgcmV0dXJuIHJlcy51c2VyXG4gIH1cblxuICBhc3luYyBmZXRjaElNcyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LmltLmxpc3QoKVxuICAgIHJldHVybiByZXMuaW1zXG4gIH1cblxuICBzZW5kVG9DaGFubmVsIChpZCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKGlkLCBtZXNzYWdlLCB7IGF0dGFjaG1lbnRzIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICAvLyBEZXJpdmVkIG1ldGhvZHNcbiAgYXN5bmMgZmV0Y2hJTXNPZiAodXNlcnNJRCkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXMoKVxuICAgIHJldHVybiBpbXMuZmlsdGVyKGltID0+IHVzZXJzSUQuaW5jbHVkZXMoaW0udXNlcikpXG4gIH1cblxuICBhc3luYyBvcGVuRGlyZWN0TWVzc2FnZSAodXNlcklEKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LmltLm9wZW4odXNlcklEKVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb1VzZXJzICh1c2Vyc0lELCBtZXNzYWdlLCBhdHRhY2htZW50cyA9IFtdKSB7XG4gICAgZm9yICh2YXIgdWlkIG9mIHVzZXJzSUQpIHtcbiAgICAgIHRoaXMub3BlbkRpcmVjdE1lc3NhZ2UodWlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWxJRCA9IHJlcy5jaGFubmVsLmlkXG4gICAgICAgIHRoaXMuc2VuZFRvQ2hhbm5lbChjaGFubmVsSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzKVxuICAgICAgICBjb25zb2xlLmxvZygnc2VudCB0byAnICsgY2hhbm5lbElEKVxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXN0cmlidXRlIChzdXJ2ZXksIHRhcmdldHNJRCkge1xuICAgIGxldCBjbG9zaW5nTm90aWNlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgd2VlayknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IG1vbnRoKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBxdWFydGVyKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnJ1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICAgIHRleHQ6ICdQbGVhc2UgZ2l2ZSBhIDEwLXNlY29uZCBmZWVkYmFjayB0byB0aGUgdGVhbTogSG93IGxpa2VseSB3b3VsZCB5b3UgcmVjb21tZW5kIHRoaXMgY29tcGFueSBhcyBhIHBsYWNlIHRvIHdvcmsgdG8geW91ciBmcmllbmRzPycgKyBjbG9zaW5nTm90aWNlLFxuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGFuc3dlciB0aGUgc3VydmV5JyxcbiAgICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjYWxsYmFjazogJ2Fuc3dlclN1cnZleScsXG4gICAgICAgICAgaWQ6IHN1cnZleS5pZFxuICAgICAgICB9KSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Fuc3dlcicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgIHN0eWxlOiAncHJpbWFyeSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ25vJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF1cblxuICAgIHJldHVybiB0YXJnZXRzSUQgPyB0aGlzLnNlbmRUb1VzZXJzKHRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKSA6IHRoaXMuc2VuZFRvVXNlcnMoc3VydmV5LnRhcmdldHNJRCwgJycsIGF0dGFjaG1lbnRzKVxuICB9XG5cbiAgYXN5bmMgb3BlblN1cnZleURpYWxvZyAoc3VydmV5SUQsIHRyaWdnZXJJZCwgcmVzcG9uc2VVUkwpIHtcbiAgICBsZXQgZGlhbG9nID0ge1xuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdzdWJtaXRTdXJ2ZXknLFxuICAgICAgICBpZDogc3VydmV5SUQsXG4gICAgICAgIHVybDogcmVzcG9uc2VVUkxcbiAgICAgIH0pLFxuICAgICAgdGl0bGU6IG1lc3NhZ2Uuc3VydmV5LnRpdGxlLFxuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnU2NvcmUnLFxuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzBdLFxuICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxMCAobW9zdCByZWNvbW1lbmRlZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc5JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc4JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc2JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc1JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICczJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICczJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxIChsZWFzdCByZWNvbW1lbmVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1JlYXNvbicsXG4gICAgICAgICAgbmFtZTogJ3JlYXNvbicsXG4gICAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICBtYXhfbGVuZ3RoOiA1MDAsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzFdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5kaWFsb2cub3BlbihKU09OLnN0cmluZ2lmeShkaWFsb2cpLCB0cmlnZ2VySWQpXG4gIH1cblxuICBhc3luYyB1cGxvYWQgKHJlcG9ydCwgY29tbWVudCwgZmlsZW5hbWUsIHVzZXJJRCkge1xuICAgIGNvbnN0IGltID0gKGF3YWl0IHRoaXMuZmV0Y2hJTXNPZihbdXNlcklEXSkpWzBdXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5maWxlcy51cGxvYWQoZmlsZW5hbWUgKyAnLmNzdicsIHtcbiAgICAgIGNoYW5uZWxzOiBpbS5pZCxcbiAgICAgIGNvbnRlbnQ6IHJlcG9ydCxcbiAgICAgIGluaXRpYWxfY29tbWVudDogY29tbWVudFxuICAgIH0pXG4gIH1cbn1cbiJdfQ==