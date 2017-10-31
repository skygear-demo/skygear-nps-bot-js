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
            case '/nps-help':
              return message.help;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwiZ2VuZXJhdGVSZXBvcnQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2UiLCJ0aGVuIiwiZmllbGRzIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJoZWxwIiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JOLFFBQVEsU0FBUixDQUE5QjtBQUNBLE1BQU0sRUFBRU8sY0FBRixFQUFrQkMsV0FBbEIsRUFBK0JDLFVBQS9CLEVBQTJDQyxhQUEzQyxFQUEwREMsVUFBMUQsRUFBc0VDLFlBQXRFLEVBQW9GQyxNQUFwRixFQUE0RkMsY0FBNUYsS0FBK0dkLFFBQVEsWUFBUixDQUFySDs7QUFFQWUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBT2IsS0FBS2MsS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNELFVBQU07QUFDSkMsZUFBU0MsTUFETDtBQUVKQyxlQUFTQyxNQUZMO0FBR0pDLGFBSEksRUFHS0MsSUFITCxFQUdXQztBQUhYLFFBSUZ0QixJQUFJZSxNQUFKLENBSko7O0FBTUEsUUFBSWQsT0FBT3FCLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixVQUFJN0Isb0JBQW9Cd0IsV0FBV3ZCLG1CQUFuQyxFQUF3RDtBQUN0RCxlQUFPRSxRQUFRMkIsS0FBUixDQUFjQyxnQkFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNQyxPQUFPLE1BQU01QixLQUFLNkIsRUFBTCxDQUFRVCxNQUFSLENBQW5CO0FBQ0EsY0FBTVUsT0FBTyxJQUFJN0IsSUFBSixDQUFTcUIsTUFBVCxFQUFpQk0sSUFBakIsQ0FBYjtBQUNBLFlBQUksTUFBTUUsS0FBS0MsT0FBZixFQUF3QjtBQUN0QixnQkFBTUMsT0FBT1IsT0FBT0EsS0FBS1MsS0FBTCxDQUFXLEdBQVgsQ0FBUCxHQUF5QixFQUF0QztBQUNBLGtCQUFRVixPQUFSO0FBQ0UsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2xCLGVBQWV1QixJQUFmLEVBQXFCSSxJQUFyQixDQUFQO0FBQ0YsaUJBQUssbUJBQUw7QUFDRSxxQkFBTzFCLFlBQVlzQixJQUFaLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPckIsV0FBV3FCLElBQVgsRUFBaUJJLElBQWpCLENBQVA7QUFDRixpQkFBSyxxQkFBTDtBQUNFLHFCQUFPeEIsY0FBY29CLElBQWQsRUFBb0JJLElBQXBCLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPdkIsV0FBV21CLElBQVgsQ0FBUDtBQUNGLGlCQUFLLG9CQUFMO0FBQ0UscUJBQU9sQixhQUFha0IsSUFBYixDQUFQO0FBQ0YsaUJBQUssYUFBTDtBQUNFLHFCQUFPakIsT0FBT2lCLElBQVAsQ0FBUDtBQUNGLGlCQUFLLHNCQUFMO0FBQ0UscUJBQU9oQixlQUFlZ0IsSUFBZixFQUFxQk4sTUFBckIsRUFBNkJVLElBQTdCLENBQVA7QUFDRixpQkFBSyxXQUFMO0FBQ0UscUJBQU9qQyxRQUFRbUMsSUFBZjtBQUNGO0FBQ0Usb0JBQU0sSUFBSUMsS0FBSixDQUFVcEMsUUFBUTJCLEtBQVIsQ0FBY1UsY0FBeEIsQ0FBTjtBQXBCSjtBQXNCRCxTQXhCRCxNQXdCTztBQUNMLGlCQUFPckMsUUFBUTJCLEtBQVIsQ0FBY1csUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0FsQ0QsTUFrQ087QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVXBDLFFBQVEyQixLQUFSLENBQWNZLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBNUN1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4QiIsImZpbGUiOiJoYW5kbGVDb21tYW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBsaXN0VGFyZ2V0cywgYWRkVGFyZ2V0cywgcmVtb3ZlVGFyZ2V0cywgc3RvcFN1cnZleSwgc2VuZFJlbWluZGVyLCBzdGF0dXMsIGdlbmVyYXRlUmVwb3J0IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4gRm9ybS5wYXJzZShyZXEpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgfSA9IGxvZyhmaWVsZHMpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmVycm9yLnVuZGVyTWFpbnRlbmFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHRleHQgPyB0ZXh0LnNwbGl0KCcgJykgOiBbXVxuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICBjYXNlICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLWxpc3QtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gbGlzdFRhcmdldHModGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLWFkZC10YXJnZXRzJzpcbiAgICAgICAgICAgIHJldHVybiBhZGRUYXJnZXRzKHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gcmVtb3ZlVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc3RvcC1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHN0b3BTdXJ2ZXkodGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLXNlbmQtcmVtaW5kZXInOlxuICAgICAgICAgICAgcmV0dXJuIHNlbmRSZW1pbmRlcih0ZWFtKVxuICAgICAgICAgIGNhc2UgJy9ucHMtc3RhdHVzJzpcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXModGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLWdlbmVyYXRlLXJlcG9ydCc6XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVSZXBvcnQodGVhbSwgdXNlcklELCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtaGVscCc6XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5oZWxwXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59KVxuIl19