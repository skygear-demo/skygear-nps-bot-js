'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    const {
      team_id: teamID,
      user_id: userID,
      command, text, token
    } = log(fields);

    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return message.error.underMaintenance;
      } else {
        const team = yield Team.of(teamID);
        const user = new User(userID, team);
        if (yield user.isAdmin) {
          const args = text ? text.split(' ') : [];
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
              return generateReport(team, args);
            default:
              throw new Error(message.error.invalidCommand);
          }
        } else {
          return message.error.notAdmin;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwiZ2VuZXJhdGVSZXBvcnQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2UiLCJ0aGVuIiwiZmllbGRzIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJFcnJvciIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSSxJQUFGLEVBQVFDLEdBQVIsRUFBYUMsTUFBYixLQUF3Qk4sUUFBUSxTQUFSLENBQTlCO0FBQ0EsTUFBTSxFQUFFTyxjQUFGLEVBQWtCQyxXQUFsQixFQUErQkMsVUFBL0IsRUFBMkNDLGFBQTNDLEVBQTBEQyxVQUExRCxFQUFzRUMsWUFBdEUsRUFBb0ZDLE1BQXBGLEVBQTRGQyxjQUE1RixLQUErR2QsUUFBUSxZQUFSLENBQXJIOztBQUVBZSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPYixLQUFLYyxLQUFMLENBQVdELEdBQVgsRUFBZ0JFLElBQWhCO0FBQUEsK0JBQXFCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDM0QsVUFBTTtBQUNKQyxlQUFTQyxNQURMO0FBRUpDLGVBQVNDLE1BRkw7QUFHSkMsYUFISSxFQUdLQyxJQUhMLEVBR1dDO0FBSFgsUUFJRnRCLElBQUllLE1BQUosQ0FKSjs7QUFNQSxRQUFJZCxPQUFPcUIsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFVBQUk3QixvQkFBb0J3QixXQUFXdkIsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVEyQixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU1DLE9BQU8sTUFBTTVCLEtBQUs2QixFQUFMLENBQVFULE1BQVIsQ0FBbkI7QUFDQSxjQUFNVSxPQUFPLElBQUk3QixJQUFKLENBQVNxQixNQUFULEVBQWlCTSxJQUFqQixDQUFiO0FBQ0EsWUFBSSxNQUFNRSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFNQyxPQUFPUixPQUFPQSxLQUFLUyxLQUFMLENBQVcsR0FBWCxDQUFQLEdBQXlCLEVBQXRDO0FBQ0Esa0JBQVFWLE9BQVI7QUFDRSxpQkFBSyxzQkFBTDtBQUNFLHFCQUFPbEIsZUFBZXVCLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPMUIsWUFBWXNCLElBQVosQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU9yQixXQUFXcUIsSUFBWCxFQUFpQkksSUFBakIsQ0FBUDtBQUNGLGlCQUFLLHFCQUFMO0FBQ0UscUJBQU94QixjQUFjb0IsSUFBZCxFQUFvQkksSUFBcEIsQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU92QixXQUFXbUIsSUFBWCxDQUFQO0FBQ0YsaUJBQUssb0JBQUw7QUFDRSxxQkFBT2xCLGFBQWFrQixJQUFiLENBQVA7QUFDRixpQkFBSyxhQUFMO0FBQ0UscUJBQU9qQixPQUFPaUIsSUFBUCxDQUFQO0FBQ0YsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2hCLGVBQWVnQixJQUFmLEVBQXFCSSxJQUFyQixDQUFQO0FBQ0Y7QUFDRSxvQkFBTSxJQUFJRSxLQUFKLENBQVVuQyxRQUFRMkIsS0FBUixDQUFjUyxjQUF4QixDQUFOO0FBbEJKO0FBb0JELFNBdEJELE1Bc0JPO0FBQ0wsaUJBQU9wQyxRQUFRMkIsS0FBUixDQUFjVSxRQUFyQjtBQUNEO0FBQ0Y7QUFDRixLQWhDRCxNQWdDTztBQUNMLFlBQU0sSUFBSUYsS0FBSixDQUFVbkMsUUFBUTJCLEtBQVIsQ0FBY1csYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0ExQ3VCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2NoZWR1bGVTdXJ2ZXksIGxpc3RUYXJnZXRzLCBhZGRUYXJnZXRzLCByZW1vdmVUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIsIHN0YXR1cywgZ2VuZXJhdGVSZXBvcnQgfSA9IHJlcXVpcmUoJy4vY29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiBGb3JtLnBhcnNlKHJlcSkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICBjb25zdCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIHVzZXJfaWQ6IHVzZXJJRCxcbiAgICBjb21tYW5kLCB0ZXh0LCB0b2tlblxuICB9ID0gbG9nKGZpZWxkcylcblxuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtKVxuICAgICAgaWYgKGF3YWl0IHVzZXIuaXNBZG1pbikge1xuICAgICAgICBjb25zdCBhcmdzID0gdGV4dCA/IHRleHQuc3BsaXQoJyAnKSA6IFtdXG4gICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgIGNhc2UgJy9ucHMtc2NoZWR1bGUtc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVN1cnZleSh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtbGlzdC10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiBsaXN0VGFyZ2V0cyh0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtYWRkLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGFkZFRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXJlbW92ZS10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVUYXJnZXRzKHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1zdG9wLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc3RvcFN1cnZleSh0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc2VuZC1yZW1pbmRlcic6XG4gICAgICAgICAgICByZXR1cm4gc2VuZFJlbWluZGVyKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1zdGF0dXMnOlxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1cyh0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtZ2VuZXJhdGUtcmVwb3J0JzpcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZVJlcG9ydCh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQ29tbWFuZClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3Iubm90QWRtaW5cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufSlcbiJdfQ==