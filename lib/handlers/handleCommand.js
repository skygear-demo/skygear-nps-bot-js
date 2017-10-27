'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder } = require('./commands');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW1faWQiLCJ0ZWFtSUQiLCJ1c2VyX2lkIiwidXNlcklEIiwiY29tbWFuZCIsInRleHQiLCJ0b2tlbiIsImVycm9yIiwidW5kZXJNYWludGVuYW5jZSIsInRlYW0iLCJvZiIsInVzZXIiLCJpc0FkbWluIiwiYXJncyIsInNwbGl0IiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JOLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU8sY0FBRixFQUFrQkMsV0FBbEIsRUFBK0JDLFVBQS9CLEVBQTJDQyxhQUEzQyxFQUEwREMsVUFBMUQsRUFBc0VDLFlBQXRFLEtBQXVGWixRQUFRLFlBQVIsQ0FBN0Y7O0FBRUFhLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9YLEtBQUtZLEtBQUwsQ0FBV0QsR0FBWCxFQUFnQkUsSUFBaEI7QUFBQSwrQkFBcUIsV0FBTUMsTUFBTixFQUFnQjtBQUMzRCxVQUFNO0FBQ0pDLGVBQVNDLE1BREw7QUFFSkMsZUFBU0MsTUFGTDtBQUdKQyxhQUhJLEVBR0tDLElBSEwsRUFHV0M7QUFIWCxRQUlGcEIsSUFBSWEsTUFBSixDQUpKOztBQU1BLFFBQUlaLE9BQU9tQixLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSTNCLG9CQUFvQnNCLFdBQVdyQixtQkFBbkMsRUFBd0Q7QUFDdEQsZUFBT0UsUUFBUXlCLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTUMsT0FBTyxNQUFNMUIsS0FBSzJCLEVBQUwsQ0FBUVQsTUFBUixDQUFuQjtBQUNBLGNBQU1VLE9BQU8sSUFBSTNCLElBQUosQ0FBU21CLE1BQVQsRUFBaUJNLElBQWpCLENBQWI7QUFDQSxZQUFJLE1BQU1FLEtBQUtDLE9BQWYsRUFBd0I7QUFDdEIsZ0JBQU1DLE9BQU9SLE9BQU9BLEtBQUtTLEtBQUwsQ0FBVyxHQUFYLENBQVAsR0FBeUIsRUFBdEM7QUFDQSxrQkFBUVYsT0FBUjtBQUNFLGlCQUFLLHNCQUFMO0FBQ0UscUJBQU9oQixlQUFlcUIsSUFBZixFQUFxQkksSUFBckIsQ0FBUDtBQUNGLGlCQUFLLG1CQUFMO0FBQ0UscUJBQU94QixZQUFZb0IsSUFBWixDQUFQO0FBQ0YsaUJBQUssa0JBQUw7QUFDRSxxQkFBT25CLFdBQVdtQixJQUFYLEVBQWlCSSxJQUFqQixDQUFQO0FBQ0YsaUJBQUsscUJBQUw7QUFDRSxxQkFBT3RCLGNBQWNrQixJQUFkLEVBQW9CSSxJQUFwQixDQUFQO0FBQ0YsaUJBQUssa0JBQUw7QUFDRSxxQkFBT3JCLFdBQVdpQixJQUFYLENBQVA7QUFDRixpQkFBSyxvQkFBTDtBQUNFLHFCQUFPaEIsYUFBYWdCLElBQWIsQ0FBUDtBQUNGO0FBQ0Usb0JBQU0sSUFBSU0sS0FBSixDQUFVakMsUUFBUXlCLEtBQVIsQ0FBY1MsY0FBeEIsQ0FBTjtBQWRKO0FBZ0JELFNBbEJELE1Ba0JPO0FBQ0wsaUJBQU9sQyxRQUFReUIsS0FBUixDQUFjVSxRQUFyQjtBQUNEO0FBQ0Y7QUFDRixLQTVCRCxNQTRCTztBQUNMLFlBQU0sSUFBSUYsS0FBSixDQUFVakMsUUFBUXlCLEtBQVIsQ0FBY1csYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0F0Q3VCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2NoZWR1bGVTdXJ2ZXksIGxpc3RUYXJnZXRzLCBhZGRUYXJnZXRzLCByZW1vdmVUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIgfSA9IHJlcXVpcmUoJy4vY29tbWFuZHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiBGb3JtLnBhcnNlKHJlcSkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICBjb25zdCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIHVzZXJfaWQ6IHVzZXJJRCxcbiAgICBjb21tYW5kLCB0ZXh0LCB0b2tlblxuICB9ID0gbG9nKGZpZWxkcylcblxuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtKVxuICAgICAgaWYgKGF3YWl0IHVzZXIuaXNBZG1pbikge1xuICAgICAgICBjb25zdCBhcmdzID0gdGV4dCA/IHRleHQuc3BsaXQoJyAnKSA6IFtdXG4gICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgIGNhc2UgJy9ucHMtc2NoZWR1bGUtc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZVN1cnZleSh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtbGlzdC10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiBsaXN0VGFyZ2V0cyh0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtYWRkLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGFkZFRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXJlbW92ZS10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVUYXJnZXRzKHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1zdG9wLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc3RvcFN1cnZleSh0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc2VuZC1yZW1pbmRlcic6XG4gICAgICAgICAgICByZXR1cm4gc2VuZFJlbWluZGVyKHRlYW0pXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19