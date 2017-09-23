'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const Team = require('../team');
const User = require('../user');
const { log, verify } = require('../util');
const { requestFrequency } = require('./commands');

module.exports = req => {
  function parseForm() {
    return new Promise((resolve, reject) => {
      req.form((formError, fields) => {
        if (formError) {
          reject(formError);
        }
        resolve(fields);
      });
    });
  }

  return parseForm().then((() => {
    var _ref = _asyncToGenerator(function* (fields) {
      let {
        team_id: teamID,
        user_id: userID,
        command, text, token
      } = log(fields);

      if (verify(token)) {
        if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
          return 'Under maintenance';
        } else {
          let user = new User(userID, teamID);
          if (yield user.isAdmin) {
            switch (command) {
              case '/nps-schedule-survey':
                let team = yield Team.of(teamID);
                if (yield team.scheduledSurvey) {
                  return 'Denied. Only one scheduled survey is allowed.';
                } else {
                  return requestFrequency(text);
                }
              default:
                return 'Invalid command';
            }
          } else {
            return 'Denied. Only team admin could issue this command.';
          }
        }
      } else {
        return 'Unknown source'; // Please install the app via LANDING_PAGE_URL
      }
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })());
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIlRlYW0iLCJVc2VyIiwibG9nIiwidmVyaWZ5IiwicmVxdWVzdEZyZXF1ZW5jeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZUZvcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJmb3JtRXJyb3IiLCJmaWVsZHMiLCJ0aGVuIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwidXNlciIsImlzQWRtaW4iLCJ0ZWFtIiwib2YiLCJzY2hlZHVsZWRTdXJ2ZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVHLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkosUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBTSxFQUFFSyxnQkFBRixLQUF1QkwsUUFBUSxZQUFSLENBQTdCOztBQUVBTSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPO0FBQ3RCLFdBQVNDLFNBQVQsR0FBc0I7QUFDcEIsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDSixVQUFJSyxJQUFKLENBQVMsQ0FBQ0MsU0FBRCxFQUFZQyxNQUFaLEtBQXVCO0FBQzlCLFlBQUlELFNBQUosRUFBZTtBQUNiRixpQkFBT0UsU0FBUDtBQUNEO0FBQ0RILGdCQUFRSSxNQUFSO0FBQ0QsT0FMRDtBQU1ELEtBUE0sQ0FBUDtBQVFEOztBQUVELFNBQU9OLFlBQVlPLElBQVo7QUFBQSxpQ0FBaUIsV0FBTUQsTUFBTixFQUFnQjtBQUN0QyxVQUFJO0FBQ0ZFLGlCQUFTQyxNQURQO0FBRUZDLGlCQUFTQyxNQUZQO0FBR0ZDLGVBSEUsRUFHT0MsSUFIUCxFQUdhQztBQUhiLFVBSUFwQixJQUFJWSxNQUFKLENBSko7O0FBTUEsVUFBSVgsT0FBT21CLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixZQUFJekIsb0JBQW9Cb0IsV0FBV25CLG1CQUFuQyxFQUF3RDtBQUN0RCxpQkFBTyxtQkFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl5QixPQUFPLElBQUl0QixJQUFKLENBQVNrQixNQUFULEVBQWlCRixNQUFqQixDQUFYO0FBQ0EsY0FBSSxNQUFNTSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLG9CQUFRSixPQUFSO0FBQ0UsbUJBQUssc0JBQUw7QUFDRSxvQkFBSUssT0FBTyxNQUFNekIsS0FBSzBCLEVBQUwsQ0FBUVQsTUFBUixDQUFqQjtBQUNBLG9CQUFJLE1BQU1RLEtBQUtFLGVBQWYsRUFBZ0M7QUFDOUIseUJBQU8sK0NBQVA7QUFDRCxpQkFGRCxNQUVPO0FBQ0wseUJBQU92QixpQkFBaUJpQixJQUFqQixDQUFQO0FBQ0Q7QUFDSDtBQUNFLHVCQUFPLGlCQUFQO0FBVEo7QUFXRCxXQVpELE1BWU87QUFDTCxtQkFBTyxtREFBUDtBQUNEO0FBQ0Y7QUFDRixPQXJCRCxNQXFCTztBQUNMLGVBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLEtBL0JNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7QUFnQ0QsQ0E1Q0QiLCJmaWxlIjoiaGFuZGxlQ29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyByZXF1ZXN0RnJlcXVlbmN5IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICBmdW5jdGlvbiBwYXJzZUZvcm0gKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXEuZm9ybSgoZm9ybUVycm9yLCBmaWVsZHMpID0+IHtcbiAgICAgICAgaWYgKGZvcm1FcnJvcikge1xuICAgICAgICAgIHJlamVjdChmb3JtRXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShmaWVsZHMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtKCkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAgIGxldCB7XG4gICAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgICBjb21tYW5kLCB0ZXh0LCB0b2tlblxuICAgIH0gPSBsb2coZmllbGRzKVxuXG4gICAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgICByZXR1cm4gJ1VuZGVyIG1haW50ZW5hbmNlJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW1JRClcbiAgICAgICAgaWYgKGF3YWl0IHVzZXIuaXNBZG1pbikge1xuICAgICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgICAgICAgICBpZiAoYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0RlbmllZC4gT25seSBvbmUgc2NoZWR1bGVkIHN1cnZleSBpcyBhbGxvd2VkLidcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdEZyZXF1ZW5jeSh0ZXh0KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgY29tbWFuZCdcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbiBjb3VsZCBpc3N1ZSB0aGlzIGNvbW1hbmQuJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnVW5rbm93biBzb3VyY2UnIC8vIFBsZWFzZSBpbnN0YWxsIHRoZSBhcHAgdmlhIExBTkRJTkdfUEFHRV9VUkxcbiAgICB9XG4gIH0pXG59XG4iXX0=