'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const User = require('../user');
const { log, verify } = require('../util');
const { scheduleSurvey, saveScoreAndRequestReason, completeReply } = require('./actions');

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
              case 'completeReply':
                return completeReply(userID, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwiVXNlciIsImxvZyIsInZlcmlmeSIsInNjaGVkdWxlU3VydmV5Iiwic2F2ZVNjb3JlQW5kUmVxdWVzdFJlYXNvbiIsImNvbXBsZXRlUmVwbHkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2VGb3JtIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmb3JtIiwiZm9ybUVycm9yIiwiZmllbGRzIiwidGhlbiIsInBheWxvYWQiLCJKU09OIiwicGFyc2UiLCJ0ZWFtIiwiaWQiLCJ0ZWFtSUQiLCJ1c2VyIiwidXNlcklEIiwiY2FsbGJhY2tfaWQiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0b2tlbiIsImlzQWRtaW4iLCJ2YWx1ZSIsInR5cGUiLCJzZWxlY3RlZF9vcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxnQkFBRixFQUFvQkMsbUJBQXBCLEtBQTRDQyxRQUFRLFdBQVIsQ0FBbEQ7QUFDQSxNQUFNQyxPQUFPRCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUUsR0FBRixFQUFPQyxNQUFQLEtBQWtCSCxRQUFRLFNBQVIsQ0FBeEI7QUFDQSxNQUFNLEVBQUVJLGNBQUYsRUFBa0JDLHlCQUFsQixFQUE2Q0MsYUFBN0MsS0FBK0ROLFFBQVEsV0FBUixDQUFyRTs7QUFFQU8sT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0QixXQUFTQyxTQUFULEdBQXNCO0FBQ3BCLFdBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0Q0osVUFBSUssSUFBSixDQUFTLENBQUNDLFNBQUQsRUFBWUMsTUFBWixLQUF1QjtBQUM5QixZQUFJRCxTQUFKLEVBQWU7QUFDYkYsaUJBQU9FLFNBQVA7QUFDRDtBQUNESCxnQkFBUUksTUFBUjtBQUNELE9BTEQ7QUFNRCxLQVBNLENBQVA7QUFRRDs7QUFFRCxTQUFPTixZQUFZTyxJQUFaO0FBQUEsaUNBQWlCLFdBQU1ELE1BQU4sRUFBZ0I7QUFDdEM7OztBQUdBLFVBQUksRUFBRUUsT0FBRixLQUFjRixNQUFsQjtBQUNBRSxnQkFBVWhCLElBQUlpQixLQUFLQyxLQUFMLENBQVdGLE9BQVgsQ0FBSixDQUFWOztBQUVBLFVBQUk7QUFDRkcsY0FBTSxFQUFFQyxJQUFJQyxNQUFOLEVBREo7QUFFRkMsY0FBTSxFQUFFRixJQUFJRyxNQUFOLEVBRko7QUFHRkMscUJBQWFDLFFBSFg7QUFJRkMsZUFKRSxFQUlPQztBQUpQLFVBS0FYLE9BTEo7O0FBT0EsVUFBSWYsT0FBTzBCLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixZQUFJL0Isb0JBQW9CeUIsV0FBV3hCLG1CQUFuQyxFQUF3RDtBQUN0RCxpQkFBTyxtQkFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl5QixPQUFPLElBQUl2QixJQUFKLENBQVN3QixNQUFULEVBQWlCRixNQUFqQixDQUFYO0FBQ0EsY0FBSSxNQUFNQyxLQUFLTSxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFJQyxLQUFKO0FBQ0EsZ0JBQUlILFFBQVEsQ0FBUixFQUFXSSxJQUFYLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ2hDRCxzQkFBUVosS0FBS0MsS0FBTCxDQUFXUSxRQUFRLENBQVIsRUFBV0csS0FBdEIsQ0FBUjtBQUNELGFBRkQsTUFFTyxJQUFJSCxRQUFRLENBQVIsRUFBV0ksSUFBWCxLQUFvQixRQUF4QixFQUFrQztBQUN2Q0Qsc0JBQVFaLEtBQUtDLEtBQUwsQ0FBV1EsUUFBUSxDQUFSLEVBQVdLLGdCQUFYLENBQTRCLENBQTVCLEVBQStCRixLQUExQyxDQUFSO0FBQ0QsYUFGTSxNQUVBO0FBQ0wscUJBQU8scUJBQVA7QUFDRDtBQUNELG9CQUFRSixRQUFSO0FBQ0UsbUJBQUssZ0JBQUw7QUFDRSx1QkFBT3ZCLGVBQWVtQixNQUFmLEVBQXVCUSxLQUF2QixDQUFQO0FBQ0YsbUJBQUssMkJBQUw7QUFDRSx1QkFBTzFCLDBCQUEwQm9CLE1BQTFCLEVBQWtDTSxLQUFsQyxDQUFQO0FBQ0YsbUJBQUssZUFBTDtBQUNFLHVCQUFPekIsY0FBY21CLE1BQWQsRUFBc0JNLEtBQXRCLENBQVA7QUFDRjtBQUNFLHVCQUFPLHlCQUFQO0FBUko7QUFVRCxXQW5CRCxNQW1CTztBQUNMLG1CQUFPLGtEQUFQO0FBQ0Q7QUFDRjtBQUNGLE9BNUJELE1BNEJPO0FBQ0wsZUFBTyxnQkFBUCxDQURLLENBQ21CO0FBQ3pCO0FBQ0YsS0E3Q007O0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBUDtBQThDRCxDQTFERCIsImZpbGUiOiJoYW5kbGVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2NoZWR1bGVTdXJ2ZXksIHNhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24sIGNvbXBsZXRlUmVwbHkgfSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IHtcbiAgZnVuY3Rpb24gcGFyc2VGb3JtICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxLmZvcm0oKGZvcm1FcnJvciwgZmllbGRzKSA9PiB7XG4gICAgICAgIGlmIChmb3JtRXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZm9ybUVycm9yKVxuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZmllbGRzKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlRm9ybSgpLnRoZW4oYXN5bmMgZmllbGRzID0+IHtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL21lc3NhZ2UtYnV0dG9uc1xuICAgICAqL1xuICAgIGxldCB7IHBheWxvYWQgfSA9IGZpZWxkc1xuICAgIHBheWxvYWQgPSBsb2coSlNPTi5wYXJzZShwYXlsb2FkKSlcblxuICAgIGxldCB7XG4gICAgICB0ZWFtOiB7IGlkOiB0ZWFtSUQgfSxcbiAgICAgIHVzZXI6IHsgaWQ6IHVzZXJJRCB9LFxuICAgICAgY2FsbGJhY2tfaWQ6IGNhbGxiYWNrLFxuICAgICAgYWN0aW9ucywgdG9rZW5cbiAgICB9ID0gcGF5bG9hZFxuXG4gICAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgICByZXR1cm4gJ1VuZGVyIG1haW50ZW5hbmNlJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHVzZXIgPSBuZXcgVXNlcih1c2VySUQsIHRlYW1JRClcbiAgICAgICAgaWYgKGF3YWl0IHVzZXIuaXNBZG1pbikge1xuICAgICAgICAgIGxldCB2YWx1ZVxuICAgICAgICAgIGlmIChhY3Rpb25zWzBdLnR5cGUgPT09ICdidXR0b24nKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoYWN0aW9uc1swXS52YWx1ZSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbnNbMF0udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShhY3Rpb25zWzBdLnNlbGVjdGVkX29wdGlvbnNbMF0udmFsdWUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnSW52YWxpZCBhY3Rpb24gdHlwZSdcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FzZSAnc2NoZWR1bGVTdXJ2ZXknOlxuICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVTdXJ2ZXkodGVhbUlELCB2YWx1ZSlcbiAgICAgICAgICAgIGNhc2UgJ3NhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24nOlxuICAgICAgICAgICAgICByZXR1cm4gc2F2ZVNjb3JlQW5kUmVxdWVzdFJlYXNvbih1c2VySUQsIHZhbHVlKVxuICAgICAgICAgICAgY2FzZSAnY29tcGxldGVSZXBseSc6XG4gICAgICAgICAgICAgIHJldHVybiBjb21wbGV0ZVJlcGx5KHVzZXJJRCwgdmFsdWUpXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ0RlbmllZC4gT25seSB0ZWFtIGFkbWluIGNvdWxkIGlzc3VlIHRoaXMgYWN0aW9uLidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vua25vd24gc291cmNlJyAvLyBQbGVhc2UgaW5zdGFsbCB0aGUgYXBwIHZpYSBMQU5ESU5HX1BBR0VfVVJMXG4gICAgfVxuICB9KVxufVxuIl19