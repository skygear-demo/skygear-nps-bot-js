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

  fetchUser(id) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const res = yield _this2._client.users.info(id);
      return res.user;
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJCb3QiLCJjb25zdHJ1Y3RvciIsInRva2VuIiwiX2NsaWVudCIsImZldGNoVXNlcnMiLCJyZXMiLCJ1c2VycyIsImxpc3QiLCJtZW1iZXJzIiwiZmlsdGVyIiwibWVtYmVyIiwiaXNfYm90IiwibmFtZSIsImRlbGV0ZWQiLCJmZXRjaFVzZXIiLCJpZCIsImluZm8iLCJ1c2VyIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxTQUFGLEtBQWdCQyxRQUFRLGVBQVIsQ0FBdEI7O0FBRUE7OztBQUdBQyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEdBQU4sQ0FBVTtBQUN6QkMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxPQUFMLEdBQWUsSUFBSVAsU0FBSixDQUFjTSxLQUFkLENBQWY7QUFDRDs7QUFFRDtBQUNNRSxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsWUFBTUMsTUFBTSxNQUFNLE1BQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQkMsSUFBbkIsRUFBbEI7QUFDQTtBQUNBLGFBQU9GLElBQUlHLE9BQUosQ0FBWUMsTUFBWixDQUFtQjtBQUFBLGVBQVUsRUFBRUMsT0FBT0MsTUFBUCxJQUFpQkQsT0FBT0UsSUFBUCxLQUFnQixVQUFqQyxJQUErQ0YsT0FBT0csT0FBeEQsQ0FBVjtBQUFBLE9BQW5CLENBQVA7QUFIa0I7QUFJbkI7O0FBRUtDLFdBQU4sQ0FBaUJDLEVBQWpCLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsWUFBTVYsTUFBTSxNQUFNLE9BQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQlUsSUFBbkIsQ0FBd0JELEVBQXhCLENBQWxCO0FBQ0EsYUFBT1YsSUFBSVksSUFBWDtBQUZtQjtBQUdwQjtBQWZ3QixDQUEzQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vbWV0aG9kc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEJvdCB7XG4gIGNvbnN0cnVjdG9yICh0b2tlbikge1xuICAgIHRoaXMuX2NsaWVudCA9IG5ldyBXZWJDbGllbnQodG9rZW4pXG4gIH1cblxuICAvLyBBUEkgd3JhcHBlcnNcbiAgYXN5bmMgZmV0Y2hVc2VycyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmxpc3QoKVxuICAgIC8vIG5laXRoZXIgYSBib3Qgb3IgYSBmb3JtZXIgbWVtYmVyXG4gICAgcmV0dXJuIHJlcy5tZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gIShtZW1iZXIuaXNfYm90IHx8IG1lbWJlci5uYW1lID09PSAnc2xhY2tib3QnIHx8IG1lbWJlci5kZWxldGVkKSlcbiAgfVxuXG4gIGFzeW5jIGZldGNoVXNlciAoaWQpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9jbGllbnQudXNlcnMuaW5mbyhpZClcbiAgICByZXR1cm4gcmVzLnVzZXJcbiAgfVxufVxuIl19