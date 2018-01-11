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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVPQXV0aC5qcyJdLCJuYW1lcyI6WyJXZWJDbGllbnQiLCJyZXF1aXJlIiwiU2t5Z2VhclJlc3BvbnNlIiwiQm90IiwiQVBQX05BTUUiLCJTTEFDS19DTElFTlRfSUQiLCJTTEFDS19DTElFTlRfU0VDUkVUIiwibWVzc2FnZSIsIlRlYW0iLCJleHRyYWN0SURzIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsImNvZGUiLCJlcnJvciIsInVybCIsInF1ZXJ5Iiwib2F1dGgiLCJhY2Nlc3MiLCJ0aGVuIiwicmVzIiwiYm90IiwiYm90X2FjY2Vzc190b2tlbiIsInRva2VuIiwidGVhbV9pZCIsInRlYW1JRCIsInVzZXJfaWQiLCJ1c2VySUQiLCJ0YXJnZXRzSUQiLCJmZXRjaFVzZXJzIiwidGVhbSIsIm9mIiwidXBkYXRlIiwiY3JlYXRlIiwic2VuZFRvVXNlcnMiLCJoZWxwIiwic3RhdHVzQ29kZSIsImhlYWRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLFNBQUYsS0FBZ0JDLFFBQVEsZUFBUixDQUF0QjtBQUNBLE1BQU0sRUFBRUMsZUFBRixLQUFzQkQsUUFBUSxlQUFSLENBQTVCO0FBQ0EsTUFBTUUsTUFBTUYsUUFBUSxRQUFSLENBQVo7QUFDQSxNQUFNLEVBQUVHLFFBQUYsRUFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEtBQXFETCxRQUFRLFdBQVIsQ0FBM0Q7QUFDQSxNQUFNTSxVQUFVTixRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNTyxPQUFPUCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRVEsVUFBRixFQUFjQyxHQUFkLEtBQXNCVCxRQUFRLFNBQVIsQ0FBNUI7O0FBRUE7Ozs7QUFJQVUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0QixRQUFNLEVBQUVDLElBQUYsRUFBUUMsS0FBUixLQUFrQkYsSUFBSUcsR0FBSixDQUFRQyxLQUFoQzs7QUFFQSxNQUFJSCxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFDbEIsV0FBTyxJQUFJZixTQUFKLEdBQWdCa0IsS0FBaEIsQ0FBc0JDLE1BQXRCLENBQTZCZCxlQUE3QixFQUE4Q0MsbUJBQTlDLEVBQW1FUSxJQUFuRSxFQUF5RU0sSUFBekU7QUFBQSxtQ0FBOEUsV0FBTUMsR0FBTixFQUFhO0FBQ2hHLGNBQU07QUFDSkMsZUFBSyxFQUFFQyxrQkFBa0JDLEtBQXBCLEVBREQ7QUFFSkMsbUJBQVNDLE1BRkw7QUFHSkMsbUJBQVNDO0FBSEwsWUFJRmxCLElBQUlXLEdBQUosQ0FKSjs7QUFNQSxjQUFNQyxNQUFNLElBQUluQixHQUFKLENBQVFxQixLQUFSLENBQVo7QUFDQSxjQUFNSyxZQUFZcEIsWUFBVyxNQUFNYSxJQUFJUSxVQUFKLEVBQWpCLEVBQWxCOztBQUVBLGNBQU1DLE9BQU8sTUFBTXZCLEtBQUt3QixFQUFMLENBQVFOLE1BQVIsQ0FBbkI7QUFDQSxZQUFJSyxJQUFKLEVBQVU7QUFDUkEsZUFBS1AsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZ0JBQU1PLEtBQUtFLE1BQUwsRUFBTjtBQUNELFNBSEQsTUFHTztBQUNMLGdCQUFNekIsS0FBSzBCLE1BQUwsQ0FBWVIsTUFBWixFQUFvQkYsS0FBcEIsRUFBMkJLLFNBQTNCLENBQU47QUFDRDs7QUFFRFAsWUFBSWEsV0FBSixDQUFnQlAsTUFBaEIsRUFBd0JyQixRQUFRNkIsSUFBaEM7O0FBRUE7QUFDQSxlQUFPLElBQUlsQyxlQUFKLENBQW9CO0FBQ3pCbUMsc0JBQVksR0FEYTtBQUV6QkMsbUJBQVM7QUFDUCx3QkFBYSxXQUFVbEMsUUFBUztBQUR6QjtBQUZnQixTQUFwQixDQUFQO0FBTUQsT0EzQk07O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDtBQTRCRCxHQTdCRCxNQTZCTztBQUNMO0FBQ0Q7QUFDRixDQW5DRCIsImZpbGUiOiJoYW5kbGVPQXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IHsgU2t5Z2VhclJlc3BvbnNlIH0gPSByZXF1aXJlKCdza3lnZWFyL2Nsb3VkJylcbmNvbnN0IEJvdCA9IHJlcXVpcmUoJy4uL2JvdCcpXG5jb25zdCB7IEFQUF9OQU1FLCBTTEFDS19DTElFTlRfSUQsIFNMQUNLX0NMSUVOVF9TRUNSRVQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IGV4dHJhY3RJRHMsIGxvZyB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9vYXV0aFxuICogQHNlZSBodHRwczovL2RvY3Muc2t5Z2Vhci5pby9ndWlkZXMvY2xvdWQtZnVuY3Rpb24vaHR0cC1lbmRwb2ludC9qcy8jZXhhbXBsZXNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICBjb25zdCB7IGNvZGUsIGVycm9yIH0gPSByZXEudXJsLnF1ZXJ5XG5cbiAgaWYgKGNvZGUgJiYgIWVycm9yKSB7XG4gICAgcmV0dXJuIG5ldyBXZWJDbGllbnQoKS5vYXV0aC5hY2Nlc3MoU0xBQ0tfQ0xJRU5UX0lELCBTTEFDS19DTElFTlRfU0VDUkVULCBjb2RlKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGJvdDogeyBib3RfYWNjZXNzX3Rva2VuOiB0b2tlbiB9LFxuICAgICAgICB0ZWFtX2lkOiB0ZWFtSUQsXG4gICAgICAgIHVzZXJfaWQ6IHVzZXJJRFxuICAgICAgfSA9IGxvZyhyZXMpXG5cbiAgICAgIGNvbnN0IGJvdCA9IG5ldyBCb3QodG9rZW4pXG4gICAgICBjb25zdCB0YXJnZXRzSUQgPSBleHRyYWN0SURzKGF3YWl0IGJvdC5mZXRjaFVzZXJzKCkpXG5cbiAgICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgICAgIGlmICh0ZWFtKSB7XG4gICAgICAgIHRlYW0udG9rZW4gPSB0b2tlblxuICAgICAgICBhd2FpdCB0ZWFtLnVwZGF0ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBUZWFtLmNyZWF0ZSh0ZWFtSUQsIHRva2VuLCB0YXJnZXRzSUQpXG4gICAgICB9XG5cbiAgICAgIGJvdC5zZW5kVG9Vc2Vycyh1c2VySUQsIG1lc3NhZ2UuaGVscClcblxuICAgICAgLy8gcmVkaXJlY3QgdG8gdHV0b3JpYWwgcGFnZVxuICAgICAgcmV0dXJuIG5ldyBTa3lnZWFyUmVzcG9uc2Uoe1xuICAgICAgICBzdGF0dXNDb2RlOiAzMDMsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnTG9jYXRpb24nOiBgaHR0cHM6Ly8ke0FQUF9OQU1FfS5za3lnZWFyaW8uY29tL3N0YXRpYy90dXRvcmlhbC5odG1sYFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgLy8gcmVkaXJlY3QgdG8gZXJyb3IgcGFnZVxuICB9XG59XG4iXX0=