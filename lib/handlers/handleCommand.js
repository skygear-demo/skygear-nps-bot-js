'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable */
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { Form, log, verify } = require('../util');
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, generateReport, summary } = require('./commands');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (req, isFromInternal) {
    if (isFromInternal !== true) {
      // skygear handler will put an object in 2nd arg
      req = yield Form.parse(req);
      console.log('txtx', req);
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
            case '/nps-generate-report':
              return generateReport(team, userID, args);
            case '/nps-help':
              return message.help;
            case '/nps-summary':
              return summary(team, userID, args);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwiVXNlciIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJzY2hlZHVsZVN1cnZleSIsImxpc3RUYXJnZXRzIiwiYWRkVGFyZ2V0cyIsInJlbW92ZVRhcmdldHMiLCJzdG9wU3VydmV5Iiwic2VuZFJlbWluZGVyIiwic3RhdHVzIiwiZ2VuZXJhdGVSZXBvcnQiLCJzdW1tYXJ5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsImlzRnJvbUludGVybmFsIiwicGFyc2UiLCJjb25zb2xlIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwidGVhbSIsIm9mIiwidXNlciIsImlzQWRtaW4iLCJhcmdzIiwic3BsaXQiLCJoZWxwIiwiRXJyb3IiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSSxJQUFGLEVBQVFDLEdBQVIsRUFBYUMsTUFBYixLQUF3Qk4sUUFBUSxTQUFSLENBQTlCO0FBQ0EsTUFBTSxFQUFFTyxjQUFGLEVBQWtCQyxXQUFsQixFQUErQkMsVUFBL0IsRUFBMkNDLGFBQTNDLEVBQTBEQyxVQUExRCxFQUFzRUMsWUFBdEUsRUFBb0ZDLE1BQXBGLEVBQTRGQyxjQUE1RixFQUE0R0MsT0FBNUcsS0FBd0hmLFFBQVEsWUFBUixDQUE5SDs7QUFFQWdCLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsR0FBUCxFQUFZQyxjQUFaLEVBQStCO0FBQzlDLFFBQUlBLG1CQUFtQixJQUF2QixFQUE2QjtBQUFFO0FBQzdCRCxZQUFNLE1BQU1kLEtBQUtnQixLQUFMLENBQVdGLEdBQVgsQ0FBWjtBQUNBRyxjQUFRaEIsR0FBUixDQUFZLE1BQVosRUFBb0JhLEdBQXBCO0FBQ0Q7O0FBRUQsVUFBTTtBQUNKSSxlQUFTQyxNQURMO0FBRUpDLGVBQVNDLE1BRkw7QUFHSkMsYUFISSxFQUdLQyxJQUhMLEVBR1dDO0FBSFgsUUFJRnZCLElBQUlhLEdBQUosQ0FKSjs7QUFNQSxRQUFJWixPQUFPc0IsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFVBQUk5QixvQkFBb0J5QixXQUFXeEIsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVE0QixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLGNBQU1DLE9BQU8sTUFBTTdCLEtBQUs4QixFQUFMLENBQVFULE1BQVIsQ0FBbkI7QUFDQSxjQUFNVSxPQUFPLElBQUk5QixJQUFKLENBQVNzQixNQUFULEVBQWlCTSxJQUFqQixDQUFiO0FBQ0EsWUFBSSxNQUFNRSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFNQyxPQUFPUixPQUFPQSxLQUFLUyxLQUFMLENBQVcsR0FBWCxDQUFQLEdBQXlCLEVBQXRDO0FBQ0Esa0JBQVFWLE9BQVI7QUFDRSxpQkFBSyxzQkFBTDtBQUNFLHFCQUFPbkIsZUFBZXdCLElBQWYsRUFBcUJJLElBQXJCLENBQVA7QUFDRixpQkFBSyxtQkFBTDtBQUNFLHFCQUFPM0IsWUFBWXVCLElBQVosQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU90QixXQUFXc0IsSUFBWCxFQUFpQkksSUFBakIsQ0FBUDtBQUNGLGlCQUFLLHFCQUFMO0FBQ0UscUJBQU96QixjQUFjcUIsSUFBZCxFQUFvQkksSUFBcEIsQ0FBUDtBQUNGLGlCQUFLLGtCQUFMO0FBQ0UscUJBQU94QixXQUFXb0IsSUFBWCxDQUFQO0FBQ0YsaUJBQUssb0JBQUw7QUFDRSxxQkFBT25CLGFBQWFtQixJQUFiLENBQVA7QUFDRixpQkFBSyxhQUFMO0FBQ0UscUJBQU9sQixPQUFPa0IsSUFBUCxDQUFQO0FBQ0YsaUJBQUssc0JBQUw7QUFDRSxxQkFBT2pCLGVBQWVpQixJQUFmLEVBQXFCTixNQUFyQixFQUE2QlUsSUFBN0IsQ0FBUDtBQUNGLGlCQUFLLFdBQUw7QUFDRSxxQkFBT2xDLFFBQVFvQyxJQUFmO0FBQ0YsaUJBQUssY0FBTDtBQUNFLHFCQUFPdEIsUUFBUWdCLElBQVIsRUFBY04sTUFBZCxFQUFzQlUsSUFBdEIsQ0FBUDtBQUNGO0FBQ0Usb0JBQU0sSUFBSUcsS0FBSixDQUFVckMsUUFBUTRCLEtBQVIsQ0FBY1UsY0FBeEIsQ0FBTjtBQXRCSjtBQXdCRCxTQTFCRCxNQTBCTztBQUNMLGlCQUFPdEMsUUFBUTRCLEtBQVIsQ0FBY1csUUFBckI7QUFDRDtBQUNGO0FBQ0YsS0FwQ0QsTUFvQ087QUFDTCxZQUFNLElBQUlGLEtBQUosQ0FBVXJDLFFBQVE0QixLQUFSLENBQWNZLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBbkREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImhhbmRsZUNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBsaXN0VGFyZ2V0cywgYWRkVGFyZ2V0cywgcmVtb3ZlVGFyZ2V0cywgc3RvcFN1cnZleSwgc2VuZFJlbWluZGVyLCBzdGF0dXMsIGdlbmVyYXRlUmVwb3J0LCBzdW1tYXJ5IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAocmVxLCBpc0Zyb21JbnRlcm5hbCkgPT4ge1xuICBpZiAoaXNGcm9tSW50ZXJuYWwgIT09IHRydWUpIHsgLy8gc2t5Z2VhciBoYW5kbGVyIHdpbGwgcHV0IGFuIG9iamVjdCBpbiAybmQgYXJnXG4gICAgcmVxID0gYXdhaXQgRm9ybS5wYXJzZShyZXEpXG4gICAgY29uc29sZS5sb2coJ3R4dHgnLCByZXEpXG4gIH1cbiAgXG4gIGNvbnN0IHtcbiAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgdXNlcl9pZDogdXNlcklELFxuICAgIGNvbW1hbmQsIHRleHQsIHRva2VuXG4gIH0gPSBsb2cocmVxKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW0pXG4gICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0ZXh0ID8gdGV4dC5zcGxpdCgnICcpIDogW11cbiAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW0sIGFyZ3MpXG4gICAgICAgICAgY2FzZSAnL25wcy1saXN0LXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIGxpc3RUYXJnZXRzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1hZGQtdGFyZ2V0cyc6XG4gICAgICAgICAgICByZXR1cm4gYWRkVGFyZ2V0cyh0ZWFtLCBhcmdzKVxuICAgICAgICAgIGNhc2UgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRhcmdldHModGVhbSwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLXN0b3Atc3VydmV5JzpcbiAgICAgICAgICAgIHJldHVybiBzdG9wU3VydmV5KHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1zZW5kLXJlbWluZGVyJzpcbiAgICAgICAgICAgIHJldHVybiBzZW5kUmVtaW5kZXIodGVhbSlcbiAgICAgICAgICBjYXNlICcvbnBzLXN0YXR1cyc6XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzKHRlYW0pXG4gICAgICAgICAgY2FzZSAnL25wcy1nZW5lcmF0ZS1yZXBvcnQnOlxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlUmVwb3J0KHRlYW0sIHVzZXJJRCwgYXJncylcbiAgICAgICAgICBjYXNlICcvbnBzLWhlbHAnOlxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UuaGVscFxuICAgICAgICAgIGNhc2UgJy9ucHMtc3VtbWFyeSc6XG4gICAgICAgICAgICByZXR1cm4gc3VtbWFyeSh0ZWFtLCB1c2VySUQsIGFyZ3MpXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRDb21tYW5kKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci5ub3RBZG1pblxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59XG4iXX0=