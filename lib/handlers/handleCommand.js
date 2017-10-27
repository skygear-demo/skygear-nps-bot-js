'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey } = require('./commands');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlIiwidGhlbiIsImZpZWxkcyIsInRlYW1faWQiLCJ0ZWFtSUQiLCJ1c2VyX2lkIiwidXNlcklEIiwiY29tbWFuZCIsInRleHQiLCJ0b2tlbiIsImVycm9yIiwidW5kZXJNYWludGVuYW5jZSIsInRlYW0iLCJvZiIsInVzZXIiLCJpc0FkbWluIiwiYXJncyIsInNwbGl0IiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JOLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU8sY0FBRixFQUFrQkMsV0FBbEIsRUFBK0JDLFVBQS9CLEVBQTJDQyxhQUEzQyxFQUEwREMsVUFBMUQsS0FBeUVYLFFBQVEsWUFBUixDQUEvRTs7QUFFQVksT0FBT0MsT0FBUCxHQUFpQkMsT0FBT1YsS0FBS1csS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNELFVBQU07QUFDSkMsZUFBU0MsTUFETDtBQUVKQyxlQUFTQyxNQUZMO0FBR0pDLGFBSEksRUFHS0MsSUFITCxFQUdXQztBQUhYLFFBSUZuQixJQUFJWSxNQUFKLENBSko7O0FBTUEsUUFBSVgsT0FBT2tCLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixVQUFJMUIsb0JBQW9CcUIsV0FBV3BCLG1CQUFuQyxFQUF3RDtBQUN0RCxlQUFPRSxRQUFRd0IsS0FBUixDQUFjQyxnQkFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNQyxPQUFPLE1BQU16QixLQUFLMEIsRUFBTCxDQUFRVCxNQUFSLENBQW5CO0FBQ0EsY0FBTVUsT0FBTyxJQUFJMUIsSUFBSixDQUFTa0IsTUFBVCxFQUFpQk0sSUFBakIsQ0FBYjtBQUNBLFlBQUksTUFBTUUsS0FBS0MsT0FBZixFQUF3QjtBQUN0QixnQkFBTUMsT0FBT1IsT0FBT0EsS0FBS1MsS0FBTCxDQUFXLEdBQVgsQ0FBUCxHQUF5QixFQUF0QztBQUNBLGtCQUFRVixPQUFSO0FBQ0UsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2YsZUFBZW9CLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPdkIsWUFBWW1CLElBQVosQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU9sQixXQUFXa0IsSUFBWCxFQUFpQkksSUFBakIsQ0FBUDtBQUNGLGlCQUFLLHFCQUFMO0FBQ0UscUJBQU9yQixjQUFjaUIsSUFBZCxFQUFvQkksSUFBcEIsQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU9wQixXQUFXZ0IsSUFBWCxDQUFQO0FBQ0Y7QUFDRSxvQkFBTSxJQUFJTSxLQUFKLENBQVVoQyxRQUFRd0IsS0FBUixDQUFjUyxjQUF4QixDQUFOO0FBWko7QUFjRCxTQWhCRCxNQWdCTztBQUNMLGlCQUFPakMsUUFBUXdCLEtBQVIsQ0FBY1UsUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0ExQkQsTUEwQk87QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVWhDLFFBQVF3QixLQUFSLENBQWNXLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBcEN1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVDb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBsaXN0VGFyZ2V0cywgYWRkVGFyZ2V0cywgcmVtb3ZlVGFyZ2V0cywgc3RvcFN1cnZleSB9ID0gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIGNvbnN0IHtcbiAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgdXNlcl9pZDogdXNlcklELFxuICAgIGNvbW1hbmQsIHRleHQsIHRva2VuXG4gIH0gPSBsb2coZmllbGRzKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW0pXG4gICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0ZXh0ID8gdGV4dC5zcGxpdCgnICcpIDogW11cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1saXN0LXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1hZGQtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXN0b3Atc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19