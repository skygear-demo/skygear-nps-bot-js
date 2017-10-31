'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');
const { answerSurvey, submitSurvey } = require('./actions');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    const {
      team: { id: teamID },
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
            switch (command) {
              case '/nps-schedule-survey':
                return scheduleSurvey(team, args);
              case '/nps-list-targets':
                return listTargets(team);
              case '/nps-add-targets':
                return addTargets(team, args);
              case '/nps-remove-targets':
                return removeTargets(team, args);
              case '/nps-stop-survey':
                return stopSurvey(team);
              case '/nps-send-reminder':
                return sendReminder(team);
              case '/nps-status':
                return status(team);
              case '/nps-generate-report':
                return generateReport(team, userID, args);
              case '/nps-help':
                return message.help;
              default:
                throw new Error(message.error.invalidCommand);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlRlYW0iLCJGb3JtIiwibG9nIiwidmVyaWZ5IiwiYW5zd2VyU3VydmV5Iiwic3VibWl0U3VydmV5Iiwic2NoZWR1bGVTdXJ2ZXkiLCJsaXN0VGFyZ2V0cyIsImFkZFRhcmdldHMiLCJyZW1vdmVUYXJnZXRzIiwic3RvcFN1cnZleSIsInNlbmRSZW1pbmRlciIsInN0YXR1cyIsImdlbmVyYXRlUmVwb3J0IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW0iLCJpZCIsInRlYW1JRCIsInVzZXIiLCJ1c2VySUQiLCJjYWxsYmFja19pZCIsImNhbGxiYWNrSUQiLCJ0cmlnZ2VyX2lkIiwidHJpZ2dlcklEIiwicmVzcG9uc2VfdXJsIiwicmVzcG9uc2VVUkwiLCJhY3Rpb25zIiwic3VibWlzc2lvbiIsInRva2VuIiwiSlNPTiIsInBheWxvYWQiLCJjYWxsYmFjayIsInVybCIsImVycm9yIiwidW5kZXJNYWludGVuYW5jZSIsImNob3NlbiIsImFjdGlvbiIsInR5cGUiLCJ2YWx1ZSIsInNlbGVjdGVkX29wdGlvbnMiLCJFcnJvciIsImludmFsaWRBY3Rpb25UeXBlIiwib2YiLCJjb21tYW5kIiwiYXJncyIsInNwbGl0IiwiaGVscCIsImludmFsaWRDb21tYW5kIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVHLElBQUYs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QUNFLHVCQUFPUixPQUFPUSxJQUFQLENBQVA7QUFDRixtQkFBSyxzQkFBTDtBQUNFLHVCQUFPUCxlQUFlTyxJQUFmLEVBQXFCSSxNQUFyQixFQUE2QnlCLElBQTdCLENBQVA7QUFDRixtQkFBSyxXQUFMO0FBQ0UsdUJBQU9sRCxRQUFRb0QsSUFBZjtBQUNGO0FBQ0Usc0JBQU0sSUFBSU4sS0FBSixDQUFVOUMsUUFBUXVDLEtBQVIsQ0FBY2MsY0FBeEIsQ0FBTjtBQXBCSjtBQXNCRjtBQUNFLGtCQUFNLElBQUlQLEtBQUosQ0FBVTlDLFFBQVF1QyxLQUFSLENBQWNlLHFCQUF4QixDQUFOO0FBOUJKO0FBZ0NEO0FBQ0YsS0FsREQsTUFrRE87QUFDTCxZQUFNLElBQUlSLEtBQUosQ0FBVTlDLFFBQVF1QyxLQUFSLENBQWNnQixhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQW5FdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEIiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IGFuc3dlclN1cnZleSwgc3VibWl0U3VydmV5IH0gPSByZXF1aXJlKCcuL2FjdGlvbnMnKVxuY29uc3QgeyBzY2hlZHVsZVN1cnZleSwgbGlzdFRhcmdldHMsIGFkZFRhcmdldHMsIHJlbW92ZVRhcmdldHMsIHN0b3BTdXJ2ZXksIHNlbmRSZW1pbmRlciwgc3RhdHVzLCBnZW5lcmF0ZVJlcG9ydCB9ID0gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL21lc3NhZ2UtYnV0dG9uc1xuICAgKi9cbiAgY29uc3Qge1xuICAgIHRlYW06IHsgaWQ6IHRlYW1JRCB9LFxuICAgIHVzZXI6IHsgaWQ6IHVzZXJJRCB9LFxuICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFja0lELFxuICAgIHRyaWdnZXJfaWQ6IHRyaWdnZXJJRCxcbiAgICByZXNwb25zZV91cmw6IHJlc3BvbnNlVVJMLFxuICAgIGFjdGlvbnMsIHN1Ym1pc3Npb24sIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShmaWVsZHMucGF5bG9hZCkpXG4gIGNvbnN0IHsgY2FsbGJhY2ssIGlkLCB1cmwgfSA9IEpTT04ucGFyc2UoY2FsbGJhY2tJRClcblxuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hvc2VuXG4gICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zWzBdXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICBjaG9zZW4gPSBhY3Rpb24udmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICBjaG9zZW4gPSBhY3Rpb24uc2VsZWN0ZWRfb3B0aW9uc1swXS52YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25UeXBlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FzZSAnYW5zd2VyU3VydmV5JzpcbiAgICAgICAgICByZXR1cm4gYW5zd2VyU3VydmV5KGlkLCB1c2VySUQsIHRlYW0sIGNob3NlbiwgdHJpZ2dlcklELCByZXNwb25zZVVSTClcbiAgICAgICAgY2FzZSAnc3VibWl0U3VydmV5JzpcbiAgICAgICAgICByZXR1cm4gc3VibWl0U3VydmV5KGlkLCB1c2VySUQsIHVybCwgc3VibWlzc2lvbilcbiAgICAgICAgY2FzZSAnaXNzdWVDb21tYW5kJzpcbiAgICAgICAgICBjb25zdCBbY29tbWFuZCwgLi4uYXJnc10gPSBjaG9zZW4uc3BsaXQoJyAnKVxuICAgICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbSwgYXJncylcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtbGlzdC10YXJnZXRzJzpcbiAgICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgICBjYXNlICcvbnBzLWFkZC10YXJnZXRzJzpcbiAgICAgICAgICAgICAgcmV0dXJuIGFkZFRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgICAgY2FzZSAnL25wcy1zdG9wLXN1cnZleSc6XG4gICAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgICBjYXNlICcvbnBzLXNlbmQtcmVtaW5kZXInOlxuICAgICAgICAgICAgICByZXR1cm4gc2VuZFJlbWluZGVyKHRlYW0pXG4gICAgICAgICAgICBjYXNlICcvbnBzLXN0YXR1cyc6XG4gICAgICAgICAgICAgIHJldHVybiBzdGF0dXModGVhbSlcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtZ2VuZXJhdGUtcmVwb3J0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUmVwb3J0KHRlYW0sIHVzZXJJRCwgYXJncylcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtaGVscCc6XG4gICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLmhlbHBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=