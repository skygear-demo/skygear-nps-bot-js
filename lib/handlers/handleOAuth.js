'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { SkygearResponse } = require('skygear/cloud');
const Bot = require('../bot');
const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config');
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
        return new SkygearResponse({
          statusCode: 303,
          headers: {
            'Location': 'https://npsbottest.skygeario.com/static/tutorial.html'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVPQXV0aC5qcyJdLCJuYW1lcyI6WyJXZWJDbGllbnQiLCJyZXF1aXJlIiwiU2t5Z2VhclJlc3BvbnNlIiwiQm90IiwiU0xBQ0tfQ0xJRU5UX0lEIiwiU0xBQ0tfQ0xJRU5UX1NFQ1JFVCIsIlRlYW0iLCJleHRyYWN0SURzIiwibG9nIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsImNvZGUiLCJlcnJvciIsInVybCIsInF1ZXJ5Iiwib2F1dGgiLCJhY2Nlc3MiLCJ0aGVuIiwicmVzIiwiYm90IiwiYm90X2FjY2Vzc190b2tlbiIsInRva2VuIiwidGVhbV9pZCIsInRlYW1JRCIsInRhcmdldHNJRCIsImZldGNoVXNlcnMiLCJ0ZWFtIiwib2YiLCJ1cGRhdGUiLCJjcmVhdGUiLCJzdGF0dXNDb2RlIiwiaGVhZGVycyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTSxFQUFFQyxlQUFGLEtBQXNCRCxRQUFRLGVBQVIsQ0FBNUI7QUFDQSxNQUFNRSxNQUFNRixRQUFRLFFBQVIsQ0FBWjtBQUNBLE1BQU0sRUFBRUcsZUFBRixFQUFtQkMsbUJBQW5CLEtBQTJDSixRQUFRLFdBQVIsQ0FBakQ7QUFDQSxNQUFNSyxPQUFPTCxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRU0sVUFBRixFQUFjQyxHQUFkLEtBQXNCUCxRQUFRLFNBQVIsQ0FBNUI7O0FBRUE7Ozs7QUFJQVEsT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0QixRQUFNLEVBQUVDLElBQUYsRUFBUUMsS0FBUixLQUFrQkYsSUFBSUcsR0FBSixDQUFRQyxLQUFoQzs7QUFFQSxNQUFJSCxRQUFRLENBQUNDLEtBQWIsRUFBb0I7QUFDbEIsV0FBTyxJQUFJYixTQUFKLEdBQWdCZ0IsS0FBaEIsQ0FBc0JDLE1BQXRCLENBQTZCYixlQUE3QixFQUE4Q0MsbUJBQTlDLEVBQW1FTyxJQUFuRSxFQUF5RU0sSUFBekU7QUFBQSxtQ0FBOEUsV0FBTUMsR0FBTixFQUFhO0FBQ2hHLGNBQU07QUFDSkMsZUFBSyxFQUFFQyxrQkFBa0JDLEtBQXBCLEVBREQ7QUFFSkMsbUJBQVNDO0FBRkwsWUFHRmhCLElBQUlXLEdBQUosQ0FISjs7QUFLQSxjQUFNQyxNQUFNLElBQUlqQixHQUFKLENBQVFtQixLQUFSLENBQVo7QUFDQSxjQUFNRyxZQUFZbEIsWUFBVyxNQUFNYSxJQUFJTSxVQUFKLEVBQWpCLEVBQWxCOztBQUVBLGNBQU1DLE9BQU8sTUFBTXJCLEtBQUtzQixFQUFMLENBQVFKLE1BQVIsQ0FBbkI7QUFDQSxZQUFJRyxJQUFKLEVBQVU7QUFDUkEsZUFBS0wsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZ0JBQU1LLEtBQUtFLE1BQUwsRUFBTjtBQUNELFNBSEQsTUFHTztBQUNMLGdCQUFNdkIsS0FBS3dCLE1BQUwsQ0FBWU4sTUFBWixFQUFvQkYsS0FBcEIsRUFBMkJHLFNBQTNCLENBQU47QUFDRDs7QUFFRDtBQUNBLGVBQU8sSUFBSXZCLGVBQUosQ0FBb0I7QUFDekI2QixzQkFBWSxHQURhO0FBRXpCQyxtQkFBUztBQUNQLHdCQUFZO0FBREw7QUFGZ0IsU0FBcEIsQ0FBUDtBQU1ELE9BeEJNOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7QUF5QkQsR0ExQkQsTUEwQk87QUFDTDtBQUNEO0FBQ0YsQ0FoQ0QiLCJmaWxlIjoiaGFuZGxlT0F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCB7IFNreWdlYXJSZXNwb25zZSB9ID0gcmVxdWlyZSgnc2t5Z2Vhci9jbG91ZCcpXG5jb25zdCBCb3QgPSByZXF1aXJlKCcuLi9ib3QnKVxuY29uc3QgeyBTTEFDS19DTElFTlRfSUQsIFNMQUNLX0NMSUVOVF9TRUNSRVQgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IGV4dHJhY3RJRHMsIGxvZyB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZG9jcy9vYXV0aFxuICogQHNlZSBodHRwczovL2RvY3Muc2t5Z2Vhci5pby9ndWlkZXMvY2xvdWQtZnVuY3Rpb24vaHR0cC1lbmRwb2ludC9qcy8jZXhhbXBsZXNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICBjb25zdCB7IGNvZGUsIGVycm9yIH0gPSByZXEudXJsLnF1ZXJ5XG5cbiAgaWYgKGNvZGUgJiYgIWVycm9yKSB7XG4gICAgcmV0dXJuIG5ldyBXZWJDbGllbnQoKS5vYXV0aC5hY2Nlc3MoU0xBQ0tfQ0xJRU5UX0lELCBTTEFDS19DTElFTlRfU0VDUkVULCBjb2RlKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGJvdDogeyBib3RfYWNjZXNzX3Rva2VuOiB0b2tlbiB9LFxuICAgICAgICB0ZWFtX2lkOiB0ZWFtSURcbiAgICAgIH0gPSBsb2cocmVzKVxuXG4gICAgICBjb25zdCBib3QgPSBuZXcgQm90KHRva2VuKVxuICAgICAgY29uc3QgdGFyZ2V0c0lEID0gZXh0cmFjdElEcyhhd2FpdCBib3QuZmV0Y2hVc2VycygpKVxuXG4gICAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gICAgICBpZiAodGVhbSkge1xuICAgICAgICB0ZWFtLnRva2VuID0gdG9rZW5cbiAgICAgICAgYXdhaXQgdGVhbS51cGRhdGUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgVGVhbS5jcmVhdGUodGVhbUlELCB0b2tlbiwgdGFyZ2V0c0lEKVxuICAgICAgfVxuXG4gICAgICAvLyByZWRpcmVjdCB0byB0dXRvcmlhbCBwYWdlXG4gICAgICByZXR1cm4gbmV3IFNreWdlYXJSZXNwb25zZSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDMwMyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdMb2NhdGlvbic6ICdodHRwczovL25wc2JvdHRlc3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvdHV0b3JpYWwuaHRtbCdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIC8vIHJlZGlyZWN0IHRvIGVycm9yIHBhZ2VcbiAgfVxufVxuIl19