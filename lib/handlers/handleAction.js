'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { answerSurvey, submitSurvey } = require('./actions');
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
        const user = new User(userID, team);
        switch (callback) {
          case 'answerSurvey':
            return answerSurvey(id, user, team, chosen, triggerID, responseURL);
          case 'submitSurvey':
            return submitSurvey(id, user, team, url, submission);
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
            showCommandButtons(team, channelID, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiYXhpb3MiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJtZXNzYWdlIiwiVGVhbSIsIlVzZXIiLCJGb3JtIiwibG9nIiwidmVyaWZ5IiwiYW5zd2VyU3VydmV5Iiwic3VibWl0U3VydmV5Iiwic2hvd0NvbW1hbmRCdXR0b25zIiwiaGFuZGxlQ29tbWFuZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZSIsInRoZW4iLCJmaWVsZHMiLCJ0ZWFtIiwiaWQiLCJ0ZWFtSUQiLCJjaGFubmVsIiwiY2hhbm5lbElEIiwidXNlciIsInVzZXJJRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2tJRCIsInRyaWdnZXJfaWQiLCJ0cmlnZ2VySUQiLCJyZXNwb25zZV91cmwiLCJyZXNwb25zZVVSTCIsImFjdGlvbnMiLCJzdWJtaXNzaW9uIiwidG9rZW4iLCJKU09OIiwicGF5bG9hZCIsImNhbGxiYWNrIiwidXJsIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwiY2hvc2VuIiwiYWN0aW9uIiwidHlwZSIsInZhbHVlIiwic2VsZWN0ZWRfb3B0aW9ucyIsIkVycm9yIiwiaW52YWxpZEFjdGlvblR5cGUiLCJvZiIsImNvbW1hbmQiLCJhcmdzIiwic3BsaXQiLCJyZXN1bHQiLCJ0ZWFtX2lkIiwidXNlcl9pZCIsInRleHQiLCJqb2luIiwicG9zdCIsImludmFsaWRBY3Rpb25DYWxsYmFjayIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLE1BQU0sRUFBRUMsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0YsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUcsVUFBVUgsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUksT0FBT0osUUFBUSxTQUFSLENBQWI7QUFD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RCxrQkFBTXJELE1BQU0wRCxJQUFOLENBQVcxQixXQUFYLEVBQXdCcUIsTUFBeEIsQ0FBTjtBQUNBekMsK0JBQW1CUSxJQUFuQixFQUF5QkksU0FBekIsRUFBb0MsS0FBcEM7QUFDQTtBQUNGO0FBQ0Usa0JBQU0sSUFBSXVCLEtBQUosQ0FBVTNDLFFBQVFvQyxLQUFSLENBQWNtQixxQkFBeEIsQ0FBTjtBQXpCSjtBQTJCRDtBQUNGLEtBOUNELE1BOENPO0FBQ0wsWUFBTSxJQUFJWixLQUFKLENBQVUzQyxRQUFRb0MsS0FBUixDQUFjb0IsYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0FoRXVCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IGFuc3dlclN1cnZleSwgc3VibWl0U3VydmV5IH0gPSByZXF1aXJlKCcuL2FjdGlvbnMnKVxuY29uc3QgeyBzaG93Q29tbWFuZEJ1dHRvbnMgfSA9IHJlcXVpcmUoJy4vZXZlbnRzJylcbmNvbnN0IGhhbmRsZUNvbW1hbmQgPSByZXF1aXJlKCcuL2hhbmRsZUNvbW1hbmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiBGb3JtLnBhcnNlKHJlcSkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICovXG4gIGNvbnN0IHtcbiAgICB0ZWFtOiB7IGlkOiB0ZWFtSUQgfSxcbiAgICBjaGFubmVsOiB7IGlkOiBjaGFubmVsSUQgfSxcbiAgICB1c2VyOiB7IGlkOiB1c2VySUQgfSxcbiAgICBjYWxsYmFja19pZDogY2FsbGJhY2tJRCxcbiAgICB0cmlnZ2VyX2lkOiB0cmlnZ2VySUQsXG4gICAgcmVzcG9uc2VfdXJsOiByZXNwb25zZVVSTCxcbiAgICBhY3Rpb25zLCBzdWJtaXNzaW9uLCB0b2tlblxuICB9ID0gbG9nKEpTT04ucGFyc2UoZmllbGRzLnBheWxvYWQpKVxuICBjb25zdCB7IGNhbGxiYWNrLCBpZCwgdXJsIH0gPSBKU09OLnBhcnNlKGNhbGxiYWNrSUQpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNob3NlblxuICAgICAgaWYgKGFjdGlvbnMpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1swXVxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdidXR0b24nKSB7XG4gICAgICAgICAgY2hvc2VuID0gYWN0aW9uLnZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgY2hvc2VuID0gYWN0aW9uLnNlbGVjdGVkX29wdGlvbnNbMF0udmFsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQWN0aW9uVHlwZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtKVxuICAgICAgc3dpdGNoIChjYWxsYmFjaykge1xuICAgICAgICBjYXNlICdhbnN3ZXJTdXJ2ZXknOlxuICAgICAgICAgIHJldHVybiBhbnN3ZXJTdXJ2ZXkoaWQsIHVzZXIsIHRlYW0sIGNob3NlbiwgdHJpZ2dlcklELCByZXNwb25zZVVSTClcbiAgICAgICAgY2FzZSAnc3VibWl0U3VydmV5JzpcbiAgICAgICAgICByZXR1cm4gc3VibWl0U3VydmV5KGlkLCB1c2VyLCB0ZWFtLCB1cmwsIHN1Ym1pc3Npb24pXG4gICAgICAgIGNhc2UgJ2lzc3VlQ29tbWFuZCc6XG4gICAgICAgICAgY29uc3QgW2NvbW1hbmQsIC4uLmFyZ3NdID0gY2hvc2VuLnNwbGl0KCcgJylcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgaGFuZGxlQ29tbWFuZCh7XG4gICAgICAgICAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgICAgICAgICB0ZXh0OiBhcmdzLmpvaW4oJyAnKSxcbiAgICAgICAgICAgIGNvbW1hbmQsXG4gICAgICAgICAgICB0b2tlblxuICAgICAgICAgIH0sIHRydWUpXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgdGV4dDogcmVzdWx0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgYXhpb3MucG9zdChyZXNwb25zZVVSTCwgcmVzdWx0KVxuICAgICAgICAgIHNob3dDb21tYW5kQnV0dG9ucyh0ZWFtLCBjaGFubmVsSUQsIGZhbHNlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZEFjdGlvbkNhbGxiYWNrKVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19