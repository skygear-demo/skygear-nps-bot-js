'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey } = require('./commands');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZSIsInRoZW4iLCJmaWVsZHMiLCJ0ZWFtX2lkIiwidGVhbUlEIiwidXNlcl9pZCIsInVzZXJJRCIsImNvbW1hbmQiLCJ0ZXh0IiwidG9rZW4iLCJlcnJvciIsInVuZGVyTWFpbnRlbmFuY2UiLCJ0ZWFtIiwib2YiLCJ1c2VyIiwiaXNBZG1pbiIsImFyZ3MiLCJzcGxpdCIsIkVycm9yIiwiaW52YWxpZENvbW1hbmQiLCJub3RBZG1pbiIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTUcsT0FBT0gsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVJLElBQUYsRUFBUUMsR0FBUixFQUFhQyxNQUFiLEtBQXdCTixRQUFRLFNBQVIsQ0FBOUI7QUFDQSxNQUFNLEVBQUVPLGNBQUYsS0FBcUJQLFFBQVEsWUFBUixDQUEzQjs7QUFFQVEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT04sS0FBS08sS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNELFVBQU07QUFDSkMsZUFBU0MsTUFETDtBQUVKQyxlQUFTQyxNQUZMO0FBR0pDLGFBSEksRUFHS0MsSUFITCxFQUdXQztBQUhYLFFBSUZmLElBQUlRLE1BQUosQ0FKSjs7QUFNQSxRQUFJUCxPQUFPYyxLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSXRCLG9CQUFvQmlCLFdBQVdoQixtQkFBbkMsRUFBd0Q7QUFDdEQsZUFBT0UsUUFBUW9CLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTUMsT0FBTyxNQUFNckIsS0FBS3NCLEVBQUwsQ0FBUVQsTUFBUixDQUFuQjtBQUNBLGNBQU1VLE9BQU8sSUFBSXRCLElBQUosQ0FBU2MsTUFBVCxFQUFpQk0sSUFBakIsQ0FBYjtBQUNBLFlBQUksTUFBTUUsS0FBS0MsT0FBZixFQUF3QjtBQUN0QixnQkFBTUMsT0FBT1IsT0FBT0EsS0FBS1MsS0FBTCxDQUFXLEdBQVgsQ0FBUCxHQUF5QixFQUF0QztBQUNBLGtCQUFRVixPQUFSO0FBQ0UsaUJBQUssc0JBQUw7QUFDRSxxQkFBT1gsZUFBZWdCLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRjtBQUNFLG9CQUFNLElBQUlFLEtBQUosQ0FBVTVCLFFBQVFvQixLQUFSLENBQWNTLGNBQXhCLENBQU47QUFKSjtBQU1ELFNBUkQsTUFRTztBQUNMLGlCQUFPN0IsUUFBUW9CLEtBQVIsQ0FBY1UsUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0FsQkQsTUFrQk87QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVTVCLFFBQVFvQixLQUFSLENBQWNXLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBNUJ1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVDb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4gRm9ybS5wYXJzZShyZXEpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgfSA9IGxvZyhmaWVsZHMpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRleHQgPyB0ZXh0LnNwbGl0KCcgJykgOiBbXVxuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbSwgYXJncylcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZENvbW1hbmQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLm5vdEFkbWluXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRTb3VyY2UpXG4gIH1cbn0pXG4iXX0=