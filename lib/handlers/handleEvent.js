'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config');
const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { log, verify } = require('../util');
const { showCommandButtons } = require('./events');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (req) {
    /**
     * @see https://api.slack.com/events-api#receiving_events
     */
    const {
      team_id: teamID,
      challenge, event, token
    } = log(JSON.parse(req.body));

    if (verify(token)) {
      // one-time verification to enable event subscription
      if (challenge) {
        return challenge;
      }

      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return message.error.underMaintenance;
      } else {
        let {
          channel: channelID,
          user: userID,
          type
        } = event;

        const team = yield Team.of(teamID);
        switch (type) {
          case 'message':
            // ignore bot messages, avoid loop with self
            if (userID) {
              const user = new User(userID, team);
              if (yield user.isAdmin) {
                showCommandButtons(team, channelID, true);
              }
            }
            break;
          default:
            break;
        }
      }
    } else {
      throw new Error(message.error.invalidSource);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJERVZFTE9QTUVOVF9NT0RFIiwiREVWRUxPUE1FTlRfVEVBTV9JRCIsInJlcXVpcmUiLCJtZXNzYWdlIiwiVGVhbSIsIlVzZXIiLCJsb2ciLCJ2ZXJpZnkiLCJzaG93Q29tbWFuZEJ1dHRvbnMiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwidGVhbV9pZCIsInRlYW1JRCIsImNoYWxsZW5nZSIsImV2ZW50IiwidG9rZW4iLCJKU09OIiwicGFyc2UiLCJib2R5IiwiZXJyb3IiLCJ1bmRlck1haW50ZW5hbmNlIiwiY2hhbm5lbCIsImNoYW5uZWxJRCIsInVzZXIiLCJ1c2VySUQiLCJ0eXBlIiwidGVhbSIsIm9mIiwiaXNBZG1pbiIsIkVycm9yIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsZ0JBQUYsRUFBb0JDLG1CQUFwQixLQUE0Q0MsUUFBUSxXQUFSLENBQWxEO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksR0FBRixFQUFPQyxNQUFQLEtBQWtCTCxRQUFRLFNBQVIsQ0FBeEI7QUFDQSxNQUFNLEVBQUVNLGtCQUFGLEtBQXlCTixRQUFRLFVBQVIsQ0FBL0I7O0FBRUFPLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsR0FBTixFQUFhO0FBQzVCOzs7QUFHQSxVQUFNO0FBQ0pDLGVBQVNDLE1BREw7QUFFSkMsZUFGSSxFQUVPQyxLQUZQLEVBRWNDO0FBRmQsUUFHRlYsSUFBSVcsS0FBS0MsS0FBTCxDQUFXUCxJQUFJUSxJQUFmLENBQUosQ0FISjs7QUFLQSxRQUFJWixPQUFPUyxLQUFQLENBQUosRUFBbUI7QUFDakI7QUFDQSxVQUFJRixTQUFKLEVBQWU7QUFDYixlQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsVUFBSWQsb0JBQW9CYSxXQUFXWixtQkFBbkMsRUFBd0Q7QUFDdEQsZUFBT0UsUUFBUWlCLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSTtBQUNGQyxtQkFBU0MsU0FEUDtBQUVGQyxnQkFBTUMsTUFGSjtBQUdGQztBQUhFLFlBSUFYLEtBSko7O0FBTUEsY0FBTVksT0FBTyxNQUFNdkIsS0FBS3dCLEVBQUwsQ0FBUWYsTUFBUixDQUFuQjtBQUNBLGdCQUFRYSxJQUFSO0FBQ0UsZUFBSyxTQUFMO0FBQ0U7QUFDQSxnQkFBSUQsTUFBSixFQUFZO0FBQ1Ysb0JBQU1ELE9BQU8sSUFBSW5CLElBQUosQ0FBU29CLE1BQVQsRUFBaUJFLElBQWpCLENBQWI7QUFDQSxrQkFBSSxNQUFNSCxLQUFLSyxPQUFmLEVBQXdCO0FBQ3RCckIsbUNBQW1CbUIsSUFBbkIsRUFBeUJKLFNBQXpCLEVBQW9DLElBQXBDO0FBQ0Q7QUFDRjtBQUNEO0FBQ0Y7QUFDRTtBQVhKO0FBYUQ7QUFDRixLQTlCRCxNQThCTztBQUNMLFlBQU0sSUFBSU8sS0FBSixDQUFVM0IsUUFBUWlCLEtBQVIsQ0FBY1csYUFBeEIsQ0FBTjtBQUNEO0FBQ0YsR0ExQ0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiaGFuZGxlRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IERFVkVMT1BNRU5UX01PREUsIERFVkVMT1BNRU5UX1RFQU1fSUQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi4vdXNlcicpXG5jb25zdCB7IGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2hvd0NvbW1hbmRCdXR0b25zIH0gPSByZXF1aXJlKCcuL2V2ZW50cycpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgcmVxID0+IHtcbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2V2ZW50cy1hcGkjcmVjZWl2aW5nX2V2ZW50c1xuICAgKi9cbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICBjaGFsbGVuZ2UsIGV2ZW50LCB0b2tlblxuICB9ID0gbG9nKEpTT04ucGFyc2UocmVxLmJvZHkpKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgLy8gb25lLXRpbWUgdmVyaWZpY2F0aW9uIHRvIGVuYWJsZSBldmVudCBzdWJzY3JpcHRpb25cbiAgICBpZiAoY2hhbGxlbmdlKSB7XG4gICAgICByZXR1cm4gY2hhbGxlbmdlXG4gICAgfVxuXG4gICAgaWYgKERFVkVMT1BNRU5UX01PREUgJiYgdGVhbUlEICE9PSBERVZFTE9QTUVOVF9URUFNX0lEKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5lcnJvci51bmRlck1haW50ZW5hbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB7XG4gICAgICAgIGNoYW5uZWw6IGNoYW5uZWxJRCxcbiAgICAgICAgdXNlcjogdXNlcklELFxuICAgICAgICB0eXBlXG4gICAgICB9ID0gZXZlbnRcblxuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAgIC8vIGlnbm9yZSBib3QgbWVzc2FnZXMsIGF2b2lkIGxvb3Agd2l0aCBzZWxmXG4gICAgICAgICAgaWYgKHVzZXJJRCkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICAgICAgc2hvd0NvbW1hbmRCdXR0b25zKHRlYW0sIGNoYW5uZWxJRCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59XG4iXX0=