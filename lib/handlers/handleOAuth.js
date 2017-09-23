'use strict';

let createOrUpdateTeam = (() => {
  var _ref = _asyncToGenerator(function* (teamID, token) {
    let team = yield Team.of(teamID);
    if (team) {
      team.token = token;
      return team.update();
    } else {
      return Team.create(teamID, token);
    }
  });

  return function createOrUpdateTeam(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * @see https://api.slack.com/docs/oauth
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config');
const Bot = require('../bot');
const Team = require('../team');
const { log } = require('../util');

let welcomingMessage = `\
Greeting from NPS bot! I am helpful for collecting NPS of your team members.
• To schedule a survey: /nps-schedule-survey
• To remove the scheduled survey: /nps-remove-scheduled-survey
• To see this help message again: /nps-help
`;
let errorMessage = 'Installation error. Please report to the development team.';

module.exports = req => {
  let { code, error } = req.url.query;
  if (!error) {
    new WebClient().oauth.access(SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, code).then((() => {
      var _ref2 = _asyncToGenerator(function* (res) {
        let {
          bot: { bot_access_token: token },
          team_id: teamID,
          user_id: userID
        } = log(res);
        let bot = new Bot(token);
        try {
          yield createOrUpdateTeam(teamID, token);
          bot.sendToAdmins(welcomingMessage);
        } catch (error) {
          bot.sendToUser(userID, errorMessage);
        }
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    })());
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVPQXV0aC5qcyJdLCJuYW1lcyI6WyJ0ZWFtSUQiLCJ0b2tlbiIsInRlYW0iLCJUZWFtIiwib2YiLCJ1cGRhdGUiLCJjcmVhdGUiLCJjcmVhdGVPclVwZGF0ZVRlYW0iLCJXZWJDbGllbnQiLCJyZXF1aXJlIiwiU0xBQ0tfQ0xJRU5UX0lEIiwiU0xBQ0tfQ0xJRU5UX1NFQ1JFVCIsIkJvdCIsImxvZyIsIndlbGNvbWluZ01lc3NhZ2UiLCJlcnJvck1lc3NhZ2UiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxIiwiY29kZSIsImVycm9yIiwidXJsIiwicXVlcnkiLCJvYXV0aCIsImFjY2VzcyIsInRoZW4iLCJyZXMiLCJib3QiLCJib3RfYWNjZXNzX3Rva2VuIiwidGVhbV9pZCIsInVzZXJfaWQiLCJ1c2VySUQiLCJzZW5kVG9BZG1pbnMiLCJzZW5kVG9Vc2VyIl0sIm1hcHBpbmdzIjoiOzs7K0JBY0EsV0FBbUNBLE1BQW5DLEVBQTJDQyxLQUEzQyxFQUFrRDtBQUNoRCxRQUFJQyxPQUFPLE1BQU1DLEtBQUtDLEVBQUwsQ0FBUUosTUFBUixDQUFqQjtBQUNBLFFBQUlFLElBQUosRUFBVTtBQUNSQSxXQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxLQUFLRyxNQUFMLEVBQVA7QUFDRCxLQUhELE1BR087QUFDTCxhQUFPRixLQUFLRyxNQUFMLENBQVlOLE1BQVosRUFBb0JDLEtBQXBCLENBQVA7QUFDRDtBQUNGLEc7O2tCQVJjTSxrQjs7Ozs7QUFVZjs7Ozs7Ozs7QUF4QkEsTUFBTSxFQUFFQyxTQUFGLEtBQWdCQyxRQUFRLGVBQVIsQ0FBdEI7QUFDQSxNQUFNLEVBQUVDLGVBQUYsRUFBbUJDLG1CQUFuQixLQUEyQ0YsUUFBUSxXQUFSLENBQWpEO0FBQ0EsTUFBTUcsTUFBTUgsUUFBUSxRQUFSLENBQVo7QUFDQSxNQUFNTixPQUFPTSxRQUFRLFNBQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUksR0FBRixLQUFVSixRQUFRLFNBQVIsQ0FBaEI7O0FBRUEsSUFBSUssbUJBQW9COzs7OztDQUF4QjtBQU1BLElBQUlDLGVBQWUsNERBQW5COztBQWdCQUMsT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0QixNQUFJLEVBQUVDLElBQUYsRUFBUUMsS0FBUixLQUFrQkYsSUFBSUcsR0FBSixDQUFRQyxLQUE5QjtBQUNBLE1BQUksQ0FBQ0YsS0FBTCxFQUFZO0FBQ1YsUUFBSVosU0FBSixHQUFnQmUsS0FBaEIsQ0FBc0JDLE1BQXRCLENBQTZCZCxlQUE3QixFQUE4Q0MsbUJBQTlDLEVBQW1FUSxJQUFuRSxFQUF5RU0sSUFBekU7QUFBQSxvQ0FBOEUsV0FBTUMsR0FBTixFQUFhO0FBQ3pGLFlBQUk7QUFDRkMsZUFBSyxFQUFFQyxrQkFBa0IzQixLQUFwQixFQURIO0FBRUY0QixtQkFBUzdCLE1BRlA7QUFHRjhCLG1CQUFTQztBQUhQLFlBSUFsQixJQUFJYSxHQUFKLENBSko7QUFLQSxZQUFJQyxNQUFNLElBQUlmLEdBQUosQ0FBUVgsS0FBUixDQUFWO0FBQ0EsWUFBSTtBQUNGLGdCQUFNTSxtQkFBbUJQLE1BQW5CLEVBQTJCQyxLQUEzQixDQUFOO0FBQ0EwQixjQUFJSyxZQUFKLENBQWlCbEIsZ0JBQWpCO0FBQ0QsU0FIRCxDQUdFLE9BQU9NLEtBQVAsRUFBYztBQUNkTyxjQUFJTSxVQUFKLENBQWVGLE1BQWYsRUFBdUJoQixZQUF2QjtBQUNEO0FBQ0YsT0FiRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNEO0FBQ0YsQ0FsQkQiLCJmaWxlIjoiaGFuZGxlT0F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCB7IFNMQUNLX0NMSUVOVF9JRCwgU0xBQ0tfQ0xJRU5UX1NFQ1JFVCB9ID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbmNvbnN0IEJvdCA9IHJlcXVpcmUoJy4uL2JvdCcpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5jb25zdCB7IGxvZyB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbmxldCB3ZWxjb21pbmdNZXNzYWdlID0gYFxcXG5HcmVldGluZyBmcm9tIE5QUyBib3QhIEkgYW0gaGVscGZ1bCBmb3IgY29sbGVjdGluZyBOUFMgb2YgeW91ciB0ZWFtIG1lbWJlcnMuXG7igKIgVG8gc2NoZWR1bGUgYSBzdXJ2ZXk6IC9ucHMtc2NoZWR1bGUtc3VydmV5XG7igKIgVG8gcmVtb3ZlIHRoZSBzY2hlZHVsZWQgc3VydmV5OiAvbnBzLXJlbW92ZS1zY2hlZHVsZWQtc3VydmV5XG7igKIgVG8gc2VlIHRoaXMgaGVscCBtZXNzYWdlIGFnYWluOiAvbnBzLWhlbHBcbmBcbmxldCBlcnJvck1lc3NhZ2UgPSAnSW5zdGFsbGF0aW9uIGVycm9yLiBQbGVhc2UgcmVwb3J0IHRvIHRoZSBkZXZlbG9wbWVudCB0ZWFtLidcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVUZWFtICh0ZWFtSUQsIHRva2VuKSB7XG4gIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gIGlmICh0ZWFtKSB7XG4gICAgdGVhbS50b2tlbiA9IHRva2VuXG4gICAgcmV0dXJuIHRlYW0udXBkYXRlKClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVGVhbS5jcmVhdGUodGVhbUlELCB0b2tlbilcbiAgfVxufVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL2RvY3Mvb2F1dGhcbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLnNreWdlYXIuaW8vZ3VpZGVzL2Nsb3VkLWZ1bmN0aW9uL2h0dHAtZW5kcG9pbnQvanMvI2V4YW1wbGVzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxID0+IHtcbiAgbGV0IHsgY29kZSwgZXJyb3IgfSA9IHJlcS51cmwucXVlcnlcbiAgaWYgKCFlcnJvcikge1xuICAgIG5ldyBXZWJDbGllbnQoKS5vYXV0aC5hY2Nlc3MoU0xBQ0tfQ0xJRU5UX0lELCBTTEFDS19DTElFTlRfU0VDUkVULCBjb2RlKS50aGVuKGFzeW5jIHJlcyA9PiB7XG4gICAgICBsZXQge1xuICAgICAgICBib3Q6IHsgYm90X2FjY2Vzc190b2tlbjogdG9rZW4gfSxcbiAgICAgICAgdGVhbV9pZDogdGVhbUlELFxuICAgICAgICB1c2VyX2lkOiB1c2VySURcbiAgICAgIH0gPSBsb2cocmVzKVxuICAgICAgbGV0IGJvdCA9IG5ldyBCb3QodG9rZW4pXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjcmVhdGVPclVwZGF0ZVRlYW0odGVhbUlELCB0b2tlbilcbiAgICAgICAgYm90LnNlbmRUb0FkbWlucyh3ZWxjb21pbmdNZXNzYWdlKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgYm90LnNlbmRUb1VzZXIodXNlcklELCBlcnJvck1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19