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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImlzX3Jlc3RyaWN0ZWQiLCJmZXRjaFVzZXIiLCJpZCIsImluZm8iLCJ1c2VyIiwiZmV0Y2hJTXMiLCJpbSIsImltcyIsInNlbmRUb0NoYW5uZWwiLCJhdHRhY2htZW50cyIsImNoYXQiLCJwb3N0TWVzc2FnZSIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJzZW5kVG9Vc2VycyIsImltc0lEIiwiaW1JRCIsImRpc3RyaWJ1dGUiLCJzdXJ2ZXkiLCJ0YXJnZXRzSUQiLCJjbG9zaW5nTm90aWNlIiwiZnJlcXVlbmN5IiwidGl0bGUiLCJ0ZXh0IiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0eXBlIiwidmFsdWUiLCJzdHlsZSIsImNvbmZpcm0iLCJva190ZXh0Iiwib3BlblN1cnZleURpYWxvZyIsInN1cnZleUlEIiwidHJpZ2dlcklkIiwicmVzcG9uc2VVUkwiLCJkaWFsb2ciLCJ1cmwiLCJlbGVtZW50cyIsImxhYmVsIiwiaGludCIsInF1ZXN0aW9ucyIsIm9wdGlvbnMiLCJvcHRpb25hbCIsIm1heF9sZW5ndGgiLCJvcGVuIiwidXBsb2FkIiwicmVwb3J0IiwiZmlsZW5hbWUiLCJ1c2VySUQiLCJmaWxlcyIsImNoYW5uZWxzIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTUMsVUFB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QyxFQUE2QztBQUNsREcsa0JBQVVqRCxHQUFHSixFQURxQztBQUVsRHNELGlCQUFTTDtBQUZ5QyxPQUE3QyxDQUFQO0FBRnNDO0FBTXZDO0FBNUt3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi9tZXNzYWdlJylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9tZXRob2RzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQm90IHtcbiAgY29uc3RydWN0b3IgKHRva2VuKSB7XG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYkNsaWVudCh0b2tlbilcbiAgfVxuXG4gIC8vIEFQSSB3cmFwcGVyc1xuICBhc3luYyBmZXRjaFVzZXJzICgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMubGlzdCgpXG4gICAgLy8gbmVpdGhlciBhIGJvdCBvciBhIGZvcm1lciBtZW1iZXIgb3IgYSBndWVzdCB1c2VyXG4gICAgcmV0dXJuIHJlcy5tZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gIShtZW1iZXIuaXNfYm90IHx8IG1lbWJlci5uYW1lID09PSAnc2xhY2tib3QnIHx8IG1lbWJlci5kZWxldGVkIHx8IG1lbWJlci5pc19yZXN0cmljdGVkKSlcbiAgfVxuXG4gIGFzeW5jIGZldGNoVXNlciAoaWQpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMuaW5mbyhpZClcbiAgICByZXR1cm4gcmVzLnVzZXJcbiAgfVxuXG4gIGFzeW5jIGZldGNoSU1zICgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQuaW0ubGlzdCgpXG4gICAgcmV0dXJuIHJlcy5pbXNcbiAgfVxuXG4gIHNlbmRUb0NoYW5uZWwgKGlkLCBtZXNzYWdlLCBhdHRhY2htZW50cyA9IFtdKSB7XG4gICAgdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UoaWQsIG1lc3NhZ2UsIHsgYXR0YWNobWVudHMgfSlcbiAgfVxuXG4gIC8vIERlcml2ZWQgbWV0aG9kc1xuICBhc3luYyBmZXRjaElNc09mICh1c2Vyc0lEKSB7XG4gICAgY29uc3QgaW1zID0gYXdhaXQgdGhpcy5mZXRjaElNcygpXG4gICAgcmV0dXJuIGltcy5maWx0ZXIoaW0gPT4gdXNlcnNJRC5pbmNsdWRlcyhpbS51c2VyKSlcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb1VzZXJzICh1c2Vyc0lELCBtZXNzYWdlLCBhdHRhY2htZW50cyA9IFtdKSB7XG4gICAgY29uc3QgaW1zID0gYXdhaXQgdGhpcy5mZXRjaElNc09mKHVzZXJzSUQpXG4gICAgY29uc3QgaW1zSUQgPSBleHRyYWN0SURzKGltcylcbiAgICBmb3IgKGxldCBpbUlEIG9mIGltc0lEKSB7XG4gICAgICB0aGlzLnNlbmRUb0NoYW5uZWwoaW1JRCwgbWVzc2FnZSwgYXR0YWNobWVudHMpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGlzdHJpYnV0ZSAoc3VydmV5LCB0YXJnZXRzSUQpIHtcbiAgICBsZXQgY2xvc2luZ05vdGljZVxuICAgIHN3aXRjaCAoc3VydmV5LmZyZXF1ZW5jeSkge1xuICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgY2xvc2luZ05vdGljZSA9ICdcXG4odGhlIHN1cnZleSB3aWxsIGJlIGNsb3NlZCBhdCBuZXh0IHdlZWspJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgIGNsb3NpbmdOb3RpY2UgPSAnXFxuKHRoZSBzdXJ2ZXkgd2lsbCBiZSBjbG9zZWQgYXQgbmV4dCBtb250aCknXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdxdWFydGVybHknOlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJ1xcbih0aGUgc3VydmV5IHdpbGwgYmUgY2xvc2VkIGF0IG5leHQgcXVhcnRlciknXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjbG9zaW5nTm90aWNlID0gJydcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2htZW50cyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2Uuc3VydmV5LnRpdGxlLFxuICAgICAgICB0ZXh0OiAnSGVscCBnaXZlIGEgMTAgc2Vjb25kcyBmZWVkYmFjayB0byB0aGUgdGVhbT8nICsgY2xvc2luZ05vdGljZSxcbiAgICAgICAgZmFsbGJhY2s6ICdZb3UgYXJlIHVuYWJsZSB0byBhbnN3ZXIgdGhlIHN1cnZleScsXG4gICAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY2FsbGJhY2s6ICdhbnN3ZXJTdXJ2ZXknLFxuICAgICAgICAgIGlkOiBzdXJ2ZXkuaWRcbiAgICAgICAgfSksXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2hvaWNlJyxcbiAgICAgICAgICAgIHRleHQ6ICdBbnN3ZXInLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ3llcycsXG4gICAgICAgICAgICBzdHlsZTogJ3ByaW1hcnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2hvaWNlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTa2lwJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6ICdubycsXG4gICAgICAgICAgICBzdHlsZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBjb25maXJtOiB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXG4gICAgICAgICAgICAgIHRleHQ6ICdUaGUgdGVhbSBuZWVkcyB5b3VyIG9waW5pb25zIHRvIGltcHJvdmUhJyxcbiAgICAgICAgICAgICAgb2tfdGV4dDogJ01heWJlIG5leHQgdGltZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdXG5cbiAgICByZXR1cm4gdGFyZ2V0c0lEID8gdGhpcy5zZW5kVG9Vc2Vycyh0YXJnZXRzSUQsICcnLCBhdHRhY2htZW50cykgOiB0aGlzLnNlbmRUb1VzZXJzKHN1cnZleS50YXJnZXRzSUQsICcnLCBhdHRhY2htZW50cylcbiAgfVxuXG4gIGFzeW5jIG9wZW5TdXJ2ZXlEaWFsb2cgKHN1cnZleUlELCB0cmlnZ2VySWQsIHJlc3BvbnNlVVJMKSB7XG4gICAgbGV0IGRpYWxvZyA9IHtcbiAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNhbGxiYWNrOiAnc3VibWl0U3VydmV5JyxcbiAgICAgICAgaWQ6IHN1cnZleUlELFxuICAgICAgICB1cmw6IHJlc3BvbnNlVVJMXG4gICAgICB9KSxcbiAgICAgIHRpdGxlOiBtZXNzYWdlLnN1cnZleS50aXRsZSxcbiAgICAgIGVsZW1lbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1Njb3JlJyxcbiAgICAgICAgICBuYW1lOiAnc2NvcmUnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgIGhpbnQ6IG1lc3NhZ2Uuc3VydmV5LnF1ZXN0aW9uc1swXSxcbiAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMTAgKG1vc3QgcmVjb21tZW5kZWQpJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICcxMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnOScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnOSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnOCcsXG4gICAgICAgICAgICAgIHZhbHVlOiAnOCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNicsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnNCcsXG4gICAgICAgICAgICAgIHZhbHVlOiAnNCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMycsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMicsXG4gICAgICAgICAgICAgIHZhbHVlOiAnMidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnMSAobGVhc3QgcmVjb21tZW5lZCknLFxuICAgICAgICAgICAgICB2YWx1ZTogJzEnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdSZWFzb24nLFxuICAgICAgICAgIG5hbWU6ICdyZWFzb24nLFxuICAgICAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgbWF4X2xlbmd0aDogNTAwLFxuICAgICAgICAgIGhpbnQ6IG1lc3NhZ2Uuc3VydmV5LnF1ZXN0aW9uc1sxXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZGlhbG9nLm9wZW4oSlNPTi5zdHJpbmdpZnkoZGlhbG9nKSwgdHJpZ2dlcklkKVxuICB9XG5cbiAgYXN5bmMgdXBsb2FkIChyZXBvcnQsIGZpbGVuYW1lLCB1c2VySUQpIHtcbiAgICBjb25zdCBpbSA9IChhd2FpdCB0aGlzLmZldGNoSU1zT2YoW3VzZXJJRF0pKVswXVxuICAgIHJldHVybiB0aGlzLl9jbGllbnQuZmlsZXMudXBsb2FkKGZpbGVuYW1lICsgJy5jc3YnLCB7XG4gICAgICBjaGFubmVsczogaW0uaWQsXG4gICAgICBjb250ZW50OiByZXBvcnRcbiAgICB9KVxuICB9XG59XG4iXX0=