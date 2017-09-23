'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const User = require('../user');
const { log, verify } = require('../util');

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
      /* eslint-disable */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVDb21tYW5kLmpzIl0sIm5hbWVzIjpbIkRFVkVMT1BNRU5UX01PREUiLCJERVZFTE9QTUVOVF9URUFNX0lEIiwicmVxdWlyZSIsIlVzZXIiLCJsb2ciLCJ2ZXJpZnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2VGb3JtIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmb3JtIiwiZm9ybUVycm9yIiwiZmllbGRzIiwidGhlbiIsInRlYW1faWQiLCJ0ZWFtSUQiLCJ1c2VyX2lkIiwidXNlcklEIiwiY29tbWFuZCIsInRleHQiLCJ0b2tlbiIsInVzZXIiLCJpc0FkbWluIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxPQUFPRCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUUsR0FBRixFQUFPQyxNQUFQLEtBQWtCSCxRQUFRLFNBQVIsQ0FBeEI7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU87QUFDdEIsV0FBU0MsU0FBVCxHQUFzQjtBQUNwQixXQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdENKLFVBQUlLLElBQUosQ0FBUyxDQUFDQyxTQUFELEVBQVlDLE1BQVosS0FBdUI7QUFDOUIsWUFBSUQsU0FBSixFQUFlO0FBQ2JGLGlCQUFPRSxTQUFQO0FBQ0Q7QUFDREgsZ0JBQVFJLE1BQVI7QUFDRCxPQUxEO0FBTUQsS0FQTSxDQUFQO0FBUUQ7O0FBRUQsU0FBT04sWUFBWU8sSUFBWjtBQUFBLGlDQUFpQixXQUFNRCxNQUFOLEVBQWdCO0FBQ3RDO0FBQ0EsVUFBSTtBQUNGRSxpQkFBU0MsTUFEUDtBQUVGQyxpQkFBU0MsTUFGUDtBQUdGQyxlQUhFLEVBR09DLElBSFAsRUFHYUM7QUFIYixVQUlBbkIsSUFBSVcsTUFBSixDQUpKOztBQU1BLFVBQUlWLE9BQU9rQixLQUFQLENBQUosRUFBbUI7QUFDakIsWUFBSXZCLG9CQUFvQmtCLFdBQVdqQixtQkFBbkMsRUFBd0Q7QUFDdEQsaUJBQU8sbUJBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJdUIsT0FBTyxJQUFJckIsSUFBSixDQUFTaUIsTUFBVCxFQUFpQkYsTUFBakIsQ0FBWDtBQUNBLGNBQUksTUFBTU0sS0FBS0MsT0FBZixFQUF3QjtBQUN0QixvQkFBUUosT0FBUjtBQUNFO0FBQ0UsdUJBQU8saUJBQVA7QUFGSjtBQUlELFdBTEQsTUFLTztBQUNMLG1CQUFPLG1EQUFQO0FBQ0Q7QUFDRjtBQUNGLE9BZEQsTUFjTztBQUNMLGVBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLEtBekJNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7QUEwQkQsQ0F0Q0QiLCJmaWxlIjoiaGFuZGxlQ29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIGZ1bmN0aW9uIHBhcnNlRm9ybSAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcS5mb3JtKChmb3JtRXJyb3IsIGZpZWxkcykgPT4ge1xuICAgICAgICBpZiAoZm9ybUVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGZvcm1FcnJvcilcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGZpZWxkcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm0oKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBsZXQge1xuICAgICAgdGVhbV9pZDogdGVhbUlELFxuICAgICAgdXNlcl9pZDogdXNlcklELFxuICAgICAgY29tbWFuZCwgdGV4dCwgdG9rZW5cbiAgICB9ID0gbG9nKGZpZWxkcylcblxuICAgIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgICAgcmV0dXJuICdVbmRlciBtYWludGVuYW5jZSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtSUQpXG4gICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAnSW52YWxpZCBjb21tYW5kJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ0RlbmllZC4gT25seSB0ZWFtIGFkbWluIGNvdWxkIGlzc3VlIHRoaXMgY29tbWFuZC4nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdVbmtub3duIHNvdXJjZScgLy8gUGxlYXNlIGluc3RhbGwgdGhlIGFwcCB2aWEgTEFORElOR19QQUdFX1VSTFxuICAgIH1cbiAgfSlcbn1cbiJdfQ==