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
              return generateReport(team, userID, args);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwiZ2VuZXJhdGVSZXBvcnQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2UiLCJ0aGVuIiwiZmllbGRzIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJFcnJvciIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSSxJQUFGLEVBQVFDLEdBQVIsRUFBYUMsTUFBYixLQUF3Qk4sUUFBUSxTQUFSLENBQTlCO0FBQ0EsTUFBTSxFQUFFTyxjQUFGLEVBQWtCQyxXQUFsQixFQUErQkMsVUFBL0IsRUFBMkNDLGFBQTNDLEVBQTBEQyxVQUExRCxFQUFzRUMsWUFBdEUsRUFBb0ZDLE1BQXBGLEVBQTRGQyxjQUE1RixLQUErR2QsUUFBUSxZQUFSLENBQXJIOztBQUVBZSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPYixLQUFLYyxLQUFMLENBQVdELEdBQVgsRUFBZ0JFLElBQWhCO0FBQUEsK0JBQXFCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDM0QsVUFBTTtBQUNKQyxlQUFTQyxNQURMO0FBRUpDLGVBQVNDLE1BRkw7QUFHSkMsYUFISSxFQUdLQyxJQUhMLEVBR1dDO0FBSFgsUUFJRnRCLElBQUllLE1BQUosQ0FKSjs7QUFNQSxRQUFJZCxPQUFPcUIsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFVBQUk3QixvQkFBb0J3QixXQUFXdkIsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVEyQixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU1DLE9BQU8sTUFBTTVCLEtBQUs2QixFQUFMLENBQVFULE1BQVIsQ0FBbkI7QUFDQSxjQUFNVSxPQUFPLElBQUk3QixJQUFKLENBQVNxQixNQUFULEVBQWlCTSxJQUFqQixDQUFiO0FBQ0EsWUFBSSxNQUFNRSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFNQyxPQUFPUixPQUFPQSxLQUFLUyxLQUFMLENBQVcsR0FBWCxDQUFQLEdBQXlCLEVBQXRDO0FBQ0Esa0JBQVFWLE9BQVI7QUFDRSxpQkFBSyxzQkFBTDtBQUNFLHFCQUFPbEIsZUFBZXVCLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPMUIsWUFBWXNCLElBQVosQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU9yQixXQUFXcUIsSUFBWCxFQUFpQkksSUFBakIsQ0FBUDtBQUNGLGlCQUFLLHFCQUFMO0FBQ0UscUJBQU94QixjQUFjb0IsSUFBZCxFQUFvQkksSUFBcEIsQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU92QixXQUFXbUIsSUFBWCxDQUFQO0FBQ0YsaUJBQUssb0JBQUw7QUFDRSxxQkFBT2xCLGFBQWFrQixJQUFiLENBQVA7QUFDRixpQkFBSyxhQUFMO0FBQ0UscUJBQU9qQixPQUFPaUIsSUFBUCxDQUFQO0FBQ0YsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2hCLGVBQWVnQixJQUFmLEVBQXFCTixNQUFyQixFQUE2QlUsSUFBN0IsQ0FBUDtBQUNGO0FBQ0Usb0JBQU0sSUFBSUUsS0FBSixDQUFVbkMsUUFBUTJCLEtBQVIsQ0FBY1MsY0FBeEIsQ0FBTjtBQWxCSjtBQW9CRCxTQXRCRCxNQXNCTztBQUNMLGlCQUFPcEMsUUFBUTJCLEtBQVIsQ0FBY1UsUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0FoQ0QsTUFnQ087QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVW5DLFFBQVEyQixLQUFSLENBQWNXLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBMUN1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVDb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBsaXN0VGFyZ2V0cywgYWRkVGFyZ2V0cywgcmVtb3ZlVGFyZ2V0cywgc3RvcFN1cnZleSwgc2VuZFJlbWluZGVyLCBzdGF0dXMsIGdlbmVyYXRlUmVwb3J0IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4gRm9ybS5wYXJzZShyZXEpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgfSA9IGxvZyhmaWVsZHMpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRleHQgPyB0ZXh0LnNwbGl0KCcgJykgOiBbXVxuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLWxpc3QtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gbGlzdFRhcmdldHModGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLWFkZC10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiBhZGRUYXJnZXRzKHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc3RvcC1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHN0b3BTdXJ2ZXkodGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLXNlbmQtcmVtaW5kZXInOlxuICAgICAgICAgICAgcmV0dXJuIHNlbmRSZW1pbmRlcih0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc3RhdHVzJzpcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXModGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLWdlbmVyYXRlLXJlcG9ydCc6XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVSZXBvcnQodGVhbSwgdXNlcklELCBhcmdzKVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkQ29tbWFuZClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3Iubm90QWRtaW5cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufSlcbiJdfQ==