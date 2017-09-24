'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const User = require('../user');
const { log, verify } = require('../util');
const { scheduleSurvey, saveScoreAndRequestReason } = require('./actions');

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
      /**
       * @see https://api.slack.com/docs/message-buttons
       */
      let { payload } = fields;
      payload = log(JSON.parse(payload));

      let {
        team: { id: teamID },
        user: { id: userID },
        callback_id: callback,
        actions, token
      } = payload;

      if (verify(token)) {
        if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
          return 'Under maintenance';
        } else {
          let user = new User(userID, teamID);
          if (yield user.isAdmin) {
            let value;
            if (actions[0].type === 'button') {
              value = JSON.parse(actions[0].value);
            } else if (actions[0].type === 'select') {
              value = JSON.parse(actions[0].selected_options[0].value);
            } else {
              return 'Invalid action type';
            }
            switch (callback) {
              case 'scheduleSurvey':
                return scheduleSurvey(teamID, value);
              case 'saveScoreAndRequestReason':
                return saveScoreAndRequestReason(userID, value);
              default:
                return 'Invalid action callback';
            }
          } else {
            return 'Denied. Only team admin could issue this action.';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwiVXNlciIsImxvZyIsInZlcmlmeSIsInNjaGVkdWxlU3VydmV5Iiwic2F2ZVNjb3JlQW5kUmVxdWVzdFJlYXNvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZUZvcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJmb3JtRXJyb3IiLCJmaWVsZHMiLCJ0aGVuIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsInRlYW0iLCJpZCIsInRlYW1JRCIsInVzZXIiLCJ1c2VySUQiLCJjYWxsYmFja19pZCIsImNhbGxiYWNrIiwiYWN0aW9ucyIsInRva2VuIiwiaXNBZG1pbiIsInZhbHVlIiwidHlwZSIsInNlbGVjdGVkX29wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFRSxHQUFGLEVBQU9DLE1BQVAsS0FBa0JILFFBQVEsU0FBUixDQUF4QjtBQUNBLE1BQU0sRUFBRUksY0FBRixFQUFrQkMseUJBQWxCLEtBQWdETCxRQUFRLFdBQVIsQ0FBdEQ7O0FBRUFNLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU87QUFDdEIsV0FBU0MsU0FBVCxHQUFzQjtBQUNwQixXQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdENKLFVBQUlLLElBQUosQ0FBUyxDQUFDQyxTQUFELEVBQVlDLE1BQVosS0FBdUI7QUFDOUIsWUFBSUQsU0FBSixFQUFlO0FBQ2JGLGlCQUFPRSxTQUFQO0FBQ0Q7QUFDREgsZ0JBQVFJLE1BQVI7QUFDRCxPQUxEO0FBTUQsS0FQTSxDQUFQO0FBUUQ7O0FBRUQsU0FBT04sWUFBWU8sSUFBWjtBQUFBLGlDQUFpQixXQUFNRCxNQUFOLEVBQWdCO0FBQ3RDOzs7QUFHQSxVQUFJLEVBQUVFLE9BQUYsS0FBY0YsTUFBbEI7QUFDQUUsZ0JBQVVmLElBQUlnQixLQUFLQyxLQUFMLENBQVdGLE9BQVgsQ0FBSixDQUFWOztBQUVBLFVBQUk7QUFDRkcsY0FBTSxFQUFFQyxJQUFJQyxNQUFOLEVBREo7QUFFRkMsY0FBTSxFQUFFRixJQUFJRyxNQUFOLEVBRko7QUFHRkMscUJBQWFDLFFBSFg7QUFJRkMsZUFKRSxFQUlPQztBQUpQLFVBS0FYLE9BTEo7O0FBT0EsVUFBSWQsT0FBT3lCLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixZQUFJOUIsb0JBQW9Cd0IsV0FBV3ZCLG1CQUFuQyxFQUF3RDtBQUN0RCxpQkFBTyxtQkFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl3QixPQUFPLElBQUl0QixJQUFKLENBQVN1QixNQUFULEVBQWlCRixNQUFqQixDQUFYO0FBQ0EsY0FBSSxNQUFNQyxLQUFLTSxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFJQyxLQUFKO0FBQ0EsZ0JBQUlILFFBQVEsQ0FBUixFQUFXSSxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDRCxzQkFBUVosS0FBS0MsS0FBTCxDQUFXUSxRQUFRLENBQVIsRUFBV0csS0FBdEIsQ0FBUjtBQUNELGFBRkQsTUFFTyxJQUFJSCxRQUFRLENBQVIsRUFBV0ksSUFBWCxLQUFvQixRQUF4QixFQUFrQztBQUN2Q0Qsc0JBQVFaLEtBQUtDLEtBQUwsQ0FBV1EsUUFBUSxDQUFSLEVBQVdLLGdCQUFYLENBQTRCLENBQTVCLEVBQStCRixLQUExQyxDQUFSO0FBQ0QsYUFGTSxNQUVBO0FBQ0wscUJBQU8scUJBQVA7QUFDRDtBQUNELG9CQUFRSixRQUFSO0FBQ0UsbUJBQUssZ0JBQUw7QUFDRSx1QkFBT3RCLGVBQWVrQixNQUFmLEVBQXVCUSxLQUF2QixDQUFQO0FBQ0YsbUJBQUssMkJBQUw7QUFDRSx1QkFBT3pCLDBCQUEwQm1CLE1BQTFCLEVBQWtDTSxLQUFsQyxDQUFQO0FBQ0Y7QUFDRSx1QkFBTyx5QkFBUDtBQU5KO0FBUUQsV0FqQkQsTUFpQk87QUFDTCxtQkFBTyxrREFBUDtBQUNEO0FBQ0Y7QUFDRixPQTFCRCxNQTBCTztBQUNMLGVBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLEtBM0NNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7QUE0Q0QsQ0F4REQiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5LCBzYXZlU2NvcmVBbmRSZXF1ZXN0UmVhc29uIH0gPSByZXF1aXJlKCcuL2FjdGlvbnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIGZ1bmN0aW9uIHBhcnNlRm9ybSAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcS5mb3JtKChmb3JtRXJyb3IsIGZpZWxkcykgPT4ge1xuICAgICAgICBpZiAoZm9ybUVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGZvcm1FcnJvcilcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGZpZWxkcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm0oKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICAgKi9cbiAgICBsZXQgeyBwYXlsb2FkIH0gPSBmaWVsZHNcbiAgICBwYXlsb2FkID0gbG9nKEpTT04ucGFyc2UocGF5bG9hZCkpXG5cbiAgICBsZXQge1xuICAgICAgdGVhbTogeyBpZDogdGVhbUlEIH0sXG4gICAgICB1c2VyOiB7IGlkOiB1c2VySUQgfSxcbiAgICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFjayxcbiAgICAgIGFjdGlvbnMsIHRva2VuXG4gICAgfSA9IHBheWxvYWRcblxuICAgIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgICAgcmV0dXJuICdVbmRlciBtYWludGVuYW5jZSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtSUQpXG4gICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICBsZXQgdmFsdWVcbiAgICAgICAgICBpZiAoYWN0aW9uc1swXS50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGFjdGlvbnNbMF0udmFsdWUpXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb25zWzBdLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoYWN0aW9uc1swXS5zZWxlY3RlZF9vcHRpb25zWzBdLnZhbHVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIHR5cGUnXG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhc2UgJ3NjaGVkdWxlU3VydmV5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW1JRCwgdmFsdWUpXG4gICAgICAgICAgICBjYXNlICdzYXZlU2NvcmVBbmRSZXF1ZXN0UmVhc29uJzpcbiAgICAgICAgICAgICAgcmV0dXJuIHNhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24odXNlcklELCB2YWx1ZSlcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAnSW52YWxpZCBhY3Rpb24gY2FsbGJhY2snXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnRGVuaWVkLiBPbmx5IHRlYW0gYWRtaW4gY291bGQgaXNzdWUgdGhpcyBhY3Rpb24uJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnVW5rbm93biBzb3VyY2UnIC8vIFBsZWFzZSBpbnN0YWxsIHRoZSBhcHAgdmlhIExBTkRJTkdfUEFHRV9VUkxcbiAgICB9XG4gIH0pXG59XG4iXX0=