'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');
const { answerSurvey, submitSurvey } = require('./actions');
// const { listTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands')
const { showCommandButtons } = require('./events');
const handleCommand = require('./handleCommand');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    const {
      team: { id: teamID },
      channel: { id: channelID },
      user: { id: userID },
      callback_id: callbackID,
      trigger_id: triggerID,
      response_url: responseURL,
      actions, submission, token
    } = log(JSON.parse(fields.payload));
    const { callback, id, url } = JSON.parse(callbackID);

    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return message.error.underMaintenance;
      } else {
        let chosen;
        if (actions) {
          const action = actions[0];
          if (action.type === 'button') {
            chosen = action.value;
          } else if (action.type === 'select') {
            chosen = action.selected_options[0].value;
          } else {
            throw new Error(message.error.invalidActionType);
          }
        }

        const team = yield Team.of(teamID);
        switch (callback) {
          case 'answerSurvey':
            return answerSurvey(id, userID, team, chosen, triggerID, responseURL);
          case 'submitSurvey':
            return submitSurvey(id, userID, url, submission);
          case 'issueCommand':
            const [command, ...args] = chosen.split(' ');
            let result = yield handleCommand({
              team_id: teamID,
              user_id: userID,
              text: args.join(' '),
              command,
              token
            }, true);

            if (typeof result === 'string') {
              result = {
                text: result
              };
            }

            yield axios.post(responseURL, result);
            showCommandButtons(team, channelID);
            break;
          default:
            throw new Error(message.error.invalidActionCallback);
        }
      }
    } else {
      throw new Error(message.error.invalidSource);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJtZXNzYWdlIiwiVGVhbSIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJhbnN3ZXJTdXJ2ZXkiLCJzdWJtaXRTdXJ2ZXkiLCJzaG93Q29tbWFuZEJ1dHRvbnMiLCJoYW5kbGVDb21tYW5kIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW0iLCJpZCIsInRlYW1JRCIsImNoYW5uZWwiLCJjaGFubmVsSUQiLCJ1c2VyIiwidXNlcklEIiwiY2FsbGJhY2tfaWQiLCJjYWxsYmFja0lEIiwidHJpZ2dlcl9pZCIsInRyaWdnZXJJRCIsInJlc3BvbnNlX3VybCIsInJlc3BvbnNlVVJMIiwiYWN0aW9ucyIsInN1Ym1pc3Npb24iLCJ0b2tlbiIsIkpTT04iLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJ1cmwiLCJlcnJvciIsInVuZGVyTWFpbnRlbmFuY2UiLCJjaG9zZW4iLCJhY3Rpb24iLCJ0eXBlIiwidmFsdWUiLCJzZWxlY3RlZF9vcHRpb25zIiwiRXJyb3IiLCJpbnZhbGlkQWN0aW9uVHlwZSIsIm9mIiwiY29tbWFuZCIsImFyZ3MiLCJzcGxpdCIsInJlc3VsdCIsInRlYW1faWQiLCJ1c2VyX2lkIiwidGV4dCIsImpvaW4iLCJwb3N0IiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0FBQ0EsTUFBTSxFQUFFQyxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDRixRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNRyxVQUFVSCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNSSxPQUFPSixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0s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TSxJQUFJdUIsS0FBSixDQUFVMUMsUUFBUW1DLEtBQVIsQ0FBY21CLHFCQUF4QixDQUFOO0FBekJKO0FBMkJEO0FBQ0YsS0E3Q0QsTUE2Q087QUFDTCxZQUFNLElBQUlaLEtBQUosQ0FBVTFDLFFBQVFtQyxLQUFSLENBQWNvQixhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQS9EdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEIiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpXG5jb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgYW5zd2VyU3VydmV5LCBzdWJtaXRTdXJ2ZXkgfSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpXG4vLyBjb25zdCB7IGxpc3RUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIsIHN0YXR1cywgZ2VuZXJhdGVSZXBvcnQgfSA9IHJlcXVpcmUoJy4vY29tbWFuZHMnKVxuY29uc3QgeyBzaG93Q29tbWFuZEJ1dHRvbnMgfSA9IHJlcXVpcmUoJy4vZXZlbnRzJylcbmNvbnN0IGhhbmRsZUNvbW1hbmQgPSByZXF1aXJlKCcuL2hhbmRsZUNvbW1hbmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiBGb3JtLnBhcnNlKHJlcSkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICovXG4gIGNvbnN0IHtcbiAgICB0ZWFtOiB7IGlkOiB0ZWFtSUQgfSxcbiAgICBjaGFubmVsOiB7IGlkOiBjaGFubmVsSUQgfSxcbiAgICB1c2VyOiB7IGlkOiB1c2VySUQgfSxcbiAgICBjYWxsYmFja19pZDogY2FsbGJhY2tJRCxcbiAgICB0cmlnZ2VyX2lkOiB0cmlnZ2VySUQsXG4gICAgcmVzcG9uc2VfdXJsOiByZXNwb25zZVVSTCxcbiAgICBhY3Rpb25zLCBzdWJtaXNzaW9uLCB0b2tlblxuICB9ID0gbG9nKEpTT04ucGFyc2UoZmllbGRzLnBheWxvYWQpKVxuICBjb25zdCB7IGNhbGxiYWNrLCBpZCwgdXJsIH0gPSBKU09OLnBhcnNlKGNhbGxiYWNrSUQpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNob3NlblxuICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1swXVxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdidXR0b24nKSB7XG4gICAgICAgICAgY2hvc2VuID0gYWN0aW9uLnZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgY2hvc2VuID0gYWN0aW9uLnNlbGVjdGVkX29wdGlvbnNbMF0udmFsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uVHlwZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gICAgICBzd2l0Y2ggKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhc2UgJ2Fuc3dlclN1cnZleSc6XG4gICAgICAgICAgcmV0dXJuIGFuc3dlclN1cnZleShpZCwgdXNlcklELCB0ZWFtLCBjaG9zZW4sIHRyaWdnZXJJRCwgcmVzcG9uc2VVUkwpXG4gICAgICAgIGNhc2UgJ3N1Ym1pdFN1cnZleSc6XG4gICAgICAgICAgcmV0dXJuIHN1Ym1pdFN1cnZleShpZCwgdXNlcklELCB1cmwsIHN1Ym1pc3Npb24pXG4gICAgICAgIGNhc2UgJ2lzc3VlQ29tbWFuZCc6XG4gICAgICAgICAgY29uc3QgW2NvbW1hbmQsIC4uLmFyZ3NdID0gY2hvc2VuLnNwbGl0KCcgJylcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgaGFuZGxlQ29tbWFuZCh7XG4gICAgICAgICAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgICAgICAgICB0ZXh0OiBhcmdzLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICB0b2tlblxuICAgICAgICAgIH0sIHRydWUpXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgdGV4dDogcmVzdWx0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgYXhpb3MucG9zdChyZXNwb25zZVVSTCwgcmVzdWx0KVxuICAgICAgICAgIHNob3dDb21tYW5kQnV0dG9ucyh0ZWFtLCBjaGFubmVsSUQpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=