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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwiVXNlciIsImxvZyIsInZlcmlmeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJwYXJzZUZvcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJmb3JtRXJyb3IiLCJmaWVsZHMiLCJ0aGVuIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsInRlYW0iLCJpZCIsInRlYW1JRCIsInVzZXIiLCJ1c2VySUQiLCJjYWxsYmFja19pZCIsImNhbGxiYWNrIiwiYWN0aW9ucyIsInRva2VuIiwiaXNBZG1pbiIsInZhbHVlIiwidHlwZSIsInNlbGVjdGVkX29wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFRSxHQUFGLEVBQU9DLE1BQVAsS0FBa0JILFFBQVEsU0FBUixDQUF4Qjs7QUFFQUksT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0QixXQUFTQyxTQUFULEdBQXNCO0FBQ3BCLFdBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0Q0osVUFBSUssSUFBSixDQUFTLENBQUNDLFNBQUQsRUFBWUMsTUFBWixLQUF1QjtBQUM5QixZQUFJRCxTQUFKLEVBQWU7QUFDYkYsaUJBQU9FLFNBQVA7QUFDRDtBQUNESCxnQkFBUUksTUFBUjtBQUNELE9BTEQ7QUFNRCxLQVBNLENBQVA7QUFRRDs7QUFFRCxTQUFPTixZQUFZTyxJQUFaO0FBQUEsaUNBQWlCLFdBQU1ELE1BQU4sRUFBZ0I7QUFDdEM7OztBQUdBLFVBQUksRUFBRUUsT0FBRixLQUFjRixNQUFsQjtBQUNBRSxnQkFBVWIsSUFBSWMsS0FBS0MsS0FBTCxDQUFXRixPQUFYLENBQUosQ0FBVjs7QUFFQSxVQUFJO0FBQ0ZHLGNBQU0sRUFBRUMsSUFBSUMsTUFBTixFQURKO0FBRUZDLGNBQU0sRUFBRUYsSUFBSUcsTUFBTixFQUZKO0FBR0ZDLHFCQUFhQyxRQUhYO0FBSUZDLGVBSkUsRUFJT0M7QUFKUCxVQUtBWCxPQUxKOztBQU9BLFVBQUlaLE9BQU91QixLQUFQLENBQUosRUFBbUI7QUFDakIsWUFBSTVCLG9CQUFvQnNCLFdBQVdyQixtQkFBbkMsRUFBd0Q7QUFDdEQsaUJBQU8sbUJBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJc0IsT0FBTyxJQUFJcEIsSUFBSixDQUFTcUIsTUFBVCxFQUFpQkYsTUFBakIsQ0FBWDtBQUNBLGNBQUksTUFBTUMsS0FBS00sT0FBZixFQUF3QjtBQUN0QjtBQUNBLGdCQUFJQyxLQUFKO0FBQ0EsZ0JBQUlILFFBQVEsQ0FBUixFQUFXSSxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDRCxzQkFBUVosS0FBS0MsS0FBTCxDQUFXUSxRQUFRLENBQVIsRUFBV0csS0FBdEIsQ0FBUjtBQUNELGFBRkQsTUFFTyxJQUFJSCxRQUFRLENBQVIsRUFBV0ksSUFBWCxLQUFvQixRQUF4QixFQUFrQztBQUN2Q0Qsc0JBQVFaLEtBQUtDLEtBQUwsQ0FBV1EsUUFBUSxDQUFSLEVBQVdLLGdCQUFYLENBQTRCLENBQTVCLEVBQStCRixLQUExQyxDQUFSO0FBQ0QsYUFGTSxNQUVBO0FBQ0wscUJBQU8scUJBQVA7QUFDRDtBQUNELG9CQUFRSixRQUFSO0FBQ0U7QUFDRSx1QkFBTyx5QkFBUDtBQUZKO0FBSUQsV0FkRCxNQWNPO0FBQ0wsbUJBQU8sa0RBQVA7QUFDRDtBQUNGO0FBQ0YsT0F2QkQsTUF1Qk87QUFDTCxlQUFPLGdCQUFQLENBREssQ0FDbUI7QUFDekI7QUFDRixLQXhDTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBeUNELENBckREIiwiZmlsZSI6ImhhbmRsZUFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSwgREVWRUxPUE1FTlRfVEVBTV9JRCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIGZ1bmN0aW9uIHBhcnNlRm9ybSAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcS5mb3JtKChmb3JtRXJyb3IsIGZpZWxkcykgPT4ge1xuICAgICAgICBpZiAoZm9ybUVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGZvcm1FcnJvcilcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGZpZWxkcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBwYXJzZUZvcm0oKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9tZXNzYWdlLWJ1dHRvbnNcbiAgICAgKi9cbiAgICBsZXQgeyBwYXlsb2FkIH0gPSBmaWVsZHNcbiAgICBwYXlsb2FkID0gbG9nKEpTT04ucGFyc2UocGF5bG9hZCkpXG5cbiAgICBsZXQge1xuICAgICAgdGVhbTogeyBpZDogdGVhbUlEIH0sXG4gICAgICB1c2VyOiB7IGlkOiB1c2VySUQgfSxcbiAgICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFjayxcbiAgICAgIGFjdGlvbnMsIHRva2VuXG4gICAgfSA9IHBheWxvYWRcblxuICAgIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgICBpZiAoREVWRUxPUE1FTlRfTU9ERSAmJiB0ZWFtSUQgIT09IERFVkVMT1BNRU5UX1RFQU1fSUQpIHtcbiAgICAgICAgcmV0dXJuICdVbmRlciBtYWludGVuYW5jZSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtSUQpXG4gICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICAgIGxldCB2YWx1ZVxuICAgICAgICAgIGlmIChhY3Rpb25zWzBdLnR5cGUgPT09ICdidXR0b24nKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoYWN0aW9uc1swXS52YWx1ZSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbnNbMF0udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShhY3Rpb25zWzBdLnNlbGVjdGVkX29wdGlvbnNbMF0udmFsdWUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnSW52YWxpZCBhY3Rpb24gdHlwZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbiBjb3VsZCBpc3N1ZSB0aGlzIGFjdGlvbi4nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdVbmtub3duIHNvdXJjZScgLy8gUGxlYXNlIGluc3RhbGwgdGhlIGFwcCB2aWEgTEFORElOR19QQUdFX1VSTFxuICAgIH1cbiAgfSlcbn1cbiJdfQ==