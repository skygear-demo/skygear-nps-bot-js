'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { extractIDs } = require('./util');

/**
 * @see https://api.slack.com/methods
 */
class Bot {
  constructor(token) {
    this._client = new WebClient(token);
  }

  fetchUser(id) {
    return this._client.users.info(id).then(res => res.user);
  }

  fetchUsers() {
    // neither a bot or a former employee
    return this._client.users.list().then(res => res.members.filter(member => !(member.is_bot || member.name === 'slackbot' || member.deleted)));
  }

  fetchAdmins() {
    return this.fetchUsers().then(users => users.filter(user => user.is_admin));
  }

  fetchIMs() {
    return this._client.im.list().then(res => res.ims);
  }

  fetchIMOf(userID) {
    return this.fetchIMs().then(ims => ims.find(im => im.user === userID));
  }

  fetchIMsOf(usersID) {
    return this.fetchIMs().then(ims => ims.filter(im => usersID.includes(im.user)));
  }

  sendToAdmins(message) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let adminsID = extractIDs((yield _this.fetchAdmins()));
      let targetsIMID = extractIDs((yield _this.fetchIMsOf(adminsID)));
      targetsIMID.forEach(function (targetIMID) {
        return _this._client.chat.postMessage(targetIMID, message);
      });
    })();
  }

  sendToUser(id, message) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let targetIMID = yield _this2.fetchIMOf(id);
      _this2._client.chat.postMessage(targetIMID, message);
    })();
  }

  distribute(survey) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let targetsID = extractIDs((yield _this3.fetchUsers())).filter(function (targetID) {
        return !survey.excludedUsersID.includes(targetID);
      });
      let targetsIMID = extractIDs((yield _this3.fetchIMsOf(targetsID)));
      targetsIMID.forEach(function (targetIMID) {
        _this3._client.chat.postMessage(targetIMID, survey.q1.text, {
          attachments: survey.q1.attachments
        });
      });
      survey.isSent = true;
    })();
  }
}

module.exports = Bot;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsImV4dHJhY3RJRHMiLCJCb3QiLCJjb25zdHJ1Y3RvciIsInRva2VuIiwiX2NsaWVudCIsImZldGNoVXNlciIsImlkIiwidXNlcnMiLCJpbmZvIiwidGhlbiIsInJlcyIsInVzZXIiLCJmZXRjaFVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoQWRtaW5zIiwiaXNfYWRtaW4iLCJmZXRjaElNcyIsImltIiwiaW1zIiwiZmV0Y2hJTU9mIiwidXNlcklEIiwiZmluZCIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJzZW5kVG9BZG1pbnMiLCJtZXNzYWdlIiwiYWRtaW5zSUQiLCJ0YXJnZXRzSU1JRCIsImZvckVhY2giLCJjaGF0IiwicG9zdE1lc3NhZ2UiLCJ0YXJnZXRJTUlEIiwic2VuZFRvVXNlciIsImRpc3RyaWJ1dGUiLCJzdXJ2ZXkiLCJ0YXJnZXRzSUQiLCJleGNsdWRlZFVzZXJzSUQiLCJ0YXJnZXRJRCIsInExIiwidGV4dCIsImF0dGFjaG1lbnRzIiwiaXNTZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTSxFQUFFQyxVQUFGLEtBQWlCRCxRQUFRLFFBQVIsQ0FBdkI7O0FBRUE7OztBQUdBLE1BQU1FLEdBQU4sQ0FBVTtBQUNSQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLE9BQUwsR0FBZSxJQUFJTixTQUFKLENBQWNLLEtBQWQsQ0FBZjtBQUNEOztBQUVERSxZQUFXQyxFQUFYLEVBQWU7QUFDYixXQUFPLEtBQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQkMsSUFBbkIsQ0FBd0JGLEVBQXhCLEVBQTRCRyxJQUE1QixDQUFpQ0MsT0FBT0EsSUFBSUMsSUFBNUMsQ0FBUDtBQUNEOztBQUVEQyxlQUFjO0FBQ1o7QUFDQSxXQUFPLEtBQUtSLE9BQUwsQ0FBYUcsS0FBYixDQUFtQk0sSUFBbkIsR0FBMEJKLElBQTFCLENBQStCQyxPQUFPQSxJQUFJSSxPQUFKLENBQVlDLE1BQVosQ0FBbUJDLFVBQVUsRUFBRUEsT0FBT0MsTUFBUCxJQUFpQkQsT0FBT0UsSUFBUCxLQUFnQixVQUFqQyxJQUErQ0YsT0FBT0csT0FBeEQsQ0FBN0IsQ0FBdEMsQ0FBUDtBQUNEOztBQUVEQyxnQkFBZTtBQUNiLFdBQU8sS0FBS1IsVUFBTCxHQUFrQkgsSUFBbEIsQ0FBdUJGLFNBQVNBLE1BQU1RLE1BQU4sQ0FBYUosUUFBUUEsS0FBS1UsUUFBMUIsQ0FBaEMsQ0FBUDtBQUNEOztBQUVEQyxhQUFZO0FBQ1YsV0FBTyxLQUFLbEIsT0FBTCxDQUFhbUIsRUFBYixDQUFnQlYsSUFBaEIsR0FBdUJKLElBQXZCLENBQTRCQyxPQUFPQSxJQUFJYyxHQUF2QyxDQUFQO0FBQ0Q7O0FBRURDLFlBQVdDLE1BQVgsRUFBbUI7QUFDakIsV0FBTyxLQUFLSixRQUFMLEdBQWdCYixJQUFoQixDQUFxQmUsT0FBT0EsSUFBSUcsSUFBSixDQUFTSixNQUFNQSxHQUFHWixJQUFILEtBQVllLE1BQTNCLENBQTVCLENBQVA7QUFDRDs7QUFFREUsYUFBWUMsT0FBWixFQUFxQjtBQUNuQixXQUFPLEtBQUtQLFFBQUwsR0FBZ0JiLElBQWhCLENBQXFCZSxPQUFPQSxJQUFJVCxNQUFKLENBQVdRLE1BQU1NLFFBQVFDLFFBQVIsQ0FBaUJQLEdBQUdaLElBQXBCLENBQWpCLENBQTVCLENBQVA7QUFDRDs7QUFFS29CLGNBQU4sQ0FBb0JDLE9BQXBCLEVBQTZCO0FBQUE7O0FBQUE7QUFDM0IsVUFBSUMsV0FBV2pDLFlBQVcsTUFBTSxNQUFLb0IsV0FBTCxFQUFqQixFQUFmO0FBQ0EsVUFBSWMsY0FBY2xDLFlBQVcsTUFBTSxNQUFLNEIsVUFBTCxDQUFnQkssUUFBaEIsQ0FBakIsRUFBbEI7QUFDQUMsa0JBQVlDLE9BQVosQ0FBb0I7QUFBQSxlQUFjLE1BQUsvQixPQUFMLENBQWFnQyxJQUFiLENBQWtCQyxXQUFsQixDQUE4QkMsVUFBOUIsRUFBMENOLE9BQTFDLENBQWQ7QUFBQSxPQUFwQjtBQUgyQjtBQUk1Qjs7QUFFS08sWUFBTixDQUFrQmpDLEVBQWxCLEVBQXNCMEIsT0FBdEIsRUFBK0I7QUFBQTs7QUFBQTtBQUM3QixVQUFJTSxhQUFhLE1BQU0sT0FBS2IsU0FBTCxDQUFlbkIsRUFBZixDQUF2QjtBQUNBLGFBQUtGLE9BQUwsQ0FBYWdDLElBQWIsQ0FBa0JDLFdBQWxCLENBQThCQyxVQUE5QixFQUEwQ04sT0FBMUM7QUFGNkI7QUFHOUI7O0FBRUtRLFlBQU4sQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQUE7O0FBQUE7QUFDeEIsVUFBSUMsWUFBWTFDLFlBQVcsTUFBTSxPQUFLWSxVQUFMLEVBQWpCLEdBQW9DRyxNQUFwQyxDQUEyQztBQUFBLGVBQVksQ0FBQzBCLE9BQU9FLGVBQVAsQ0FBdUJiLFFBQXZCLENBQWdDYyxRQUFoQyxDQUFiO0FBQUEsT0FBM0MsQ0FBaEI7QUFDQSxVQUFJVixjQUFjbEMsWUFBVyxNQUFNLE9BQUs0QixVQUFMLENBQWdCYyxTQUFoQixDQUFqQixFQUFsQjtBQUNBUixrQkFBWUMsT0FBWixDQUFvQixzQkFBYztBQUNoQyxlQUFLL0IsT0FBTCxDQUFhZ0MsSUFBYixDQUFrQkMsV0FBbEIsQ0FBOEJDLFVBQTlCLEVBQTBDRyxPQUFPSSxFQUFQLENBQVVDLElBQXBELEVBQTBEO0FBQ3hEQyx1QkFBYU4sT0FBT0ksRUFBUCxDQUFVRTtBQURpQyxTQUExRDtBQUdELE9BSkQ7QUFLQU4sYUFBT08sTUFBUCxHQUFnQixJQUFoQjtBQVJ3QjtBQVN6QjtBQWxETzs7QUFxRFZDLE9BQU9DLE9BQVAsR0FBaUJqRCxHQUFqQiIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFdlYkNsaWVudCB9ID0gcmVxdWlyZSgnQHNsYWNrL2NsaWVudCcpXG5jb25zdCB7IGV4dHJhY3RJRHMgfSA9IHJlcXVpcmUoJy4vdXRpbCcpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vbWV0aG9kc1xuICovXG5jbGFzcyBCb3Qge1xuICBjb25zdHJ1Y3RvciAodG9rZW4pIHtcbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViQ2xpZW50KHRva2VuKVxuICB9XG5cbiAgZmV0Y2hVc2VyIChpZCkge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQudXNlcnMuaW5mbyhpZCkudGhlbihyZXMgPT4gcmVzLnVzZXIpXG4gIH1cblxuICBmZXRjaFVzZXJzICgpIHtcbiAgICAvLyBuZWl0aGVyIGEgYm90IG9yIGEgZm9ybWVyIGVtcGxveWVlXG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC51c2Vycy5saXN0KCkudGhlbihyZXMgPT4gcmVzLm1lbWJlcnMuZmlsdGVyKG1lbWJlciA9PiAhKG1lbWJlci5pc19ib3QgfHwgbWVtYmVyLm5hbWUgPT09ICdzbGFja2JvdCcgfHwgbWVtYmVyLmRlbGV0ZWQpKSlcbiAgfVxuXG4gIGZldGNoQWRtaW5zICgpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaFVzZXJzKCkudGhlbih1c2VycyA9PiB1c2Vycy5maWx0ZXIodXNlciA9PiB1c2VyLmlzX2FkbWluKSlcbiAgfVxuXG4gIGZldGNoSU1zICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LmltLmxpc3QoKS50aGVuKHJlcyA9PiByZXMuaW1zKVxuICB9XG5cbiAgZmV0Y2hJTU9mICh1c2VySUQpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaElNcygpLnRoZW4oaW1zID0+IGltcy5maW5kKGltID0+IGltLnVzZXIgPT09IHVzZXJJRCkpXG4gIH1cblxuICBmZXRjaElNc09mICh1c2Vyc0lEKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hJTXMoKS50aGVuKGltcyA9PiBpbXMuZmlsdGVyKGltID0+IHVzZXJzSUQuaW5jbHVkZXMoaW0udXNlcikpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvQWRtaW5zIChtZXNzYWdlKSB7XG4gICAgbGV0IGFkbWluc0lEID0gZXh0cmFjdElEcyhhd2FpdCB0aGlzLmZldGNoQWRtaW5zKCkpXG4gICAgbGV0IHRhcmdldHNJTUlEID0gZXh0cmFjdElEcyhhd2FpdCB0aGlzLmZldGNoSU1zT2YoYWRtaW5zSUQpKVxuICAgIHRhcmdldHNJTUlELmZvckVhY2godGFyZ2V0SU1JRCA9PiB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZSh0YXJnZXRJTUlELCBtZXNzYWdlKSlcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb1VzZXIgKGlkLCBtZXNzYWdlKSB7XG4gICAgbGV0IHRhcmdldElNSUQgPSBhd2FpdCB0aGlzLmZldGNoSU1PZihpZClcbiAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZSh0YXJnZXRJTUlELCBtZXNzYWdlKVxuICB9XG5cbiAgYXN5bmMgZGlzdHJpYnV0ZSAoc3VydmV5KSB7XG4gICAgbGV0IHRhcmdldHNJRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGhpcy5mZXRjaFVzZXJzKCkpLmZpbHRlcih0YXJnZXRJRCA9PiAhc3VydmV5LmV4Y2x1ZGVkVXNlcnNJRC5pbmNsdWRlcyh0YXJnZXRJRCkpXG4gICAgbGV0IHRhcmdldHNJTUlEID0gZXh0cmFjdElEcyhhd2FpdCB0aGlzLmZldGNoSU1zT2YodGFyZ2V0c0lEKSlcbiAgICB0YXJnZXRzSU1JRC5mb3JFYWNoKHRhcmdldElNSUQgPT4ge1xuICAgICAgdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UodGFyZ2V0SU1JRCwgc3VydmV5LnExLnRleHQsIHtcbiAgICAgICAgYXR0YWNobWVudHM6IHN1cnZleS5xMS5hdHRhY2htZW50c1xuICAgICAgfSlcbiAgICB9KVxuICAgIHN1cnZleS5pc1NlbnQgPSB0cnVlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3RcbiJdfQ==