'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');

/**
 * @see https://api.slack.com/methods
 */
module.exports = class Bot {
  constructor(token) {
    this._client = new WebClient(token);
  }

  // API wrappers
  fetchUsers() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const res = yield _this._client.users.list();
      // neither a bot or a former member
      return res.members.filter(function (member) {
        return !(member.is_bot || member.name === 'slackbot' || member.deleted);
      });
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJCb3QiLCJjb25zdHJ1Y3RvciIsInRva2VuIiwiX2NsaWVudCIsImZldGNoVXNlcnMiLCJyZXMiLCJ1c2VycyIsImxpc3QiLCJtZW1iZXJzIiwiZmlsdGVyIiwibWVtYmVyIiwiaXNfYm90IiwibmFtZSIsImRlbGV0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLFNBQUYsS0FBZ0JDLFFBQVEsZUFBUixDQUF0Qjs7QUFFQTs7O0FBR0FDLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsR0FBTixDQUFVO0FBQ3pCQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLE9BQUwsR0FBZSxJQUFJUCxTQUFKLENBQWNNLEtBQWQsQ0FBZjtBQUNEOztBQUVEO0FBQ01FLFlBQU4sR0FBb0I7QUFBQTs7QUFBQTtBQUNsQixZQUFNQyxNQUFNLE1BQU0sTUFBS0YsT0FBTCxDQUFhRyxLQUFiLENBQW1CQyxJQUFuQixFQUFsQjtBQUNBO0FBQ0EsYUFBT0YsSUFBSUcsT0FBSixDQUFZQyxNQUFaLENBQW1CO0FBQUEsZUFBVSxFQUFFQyxPQUFPQyxNQUFQLElBQWlCRCxPQUFPRSxJQUFQLEtBQWdCLFVBQWpDLElBQStDRixPQUFPRyxPQUF4RCxDQUFWO0FBQUEsT0FBbkIsQ0FBUDtBQUhrQjtBQUluQjtBQVZ3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vbWV0aG9kc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJvdCB7XG4gIGNvbnN0cnVjdG9yICh0b2tlbikge1xuICAgIHRoaXMuX2NsaWVudCA9IG5ldyBXZWJDbGllbnQodG9rZW4pXG4gIH1cblxuICAvLyBBUEkgd3JhcHBlcnNcbiAgYXN5bmMgZmV0Y2hVc2VycyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmxpc3QoKVxuICAgIC8vIG5laXRoZXIgYSBib3Qgb3IgYSBmb3JtZXIgbWVtYmVyXG4gICAgcmV0dXJuIHJlcy5tZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gIShtZW1iZXIuaXNfYm90IHx8IG1lbWJlci5uYW1lID09PSAnc2xhY2tib3QnIHx8IG1lbWJlci5kZWxldGVkKSlcbiAgfVxufVxuIl19