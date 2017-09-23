'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const User = require('../user');
const { log, verify } = require('../util');
const { scheduleSurvey } = require('./actions');

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
            /* eslint-disable */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwiVXNlciIsImxvZyIsInZlcmlmeSIsInNjaGVkdWxlU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlRm9ybSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZm9ybSIsImZvcm1FcnJvciIsImZpZWxkcyIsInRoZW4iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwidGVhbSIsImlkIiwidGVhbUlEIiwidXNlciIsInVzZXJJRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2siLCJhY3Rpb25zIiwidG9rZW4iLCJpc0FkbWluIiwidmFsdWUiLCJ0eXBlIiwic2VsZWN0ZWRfb3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVFLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkgsUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBTSxFQUFFSSxjQUFGLEtBQXFCSixRQUFRLFdBQVIsQ0FBM0I7O0FBRUFLLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU87QUFDdEIsV0FBU0MsU0FBVCxHQUFzQjtBQUNwQixXQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdENKLFVBQUlLLElBQUosQ0FBUyxDQUFDQyxTQUFELEVBQVlDLE1BQVosS0FBdUI7QUFDOUIsWUFBSUQsU0FBSixFQUFlO0FBQ2JGLGlCQUFPRSxTQUFQO0FBQ0Q7QUFDREgsZ0JBQVFJLE1BQVI7QUFDRCxPQUxEO0FBTUQsS0FQTSxDQUFQO0FBUUQ7O0FBRUQsU0FBT04sWUFBWU8sSUFBWjtBQUFBLGlDQUFpQixXQUFNRCxNQUFOLEVBQWdCO0FBQ3RDOzs7QUFHQSxVQUFJLEVBQUVFLE9BQUYsS0FBY0YsTUFBbEI7QUFDQUUsZ0JBQVVkLElBQUllLEtBQUtDLEtBQUwsQ0FBV0YsT0FBWCxDQUFKLENBQVY7O0FBRUEsVUFBSTtBQUNGRyxjQUFNLEVBQUVDLElBQUlDLE1BQU4sRUFESjtBQUVGQyxjQUFNLEVBQUVGLElBQUlHLE1BQU4sRUFGSjtBQUdGQyxxQkFBYUMsUUFIWDtBQUlGQyxlQUpFLEVBSU9DO0FBSlAsVUFLQVgsT0FMSjs7QUFPQSxVQUFJYixPQUFPd0IsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFlBQUk3QixvQkFBb0J1QixXQUFXdEIsbUJBQW5DLEVBQXdEO0FBQ3RELGlCQUFPLG1CQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSXVCLE9BQU8sSUFBSXJCLElBQUosQ0FBU3NCLE1BQVQsRUFBaUJGLE1BQWpCLENBQVg7QUFDQSxjQUFJLE1BQU1DLEtBQUtNLE9BQWYsRUFBd0I7QUFDdEI7QUFDQSxnQkFBSUMsS0FBSjtBQUNBLGdCQUFJSCxRQUFRLENBQVIsRUFBV0ksSUFBWCxLQUFvQixRQUF4QixFQUFrQztBQUNoQ0Qsc0JBQVFaLEtBQUtDLEtBQUwsQ0FBV1EsUUFBUSxDQUFSLEVBQVdHLEtBQXRCLENBQVI7QUFDRCxhQUZELE1BRU8sSUFBSUgsUUFBUSxDQUFSLEVBQVdJLElBQVgsS0FBb0IsUUFBeEIsRUFBa0M7QUFDdkNELHNCQUFRWixLQUFLQyxLQUFMLENBQVdRLFFBQVEsQ0FBUixFQUFXSyxnQkFBWCxDQUE0QixDQUE1QixFQUErQkYsS0FBMUMsQ0FBUjtBQUNELGFBRk0sTUFFQTtBQUNMLHFCQUFPLHFCQUFQO0FBQ0Q7QUFDRCxvQkFBUUosUUFBUjtBQUNFLG1CQUFLLGdCQUFMO0FBQ0UsdUJBQU9yQixlQUFlaUIsTUFBZixFQUF1QlEsS0FBdkIsQ0FBUDtBQUNGO0FBQ0UsdUJBQU8seUJBQVA7QUFKSjtBQU1ELFdBaEJELE1BZ0JPO0FBQ0wsbUJBQU8sa0RBQVA7QUFDRDtBQUNGO0FBQ0YsT0F6QkQsTUF5Qk87QUFDTCxlQUFPLGdCQUFQLENBREssQ0FDbUI7QUFDekI7QUFDRixLQTFDTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBMkNELENBdkREIiwiZmlsZSI6ImhhbmRsZUFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyBzY2hlZHVsZVN1cnZleSB9ID0gcmVxdWlyZSgnLi9hY3Rpb25zJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICBmdW5jdGlvbiBwYXJzZUZvcm0gKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXEuZm9ybSgoZm9ybUVycm9yLCBmaWVsZHMpID0+IHtcbiAgICAgICAgaWYgKGZvcm1FcnJvcikge1xuICAgICAgICAgIHJlamVjdChmb3JtRXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShmaWVsZHMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gcGFyc2VGb3JtKCkudGhlbihhc3luYyBmaWVsZHMgPT4ge1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2RvY3MvbWVzc2FnZS1idXR0b25zXG4gICAgICovXG4gICAgbGV0IHsgcGF5bG9hZCB9ID0gZmllbGRzXG4gICAgcGF5bG9hZCA9IGxvZyhKU09OLnBhcnNlKHBheWxvYWQpKVxuXG4gICAgbGV0IHtcbiAgICAgIHRlYW06IHsgaWQ6IHRlYW1JRCB9LFxuICAgICAgdXNlcjogeyBpZDogdXNlcklEIH0sXG4gICAgICBjYWxsYmFja19pZDogY2FsbGJhY2ssXG4gICAgICBhY3Rpb25zLCB0b2tlblxuICAgIH0gPSBwYXlsb2FkXG5cbiAgICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICAgIHJldHVybiAnVW5kZXIgbWFpbnRlbmFuY2UnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbUlEKVxuICAgICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgICBsZXQgdmFsdWVcbiAgICAgICAgICBpZiAoYWN0aW9uc1swXS50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGFjdGlvbnNbMF0udmFsdWUpXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb25zWzBdLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoYWN0aW9uc1swXS5zZWxlY3RlZF9vcHRpb25zWzBdLnZhbHVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIHR5cGUnXG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhc2UgJ3NjaGVkdWxlU3VydmV5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW1JRCwgdmFsdWUpXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ0RlbmllZC4gT25seSB0ZWFtIGFkbWluIGNvdWxkIGlzc3VlIHRoaXMgYWN0aW9uLidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vua25vd24gc291cmNlJyAvLyBQbGVhc2UgaW5zdGFsbCB0aGUgYXBwIHZpYSBMQU5ESU5HX1BBR0VfVVJMXG4gICAgfVxuICB9KVxufVxuIl19