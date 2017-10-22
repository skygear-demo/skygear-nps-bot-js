'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    /* eslint-disable */
    const {
      team: { id: teamID },
      callback_id: callbackID,
      trigger_id: triggerID,
      response_url: responseURL,
      actions, submission, token
    } = log(JSON.parse(fields.payload));
    const { callback, id, url } = JSON.parse(callbackID);
    /* eslint-enable */
    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return message.error.underMaintenance;
      } else {
        let choice; // eslint-disable-line
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
            if (choice === 'Answer') {
              team.bot.openSurveyDialog(id, triggerID, responseURL);
              return;
            } else {
              return message.survey.farewellText;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlRlYW0iLCJGb3JtIiwibG9nIiwidmVyaWZ5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW0iLCJpZCIsInRlYW1JRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2tJRCIsInRyaWdnZXJfaWQiLCJ0cmlnZ2VySUQiLCJyZXNwb25zZV91cmwiLCJyZXNwb25zZVVSTCIsImFjdGlvbnMiLCJzdWJtaXNzaW9uIiwidG9rZW4iLCJKU09OIiwicGF5bG9hZCIsImNhbGxiYWNrIiwidXJsIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwiY2hvaWNlIiwiYWN0aW9uIiwidHlwZSIsInZhbHVlIiwic2VsZWN0ZWRfb3B0aW9ucyIsIkVycm9yIiwiaW52YWxpZEFjdGlvblR5cGUiLCJvZiIsImJvdCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJzdXJ2ZXkiLCJmYXJld2VsbFRleHQiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUcsSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JMLFFBQVEsU0FBUixDQUE5Qjs7QUFFQU0sT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0wsS0FBS00sS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNEOzs7QUFHQTtBQUNBLFVBQU07QUFDSkMsWUFBTSxFQUFFQyxJQUFJQyxNQUFOLEVBREY7QUFFSkMsbUJBQWFDLFVBRlQ7QUFHSkMsa0JBQVlDLFNBSFI7QUFJSkMsb0JBQWNDLFdBSlY7QUFLSkMsYUFMSSxFQUtLQyxVQUxMLEVBS2lCQztBQUxqQixRQU1GbkIsSUFBSW9CLEtBQUtmLEtBQUwsQ0FBV0UsT0FBT2MsT0FBbEIsQ0FBSixDQU5KO0FBT0EsVUFBTSxFQUFFQyxRQUFGLEVBQVliLEVBQVosRUFBZ0JjLEdBQWhCLEtBQXdCSCxLQUFLZixLQUFMLENBQVdPLFVBQVgsQ0FBOUI7QUFDQTtBQUNBLFFBQUlYLE9BQU9rQixLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSXpCLG9CQUFvQmdCLFdBQVdmLG1CQUFuQyxFQUF3RDtBQUN0RCxlQUFPRSxRQUFRMkIsS0FBUixDQUFjQyxnQkFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxNQUFKLENBREssQ0FDTTtBQUNYLFlBQUlULE9BQUosRUFBYTtBQUNYLGdCQUFNVSxTQUFTVixRQUFRLENBQVIsQ0FBZjtBQUNBLGNBQUlVLE9BQU9DLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUJGLHFCQUFTQyxPQUFPRSxLQUFoQjtBQUNELFdBRkQsTUFFTyxJQUFJRixPQUFPQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ25DRixxQkFBU0MsT0FBT0csZ0JBQVAsQ0FBd0IsQ0FBeEIsRUFBMkJELEtBQXBDO0FBQ0QsV0FGTSxNQUVBO0FBQ0wsa0JBQU0sSUFBSUUsS0FBSixDQUFVbEMsUUFBUTJCLEtBQVIsQ0FBY1EsaUJBQXhCLENBQU47QUFDRDtBQUNGOztBQUVELGNBQU14QixPQUFPLE1BQU1WLEtBQUttQyxFQUFMLENBQVF2QixNQUFSLENBQW5CO0FBQ0EsZ0JBQVFZLFFBQVI7QUFDRSxlQUFLLGNBQUw7QUFDRSxnQkFBSUksV0FBVyxRQUFmLEVBQXlCO0FBQ3ZCbEIsbUJBQUswQixHQUFMLENBQVNDLGdCQUFULENBQTBCMUIsRUFBMUIsRUFBOEJLLFNBQTlCLEVBQXlDRSxXQUF6QztBQUNBO0FBQ0QsYUFIRCxNQUdPO0FBQ0wscUJBQU9uQixRQUFRdUMsTUFBUixDQUFlQyxZQUF0QjtBQUNEO0FBQ0g7QUFDRSxrQkFBTSxJQUFJTixLQUFKLENBQVVsQyxRQUFRMkIsS0FBUixDQUFjYyxxQkFBeEIsQ0FBTjtBQVRKO0FBV0Q7QUFDRixLQTdCRCxNQTZCTztBQUNMLFlBQU0sSUFBSVAsS0FBSixDQUFVbEMsUUFBUTJCLEtBQVIsQ0FBY2UsYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0E5Q3VCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IHsgRm9ybSwgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiBGb3JtLnBhcnNlKHJlcSkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICovXG4gIC8qIGVzbGludC1kaXNhYmxlICovXG4gIGNvbnN0IHtcbiAgICB0ZWFtOiB7IGlkOiB0ZWFtSUQgfSxcbiAgICBjYWxsYmFja19pZDogY2FsbGJhY2tJRCxcbiAgICB0cmlnZ2VyX2lkOiB0cmlnZ2VySUQsXG4gICAgcmVzcG9uc2VfdXJsOiByZXNwb25zZVVSTCxcbiAgICBhY3Rpb25zLCBzdWJtaXNzaW9uLCB0b2tlblxuICB9ID0gbG9nKEpTT04ucGFyc2UoZmllbGRzLnBheWxvYWQpKVxuICBjb25zdCB7IGNhbGxiYWNrLCBpZCwgdXJsIH0gPSBKU09OLnBhcnNlKGNhbGxiYWNrSUQpXG4gIC8qIGVzbGludC1lbmFibGUgKi9cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNob2ljZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zWzBdXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24udmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24uc2VsZWN0ZWRfb3B0aW9uc1swXS52YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25UeXBlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FzZSAnYW5zd2VyU3VydmV5JzpcbiAgICAgICAgICBpZiAoY2hvaWNlID09PSAnQW5zd2VyJykge1xuICAgICAgICAgICAgdGVhbS5ib3Qub3BlblN1cnZleURpYWxvZyhpZCwgdHJpZ2dlcklELCByZXNwb25zZVVSTClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5zdXJ2ZXkuZmFyZXdlbGxUZXh0XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25DYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufSlcbiJdfQ==