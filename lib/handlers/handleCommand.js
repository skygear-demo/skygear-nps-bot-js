'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurveys } = require('./commands');

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
            case '/nps-stop-surveys':
              return stopSurveys(team);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZSIsInRoZW4iLCJmaWVsZHMiLCJ0ZWFtX2lkIiwidGVhbUlEIiwidXNlcl9pZCIsInVzZXJJRCIsImNvbW1hbmQiLCJ0ZXh0IiwidG9rZW4iLCJlcnJvciIsInVuZGVyTWFpbnRlbmFuY2UiLCJ0ZWFtIiwib2YiLCJ1c2VyIiwiaXNBZG1pbiIsImFyZ3MiLCJzcGxpdCIsIkVycm9yIiwiaW52YWxpZENvbW1hbmQiLCJub3RBZG1pbiIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTUcsT0FBT0gsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVJLElBQUYsRUFBUUMsR0FBUixFQUFhQyxNQUFiLEtBQXdCTixRQUFRLFNBQVIsQ0FBOUI7QUFDQSxNQUFNLEVBQUVPLGNBQUYsRUFBa0JDLFdBQWxCLEVBQStCQyxVQUEvQixFQUEyQ0MsYUFBM0MsRUFBMERDLFdBQTFELEtBQTBFWCxRQUFRLFlBQVIsQ0FBaEY7O0FBRUFZLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU9WLEtBQUtXLEtBQUwsQ0FBV0QsR0FBWCxFQUFnQkUsSUFBaEI7QUFBQSwrQkFBcUIsV0FBTUMsTUFBTixFQUFnQjtBQUMzRCxVQUFNO0FBQ0pDLGVBQVNDLE1BREw7QUFFSkMsZUFBU0MsTUFGTDtBQUdKQyxhQUhJLEVBR0tDLElBSEwsRUFHV0M7QUFIWCxRQUlGbkIsSUFBSVksTUFBSixDQUpKOztBQU1BLFFBQUlYLE9BQU9rQixLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSTFCLG9CQUFvQnFCLFdBQVdwQixtQkFBbkMsRUFBd0Q7QUFDdEQsZUFBT0UsUUFBUXdCLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTUMsT0FBTyxNQUFNekIsS0FBSzBCLEVBQUwsQ0FBUVQsTUFBUixDQUFuQjtBQUNBLGNBQU1VLE9BQU8sSUFBSTFCLElBQUosQ0FBU2tCLE1BQVQsRUFBaUJNLElBQWpCLENBQWI7QUFDQSxZQUFJLE1BQU1FLEtBQUtDLE9BQWYsRUFBd0I7QUFDdEIsZ0JBQU1DLE9BQU9SLE9BQU9BLEtBQUtTLEtBQUwsQ0FBVyxHQUFYLENBQVAsR0FBeUIsRUFBdEM7QUFDQSxrQkFBUVYsT0FBUjtBQUNFLGlCQUFLLHNCQUFMO0FBQ0UscUJBQU9mLGVBQWVvQixJQUFmLEVBQXFCSSxJQUFyQixDQUFQO0FBQ0YsaUJBQUssbUJBQUw7QUFDRSxxQkFBT3ZCLFlBQVltQixJQUFaLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPbEIsV0FBV2tCLElBQVgsRUFBaUJJLElBQWpCLENBQVA7QUFDRixpQkFBSyxxQkFBTDtBQUNFLHFCQUFPckIsY0FBY2lCLElBQWQsRUFBb0JJLElBQXBCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPcEIsWUFBWWdCLElBQVosQ0FBUDtBQUNGO0FBQ0Usb0JBQU0sSUFBSU0sS0FBSixDQUFVaEMsUUFBUXdCLEtBQVIsQ0FBY1MsY0FBeEIsQ0FBTjtBQVpKO0FBY0QsU0FoQkQsTUFnQk87QUFDTCxpQkFBT2pDLFFBQVF3QixLQUFSLENBQWNVLFFBQXJCO0FBQ0Q7QUFDRjtBQUNGLEtBMUJELE1BMEJPO0FBQ0wsWUFBTSxJQUFJRixLQUFKLENBQVVoQyxRQUFRd0IsS0FBUixDQUFjVyxhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQXBDdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEIiLCJmaWxlIjoiaGFuZGxlQ29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgRm9ybSwgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyBzY2hlZHVsZVN1cnZleSwgbGlzdFRhcmdldHMsIGFkZFRhcmdldHMsIHJlbW92ZVRhcmdldHMsIHN0b3BTdXJ2ZXlzIH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4gRm9ybS5wYXJzZShyZXEpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgfSA9IGxvZyhmaWVsZHMpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRleHQgPyB0ZXh0LnNwbGl0KCcgJykgOiBbXVxuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLWxpc3QtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gbGlzdFRhcmdldHModGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLWFkZC10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiBhZGRUYXJnZXRzKHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc3RvcC1zdXJ2ZXlzJzpcbiAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5cyh0ZWFtKVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQ29tbWFuZClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3Iubm90QWRtaW5cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufSlcbiJdfQ==