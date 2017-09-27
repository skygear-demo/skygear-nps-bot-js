'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const User = require('../user');
const { log, verify } = require('../util');
const { requestFrequency, unscheduleSurvey } = require('./commands');

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
              case '/nps-unschedule-survey':
                return unscheduleSurvey(teamID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIlVzZXIiLCJsb2ciLCJ2ZXJpZnkiLCJyZXF1ZXN0RnJlcXVlbmN5IiwidW5zY2hlZHVsZVN1cnZleSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZUZvcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJmb3JtRXJyb3IiLCJmaWVsZHMiLCJ0aGVuIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJjb21tYW5kIiwidGV4dCIsInRva2VuIiwidXNlciIsImlzQWRtaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFRSxHQUFGLEVBQU9DLE1BQVAsS0FBa0JILFFBQVEsU0FBUixDQUF4QjtBQUNBLE1BQU0sRUFBRUksZ0JBQUYsRUFBb0JDLGdCQUFwQixLQUF5Q0wsUUFBUSxZQUFSLENBQS9DOztBQUVBTSxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPO0FBQ3RCLFdBQVNDLFNBQVQsR0FBc0I7QUFDcEIsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDSixVQUFJSyxJQUFKLENBQVMsQ0FBQ0MsU0FBRCxFQUFZQyxNQUFaLEtBQXVCO0FBQzlCLFlBQUlELFNBQUosRUFBZTtBQUNiRixpQkFBT0UsU0FBUDtBQUNEO0FBQ0RILGdCQUFRSSxNQUFSO0FBQ0QsT0FMRDtBQU1ELEtBUE0sQ0FBUDtBQVFEOztBQUVELFNBQU9OLFlBQVlPLElBQVo7QUFBQSxpQ0FBaUIsV0FBTUQsTUFBTixFQUFnQjtBQUN0QyxVQUFJO0FBQ0ZFLGlCQUFTQyxNQURQO0FBRUZDLGlCQUFTQyxNQUZQO0FBR0ZDLGVBSEUsRUFHT0MsSUFIUCxFQUdhQztBQUhiLFVBSUFyQixJQUFJYSxNQUFKLENBSko7O0FBTUEsVUFBSVosT0FBT29CLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixZQUFJekIsb0JBQW9Cb0IsV0FBV25CLG1CQUFuQyxFQUF3RDtBQUN0RCxpQkFBTyxtQkFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl5QixPQUFPLElBQUl2QixJQUFKLENBQVNtQixNQUFULEVBQWlCRixNQUFqQixDQUFYO0FBQ0EsY0FBSSxNQUFNTSxLQUFLQyxPQUFmLEVBQXdCO0FBQ3RCLG9CQUFRSixPQUFSO0FBQ0UsbUJBQUssc0JBQUw7QUFDRSx1QkFBT2pCLGlCQUFpQmtCLElBQWpCLENBQVA7QUFDRixtQkFBSyx3QkFBTDtBQUNFLHVCQUFPakIsaUJBQWlCYSxNQUFqQixDQUFQO0FBQ0Y7QUFDRSx1QkFBTyxpQkFBUDtBQU5KO0FBUUQsV0FURCxNQVNPO0FBQ0wsbUJBQU8sbURBQVA7QUFDRDtBQUNGO0FBQ0YsT0FsQkQsTUFrQk87QUFDTCxlQUFPLGdCQUFQLENBREssQ0FDbUI7QUFDekI7QUFDRixLQTVCTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBNkJELENBekNEIiwiZmlsZSI6ImhhbmRsZUNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgcmVxdWVzdEZyZXF1ZW5jeSwgdW5zY2hlZHVsZVN1cnZleSB9ID0gcmVxdWlyZSgnLi9jb21tYW5kcycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IHtcbiAgZnVuY3Rpb24gcGFyc2VGb3JtICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxLmZvcm0oKGZvcm1FcnJvciwgZmllbGRzKSA9PiB7XG4gICAgICAgIGlmIChmb3JtRXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZm9ybUVycm9yKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZmllbGRzKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlRm9ybSgpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgICBsZXQge1xuICAgICAgdGVhbV9pZDogdGVhbUlELFxuICAgICAgdXNlcl9pZDogdXNlcklELFxuICAgICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgICB9ID0gbG9nKGZpZWxkcylcblxuICAgIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgICAgcmV0dXJuICdVbmRlciBtYWludGVuYW5jZSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtSUQpXG4gICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtc2NoZWR1bGUtc3VydmV5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RGcmVxdWVuY3kodGV4dClcbiAgICAgICAgICAgIGNhc2UgJy9ucHMtdW5zY2hlZHVsZS1zdXJ2ZXknOlxuICAgICAgICAgICAgICByZXR1cm4gdW5zY2hlZHVsZVN1cnZleSh0ZWFtSUQpXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgY29tbWFuZCdcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbiBjb3VsZCBpc3N1ZSB0aGlzIGNvbW1hbmQuJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnVW5rbm93biBzb3VyY2UnIC8vIFBsZWFzZSBpbnN0YWxsIHRoZSBhcHAgdmlhIExBTkRJTkdfUEFHRV9VUkxcbiAgICB9XG4gIH0pXG59XG4iXX0=