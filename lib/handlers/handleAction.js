'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const { Form, log, verify } = require('../util');

module.exports = req => Form.parse(req).then((() => {
  var _ref = _asyncToGenerator(function* (fields) {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    /* eslint-disable */
    const {
      team: { id: teamID },
      callback_id: callbackID,
      trigger_id: triggerID,
      response_url: responseURL,
      actions, submission, token
    } = log(JSON.parse(fields.payload));
    const { callback, id, url } = JSON.parse(callbackID);
    /* eslint-enable */
    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return message.error.underMaintenance;
      } else {
        let choice; // eslint-disable-line
        if (actions) {
          const action = actions[0];
          if (action.type === 'button') {
            choice = action.value;
          } else if (action.type === 'select') {
            choice = action.selected_options[0].value;
          } else {
            throw new Error(message.error.invalidActionType);
          }
        }

        switch (callback) {
          default:
            throw new Error(message.error.invalidActionCallback);
        }
      }
    } else {
      throw new Error(message.error.invalidSource);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVBY3Rpb24uanMiXSwibmFtZXMiOlsiREVWRUxPUE1FTlRfTU9ERSIsIkRFVkVMT1BNRU5UX1RFQU1fSUQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIkZvcm0iLCJsb2ciLCJ2ZXJpZnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwicGFyc2UiLCJ0aGVuIiwiZmllbGRzIiwidGVhbSIsImlkIiwidGVhbUlEIiwiY2FsbGJhY2tfaWQiLCJjYWxsYmFja0lEIiwidHJpZ2dlcl9pZCIsInRyaWdnZXJJRCIsInJlc3BvbnNlX3VybCIsInJlc3BvbnNlVVJMIiwiYWN0aW9ucyIsInN1Ym1pc3Npb24iLCJ0b2tlbiIsIkpTT04iLCJwYXlsb2FkIiwiY2FsbGJhY2siLCJ1cmwiLCJlcnJvciIsInVuZGVyTWFpbnRlbmFuY2UiLCJjaG9pY2UiLCJhY3Rpb24iLCJ0eXBlIiwidmFsdWUiLCJzZWxlY3RlZF9vcHRpb25zIiwiRXJyb3IiLCJpbnZhbGlkQWN0aW9uVHlwZSIsImludmFsaWRBY3Rpb25DYWxsYmFjayIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLGdCQUFGLEVBQW9CQyxtQkFBcEIsS0FBNENDLFFBQVEsV0FBUixDQUFsRDtBQUNBLE1BQU1DLFVBQVVELFFBQVEsWUFBUixDQUFoQjtBQUNBLE1BQU0sRUFBRUUsSUFBRixFQUFRQyxHQUFSLEVBQWFDLE1BQWIsS0FBd0JKLFFBQVEsU0FBUixDQUE5Qjs7QUFFQUssT0FBT0MsT0FBUCxHQUFpQkMsT0FBT0wsS0FBS00sS0FBTCxDQUFXRCxHQUFYLEVBQWdCRSxJQUFoQjtBQUFBLCtCQUFxQixXQUFNQyxNQUFOLEVBQWdCO0FBQzNEOzs7QUFHQTtBQUNBLFVBQU07QUFDSkMsWUFBTSxFQUFFQyxJQUFJQyxNQUFOLEVBREY7QUFFSkMsbUJBQWFDLFVBRlQ7QUFHSkMsa0JBQVlDLFNBSFI7QUFJSkMsb0JBQWNDLFdBSlY7QUFLSkMsYUFMSSxFQUtLQyxVQUxMLEVBS2lCQztBQUxqQixRQU1GbkIsSUFBSW9CLEtBQUtmLEtBQUwsQ0FBV0UsT0FBT2MsT0FBbEIsQ0FBSixDQU5KO0FBT0EsVUFBTSxFQUFFQyxRQUFGLEVBQVliLEVBQVosRUFBZ0JjLEdBQWhCLEtBQXdCSCxLQUFLZixLQUFMLENBQVdPLFVBQVgsQ0FBOUI7QUFDQTtBQUNBLFFBQUlYLE9BQU9rQixLQUFQLENBQUosRUFBbUI7QUFDakIsVUFBSXhCLG9CQUFvQmUsV0FBV2QsbUJBQW5DLEVBQXdEO0FBQ3RELGVBQU9FLFFBQVEwQixLQUFSLENBQWNDLGdCQUFyQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlDLE1BQUosQ0FESyxDQUNNO0FBQ1gsWUFBSVQsT0FBSixFQUFhO0FBQ1gsZ0JBQU1VLFNBQVNWLFFBQVEsQ0FBUixDQUFmO0FBQ0EsY0FBSVUsT0FBT0MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUM1QkYscUJBQVNDLE9BQU9FLEtBQWhCO0FBQ0QsV0FGRCxNQUVPLElBQUlGLE9BQU9DLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkNGLHFCQUFTQyxPQUFPRyxnQkFBUCxDQUF3QixDQUF4QixFQUEyQkQsS0FBcEM7QUFDRCxXQUZNLE1BRUE7QUFDTCxrQkFBTSxJQUFJRSxLQUFKLENBQVVqQyxRQUFRMEIsS0FBUixDQUFjUSxpQkFBeEIsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsZ0JBQVFWLFFBQVI7QUFDRTtBQUNFLGtCQUFNLElBQUlTLEtBQUosQ0FBVWpDLFFBQVEwQixLQUFSLENBQWNTLHFCQUF4QixDQUFOO0FBRko7QUFJRDtBQUNGLEtBckJELE1BcUJPO0FBQ0wsWUFBTSxJQUFJRixLQUFKLENBQVVqQyxRQUFRMEIsS0FBUixDQUFjVSxhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQXRDdUI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBeEIiLCJmaWxlIjoiaGFuZGxlQWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFLCBERVZFTE9QTUVOVF9URUFNX0lEIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgeyBGb3JtLCBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IEZvcm0ucGFyc2UocmVxKS50aGVuKGFzeW5jIGZpZWxkcyA9PiB7XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL21lc3NhZ2UtYnV0dG9uc1xuICAgKi9cbiAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgY29uc3Qge1xuICAgIHRlYW06IHsgaWQ6IHRlYW1JRCB9LFxuICAgIGNhbGxiYWNrX2lkOiBjYWxsYmFja0lELFxuICAgIHRyaWdnZXJfaWQ6IHRyaWdnZXJJRCxcbiAgICByZXNwb25zZV91cmw6IHJlc3BvbnNlVVJMLFxuICAgIGFjdGlvbnMsIHN1Ym1pc3Npb24sIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShmaWVsZHMucGF5bG9hZCkpXG4gIGNvbnN0IHsgY2FsbGJhY2ssIGlkLCB1cmwgfSA9IEpTT04ucGFyc2UoY2FsbGJhY2tJRClcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuICBpZiAodmVyaWZ5KHRva2VuKSkge1xuICAgIGlmIChERVZFTE9QTUVOVF9NT0RFICYmIHRlYW1JRCAhPT0gREVWRUxPUE1FTlRfVEVBTV9JRCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UuZXJyb3IudW5kZXJNYWludGVuYW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY2hvaWNlIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGFjdGlvbnNbMF1cbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSAnYnV0dG9uJykge1xuICAgICAgICAgIGNob2ljZSA9IGFjdGlvbi52YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgIGNob2ljZSA9IGFjdGlvbi5zZWxlY3RlZF9vcHRpb25zWzBdLnZhbHVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZEFjdGlvblR5cGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjYWxsYmFjaykge1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmVycm9yLmludmFsaWRBY3Rpb25DYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufSlcbiJdfQ==