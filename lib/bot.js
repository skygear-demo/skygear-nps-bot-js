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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsImNsb3NpbmdOb3RpY2UiLCJmcmVxdWVuY3kiLCJ0YXJnZXRzSUQiLCJ0aXRsZSIsInRleHQiLCJmYWxsYmFjayIsImNhbGxiYWNrX2lkIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhbGxiYWNrIiwiYWN0aW9ucyIsInR5cGUiLCJ2YWx1ZSIsInN0eWxlIiwiY29uZmlybSIsIm9rX3RleHQiLCJvcGVuU3VydmV5RGlhbG9nIiwic3VydmV5SUQiLCJ0cmlnZ2VySWQiLCJyZXNwb25zZVVSTCIsImRpYWxvZyIsInVybCIsImVsZW1lbnRzIiwibGFiZWwiLCJoaW50IiwicXVlc3Rpb25zIiwib3B0aW9ucyIsIm9wdGlvbmFsIiwibWF4X2xlbmd0aCIsIm9wZW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLFNBQUYsS0FBZ0JDLFFBQVEsZUFBUixDQUF0QjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU0sRUFBRUUsVUFBRixLQUFpQkYsUUFBUSxRQUFSLENBQXZCOztBQUVBOzs7QUFHQUcsT0FBT0Ms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LEVBNkJQO0FBQ0VXLG1CQUFPLEdBRFQ7QUFFRVgsbUJBQU87QUFGVCxXQTdCTyxFQWlDUDtBQUNFVyxtQkFBTyxHQURUO0FBRUVYLG1CQUFPO0FBRlQsV0FqQ08sRUFxQ1A7QUFDRVcsbUJBQU8sR0FEVDtBQUVFWCxtQkFBTztBQUZULFdBckNPLEVBeUNQO0FBQ0VXLG1CQUFPLHNCQURUO0FBRUVYLG1CQUFPO0FBRlQsV0F6Q087QUFMWCxTQURRLEVBcURSO0FBQ0VXLGlCQUFPLFFBRFQ7QUFFRTVDLGdCQUFNLFFBRlI7QUFHRWdDLGdCQUFNLFVBSFI7QUFJRWdCLG9CQUFVLElBSlo7QUFLRUMsc0JBQVksR0FMZDtBQU1FSixnQkFBTTdELFFBQVFvQyxNQUFSLENBQWUwQixTQUFmLENBQXlCLENBQXpCO0FBTlIsU0FyRFE7QUFQQyxPQUFiO0FBc0VBLGFBQU8sT0FBS3ZELE9BQUwsQ0FBYWtELE1BQWIsQ0FBb0JTLElBQXBCLENBQXlCdEIsS0FBS0MsU0FBTCxDQUFlWSxNQUFmLENBQXpCLEVBQWlERixTQUFqRCxDQUFQO0FBdkV3RDtBQXdFekQ7QUFsS3dCLENBQTNCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2UnKVxuY29uc3QgeyBleHRyYWN0SURzIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL21ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCb3Qge1xuICBjb25zdHJ1Y3RvciAodG9rZW4pIHtcbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViQ2xpZW50KHRva2VuKVxuICB9XG5cbiAgLy8gQVBJIHdyYXBwZXJzXG4gIGFzeW5jIGZldGNoVXNlcnMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5saXN0KClcbiAgICAvLyBuZWl0aGVyIGEgYm90IG9yIGEgZm9ybWVyIG1lbWJlclxuICAgIHJldHVybiByZXMubWVtYmVycy5maWx0ZXIobWVtYmVyID0+ICEobWVtYmVyLmlzX2JvdCB8fCBtZW1iZXIubmFtZSA9PT0gJ3NsYWNrYm90JyB8fCBtZW1iZXIuZGVsZXRlZCkpXG4gIH1cblxuICBhc3luYyBmZXRjaFVzZXIgKGlkKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmluZm8oaWQpXG4gICAgcmV0dXJuIHJlcy51c2VyXG4gIH1cblxuICBhc3luYyBmZXRjaElNcyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LmltLmxpc3QoKVxuICAgIHJldHVybiByZXMuaW1zXG4gIH1cblxuICBzZW5kVG9DaGFubmVsIChpZCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKGlkLCBtZXNzYWdlLCB7IGF0dGFjaG1lbnRzIH0pXG4gIH1cblxuICAvLyBEZXJpdmVkIG1ldGhvZHNcbiAgYXN5bmMgZmV0Y2hJTXNPZiAodXNlcnNJRCkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXMoKVxuICAgIHJldHVybiBpbXMuZmlsdGVyKGltID0+IHVzZXJzSUQuaW5jbHVkZXMoaW0udXNlcikpXG4gIH1cblxuICBhc3luYyBzZW5kVG9Vc2VycyAodXNlcnNJRCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXNPZih1c2Vyc0lEKVxuICAgIGNvbnN0IGltc0lEID0gZXh0cmFjdElEcyhpbXMpXG4gICAgZm9yIChsZXQgaW1JRCBvZiBpbXNJRCkge1xuICAgICAgdGhpcy5zZW5kVG9DaGFubmVsKGltSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRpc3RyaWJ1dGUgKHN1cnZleSkge1xuICAgIGxldCBjbG9zaW5nTm90aWNlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgd2VlayknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IG1vbnRoKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBxdWFydGVyKSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnJ1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbmRUb1VzZXJzKHN1cnZleS50YXJnZXRzSUQsICcnLCBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLnN1cnZleS50aXRsZSxcbiAgICAgICAgdGV4dDogJ1doYXQgZG8geW91IHRoaW5rIGFib3V0IHRoZSBjb21wYW55PycgKyBjbG9zaW5nTm90aWNlLFxuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGFuc3dlciB0aGUgc3VydmV5JyxcbiAgICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjYWxsYmFjazogJ2Fuc3dlclN1cnZleScsXG4gICAgICAgICAgaWQ6IHN1cnZleS5pZFxuICAgICAgICB9KSxcbiAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Fuc3dlcicsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAneWVzJyxcbiAgICAgICAgICAgIHN0eWxlOiAncHJpbWFyeSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaG9pY2UnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ25vJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0pXG4gIH1cblxuICBhc3luYyBvcGVuU3VydmV5RGlhbG9nIChzdXJ2ZXlJRCwgdHJpZ2dlcklkLCByZXNwb25zZVVSTCkge1xuICAgIGxldCBkaWFsb2cgPSB7XG4gICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjYWxsYmFjazogJ3N1Ym1pdFN1cnZleScsXG4gICAgICAgIGlkOiBzdXJ2ZXlJRCxcbiAgICAgICAgdXJsOiByZXNwb25zZVVSTFxuICAgICAgfSksXG4gICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdTY29yZScsXG4gICAgICAgICAgbmFtZTogJ3Njb3JlJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICBoaW50OiBtZXNzYWdlLnN1cnZleS5xdWVzdGlvbnNbMF0sXG4gICAgICAgICAgb3B0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzEwIChtb3N0IHJlY29tbWVuZGVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMTAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzgnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzcnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzYnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzUnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzQnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzMnLFxuICAgICAgICAgICAgICB2YWx1ZTogJzMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzInLFxuICAgICAgICAgICAgICB2YWx1ZTogJzInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJzEgKGxlYXN0IHJlY29tbWVuZWQpJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcxJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnUmVhc29uJyxcbiAgICAgICAgICBuYW1lOiAncmVhc29uJyxcbiAgICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxuICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgIG1heF9sZW5ndGg6IDUwMCxcbiAgICAgICAgICBoaW50OiBtZXNzYWdlLnN1cnZleS5xdWVzdGlvbnNbMV1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmRpYWxvZy5vcGVuKEpTT04uc3RyaW5naWZ5KGRpYWxvZyksIHRyaWdnZXJJZClcbiAgfVxufVxuIl19