'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { log, verify } = require('../util');
const { hi } = require('./events');

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

      let {
        channel: channelID,
        user: userID,
        text, type
      } = event;

      const team = yield Team.of(teamID);
      switch (type) {
        case 'message':
          // ignore bot messages, avoid loop with self
          if (userID) {
            const user = new User(userID, team);
            if (yield user.isAdmin) {
              if (text.substr(0, 2).toLowerCase() === 'hi') {
                hi(team, channelID);
              }
            }
          }
          break;
        default:
          break;
      }
    } else {
      throw new Error(message.error.invalidSource);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlRlYW0iLCJVc2VyIiwibG9nIiwidmVyaWZ5IiwiaGkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwidGVhbV9pZCIsInRlYW1JRCIsImNoYWxsZW5nZSIsImV2ZW50IiwidG9rZW4iLCJKU09OIiwicGFyc2UiLCJib2R5IiwiY2hhbm5lbCIsImNoYW5uZWxJRCIsInVzZXIiLCJ1c2VySUQiLCJ0ZXh0IiwidHlwZSIsInRlYW0iLCJvZiIsImlzQWRtaW4iLCJzdWJzdHIiLCJ0b0xvd2VyQ2FzZSIsIkVycm9yIiwiZXJyb3IiLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUcsR0FBRixFQUFPQyxNQUFQLEtBQWtCSixRQUFRLFNBQVIsQ0FBeEI7QUFDQSxNQUFNLEVBQUVLLEVBQUYsS0FBU0wsUUFBUSxVQUFSLENBQWY7O0FBRUFNLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsR0FBTixFQUFhO0FBQzVCOzs7QUFHQSxVQUFNO0FBQ0pDLGVBQVNDLE1BREw7QUFFSkMsZUFGSSxFQUVPQyxLQUZQLEVBRWNDO0FBRmQsUUFHRlYsSUFBSVcsS0FBS0MsS0FBTCxDQUFXUCxJQUFJUSxJQUFmLENBQUosQ0FISjs7QUFLQSxRQUFJWixPQUFPUyxLQUFQLENBQUosRUFBbUI7QUFDakI7QUFDQSxVQUFJRixTQUFKLEVBQWU7QUFDYixlQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsVUFBSTtBQUNGTSxpQkFBU0MsU0FEUDtBQUVGQyxjQUFNQyxNQUZKO0FBR0ZDLFlBSEUsRUFHSUM7QUFISixVQUlBVixLQUpKOztBQU1BLFlBQU1XLE9BQU8sTUFBTXRCLEtBQUt1QixFQUFMLENBQVFkLE1BQVIsQ0FBbkI7QUFDQSxjQUFRWSxJQUFSO0FBQ0UsYUFBSyxTQUFMO0FBQ0U7QUFDQSxjQUFJRixNQUFKLEVBQVk7QUFDVixrQkFBTUQsT0FBTyxJQUFJakIsSUFBSixDQUFTa0IsTUFBVCxFQUFpQkcsSUFBakIsQ0FBYjtBQUNBLGdCQUFJLE1BQU1KLEtBQUtNLE9BQWYsRUFBd0I7QUFDdEIsa0JBQUlKLEtBQUtLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQkMsV0FBbEIsT0FBb0MsSUFBeEMsRUFBOEM7QUFDNUN0QixtQkFBR2tCLElBQUgsRUFBU0wsU0FBVDtBQUNEO0FBQ0Y7QUFDRjtBQUNEO0FBQ0Y7QUFDRTtBQWJKO0FBZUQsS0E1QkQsTUE0Qk87QUFDTCxZQUFNLElBQUlVLEtBQUosQ0FBVTdCLFFBQVE4QixLQUFSLENBQWNDLGFBQXhCLENBQU47QUFDRDtBQUNGLEdBeENEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImhhbmRsZUV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgVXNlciA9IHJlcXVpcmUoJy4uL3VzZXInKVxuY29uc3QgeyBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IGhpIH0gPSByZXF1aXJlKCcuL2V2ZW50cycpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgcmVxID0+IHtcbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2V2ZW50cy1hcGkjcmVjZWl2aW5nX2V2ZW50c1xuICAgKi9cbiAgY29uc3Qge1xuICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICBjaGFsbGVuZ2UsIGV2ZW50LCB0b2tlblxuICB9ID0gbG9nKEpTT04ucGFyc2UocmVxLmJvZHkpKVxuXG4gIGlmICh2ZXJpZnkodG9rZW4pKSB7XG4gICAgLy8gb25lLXRpbWUgdmVyaWZpY2F0aW9uIHRvIGVuYWJsZSBldmVudCBzdWJzY3JpcHRpb25cbiAgICBpZiAoY2hhbGxlbmdlKSB7XG4gICAgICByZXR1cm4gY2hhbGxlbmdlXG4gICAgfVxuXG4gICAgbGV0IHtcbiAgICAgIGNoYW5uZWw6IGNoYW5uZWxJRCxcbiAgICAgIHVzZXI6IHVzZXJJRCxcbiAgICAgIHRleHQsIHR5cGVcbiAgICB9ID0gZXZlbnRcblxuICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICAvLyBpZ25vcmUgYm90IG1lc3NhZ2VzLCBhdm9pZCBsb29wIHdpdGggc2VsZlxuICAgICAgICBpZiAodXNlcklEKSB7XG4gICAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHVzZXJJRCwgdGVhbSlcbiAgICAgICAgICBpZiAoYXdhaXQgdXNlci5pc0FkbWluKSB7XG4gICAgICAgICAgICBpZiAodGV4dC5zdWJzdHIoMCwgMikudG9Mb3dlckNhc2UoKSA9PT0gJ2hpJykge1xuICAgICAgICAgICAgICBoaSh0ZWFtLCBjaGFubmVsSUQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59XG4iXX0=