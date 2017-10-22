'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets } = require('./commands');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2UiLCJ0aGVuIiwiZmllbGRzIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJFcnJvciIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSSxJQUFGLEVBQVFDLEdBQVIsRUFBYUMsTUFBYixLQUF3Qk4sUUFBUSxTQUFSLENBQTlCO0FBQ0EsTUFBTSxFQUFFTyxjQUFGLEVBQWtCQyxXQUFsQixFQUErQkMsVUFBL0IsRUFBMkNDLGFBQTNDLEtBQTZEVixRQUFRLFlBQVIsQ0FBbkU7O0FBRUFXLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9ULEtBQUtVLEtBQUwsQ0FBV0QsR0FBWCxFQUFnQkUsSUFBaEI7QUFBQSwrQkFBcUIsV0FBTUMsTUFBTixFQUFnQjtBQUMzRCxVQUFNO0FBQ0pDLGVBQVNDLE1BREw7QUFFSkMsZUFBU0MsTUFGTDtBQUdKQyxhQUhJLEVBR0tDLElBSEwsRUFHV0M7QUFIWCxRQUlGbEIsSUFBSVcsTUFBSixDQUpKOztBQU1BLFFBQUlWLE9BQU9pQixLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSXpCLG9CQUFvQm9CLFdBQVduQixtQkFBbkMsRUFBd0Q7QUFDdEQsZUFBT0UsUUFBUXVCLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTUMsT0FBTyxNQUFNeEIsS0FBS3lCLEVBQUwsQ0FBUVQsTUFBUixDQUFuQjtBQUNBLGNBQU1VLE9BQU8sSUFBSXpCLElBQUosQ0FBU2lCLE1BQVQsRUFBaUJNLElBQWpCLENBQWI7QUFDQSxZQUFJLE1BQU1FLEtBQUtDLE9BQWYsRUFBd0I7QUFDdEIsZ0JBQU1DLE9BQU9SLE9BQU9BLEtBQUtTLEtBQUwsQ0FBVyxHQUFYLENBQVAsR0FBeUIsRUFBdEM7QUFDQSxrQkFBUVYsT0FBUjtBQUNFLGlCQUFLLHNCQUFMO0FBQ0UscUJBQU9kLGVBQWVtQixJQUFmLEVBQXFCSSxJQUFyQixDQUFQO0FBQ0YsaUJBQUssbUJBQUw7QUFDRSxxQkFBT3RCLFlBQVlrQixJQUFaLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPakIsV0FBV2lCLElBQVgsRUFBaUJJLElBQWpCLENBQVA7QUFDRixpQkFBSyxxQkFBTDtBQUNFLHFCQUFPcEIsY0FBY2dCLElBQWQsRUFBb0JJLElBQXBCLENBQVA7QUFDRjtBQUNFLG9CQUFNLElBQUlFLEtBQUosQ0FBVS9CLFFBQVF1QixLQUFSLENBQWNTLGNBQXhCLENBQU47QUFWSjtBQVlELFNBZEQsTUFjTztBQUNMLGlCQUFPaEMsUUFBUXVCLEtBQVIsQ0FBY1UsUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0F4QkQsTUF3Qk87QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVS9CLFFBQVF1QixLQUFSLENBQWNXLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBbEN1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVDb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBsaXN0VGFyZ2V0cywgYWRkVGFyZ2V0cywgcmVtb3ZlVGFyZ2V0cyB9ID0gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIGNvbnN0IHtcbiAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgdXNlcl9pZDogdXNlcklELFxuICAgIGNvbW1hbmQsIHRleHQsIHRva2VuXG4gIH0gPSBsb2coZmllbGRzKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW0pXG4gICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0ZXh0ID8gdGV4dC5zcGxpdCgnICcpIDogW11cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1saXN0LXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1hZGQtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZENvbW1hbmQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLm5vdEFkbWluXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=