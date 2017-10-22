'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');
const { submitSurvey } = require('./actions');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    const {
      team: { id: teamID },
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
            if (choice === 'Answer') {
              team.bot.openSurveyDialog(id, triggerID, responseURL);
              return;
            } else {
              return message.survey.farewellText;
            }
          case 'submitSurvey':
            return submitSurvey(id, url, submission);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlRlYW0iLCJGb3JtIiwibG9nIiwidmVyaWZ5Iiwic3VibWl0U3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW0iLCJpZCIsInRlYW1JRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2tJRCIsInRyaWdnZXJfaWQiLCJ0cmlnZ2VySUQiLCJyZXNwb25zZV91cmwiLCJyZXNwb25zZVVSTCIsImFjdGlvbnMiLCJzdWJtaXNzaW9uIiwidG9rZW4iLCJKU09OIiwicGF5bG9hZCIsImNhbGxiYWNrIiwidXJsIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwiY2hvaWNlIiwiYWN0aW9uIiwidHlwZSIsInZhbHVlIiwic2VsZWN0ZWRfb3B0aW9ucyIsIkVycm9yIiwiaW52YWxpZEFjdGlvblR5cGUiLCJvZiIsImJvdCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJzdXJ2ZXkiLCJmYXJld2VsbFRleHQiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUcsSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JMLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU0sWUFBRixLQUFtQk4sUUFBUSxXQUFSLENBQXpCOztBQUVBTyxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPTixLQUFLTyxLQUFMLENBQVdELEdBQVgsRUFBZ0JFLElBQWhCO0FBQUEsK0JBQXFCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDM0Q7OztBQUdBLFVBQU07QUFDSkMsWUFBTSxFQUFFQyxJQUFJQyxNQUFOLEVBREY7QUFFSkMsbUJBQWFDLFVBRlQ7QUFHSkMsa0JBQVlDLFNBSFI7QUFJSkMsb0JBQWNDLFdBSlY7QUFLSkMsYUFMSSxFQUtLQyxVQUxMLEVBS2lCQztBQUxqQixRQU1GcEIsSUFBSXFCLEtBQUtmLEtBQUwsQ0FBV0UsT0FBT2MsT0FBbEIsQ0FBSixDQU5KO0FBT0EsVUFBTSxFQUFFQyxRQUFGLEVBQVliLEVBQVosRUFBZ0JjLEdBQWhCLEtBQXdCSCxLQUFLZixLQUFMLENBQVdPLFVBQVgsQ0FBOUI7O0FBRUEsUUFBSVosT0FBT21CLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixVQUFJMUIsb0JBQW9CaUIsV0FBV2hCLG1CQUFuQyxFQUF3RDtBQUN0RCxlQUFPRSxRQUFRNEIsS0FBUixDQUFjQyxnQkFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxNQUFKO0FBQ0EsWUFBSVQsT0FBSixFQUFhO0FBQ1gsZ0JBQU1VLFNBQVNWLFFBQVEsQ0FBUixDQUFmO0FBQ0EsY0FBSVUsT0FBT0MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkYscUJBQVNDLE9BQU9FLEtBQWhCO0FBQ0QsV0FGRCxNQUVPLElBQUlGLE9BQU9DLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkNGLHFCQUFTQyxPQUFPRyxnQkFBUCxDQUF3QixDQUF4QixFQUEyQkQsS0FBcEM7QUFDRCxXQUZNLE1BRUE7QUFDTCxrQkFBTSxJQUFJRSxLQUFKLENBQVVuQyxRQUFRNEIsS0FBUixDQUFjUSxpQkFBeEIsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsY0FBTXhCLE9BQU8sTUFBTVgsS0FBS29DLEVBQUwsQ0FBUXZCLE1BQVIsQ0FBbkI7QUFDQSxnQkFBUVksUUFBUjtBQUNFLGVBQUssY0FBTDtBQUNFLGdCQUFJSSxXQUFXLFFBQWYsRUFBeUI7QUFDdkJsQixtQkFBSzBCLEdBQUwsQ0FBU0MsZ0JBQVQsQ0FBMEIxQixFQUExQixFQUE4QkssU0FBOUIsRUFBeUNFLFdBQXpDO0FBQ0E7QUFDRCxhQUhELE1BR087QUFDTCxxQkFBT3BCLFFBQVF3QyxNQUFSLENBQWVDLFlBQXRCO0FBQ0Q7QUFDSCxlQUFLLGNBQUw7QUFDRSxtQkFBT3BDLGFBQWFRLEVBQWIsRUFBaUJjLEdBQWpCLEVBQXNCTCxVQUF0QixDQUFQO0FBQ0Y7QUFDRSxrQkFBTSxJQUFJYSxLQUFKLENBQVVuQyxRQUFRNEIsS0FBUixDQUFjYyxxQkFBeEIsQ0FBTjtBQVhKO0FBYUQ7QUFDRixLQS9CRCxNQStCTztBQUNMLFlBQU0sSUFBSVAsS0FBSixDQUFVbkMsUUFBUTRCLEtBQVIsQ0FBY2UsYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0EvQ3VCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IHsgRm9ybSwgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyBzdWJtaXRTdXJ2ZXkgfSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL21lc3NhZ2UtYnV0dG9uc1xuICAgKi9cbiAgY29uc3Qge1xuICAgIHRlYW06IHsgaWQ6IHRlYW1JRCB9LFxuICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFja0lELFxuICAgIHRyaWdnZXJfaWQ6IHRyaWdnZXJJRCxcbiAgICByZXNwb25zZV91cmw6IHJlc3BvbnNlVVJMLFxuICAgIGFjdGlvbnMsIHN1Ym1pc3Npb24sIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShmaWVsZHMucGF5bG9hZCkpXG4gIGNvbnN0IHsgY2FsbGJhY2ssIGlkLCB1cmwgfSA9IEpTT04ucGFyc2UoY2FsbGJhY2tJRClcblxuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hvaWNlXG4gICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBhY3Rpb25zWzBdXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gJ2J1dHRvbicpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24udmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICBjaG9pY2UgPSBhY3Rpb24uc2VsZWN0ZWRfb3B0aW9uc1swXS52YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25UeXBlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FzZSAnYW5zd2VyU3VydmV5JzpcbiAgICAgICAgICBpZiAoY2hvaWNlID09PSAnQW5zd2VyJykge1xuICAgICAgICAgICAgdGVhbS5ib3Qub3BlblN1cnZleURpYWxvZyhpZCwgdHJpZ2dlcklELCByZXNwb25zZVVSTClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5zdXJ2ZXkuZmFyZXdlbGxUZXh0XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdzdWJtaXRTdXJ2ZXknOlxuICAgICAgICAgIHJldHVybiBzdWJtaXRTdXJ2ZXkoaWQsIHVybCwgc3VibWlzc2lvbilcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uQ2FsbGJhY2spXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=