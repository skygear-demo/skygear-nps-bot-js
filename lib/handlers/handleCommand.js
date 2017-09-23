'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
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
                return requestFrequency(text);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIlVzZXIiLCJsb2ciLCJ2ZXJpZnkiLCJyZXF1ZXN0RnJlcXVlbmN5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlRm9ybSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZm9ybSIsImZvcm1FcnJvciIsImZpZWxkcyIsInRoZW4iLCJ0ZWFtX2lkIiwidGVhbUlEIiwidXNlcl9pZCIsInVzZXJJRCIsImNvbW1hbmQiLCJ0ZXh0IiwidG9rZW4iLCJ1c2VyIiwiaXNBZG1pbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVFLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkgsUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBTSxFQUFFSSxnQkFBRixLQUF1QkosUUFBUSxZQUFSLENBQTdCOztBQUVBSyxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPO0FBQ3RCLFdBQVNDLFNBQVQsR0FBc0I7QUFDcEIsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDSixVQUFJSyxJQUFKLENBQVMsQ0FBQ0MsU0FBRCxFQUFZQyxNQUFaLEtBQXVCO0FBQzlCLFlBQUlELFNBQUosRUFBZTtBQUNiRixpQkFBT0UsU0FBUDtBQUNEO0FBQ0RILGdCQUFRSSxNQUFSO0FBQ0QsT0FMRDtBQU1ELEtBUE0sQ0FBUDtBQVFEOztBQUVELFNBQU9OLFlBQVlPLElBQVo7QUFBQSxpQ0FBaUIsV0FBTUQsTUFBTixFQUFnQjtBQUN0QyxVQUFJO0FBQ0ZFLGlCQUFTQyxNQURQO0FBRUZDLGlCQUFTQyxNQUZQO0FBR0ZDLGVBSEUsRUFHT0MsSUFIUCxFQUdhQztBQUhiLFVBSUFwQixJQUFJWSxNQUFKLENBSko7O0FBTUEsVUFBSVgsT0FBT21CLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixZQUFJeEIsb0JBQW9CbUIsV0FBV2xCLG1CQUFuQyxFQUF3RDtBQUN0RCxpQkFBTyxtQkFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl3QixPQUFPLElBQUl0QixJQUFKLENBQVNrQixNQUFULEVBQWlCRixNQUFqQixDQUFYO0FBQ0EsY0FBSSxNQUFNTSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLG9CQUFRSixPQUFSO0FBQ0UsbUJBQUssc0JBQUw7QUFDRSx1QkFBT2hCLGlCQUFpQmlCLElBQWpCLENBQVA7QUFDRjtBQUNFLHVCQUFPLGlCQUFQO0FBSko7QUFNRCxXQVBELE1BT087QUFDTCxtQkFBTyxtREFBUDtBQUNEO0FBQ0Y7QUFDRixPQWhCRCxNQWdCTztBQUNMLGVBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLEtBMUJNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7QUEyQkQsQ0F2Q0QiLCJmaWxlIjoiaGFuZGxlQ29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyByZXF1ZXN0RnJlcXVlbmN5IH0gPSByZXF1aXJlKCcuL2NvbW1hbmRzJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICBmdW5jdGlvbiBwYXJzZUZvcm0gKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXEuZm9ybSgoZm9ybUVycm9yLCBmaWVsZHMpID0+IHtcbiAgICAgICAgaWYgKGZvcm1FcnJvcikge1xuICAgICAgICAgIHJlamVjdChmb3JtRXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShmaWVsZHMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtKCkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAgIGxldCB7XG4gICAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgICB1c2VyX2lkOiB1c2VySUQsXG4gICAgICBjb21tYW5kLCB0ZXh0LCB0b2tlblxuICAgIH0gPSBsb2coZmllbGRzKVxuXG4gICAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgICByZXR1cm4gJ1VuZGVyIG1haW50ZW5hbmNlJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW1JRClcbiAgICAgICAgaWYgKGF3YWl0IHVzZXIuaXNBZG1pbikge1xuICAgICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgICAgY2FzZSAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdEZyZXF1ZW5jeSh0ZXh0KVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICdJbnZhbGlkIGNvbW1hbmQnXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnRGVuaWVkLiBPbmx5IHRlYW0gYWRtaW4gY291bGQgaXNzdWUgdGhpcyBjb21tYW5kLidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vua25vd24gc291cmNlJyAvLyBQbGVhc2UgaW5zdGFsbCB0aGUgYXBwIHZpYSBMQU5ESU5HX1BBR0VfVVJMXG4gICAgfVxuICB9KVxufVxuIl19