'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { SkygearResponse } = require('skygear/cloud');
const Bot = require('../bot');
const { APP_NAME, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config');
const Team = require('../team');
const { extractIDs, log } = require('../util');

/**
 * @see https://api.slack.com/docs/oauth
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 */
module.exports = req => {
  const { code, error } = req.url.query;

  if (code && !error) {
    return new WebClient().oauth.access(SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, code).then((() => {
      var _ref = _asyncToGenerator(function* (res) {
        const {
          bot: { bot_access_token: token },
          team_id: teamID
        } = log(res);

        const bot = new Bot(token);
        const targetsID = extractIDs((yield bot.fetchUsers()));

        const team = yield Team.of(teamID);
        if (team) {
          team.token = token;
          yield team.update();
        } else {
          yield Team.create(teamID, token, targetsID);
        }

        // redirect to tutorial page
        console.log('asascaxz', `https://${APP_NAME}.skygeario.com/static/tutorial.html`);
        return new SkygearResponse({
          statusCode: 303,
          headers: {
            'Location': `https://${APP_NAME}.skygeario.com/static/tutorial.html`
          }
        });
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
  } else {
    // redirect to error page
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVPQXV0aC5qcyJdLCJuYW1lcyI6WyJXZWJDbGllbnQiLCJyZXF1aXJlIiwiU2t5Z2VhclJlc3BvbnNlIiwiQm90IiwiQVBQX05BTUUiLCJTTEFDS19DTElFTlRfSUQiLCJTTEFDS19DTElFTlRfU0VDUkVUIiwiVGVhbSIsImV4dHJhY3RJRHMiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwiY29kZSIsImVycm9yIiwidXJsIiwicXVlcnkiLCJvYXV0aCIsImFjY2VzcyIsInRoZW4iLCJyZXMiLCJib3QiLCJib3RfYWNjZXNzX3Rva2VuIiwidG9rZW4iLCJ0ZWFtX2lkIiwidGVhbUlEIiwidGFyZ2V0c0lEIiwiZmV0Y2hVc2VycyIsInRlYW0iLCJvZiIsInVwZGF0ZSIsImNyZWF0ZSIsImNvbnNvbGUiLCJzdGF0dXNDb2RlIiwiaGVhZGVycyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTSxFQUFFQyxlQUFGLEtBQXNCRCxRQUFRLGVBQVIsQ0FBNUI7QUFDQSxNQUFNRSxNQUFNRixRQUFRLFFBQVIsQ0FBWjtBQUNBLE1BQU0sRUFBRUcsUUFBRixFQUFZQyxlQUFaLEVBQTZCQyxtQkFBN0IsS0FBcURMLFFBQVEsV0FBUixDQUEzRDtBQUNBLE1BQU1NLE9BQU9OLFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTSxFQUFFTyxVQUFGLEVBQWNDLEdBQWQsS0FBc0JSLFFBQVEsU0FBUixDQUE1Qjs7QUFFQTs7OztBQUlBUyxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPO0FBQ3RCLFFBQU0sRUFBRUMsSUFBRixFQUFRQyxLQUFSLEtBQWtCRixJQUFJRyxHQUFKLENBQVFDLEtBQWhDOztBQUVBLE1BQUlILFFBQVEsQ0FBQ0MsS0FBYixFQUFvQjtBQUNsQixXQUFPLElBQUlkLFNBQUosR0FBZ0JpQixLQUFoQixDQUFzQkMsTUFBdEIsQ0FBNkJiLGVBQTdCLEVBQThDQyxtQkFBOUMsRUFBbUVPLElBQW5FLEVBQXlFTSxJQUF6RTtBQUFBLG1DQUE4RSxXQUFNQyxHQUFOLEVBQWE7QUFDaEcsY0FBTTtBQUNKQyxlQUFLLEVBQUVDLGtCQUFrQkMsS0FBcEIsRUFERDtBQUVKQyxtQkFBU0M7QUFGTCxZQUdGaEIsSUFBSVcsR0FBSixDQUhKOztBQUtBLGNBQU1DLE1BQU0sSUFBSWxCLEdBQUosQ0FBUW9CLEtBQVIsQ0FBWjtBQUNBLGNBQU1HLFlBQVlsQixZQUFXLE1BQU1hLElBQUlNLFVBQUosRUFBakIsRUFBbEI7O0FBRUEsY0FBTUMsT0FBTyxNQUFNckIsS0FBS3NCLEVBQUwsQ0FBUUosTUFBUixDQUFuQjtBQUNBLFlBQUlHLElBQUosRUFBVTtBQUNSQSxlQUFLTCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxnQkFBTUssS0FBS0UsTUFBTCxFQUFOO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsZ0JBQU12QixLQUFLd0IsTUFBTCxDQUFZTixNQUFaLEVBQW9CRixLQUFwQixFQUEyQkcsU0FBM0IsQ0FBTjtBQUNEOztBQUVEO0FBQ0FNLGdCQUFRdkIsR0FBUixDQUFZLFVBQVosRUFBeUIsV0FBVUwsUUFBUyxxQ0FBNUM7QUFDQSxlQUFPLElBQUlGLGVBQUosQ0FBb0I7QUFDekIrQixzQkFBWSxHQURhO0FBRXpCQyxtQkFBUztBQUNQLHdCQUFhLFdBQVU5QixRQUFTO0FBRHpCO0FBRmdCLFNBQXBCLENBQVA7QUFNRCxPQXpCTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQO0FBMEJELEdBM0JELE1BMkJPO0FBQ0w7QUFDRDtBQUNGLENBakNEIiwiZmlsZSI6ImhhbmRsZU9BdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBXZWJDbGllbnQgfSA9IHJlcXVpcmUoJ0BzbGFjay9jbGllbnQnKVxuY29uc3QgeyBTa3lnZWFyUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ3NreWdlYXIvY2xvdWQnKVxuY29uc3QgQm90ID0gcmVxdWlyZSgnLi4vYm90JylcbmNvbnN0IHsgQVBQX05BTUUsIFNMQUNLX0NMSUVOVF9JRCwgU0xBQ0tfQ0xJRU5UX1NFQ1JFVCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IHsgZXh0cmFjdElEcywgbG9nIH0gPSByZXF1aXJlKCcuLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL29hdXRoXG4gKiBAc2VlIGh0dHBzOi8vZG9jcy5za3lnZWFyLmlvL2d1aWRlcy9jbG91ZC1mdW5jdGlvbi9odHRwLWVuZHBvaW50L2pzLyNleGFtcGxlc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIGNvbnN0IHsgY29kZSwgZXJyb3IgfSA9IHJlcS51cmwucXVlcnlcblxuICBpZiAoY29kZSAmJiAhZXJyb3IpIHtcbiAgICByZXR1cm4gbmV3IFdlYkNsaWVudCgpLm9hdXRoLmFjY2VzcyhTTEFDS19DTElFTlRfSUQsIFNMQUNLX0NMSUVOVF9TRUNSRVQsIGNvZGUpLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYm90OiB7IGJvdF9hY2Nlc3NfdG9rZW46IHRva2VuIH0sXG4gICAgICAgIHRlYW1faWQ6IHRlYW1JRFxuICAgICAgfSA9IGxvZyhyZXMpXG5cbiAgICAgIGNvbnN0IGJvdCA9IG5ldyBCb3QodG9rZW4pXG4gICAgICBjb25zdCB0YXJnZXRzSUQgPSBleHRyYWN0SURzKGF3YWl0IGJvdC5mZXRjaFVzZXJzKCkpXG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGlmICh0ZWFtKSB7XG4gICAgICAgIHRlYW0udG9rZW4gPSB0b2tlblxuICAgICAgICBhd2FpdCB0ZWFtLnVwZGF0ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBUZWFtLmNyZWF0ZSh0ZWFtSUQsIHRva2VuLCB0YXJnZXRzSUQpXG4gICAgICB9XG5cbiAgICAgIC8vIHJlZGlyZWN0IHRvIHR1dG9yaWFsIHBhZ2VcbiAgICAgIGNvbnNvbGUubG9nKCdhc2FzY2F4eicsIGBodHRwczovLyR7QVBQX05BTUV9LnNreWdlYXJpby5jb20vc3RhdGljL3R1dG9yaWFsLmh0bWxgKVxuICAgICAgcmV0dXJuIG5ldyBTa3lnZWFyUmVzcG9uc2Uoe1xuICAgICAgICBzdGF0dXNDb2RlOiAzMDMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnTG9jYXRpb24nOiBgaHR0cHM6Ly8ke0FQUF9OQU1FfS5za3lnZWFyaW8uY29tL3N0YXRpYy90dXRvcmlhbC5odG1sYFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgLy8gcmVkaXJlY3QgdG8gZXJyb3IgcGFnZVxuICB9XG59XG4iXX0=