'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status } = require('./commands');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW1faWQiLCJ0ZWFtSUQiLCJ1c2VyX2lkIiwidXNlcklEIiwiY29tbWFuZCIsInRleHQiLCJ0b2tlbiIsImVycm9yIiwidW5kZXJNYWludGVuYW5jZSIsInRlYW0iLCJvZiIsInVzZXIiLCJpc0FkbWluIiwiYXJncyIsInNwbGl0IiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JOLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU8sY0FBRixFQUFrQkMsV0FBbEIsRUFBK0JDLFVBQS9CLEVBQTJDQyxhQUEzQyxFQUEwREMsVUFBMUQsRUFBc0VDLFlBQXRFLEVBQW9GQyxNQUFwRixLQUErRmIsUUFBUSxZQUFSLENBQXJHOztBQUVBYyxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPWixLQUFLYSxLQUFMLENBQVdELEdBQVgsRUFBZ0JFLElBQWhCO0FBQUEsK0JBQXFCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDM0QsVUFBTTtBQUNKQyxlQUFTQyxNQURMO0FBRUpDLGVBQVNDLE1BRkw7QUFHSkMsYUFISSxFQUdLQyxJQUhMLEVBR1dDO0FBSFgsUUFJRnJCLElBQUljLE1BQUosQ0FKSjs7QUFNQSxRQUFJYixPQUFPb0IsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFVBQUk1QixvQkFBb0J1QixXQUFXdEIsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVEwQixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU1DLE9BQU8sTUFBTTNCLEtBQUs0QixFQUFMLENBQVFULE1BQVIsQ0FBbkI7QUFDQSxjQUFNVSxPQUFPLElBQUk1QixJQUFKLENBQVNvQixNQUFULEVBQWlCTSxJQUFqQixDQUFiO0FBQ0EsWUFBSSxNQUFNRSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFNQyxPQUFPUixPQUFPQSxLQUFLUyxLQUFMLENBQVcsR0FBWCxDQUFQLEdBQXlCLEVBQXRDO0FBQ0Esa0JBQVFWLE9BQVI7QUFDRSxpQkFBSyxzQkFBTDtBQUNFLHFCQUFPakIsZUFBZXNCLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPekIsWUFBWXFCLElBQVosQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU9wQixXQUFXb0IsSUFBWCxFQUFpQkksSUFBakIsQ0FBUDtBQUNGLGlCQUFLLHFCQUFMO0FBQ0UscUJBQU92QixjQUFjbUIsSUFBZCxFQUFvQkksSUFBcEIsQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU90QixXQUFXa0IsSUFBWCxDQUFQO0FBQ0YsaUJBQUssb0JBQUw7QUFDRSxxQkFBT2pCLGFBQWFpQixJQUFiLENBQVA7QUFDRixpQkFBSyxhQUFMO0FBQ0UscUJBQU9oQixPQUFPZ0IsSUFBUCxDQUFQO0FBQ0Y7QUFDRSxvQkFBTSxJQUFJTSxLQUFKLENBQVVsQyxRQUFRMEIsS0FBUixDQUFjUyxjQUF4QixDQUFOO0FBaEJKO0FBa0JELFNBcEJELE1Bb0JPO0FBQ0wsaUJBQU9uQyxRQUFRMEIsS0FBUixDQUFjVSxRQUFyQjtBQUNEO0FBQ0Y7QUFDRixLQTlCRCxNQThCTztBQUNMLFlBQU0sSUFBSUYsS0FBSixDQUFVbEMsUUFBUTBCLEtBQVIsQ0FBY1csYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0F4Q3VCOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXhCIiwiZmlsZSI6ImhhbmRsZUNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2NoZWR1bGVTdXJ2ZXksIGxpc3RUYXJnZXRzLCBhZGRUYXJnZXRzLCByZW1vdmVUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIsIHN0YXR1cyB9ID0gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIGNvbnN0IHtcbiAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgdXNlcl9pZDogdXNlcklELFxuICAgIGNvbW1hbmQsIHRleHQsIHRva2VuXG4gIH0gPSBsb2coZmllbGRzKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW0pXG4gICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0ZXh0ID8gdGV4dC5zcGxpdCgnICcpIDogW11cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1saXN0LXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1hZGQtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXN0b3Atc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1zZW5kLXJlbWluZGVyJzpcbiAgICAgICAgICAgIHJldHVybiBzZW5kUmVtaW5kZXIodGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLXN0YXR1cyc6XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzKHRlYW0pXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19