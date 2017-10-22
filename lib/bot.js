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
          value: 'Answer',
          style: 'primary'
        }, {
          name: 'choice',
          text: 'Skip',
          type: 'button',
          value: 'Skip',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsInRhcmdldHNJRCIsInRpdGxlIiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0ZXh0IiwidHlwZSIsInZhbHVlIiwic3R5bGUiLCJjb25maXJtIiwib2tfdGV4dCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJzdXJ2ZXlJRCIsInRyaWdnZXJJZCIsInJlc3BvbnNlVVJMIiwiZGlhbG9nIiwidXJsIiwiZWxlbWVudHMiLCJsYWJlbCIsImhpbnQiLCJxdWVzdGlvbnMiLCJvcHRpb25zIiwib3B0aW9uYWwiLCJtYXhfbGVuZ3RoIiwib3BlbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFRSxVQUFGLEtBQWlCRixRQUFRLFFBQVIsQ0FBdkI7O0FBRUE7OztBQUdBRyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEdBQU4sQ0FBVTtB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QixnQkFBTSxVQUhSO0FBSUVnQixvQkFBVSxJQUpaO0FBS0VDLHNCQUFZLEdBTGQ7QUFNRUosZ0JBQU0zRCxRQUFRb0MsTUFBUixDQUFld0IsU0FBZixDQUF5QixDQUF6QjtBQU5SLFNBckRRO0FBUEMsT0FBYjtBQXNFQSxhQUFPLE9BQUtyRCxPQUFMLENBQWFnRCxNQUFiLENBQW9CUyxJQUFwQixDQUF5QnZCLEtBQUtDLFNBQUwsQ0FBZWEsTUFBZixDQUF6QixFQUFpREYsU0FBakQsQ0FBUDtBQXZFd0Q7QUF3RXpEO0FBbEp3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlJylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9tZXRob2RzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQm90IHtcbiAgY29uc3RydWN0b3IgKHRva2VuKSB7XG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYkNsaWVudCh0b2tlbilcbiAgfVxuXG4gIC8vIEFQSSB3cmFwcGVyc1xuICBhc3luYyBmZXRjaFVzZXJzICgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMubGlzdCgpXG4gICAgLy8gbmVpdGhlciBhIGJvdCBvciBhIGZvcm1lciBtZW1iZXJcbiAgICByZXR1cm4gcmVzLm1lbWJlcnMuZmlsdGVyKG1lbWJlciA9PiAhKG1lbWJlci5pc19ib3QgfHwgbWVtYmVyLm5hbWUgPT09ICdzbGFja2JvdCcgfHwgbWVtYmVyLmRlbGV0ZWQpKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hVc2VyIChpZCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5pbmZvKGlkKVxuICAgIHJldHVybiByZXMudXNlclxuICB9XG5cbiAgYXN5bmMgZmV0Y2hJTXMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC5pbS5saXN0KClcbiAgICByZXR1cm4gcmVzLmltc1xuICB9XG5cbiAgc2VuZFRvQ2hhbm5lbCAoaWQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZShpZCwgbWVzc2FnZSwgeyBhdHRhY2htZW50cyB9KVxuICB9XG5cbiAgLy8gRGVyaXZlZCBtZXRob2RzXG4gIGFzeW5jIGZldGNoSU1zT2YgKHVzZXJzSUQpIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zKClcbiAgICByZXR1cm4gaW1zLmZpbHRlcihpbSA9PiB1c2Vyc0lELmluY2x1ZGVzKGltLnVzZXIpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvVXNlcnMgKHVzZXJzSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzID0gW10pIHtcbiAgICBjb25zdCBpbXMgPSBhd2FpdCB0aGlzLmZldGNoSU1zT2YodXNlcnNJRClcbiAgICBjb25zdCBpbXNJRCA9IGV4dHJhY3RJRHMoaW1zKVxuICAgIGZvciAobGV0IGltSUQgb2YgaW1zSUQpIHtcbiAgICAgIHRoaXMuc2VuZFRvQ2hhbm5lbChpbUlELCBtZXNzYWdlLCBhdHRhY2htZW50cylcbiAgICB9XG4gIH1cblxuICBhc3luYyBkaXN0cmlidXRlIChzdXJ2ZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kVG9Vc2VycyhzdXJ2ZXkudGFyZ2V0c0lELCAnJywgW1xuICAgICAge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS5zdXJ2ZXkudGl0bGUsXG4gICAgICAgIGZhbGxiYWNrOiAnWW91IGFyZSB1bmFibGUgdG8gYW5zd2VyIHRoZSBzdXJ2ZXknLFxuICAgICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNhbGxiYWNrOiAnYW5zd2VyU3VydmV5JyxcbiAgICAgICAgICBpZDogc3VydmV5LmlkXG4gICAgICAgIH0pLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Nob2ljZScsXG4gICAgICAgICAgICB0ZXh0OiAnQW5zd2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6ICdBbnN3ZXInLFxuICAgICAgICAgICAgc3R5bGU6ICdwcmltYXJ5J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Nob2ljZScsXG4gICAgICAgICAgICB0ZXh0OiAnU2tpcCcsXG4gICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnU2tpcCcsXG4gICAgICAgICAgICBzdHlsZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBjb25maXJtOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXG4gICAgICAgICAgICAgIHRleHQ6ICdUaGUgdGVhbSBuZWVkcyB5b3VyIG9waW5pb25zIHRvIGltcHJvdmUhJyxcbiAgICAgICAgICAgICAgb2tfdGV4dDogJ01heWJlIG5leHQgdGltZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdKVxuICB9XG5cbiAgYXN5bmMgb3BlblN1cnZleURpYWxvZyAoc3VydmV5SUQsIHRyaWdnZXJJZCwgcmVzcG9uc2VVUkwpIHtcbiAgICBsZXQgZGlhbG9nID0ge1xuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdzdWJtaXRTdXJ2ZXknLFxuICAgICAgICBpZDogc3VydmV5SUQsXG4gICAgICAgIHVybDogcmVzcG9uc2VVUkxcbiAgICAgIH0pLFxuICAgICAgdGl0bGU6IG1lc3NhZ2Uuc3VydmV5LnRpdGxlLFxuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnU2NvcmUnLFxuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzBdLFxuICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxMCAobW9zdCByZWNvbW1lbmRlZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc5JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc5J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc4JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc3JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc3J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc2JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc1JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc1J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICc0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICc0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICczJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICczJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICcxIChsZWFzdCByZWNvbW1lbmVkKScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1JlYXNvbicsXG4gICAgICAgICAgbmFtZTogJ3JlYXNvbicsXG4gICAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICBtYXhfbGVuZ3RoOiA1MDAsXG4gICAgICAgICAgaGludDogbWVzc2FnZS5zdXJ2ZXkucXVlc3Rpb25zWzFdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5kaWFsb2cub3BlbihKU09OLnN0cmluZ2lmeShkaWFsb2cpLCB0cmlnZ2VySWQpXG4gIH1cbn1cbiJdfQ==