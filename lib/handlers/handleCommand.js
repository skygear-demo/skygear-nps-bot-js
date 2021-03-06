'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable */
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, exportResult, summary } = require('./commands');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (req, isFromInternal) {
    if (isFromInternal !== true) {
      // skygear handler will put an object in 2nd arg
      req = yield Form.parse(req);
    }

    const {
      team_id: teamID,
      user_id: userID,
      command, text, token
    } = log(req);

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
            case '/nps-export-result':
              return exportResult(team, userID, args);
            case '/nps-help':
              return message.help;
            case '/nps-summary':
              return summary(team, args);
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

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwiZXhwb3J0UmVzdWx0Iiwic3VtbWFyeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJpc0Zyb21JbnRlcm5hbCIsInBhcnNlIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJoZWxwIiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSSxJQUFGLEVBQVFDLEdBQVIsRUFBYUMsTUFBYixLQUF3Qk4sUUFBUSxTQUFSLENBQTlCO0FBQ0EsTUFBTSxFQUFFTyxjQUFGLEVBQWtCQyxXQUFsQixFQUErQkMsVUFBL0IsRUFBMkNDLGFBQTNDLEVBQTBEQyxVQUExRCxFQUFzRUMsWUFBdEUsRUFBb0ZDLE1BQXBGLEVBQTRGQyxZQUE1RixFQUEwR0MsT0FBMUcsS0FBc0hmLFFBQVEsWUFBUixDQUE1SDs7QUFFQWdCLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsR0FBUCxFQUFZQyxjQUFaLEVBQStCO0FBQzlDLFFBQUlBLG1CQUFtQixJQUF2QixFQUE2QjtBQUFFO0FBQzdCRCxZQUFNLE1BQU1kLEtBQUtnQixLQUFMLENBQVdGLEdBQVgsQ0FBWjtBQUNEOztBQUVELFVBQU07QUFDSkcsZUFBU0MsTUFETDtBQUVKQyxlQUFTQyxNQUZMO0FBR0pDLGFBSEksRUFHS0MsSUFITCxFQUdXQztBQUhYLFFBSUZ0QixJQUFJYSxHQUFKLENBSko7O0FBTUEsUUFBSVosT0FBT3FCLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixVQUFJN0Isb0JBQW9Cd0IsV0FBV3ZCLG1CQUFuQyxFQUF3RDtBQUN0RCxlQUFPRSxRQUFRMkIsS0FBUixDQUFjQyxnQkFBckI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNQyxPQUFPLE1BQU01QixLQUFLNkIsRUFBTCxDQUFRVCxNQUFSLENBQW5CO0FBQ0EsY0FBTVUsT0FBTyxJQUFJN0IsSUFBSixDQUFTcUIsTUFBVCxFQUFpQk0sSUFBakIsQ0FBYjtBQUNBLFlBQUksTUFBTUUsS0FBS0MsT0FBZixFQUF3QjtBQUN0QixnQkFBTUMsT0FBT1IsT0FBT0EsS0FBS1MsS0FBTCxDQUFXLEdBQVgsQ0FBUCxHQUF5QixFQUF0QztBQUNBLGtCQUFRVixPQUFSO0FBQ0UsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2xCLGVBQWV1QixJQUFmLEVBQXFCSSxJQUFyQixDQUFQO0FBQ0YsaUJBQUssbUJBQUw7QUFDRSxxQkFBTzFCLFlBQVlzQixJQUFaLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPckIsV0FBV3FCLElBQVgsRUFBaUJJLElBQWpCLENBQVA7QUFDRixpQkFBSyxxQkFBTDtBQUNFLHFCQUFPeEIsY0FBY29CLElBQWQsRUFBb0JJLElBQXBCLENBQVA7QUFDRixpQkFBSyxrQkFBTDtBQUNFLHFCQUFPdkIsV0FBV21CLElBQVgsQ0FBUDtBQUNGLGlCQUFLLG9CQUFMO0FBQ0UscUJBQU9sQixhQUFha0IsSUFBYixDQUFQO0FBQ0YsaUJBQUssYUFBTDtBQUNFLHFCQUFPakIsT0FBT2lCLElBQVAsQ0FBUDtBQUNGLGlCQUFLLG9CQUFMO0FBQ0UscUJBQU9oQixhQUFhZ0IsSUFBYixFQUFtQk4sTUFBbkIsRUFBMkJVLElBQTNCLENBQVA7QUFDRixpQkFBSyxXQUFMO0FBQ0UscUJBQU9qQyxRQUFRbUMsSUFBZjtBQUNGLGlCQUFLLGNBQUw7QUFDRSxxQkFBT3JCLFFBQVFlLElBQVIsRUFBY0ksSUFBZCxDQUFQO0FBQ0Y7QUFDRSxvQkFBTSxJQUFJRyxLQUFKLENBQVVwQyxRQUFRMkIsS0FBUixDQUFjVSxjQUF4QixDQUFOO0FBdEJKO0FBd0JELFNBMUJELE1BMEJPO0FBQ0wsaUJBQU9yQyxRQUFRMkIsS0FBUixDQUFjVyxRQUFyQjtBQUNEO0FBQ0Y7QUFDRixLQXBDRCxNQW9DTztBQUNMLFlBQU0sSUFBSUYsS0FBSixDQUFVcEMsUUFBUTJCLEtBQVIsQ0FBY1ksYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0FsREQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiaGFuZGxlQ29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5jb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IEZvcm0sIGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2NoZWR1bGVTdXJ2ZXksIGxpc3RUYXJnZXRzLCBhZGRUYXJnZXRzLCByZW1vdmVUYXJnZXRzLCBzdG9wU3VydmV5LCBzZW5kUmVtaW5kZXIsIHN0YXR1cywgZXhwb3J0UmVzdWx0LCBzdW1tYXJ5IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAocmVxLCBpc0Zyb21JbnRlcm5hbCkgPT4ge1xuICBpZiAoaXNGcm9tSW50ZXJuYWwgIT09IHRydWUpIHsgLy8gc2t5Z2VhciBoYW5kbGVyIHdpbGwgcHV0IGFuIG9iamVjdCBpbiAybmQgYXJnXG4gICAgcmVxID0gYXdhaXQgRm9ybS5wYXJzZShyZXEpXG4gIH1cbiAgXG4gIGNvbnN0IHtcbiAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgdXNlcl9pZDogdXNlcklELFxuICAgIGNvbW1hbmQsIHRleHQsIHRva2VuXG4gIH0gPSBsb2cocmVxKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW0pXG4gICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0ZXh0ID8gdGV4dC5zcGxpdCgnICcpIDogW11cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1saXN0LXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1hZGQtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXN0b3Atc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1zZW5kLXJlbWluZGVyJzpcbiAgICAgICAgICAgIHJldHVybiBzZW5kUmVtaW5kZXIodGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLXN0YXR1cyc6XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1leHBvcnQtcmVzdWx0JzpcbiAgICAgICAgICAgIHJldHVybiBleHBvcnRSZXN1bHQodGVhbSwgdXNlcklELCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtaGVscCc6XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5oZWxwXG4gICAgICAgICAgY2FzZSAnL25wcy1zdW1tYXJ5JzpcbiAgICAgICAgICAgIHJldHVybiBzdW1tYXJ5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59XG4iXX0=