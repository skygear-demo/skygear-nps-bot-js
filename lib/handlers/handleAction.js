'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');
const { answerSurvey, submitSurvey } = require('./actions');

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
        let choice;
        if (actions) {
          const action = actions[0];
          if (action.type === 'button') {
            choice = action.value;
          } else if (action.type === 'select') {
            choice = action.selected_options[0].value;
          } else {
            throw new Error(message.error.invalidActionType);
          }
        }

        const team = yield Team.of(teamID);
        switch (callback) {
          case 'answerSurvey':
            return answerSurvey(id, userID, team, choice, triggerID, responseURL);
          case 'submitSurvey':
            return submitSurvey(id, userID, url, submission);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlRlYW0iLCJGb3JtIiwibG9nIiwidmVyaWZ5IiwiYW5zd2VyU3VydmV5Iiwic3VibWl0U3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW0iLCJpZCIsInRlYW1JRCIsInVzZXIiLCJ1c2VySUQiLCJjYWxsYmFja19pZCIsImNhbGxiYWNrSUQiLCJ0cmlnZ2VyX2lkIiwidHJpZ2dlcklEIiwicmVzcG9uc2VfdXJsIiwicmVzcG9uc2VVUkwiLCJhY3Rpb25zIiwic3VibWlzc2lvbiIsInRva2VuIiwiSlNPTiIsInBheWxvYWQiLCJjYWxsYmFjayIsInVybCIsImVycm9yIiwidW5kZXJNYWludGVuYW5jZSIsImNob2ljZSIsImFjdGlvbiIsInR5cGUiLCJ2YWx1ZSIsInNlbGVjdGVkX29wdGlvbnMiLCJFcnJvciIsImludmFsaWRBY3Rpb25UeXBlIiwib2YiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUcsSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JMLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU0sWUFBRixFQUFnQkMsWUFBaEIsS0FBaUNQLFFBQVEsV0FBUixDQUF2Qzs7QUFFQVEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT1AsS0FBS1EsS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNEOzs7QUFHQSxVQUFNO0FBQ0pDLFlBQU0sRUFBRUMsSUFBSUMsTUFBTixFQURGO0FBRUpDLFlBQU0sRUFBRUYsSUFBSUcsTUFBTixFQUZGO0FBR0pDLG1CQUFhQyxVQUhUO0FBSUpDLGtCQUFZQyxTQUpSO0FBS0pDLG9CQUFjQyxXQUxWO0FBTUpDLGFBTkksRUFNS0MsVUFOTCxFQU1pQkM7QUFOakIsUUFPRnZCLElBQUl3QixLQUFLakIsS0FBTCxDQUFXRSxPQUFPZ0IsT0FBbEIsQ0FBSixDQVBKO0FBUUEsVUFBTSxFQUFFQyxRQUFGLEVBQVlmLEVBQVosRUFBZ0JnQixHQUFoQixLQUF3QkgsS0FBS2pCLEtBQUwsQ0FBV1MsVUFBWCxDQUE5Qjs7QUFFQSxRQUFJZixPQUFPc0IsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFVBQUk3QixvQkFBb0JrQixXQUFXakIsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVErQixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlDLE1BQUo7QUFDQSxZQUFJVCxPQUFKLEVBQWE7QUFDWCxnQkFBTVUsU0FBU1YsUUFBUSxDQUFSLENBQWY7QUFDQSxjQUFJVSxPQUFPQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCRixxQkFBU0MsT0FBT0UsS0FBaEI7QUFDRCxXQUZELE1BRU8sSUFBSUYsT0FBT0MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUNuQ0YscUJBQVNDLE9BQU9HLGdCQUFQLENBQXdCLENBQXhCLEVBQTJCRCxLQUFwQztBQUNELFdBRk0sTUFFQTtBQUNMLGtCQUFNLElBQUlFLEtBQUosQ0FBVXRDLFFBQVErQixLQUFSLENBQWNRLGlCQUF4QixDQUFOO0FBQ0Q7QUFDRjs7QUFFRCxjQUFNMUIsT0FBTyxNQUFNWixLQUFLdUMsRUFBTCxDQUFRekIsTUFBUixDQUFuQjtBQUNBLGdCQUFRYyxRQUFSO0FBQ0UsZUFBSyxjQUFMO0FBQ0UsbUJBQU94QixhQUFhUyxFQUFiLEVBQWlCRyxNQUFqQixFQUF5QkosSUFBekIsRUFBK0JvQixNQUEvQixFQUF1Q1osU0FBdkMsRUFBa0RFLFdBQWxELENBQVA7QUFDRixlQUFLLGNBQUw7QUFDRSxtQkFBT2pCLGFBQWFRLEVBQWIsRUFBaUJHLE1BQWpCLEVBQXlCYSxHQUF6QixFQUE4QkwsVUFBOUIsQ0FBUDtBQUNGO0FBQ0Usa0JBQU0sSUFBSWEsS0FBSixDQUFVdEMsUUFBUStCLEtBQVIsQ0FBY1UscUJBQXhCLENBQU47QUFOSjtBQVFEO0FBQ0YsS0ExQkQsTUEwQk87QUFDTCxZQUFNLElBQUlILEtBQUosQ0FBVXRDLFFBQVErQixLQUFSLENBQWNXLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBM0N1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgYW5zd2VyU3VydmV5LCBzdWJtaXRTdXJ2ZXkgfSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL21lc3NhZ2UtYnV0dG9uc1xuICAgKi9cbiAgY29uc3Qge1xuICAgIHRlYW06IHsgaWQ6IHRlYW1JRCB9LFxuICAgIHVzZXI6IHsgaWQ6IHVzZXJJRCB9LFxuICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFja0lELFxuICAgIHRyaWdnZXJfaWQ6IHRyaWdnZXJJRCxcbiAgICByZXNwb25zZV91cmw6IHJlc3BvbnNlVVJMLFxuICAgIGFjdGlvbnMsIHN1Ym1pc3Npb24sIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShmaWVsZHMucGF5bG9hZCkpXG4gIGNvbnN0IHsgY2FsbGJhY2ssIGlkLCB1cmwgfSA9IEpTT04ucGFyc2UoY2FsbGJhY2tJRClcblxuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hvaWNlXG4gICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zWzBdXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24udmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24uc2VsZWN0ZWRfb3B0aW9uc1swXS52YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25UeXBlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FzZSAnYW5zd2VyU3VydmV5JzpcbiAgICAgICAgICByZXR1cm4gYW5zd2VyU3VydmV5KGlkLCB1c2VySUQsIHRlYW0sIGNob2ljZSwgdHJpZ2dlcklELCByZXNwb25zZVVSTClcbiAgICAgICAgY2FzZSAnc3VibWl0U3VydmV5JzpcbiAgICAgICAgICByZXR1cm4gc3VibWl0U3VydmV5KGlkLCB1c2VySUQsIHVybCwgc3VibWlzc2lvbilcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=