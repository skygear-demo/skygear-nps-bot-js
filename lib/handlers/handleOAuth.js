'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { SkygearResponse } = require('skygear/cloud');
const Bot = require('../bot');
const { APP_NAME, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config');
const message = require('../message');
const Team = require('../team');
const { extractIDs, log } = require('../util');

/**
 * @see https://api.slack.com/docs/oauth
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 */
module.exports = req => {
  const { code, error } = req.url.query;
  const response = new SkygearResponse({ statusCode: 303 });

  if (code && !error) {
    return new WebClient().oauth.access(SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, code).then((() => {
      var _ref = _asyncToGenerator(function* (res) {
        const {
          bot: { bot_access_token: token },
          team_id: teamID,
          user_id: userID
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

        bot.sendToUsers(userID, message.help);

        // redirect to tutorial page
        response.setHeader('Location', `https://${APP_NAME}.skygeario.com/static/tutorial.html`);
        return response;
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
  } else {
    // redirect to error page
    response.setHeader('Location', `https://${APP_NAME}.skygeario.com/static/error.html`);
    return response;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVPQXV0aC5qcyJdLCJuYW1lcyI6WyJXZWJDbGllbnQiLCJyZXF1aXJlIiwiU2t5Z2VhclJlc3BvbnNlIiwiQm90IiwiQVBQX05BTUUiLCJTTEFDS19DTElFTlRfSUQiLCJTTEFDS19DTElFTlRfU0VDUkVUIiwibWVzc2FnZSIsIlRlYW0iLCJleHRyYWN0SURzIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsImNvZGUiLCJlcnJvciIsInVybCIsInF1ZXJ5IiwicmVzcG9uc2UiLCJzdGF0dXNDb2RlIiwib2F1dGgiLCJhY2Nlc3MiLCJ0aGVuIiwicmVzIiwiYm90IiwiYm90X2FjY2Vzc190b2tlbiIsInRva2VuIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJ0YXJnZXRzSUQiLCJmZXRjaFVzZXJzIiwidGVhbSIsIm9mIiwidXBkYXRlIiwiY3JlYXRlIiwic2VuZFRvVXNlcnMiLCJoZWxwIiwic2V0SGVhZGVyIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxTQUFGLEtBQWdCQyxRQUFRLGVBQVIsQ0FBdEI7QUFDQSxNQUFNLEVBQUVDLGVBQUYsS0FBc0JELFFBQVEsZUFBUixDQUE1QjtBQUNBLE1BQU1FLE1BQU1GLFFBQVEsUUFBUixDQUFaO0FBQ0EsTUFBTSxFQUFFRyxRQUFGLEVBQVlDLGVBQVosRUFBNkJDLG1CQUE3QixLQUFxREwsUUFBUSxXQUFSLENBQTNEO0FBQ0EsTUFBTU0sVUFBVU4sUUFBUSxZQUFSLENBQWhCO0FBQ0EsTUFBTU8sT0FBT1AsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVRLFVBQUYsRUFBY0MsR0FBZCxLQUFzQlQsUUFBUSxTQUFSLENBQTVCOztBQUVBOzs7O0FBSUFVLE9BQU9DLE9BQVAsR0FBaUJDLE9BQU87QUFDdEIsUUFBTSxFQUFFQyxJQUFGLEVBQVFDLEtBQVIsS0FBa0JGLElBQUlHLEdBQUosQ0FBUUMsS0FBaEM7QUFDQSxRQUFNQyxXQUFXLElBQUloQixlQUFKLENBQW9CLEVBQUVpQixZQUFZLEdBQWQsRUFBcEIsQ0FBakI7O0FBRUEsTUFBSUwsUUFBUSxDQUFDQyxLQUFiLEVBQW9CO0FBQ2xCLFdBQU8sSUFBSWYsU0FBSixHQUFnQm9CLEtBQWhCLENBQXNCQyxNQUF0QixDQUE2QmhCLGVBQTdCLEVBQThDQyxtQkFBOUMsRUFBbUVRLElBQW5FLEVBQXlFUSxJQUF6RTtBQUFBLG1DQUE4RSxXQUFNQyxHQUFOLEVBQWE7QUFDaEcsY0FBTTtBQUNKQyxlQUFLLEVBQUVDLGtCQUFrQkMsS0FBcEIsRUFERDtBQUVKQyxtQkFBU0MsTUFGTDtBQUdKQyxtQkFBU0M7QUFITCxZQUlGcEIsSUFBSWEsR0FBSixDQUpKOztBQU1BLGNBQU1DLE1BQU0sSUFBSXJCLEdBQUosQ0FBUXVCLEtBQVIsQ0FBWjtBQUNBLGNBQU1LLFlBQVl0QixZQUFXLE1BQU1lLElBQUlRLFVBQUosRUFBakIsRUFBbEI7O0FBRUEsY0FBTUMsT0FBTyxNQUFNekIsS0FBSzBCLEVBQUwsQ0FBUU4sTUFBUixDQUFuQjtBQUNBLFlBQUlLLElBQUosRUFBVTtBQUNSQSxlQUFLUCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxnQkFBTU8sS0FBS0UsTUFBTCxFQUFOO0FBQ0QsU0FIRCxNQUdPO0FBQ0wsZ0JBQU0zQixLQUFLNEIsTUFBTCxDQUFZUixNQUFaLEVBQW9CRixLQUFwQixFQUEyQkssU0FBM0IsQ0FBTjtBQUNEOztBQUVEUCxZQUFJYSxXQUFKLENBQWdCUCxNQUFoQixFQUF3QnZCLFFBQVErQixJQUFoQzs7QUFFQTtBQUNBcEIsaUJBQVNxQixTQUFULENBQW1CLFVBQW5CLEVBQWdDLFdBQVVuQyxRQUFTLHFDQUFuRDtBQUNBLGVBQU9jLFFBQVA7QUFDRCxPQXZCTTs7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFQO0FBd0JELEdBekJELE1BeUJPO0FBQ0w7QUFDQUEsYUFBU3FCLFNBQVQsQ0FBbUIsVUFBbkIsRUFBZ0MsV0FBVW5DLFFBQVMsa0NBQW5EO0FBQ0EsV0FBT2MsUUFBUDtBQUNEO0FBQ0YsQ0FsQ0QiLCJmaWxlIjoiaGFuZGxlT0F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCB7IFNreWdlYXJSZXNwb25zZSB9ID0gcmVxdWlyZSgnc2t5Z2Vhci9jbG91ZCcpXG5jb25zdCBCb3QgPSByZXF1aXJlKCcuLi9ib3QnKVxuY29uc3QgeyBBUFBfTkFNRSwgU0xBQ0tfQ0xJRU5UX0lELCBTTEFDS19DTElFTlRfU0VDUkVUIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuY29uc3QgeyBleHRyYWN0SURzLCBsb2cgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2RvY3Mvb2F1dGhcbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLnNreWdlYXIuaW8vZ3VpZGVzL2Nsb3VkLWZ1bmN0aW9uL2h0dHAtZW5kcG9pbnQvanMvI2V4YW1wbGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IHtcbiAgY29uc3QgeyBjb2RlLCBlcnJvciB9ID0gcmVxLnVybC5xdWVyeVxuICBjb25zdCByZXNwb25zZSA9IG5ldyBTa3lnZWFyUmVzcG9uc2UoeyBzdGF0dXNDb2RlOiAzMDMgfSlcblxuICBpZiAoY29kZSAmJiAhZXJyb3IpIHtcbiAgICByZXR1cm4gbmV3IFdlYkNsaWVudCgpLm9hdXRoLmFjY2VzcyhTTEFDS19DTElFTlRfSUQsIFNMQUNLX0NMSUVOVF9TRUNSRVQsIGNvZGUpLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYm90OiB7IGJvdF9hY2Nlc3NfdG9rZW46IHRva2VuIH0sXG4gICAgICAgIHRlYW1faWQ6IHRlYW1JRCxcbiAgICAgICAgdXNlcl9pZDogdXNlcklEXG4gICAgICB9ID0gbG9nKHJlcylcblxuICAgICAgY29uc3QgYm90ID0gbmV3IEJvdCh0b2tlbilcbiAgICAgIGNvbnN0IHRhcmdldHNJRCA9IGV4dHJhY3RJRHMoYXdhaXQgYm90LmZldGNoVXNlcnMoKSlcblxuICAgICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgICAgaWYgKHRlYW0pIHtcbiAgICAgICAgdGVhbS50b2tlbiA9IHRva2VuXG4gICAgICAgIGF3YWl0IHRlYW0udXBkYXRlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IFRlYW0uY3JlYXRlKHRlYW1JRCwgdG9rZW4sIHRhcmdldHNJRClcbiAgICAgIH1cblxuICAgICAgYm90LnNlbmRUb1VzZXJzKHVzZXJJRCwgbWVzc2FnZS5oZWxwKVxuXG4gICAgICAvLyByZWRpcmVjdCB0byB0dXRvcmlhbCBwYWdlXG4gICAgICByZXNwb25zZS5zZXRIZWFkZXIoJ0xvY2F0aW9uJywgYGh0dHBzOi8vJHtBUFBfTkFNRX0uc2t5Z2VhcmlvLmNvbS9zdGF0aWMvdHV0b3JpYWwuaHRtbGApXG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIC8vIHJlZGlyZWN0IHRvIGVycm9yIHBhZ2VcbiAgICByZXNwb25zZS5zZXRIZWFkZXIoJ0xvY2F0aW9uJywgYGh0dHBzOi8vJHtBUFBfTkFNRX0uc2t5Z2VhcmlvLmNvbS9zdGF0aWMvZXJyb3IuaHRtbGApXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cbn1cbiJdfQ==