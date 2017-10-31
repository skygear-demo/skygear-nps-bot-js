'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const { Form, log, verify } = require('../util');
const { answerSurvey, submitSurvey } = require('./actions');
const { listTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands');
const { showCommandButtons } = require('./events');

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
            switch (command) {
              case '/nps-list-targets':
                axios.post(responseURL, {
                  text: yield listTargets(team)
                });
                break;
              case '/nps-stop-survey':
                axios.post(responseURL, {
                  text: yield stopSurvey(team)
                });
                break;
              case '/nps-send-reminder':
                axios.post(responseURL, {
                  text: yield sendReminder(team)
                });
                break;
              case '/nps-status':
                axios.post(responseURL, (yield status(team)));
                break;
              case '/nps-generate-report':
                axios.post(responseURL, {
                  text: yield generateReport(team, userID, args)
                });
                break;
              case '/nps-help':
                axios.post(responseURL, {
                  text: message.help
                });
                break;
              default:
                throw new Error(message.error.invalidCommand);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJtZXNzYWdlIiwiVGVhbSIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJhbnN3ZXJTdXJ2ZXkiLCJzdWJtaXRTdXJ2ZXkiLCJsaXN0VGFyZ2V0cyIsInN0b3BTdXJ2ZXkiLCJzZW5kUmVtaW5kZXIiLCJzdGF0dXMiLCJnZW5lcmF0ZVJlcG9ydCIsInNob3dDb21tYW5kQnV0dG9ucyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZSIsInRoZW4iLCJmaWVsZHMiLCJ0ZWFtIiwiaWQiLCJ0ZWFtSUQiLCJjaGFubmVsIiwiY2hhbm5lbElEIiwidXNlciIsInVzZXJJRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2tJRCIsInRyaWdnZXJfaWQiLCJ0cmlnZ2VySUQiLCJyZXNwb25zZV91cmwiLCJyZXNwb25zZVVSTCIsImFjdGlvbnMiLCJzdWJtaXNzaW9uIiwidG9rZW4iLCJKU09OIiwicGF5bG9hZCIsImNhbGxiYWNrIiwidXJsIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwiY2hvc2VuIiwiYWN0aW9uIiwidHlwZSIsInZhbHVlIiwic2VsZWN0ZWRfb3B0aW9ucyIsIkVycm9yIiwiaW52YWxpZEFjdGlvblR5cGUiLCJvZiIsImNvbW1hbmQiLCJhcmdzIiwic3BsaXQiLCJwb3N0IiwidGV4dCIsImhlbHAiLCJpbnZhbGlkQ29tbWFuZCIsImludmFsaWRBY3Rpb25DYWxsYmFjayIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU0sRUFBRUMsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0YsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUcsVUFBVUgsUUFBUSxZQUFSLENBQWhCO0FB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QUFXckIsV0FBWCxFQUF3QjtBQUN0QnNCLHdCQUFNLE1BQU01QyxhQUFhVSxJQUFiO0FBRFUsaUJBQXhCO0FBR0E7QUFDRixtQkFBSyxhQUFMO0FBQ0V2QixzQkFBTXdELElBQU4sQ0FBV3JCLFdBQVgsR0FBd0IsTUFBTXJCLE9BQU9TLElBQVAsQ0FBOUI7QUFDQTtBQUNGLG1CQUFLLHNCQUFMO0FBQ0V2QixzQkFBTXdELElBQU4sQ0FBV3JCLFdBQVgsRUFBd0I7QUFDdEJzQix3QkFBTSxNQUFNMUMsZUFBZVEsSUFBZixFQUFxQk0sTUFBckIsRUFBNkJ5QixJQUE3QjtBQURVLGlCQUF4QjtBQUdBO0FBQ0YsbUJBQUssV0FBTDtBQUNFdEQsc0JBQU13RCxJQUFOLENBQVdyQixXQUFYLEVBQXdCO0FBQ3RCc0Isd0JBQU1yRCxRQUFRc0Q7QUFEUSxpQkFBeEI7QUFHQTtBQUNGO0FBQ0Usc0JBQU0sSUFBSVIsS0FBSixDQUFVOUMsUUFBUXVDLEtBQVIsQ0FBY2dCLGNBQXhCLENBQU47QUE5Qko7QUFnQ0EzQywrQkFBbUJPLElBQW5CLEVBQXlCSSxTQUF6QjtBQUNBO0FBQ0Y7QUFDRSxrQkFBTSxJQUFJdUIsS0FBSixDQUFVOUMsUUFBUXVDLEtBQVIsQ0FBY2lCLHFCQUF4QixDQUFOO0FBMUNKO0FBNENEO0FBQ0YsS0E5REQsTUE4RE87QUFDTCxZQUFNLElBQUlWLEtBQUosQ0FBVTlDLFFBQVF1QyxLQUFSLENBQWNrQixhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQWhGdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEIiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpXG5jb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgYW5zd2VyU3VydmV5LCBzdWJtaXRTdXJ2ZXkgfSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpXG5jb25zdCB7IGxpc3RUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIsIHN0YXR1cywgZ2VuZXJhdGVSZXBvcnQgfSA9IHJlcXVpcmUoJy4vY29tbWFuZHMnKVxuY29uc3QgeyBzaG93Q29tbWFuZEJ1dHRvbnMgfSA9IHJlcXVpcmUoJy4vZXZlbnRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4gRm9ybS5wYXJzZShyZXEpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2RvY3MvbWVzc2FnZS1idXR0b25zXG4gICAqL1xuICBjb25zdCB7XG4gICAgdGVhbTogeyBpZDogdGVhbUlEIH0sXG4gICAgY2hhbm5lbDogeyBpZDogY2hhbm5lbElEIH0sXG4gICAgdXNlcjogeyBpZDogdXNlcklEIH0sXG4gICAgY2FsbGJhY2tfaWQ6IGNhbGxiYWNrSUQsXG4gICAgdHJpZ2dlcl9pZDogdHJpZ2dlcklELFxuICAgIHJlc3BvbnNlX3VybDogcmVzcG9uc2VVUkwsXG4gICAgYWN0aW9ucywgc3VibWlzc2lvbiwgdG9rZW5cbiAgfSA9IGxvZyhKU09OLnBhcnNlKGZpZWxkcy5wYXlsb2FkKSlcbiAgY29uc3QgeyBjYWxsYmFjaywgaWQsIHVybCB9ID0gSlNPTi5wYXJzZShjYWxsYmFja0lEKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjaG9zZW5cbiAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGFjdGlvbnNbMF1cbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICAgIGNob3NlbiA9IGFjdGlvbi52YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgIGNob3NlbiA9IGFjdGlvbi5zZWxlY3RlZF9vcHRpb25zWzBdLnZhbHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZEFjdGlvblR5cGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgc3dpdGNoIChjYWxsYmFjaykge1xuICAgICAgICBjYXNlICdhbnN3ZXJTdXJ2ZXknOlxuICAgICAgICAgIHJldHVybiBhbnN3ZXJTdXJ2ZXkoaWQsIHVzZXJJRCwgdGVhbSwgY2hvc2VuLCB0cmlnZ2VySUQsIHJlc3BvbnNlVVJMKVxuICAgICAgICBjYXNlICdzdWJtaXRTdXJ2ZXknOlxuICAgICAgICAgIHJldHVybiBzdWJtaXRTdXJ2ZXkoaWQsIHVzZXJJRCwgdXJsLCBzdWJtaXNzaW9uKVxuICAgICAgICBjYXNlICdpc3N1ZUNvbW1hbmQnOlxuICAgICAgICAgIGNvbnN0IFtjb21tYW5kLCAuLi5hcmdzXSA9IGNob3Nlbi5zcGxpdCgnICcpXG4gICAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgICBjYXNlICcvbnBzLWxpc3QtdGFyZ2V0cyc6XG4gICAgICAgICAgICAgIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBhd2FpdCBsaXN0VGFyZ2V0cyh0ZWFtKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnL25wcy1zdG9wLXN1cnZleSc6XG4gICAgICAgICAgICAgIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBhd2FpdCBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcvbnBzLXNlbmQtcmVtaW5kZXInOlxuICAgICAgICAgICAgICBheGlvcy5wb3N0KHJlc3BvbnNlVVJMLCB7XG4gICAgICAgICAgICAgICAgdGV4dDogYXdhaXQgc2VuZFJlbWluZGVyKHRlYW0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICcvbnBzLXN0YXR1cyc6XG4gICAgICAgICAgICAgIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIGF3YWl0IHN0YXR1cyh0ZWFtKSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtZ2VuZXJhdGUtcmVwb3J0JzpcbiAgICAgICAgICAgICAgYXhpb3MucG9zdChyZXNwb25zZVVSTCwge1xuICAgICAgICAgICAgICAgIHRleHQ6IGF3YWl0IGdlbmVyYXRlUmVwb3J0KHRlYW0sIHVzZXJJRCwgYXJncylcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtaGVscCc6XG4gICAgICAgICAgICAgIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtZXNzYWdlLmhlbHBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93Q29tbWFuZEJ1dHRvbnModGVhbSwgY2hhbm5lbElEKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZEFjdGlvbkNhbGxiYWNrKVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19