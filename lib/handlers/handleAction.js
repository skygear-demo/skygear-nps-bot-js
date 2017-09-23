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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwiVXNlciIsImxvZyIsInZlcmlmeSIsInNjaGVkdWxlU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInBhcnNlRm9ybSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZm9ybSIsImZvcm1FcnJvciIsImZpZWxkcyIsInRoZW4iLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwidGVhbSIsImlkIiwidGVhbUlEIiwidXNlciIsInVzZXJJRCIsImNhbGxiYWNrX2lkIiwiY2FsbGJhY2siLCJhY3Rpb25zIiwidG9rZW4iLCJpc0FkbWluIiwidmFsdWUiLCJ0eXBlIiwic2VsZWN0ZWRfb3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVFLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkgsUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBTSxFQUFFSSxjQUFGLEtBQXFCSixRQUFRLFdBQVIsQ0FBM0I7O0FBRUFLLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU87QUFDdEIsV0FBU0MsU0FBVCxHQUFzQjtBQUNwQixXQUFPLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDdENKLFVBQUlLLElBQUosQ0FBUyxDQUFDQyxTQUFELEVBQVlDLE1BQVosS0FBdUI7QUFDOUIsWUFBSUQsU0FBSixFQUFlO0FBQ2JGLGlCQUFPRSxTQUFQO0FBQ0Q7QUFDREgsZ0JBQVFJLE1BQVI7QUFDRCxPQUxEO0FBTUQsS0FQTSxDQUFQO0FBUUQ7O0FBRUQsU0FBT04sWUFBWU8sSUFBWjtBQUFBLGlDQUFpQixXQUFNRCxNQUFOLEVBQWdCO0FBQ3RDOzs7QUFHQSxVQUFJLEVBQUVFLE9BQUYsS0FBY0YsTUFBbEI7QUFDQUUsZ0JBQVVkLElBQUllLEtBQUtDLEtBQUwsQ0FBV0YsT0FBWCxDQUFKLENBQVY7O0FBRUEsVUFBSTtBQUNGRyxjQUFNLEVBQUVDLElBQUlDLE1BQU4sRUFESjtBQUVGQyxjQUFNLEVBQUVGLElBQUlHLE1BQU4sRUFGSjtBQUdGQyxxQkFBYUMsUUFIWDtBQUlGQyxlQUpFLEVBSU9DO0FBSlAsVUFLQVgsT0FMSjs7QUFPQSxVQUFJYixPQUFPd0IsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFlBQUk3QixvQkFBb0J1QixXQUFXdEIsbUJBQW5DLEVBQXdEO0FBQ3RELGlCQUFPLG1CQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBSXVCLE9BQU8sSUFBSXJCLElBQUosQ0FBU3NCLE1BQVQsRUFBaUJGLE1BQWpCLENBQVg7QUFDQSxjQUFJLE1BQU1DLEtBQUtNLE9BQWYsRUFBd0I7QUFDdEIsZ0JBQUlDLEtBQUo7QUFDQSxnQkFBSUgsUUFBUSxDQUFSLEVBQVdJLElBQVgsS0FBb0IsUUFBeEIsRUFBa0M7QUFDaENELHNCQUFRWixLQUFLQyxLQUFMLENBQVdRLFFBQVEsQ0FBUixFQUFXRyxLQUF0QixDQUFSO0FBQ0QsYUFGRCxNQUVPLElBQUlILFFBQVEsQ0FBUixFQUFXSSxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ3ZDRCxzQkFBUVosS0FBS0MsS0FBTCxDQUFXUSxRQUFRLENBQVIsRUFBV0ssZ0JBQVgsQ0FBNEIsQ0FBNUIsRUFBK0JGLEtBQTFDLENBQVI7QUFDRCxhQUZNLE1BRUE7QUFDTCxxQkFBTyxxQkFBUDtBQUNEO0FBQ0Qsb0JBQVFKLFFBQVI7QUFDRSxtQkFBSyxnQkFBTDtBQUNFLHVCQUFPckIsZUFBZWlCLE1BQWYsRUFBdUJRLEtBQXZCLENBQVA7QUFDRjtBQUNFLHVCQUFPLHlCQUFQO0FBSko7QUFNRCxXQWZELE1BZU87QUFDTCxtQkFBTyxrREFBUDtBQUNEO0FBQ0Y7QUFDRixPQXhCRCxNQXdCTztBQUNMLGVBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLEtBekNNOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7QUEwQ0QsQ0F0REQiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNjaGVkdWxlU3VydmV5IH0gPSByZXF1aXJlKCcuL2FjdGlvbnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIGZ1bmN0aW9uIHBhcnNlRm9ybSAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcS5mb3JtKChmb3JtRXJyb3IsIGZpZWxkcykgPT4ge1xuICAgICAgICBpZiAoZm9ybUVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGZvcm1FcnJvcilcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGZpZWxkcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm0oKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICAgKi9cbiAgICBsZXQgeyBwYXlsb2FkIH0gPSBmaWVsZHNcbiAgICBwYXlsb2FkID0gbG9nKEpTT04ucGFyc2UocGF5bG9hZCkpXG5cbiAgICBsZXQge1xuICAgICAgdGVhbTogeyBpZDogdGVhbUlEIH0sXG4gICAgICB1c2VyOiB7IGlkOiB1c2VySUQgfSxcbiAgICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFjayxcbiAgICAgIGFjdGlvbnMsIHRva2VuXG4gICAgfSA9IHBheWxvYWRcblxuICAgIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgICAgcmV0dXJuICdVbmRlciBtYWludGVuYW5jZSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtSUQpXG4gICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICBsZXQgdmFsdWVcbiAgICAgICAgICBpZiAoYWN0aW9uc1swXS50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGFjdGlvbnNbMF0udmFsdWUpXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb25zWzBdLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoYWN0aW9uc1swXS5zZWxlY3RlZF9vcHRpb25zWzBdLnZhbHVlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIHR5cGUnXG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhc2UgJ3NjaGVkdWxlU3VydmV5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlU3VydmV5KHRlYW1JRCwgdmFsdWUpXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ0RlbmllZC4gT25seSB0ZWFtIGFkbWluIGNvdWxkIGlzc3VlIHRoaXMgYWN0aW9uLidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vua25vd24gc291cmNlJyAvLyBQbGVhc2UgaW5zdGFsbCB0aGUgYXBwIHZpYSBMQU5ESU5HX1BBR0VfVVJMXG4gICAgfVxuICB9KVxufVxuIl19