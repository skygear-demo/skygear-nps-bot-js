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
      return _this6.sendToUsers(survey.targetsID, '', [{
        title: message.survey.title,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsInRhcmdldHNJRCIsInRpdGxlIiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0ZXh0IiwidHlwZSIsInZhbHVlIiwic3R5bGUiLCJjb25maXJtIiwib2tfdGV4dCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJzdXJ2ZXlJRCIsInRyaWdnZXJJZCIsInJlc3BvbnNlVVJMIiwiZGlhbG9nIiwidXJsIiwiZWxlbWVudHMiLCJsYWJlbCIsImhpbnQiLCJxdWVzdGlvbnMiLCJvcHRpb25zIiwib3B0aW9uYWwiLCJtYXhfbGVuZ3RoIiwib3BlbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFRSxVQUFGLEtBQWlCRixRQUFRLFFBQVIsQ0FBdkI7O0FBRUE7OztBQUdBRyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEdBQU4sQ0FBVTtB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QixnQkFBTSxVQUhSO0FBSUVnQixvQkFBVSxJQUpaO0FBS0VDLHNCQUFZLEdBTGQ7QUFNRUosZ0JBQU0zRCxRQUFRb0MsTUFBUixDQUFld0IsU0FBZixDQUF5QixDQUF6QjtBQU5SLFNBckRRO0FBUEMsT0FBYjtBQXNFQSxhQUFPLE9BQUtyRCxPQUFMLENBQWFnRCxNQUFiLENBQW9CUyxJQUFwQixDQUF5QnZCLEtBQUtDLFNBQUwsQ0FBZWEsTUFBZixDQUF6QixFQUFpREYsU0FBakQsQ0FBUDtBQXZFd0Q7QUF3RXpEO0FBbEp3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlJylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9tZXRob2RzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQm90IHtcbiAgY29uc3RydWN0b3IgKHRva2VuKSB7XG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYkNsaWVudCh0b2tlbilcbiAgfVxuXG4gIC8vIEFQSSB3cmFwcGVyc1xuICBhc3luYyBmZXRjaFVzZXJzICgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMubGlzdCgpXG4gICAgLy8gbmVpdGhlciBhIGJvdCBvciBhIGZvcm1lciBtZW1iZXJcbiAgICByZXR1cm4gcmVzLm1lbWJlcnMuZmlsdGVyKG1lbWJlciA9PiAhKG1lbWJlci5pc19ib3QgfHwgbWVtYmVyLm5hbWUgPT09ICdzbGFja2JvdCcgfHwgbWVtYmVyLmRlbGV0ZWQpKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hVc2VyIChpZCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5pbmZvKGlkKVxuICAgIHJldHVybiByZXMudXNlclxuICB9XG5cbiAgYXN5bmMgZmV0Y2hJTXMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC5pbS5saXN0KClcbiAgICByZXR1cm4gcmVzLmltc1xuICB9XG5cbiAgc2VuZFRvQ2hhbm5lbCAoaWQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZShpZCwgbWVzc2FnZSwgeyBhdHRhY2htZW50cyB9KVxuICB9XG5cbiAgLy8gRGVyaXZlZCBtZXRob2RzXG4gIGFzeW5jIGZldGNoSU1zT2YgKHVzZXJzSUQpIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zKClcbiAgICByZXR1cm4gaW1zLmZpbHRlcihpbSA9PiB1c2Vyc0lELmluY2x1ZGVzKGltLnVzZXIpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvVXNlcnMgKHVzZXJzSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zT2YodXNlcnNJRClcbiAgICBjb25zdCBpbXNJRCA9IGV4dHJhY3RJRHMoaW1zKVxuICAgIGZvciAobGV0IGltSUQgb2YgaW1zSUQpIHtcbiAgICAgIHRoaXMuc2VuZFRvQ2hhbm5lbChpbUlELCBtZXNzYWdlLCBhdHRhY2htZW50cylcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXN0cmlidXRlIChzdXJ2ZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Vc2VycyhzdXJ2ZXkudGFyZ2V0c0lELCAnJywgW1xuICAgICAge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICAgIGZhbGxiYWNrOiAnWW91IGFyZSB1bmFibGUgdG8gYW5zd2VyIHRoZSBzdXJ2ZXknLFxuICAgICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNhbGxiYWNrOiAnYW5zd2VyU3VydmV5JyxcbiAgICAgICAgICBpZDogc3VydmV5LmlkXG4gICAgICAgIH0pLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Nob2ljZScsXG4gICAgICAgICAgICB0ZXh0OiAnQW5zd2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6ICd5ZXMnLFxuICAgICAgICAgICAgc3R5bGU6ICdwcmltYXJ5J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Nob2ljZScsXG4gICAgICAgICAgICB0ZXh0OiAnU2tpcCcsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnbm8nLFxuICAgICAgICAgICAgc3R5bGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgY29uZmlybToge1xuICAgICAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxuICAgICAgICAgICAgICB0ZXh0OiAnVGhlIHRlYW0gbmVlZHMgeW91ciBvcGluaW9ucyB0byBpbXByb3ZlIScsXG4gICAgICAgICAgICAgIG9rX3RleHQ6ICdNYXliZSBuZXh0IHRpbWUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSlcbiAgfVxuXG4gIGFzeW5jIG9wZW5TdXJ2ZXlEaWFsb2cgKHN1cnZleUlELCB0cmlnZ2VySWQsIHJlc3BvbnNlVVJMKSB7XG4gICAgbGV0IGRpYWxvZyA9IHtcbiAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNhbGxiYWNrOiAnc3VibWl0U3VydmV5JyxcbiAgICAgICAgaWQ6IHN1cnZleUlELFxuICAgICAgICB1cmw6IHJlc3BvbnNlVVJMXG4gICAgICB9KSxcbiAgICAgIHRpdGxlOiBtZXNzYWdlLnN1cnZleS50aXRsZSxcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1Njb3JlJyxcbiAgICAgICAgICBuYW1lOiAnc2NvcmUnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgIGhpbnQ6IG1lc3NhZ2Uuc3VydmV5LnF1ZXN0aW9uc1swXSxcbiAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMTAgKG1vc3QgcmVjb21tZW5kZWQpJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcxMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnOScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnOSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnOCcsXG4gICAgICAgICAgICAgIHZhbHVlOiAnOCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNicsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNCcsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMicsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMSAobGVhc3QgcmVjb21tZW5lZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdSZWFzb24nLFxuICAgICAgICAgIG5hbWU6ICdyZWFzb24nLFxuICAgICAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgbWF4X2xlbmd0aDogNTAwLFxuICAgICAgICAgIGhpbnQ6IG1lc3NhZ2Uuc3VydmV5LnF1ZXN0aW9uc1sxXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZGlhbG9nLm9wZW4oSlNPTi5zdHJpbmdpZnkoZGlhbG9nKSwgdHJpZ2dlcklkKVxuICB9XG59XG4iXX0=