'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const { extractIDs } = require('./util');

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
        survey.isSent = true;
      });
    })();
  }
}

module.exports = Bot;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsImV4dHJhY3RJRHMiLCJCb3QiLCJjb25zdHJ1Y3RvciIsInRva2VuIiwiX2NsaWVudCIsImZldGNoVXNlciIsImlkIiwidXNlcnMiLCJpbmZvIiwidGhlbiIsInJlcyIsInVzZXIiLCJmZXRjaFVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoQWRtaW5zIiwiaXNfYWRtaW4iLCJmZXRjaElNcyIsImltIiwiaW1zIiwiZmV0Y2hJTU9mIiwidXNlcklEIiwiZmluZCIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJzZW5kVG9BZG1pbnMiLCJtZXNzYWdlIiwiYWRtaW5zSUQiLCJ0YXJnZXRzSU1JRCIsImZvckVhY2giLCJjaGF0IiwicG9zdE1lc3NhZ2UiLCJ0YXJnZXRJTUlEIiwic2VuZFRvVXNlciIsImRpc3RyaWJ1dGUiLCJzdXJ2ZXkiLCJ0YXJnZXRzSUQiLCJleGNsdWRlZFVzZXJzSUQiLCJ0YXJnZXRJRCIsInExIiwidGV4dCIsImF0dGFjaG1lbnRzIiwiaXNTZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTSxFQUFFQyxVQUFGLEtBQWlCRCxRQUFRLFFBQVIsQ0FBdkI7O0FBRUEsTUFBTUUsR0FBTixDQUFVO0FBQ1JDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsT0FBTCxHQUFlLElBQUlOLFNBQUosQ0FBY0ssS0FBZCxDQUFmO0FBQ0Q7O0FBRURFLFlBQVdDLEVBQVgsRUFBZTtBQUNiLFdBQU8sS0FBS0YsT0FBTCxDQUFhRyxLQUFiLENBQW1CQyxJQUFuQixDQUF3QkYsRUFBeEIsRUFBNEJHLElBQTVCLENBQWlDQyxPQUFPQSxJQUFJQyxJQUE1QyxDQUFQO0FBQ0Q7O0FBRURDLGVBQWM7QUFDWjtBQUNBLFdBQU8sS0FBS1IsT0FBTCxDQUFhRyxLQUFiLENBQW1CTSxJQUFuQixHQUEwQkosSUFBMUIsQ0FBK0JDLE9BQU9BLElBQUlJLE9BQUosQ0FBWUMsTUFBWixDQUFtQkMsVUFBVSxFQUFFQSxPQUFPQyxNQUFQLElBQWlCRCxPQUFPRSxJQUFQLEtBQWdCLFVBQWpDLElBQStDRixPQUFPRyxPQUF4RCxDQUE3QixDQUF0QyxDQUFQO0FBQ0Q7O0FBRURDLGdCQUFlO0FBQ2IsV0FBTyxLQUFLUixVQUFMLEdBQWtCSCxJQUFsQixDQUF1QkYsU0FBU0EsTUFBTVEsTUFBTixDQUFhSixRQUFRQSxLQUFLVSxRQUExQixDQUFoQyxDQUFQO0FBQ0Q7O0FBRURDLGFBQVk7QUFDVixXQUFPLEtBQUtsQixPQUFMLENBQWFtQixFQUFiLENBQWdCVixJQUFoQixHQUF1QkosSUFBdkIsQ0FBNEJDLE9BQU9BLElBQUljLEdBQXZDLENBQVA7QUFDRDs7QUFFREMsWUFBV0MsTUFBWCxFQUFtQjtBQUNqQixXQUFPLEtBQUtKLFFBQUwsR0FBZ0JiLElBQWhCLENBQXFCZSxPQUFPQSxJQUFJRyxJQUFKLENBQVNKLE1BQU1BLEdBQUdaLElBQUgsS0FBWWUsTUFBM0IsQ0FBNUIsQ0FBUDtBQUNEOztBQUVERSxhQUFZQyxPQUFaLEVBQXFCO0FBQ25CLFdBQU8sS0FBS1AsUUFBTCxHQUFnQmIsSUFBaEIsQ0FBcUJlLE9BQU9BLElBQUlULE1BQUosQ0FBV1EsTUFBTU0sUUFBUUMsUUFBUixDQUFpQlAsR0FBR1osSUFBcEIsQ0FBakIsQ0FBNUIsQ0FBUDtBQUNEOztBQUVLb0IsY0FBTixDQUFvQkMsT0FBcEIsRUFBNkI7QUFBQTs7QUFBQTtBQUMzQixVQUFJQyxXQUFXakMsWUFBVyxNQUFNLE1BQUtvQixXQUFMLEVBQWpCLEVBQWY7QUFDQSxVQUFJYyxjQUFjbEMsWUFBVyxNQUFNLE1BQUs0QixVQUFMLENBQWdCSyxRQUFoQixDQUFqQixFQUFsQjtBQUNBQyxrQkFBWUMsT0FBWixDQUFvQjtBQUFBLGVBQWMsTUFBSy9CLE9BQUwsQ0FBYWdDLElBQWIsQ0FBa0JDLFdBQWxCLENBQThCQyxVQUE5QixFQUEwQ04sT0FBMUMsQ0FBZDtBQUFBLE9BQXBCO0FBSDJCO0FBSTVCOztBQUVLTyxZQUFOLENBQWtCakMsRUFBbEIsRUFBc0IwQixPQUF0QixFQUErQjtBQUFBOztBQUFBO0FBQzdCLFVBQUlNLGFBQWEsTUFBTSxPQUFLYixTQUFMLENBQWVuQixFQUFmLENBQXZCO0FBQ0EsYUFBS0YsT0FBTCxDQUFhZ0MsSUFBYixDQUFrQkMsV0FBbEIsQ0FBOEJDLFVBQTlCLEVBQTBDTixPQUExQztBQUY2QjtBQUc5Qjs7QUFFS1EsWUFBTixDQUFrQkMsTUFBbEIsRUFBMEI7QUFBQTs7QUFBQTtBQUN4QixVQUFJQyxZQUFZMUMsWUFBVyxNQUFNLE9BQUtZLFVBQUwsRUFBakIsR0FBb0NHLE1BQXBDLENBQTJDO0FBQUEsZUFBWSxDQUFDMEIsT0FBT0UsZUFBUCxDQUF1QmIsUUFBdkIsQ0FBZ0NjLFFBQWhDLENBQWI7QUFBQSxPQUEzQyxDQUFoQjtBQUNBLFVBQUlWLGNBQWNsQyxZQUFXLE1BQU0sT0FBSzRCLFVBQUwsQ0FBZ0JjLFNBQWhCLENBQWpCLEVBQWxCO0FBQ0FSLGtCQUFZQyxPQUFaLENBQW9CLHNCQUFjO0FBQ2hDLGVBQUsvQixPQUFMLENBQWFnQyxJQUFiLENBQWtCQyxXQUFsQixDQUE4QkMsVUFBOUIsRUFBMENHLE9BQU9JLEVBQVAsQ0FBVUMsSUFBcEQsRUFBMEQ7QUFDeERDLHVCQUFhTixPQUFPSSxFQUFQLENBQVVFO0FBRGlDLFNBQTFEO0FBR0FOLGVBQU9PLE1BQVAsR0FBZ0IsSUFBaEI7QUFDRCxPQUxEO0FBSHdCO0FBU3pCO0FBbERPOztBQXFEVkMsT0FBT0MsT0FBUCxHQUFpQmpELEdBQWpCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuY2xhc3MgQm90IHtcbiAgY29uc3RydWN0b3IgKHRva2VuKSB7XG4gICAgdGhpcy5fY2xpZW50ID0gbmV3IFdlYkNsaWVudCh0b2tlbilcbiAgfVxuXG4gIGZldGNoVXNlciAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LnVzZXJzLmluZm8oaWQpLnRoZW4ocmVzID0+IHJlcy51c2VyKVxuICB9XG5cbiAgZmV0Y2hVc2VycyAoKSB7XG4gICAgLy8gbmVpdGhlciBhIGJvdCBvciBhIGZvcm1lciBlbXBsb3llZVxuICAgIHJldHVybiB0aGlzLl9jbGllbnQudXNlcnMubGlzdCgpLnRoZW4ocmVzID0+IHJlcy5tZW1iZXJzLmZpbHRlcihtZW1iZXIgPT4gIShtZW1iZXIuaXNfYm90IHx8IG1lbWJlci5uYW1lID09PSAnc2xhY2tib3QnIHx8IG1lbWJlci5kZWxldGVkKSkpXG4gIH1cblxuICBmZXRjaEFkbWlucyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hVc2VycygpLnRoZW4odXNlcnMgPT4gdXNlcnMuZmlsdGVyKHVzZXIgPT4gdXNlci5pc19hZG1pbikpXG4gIH1cblxuICBmZXRjaElNcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC5pbS5saXN0KCkudGhlbihyZXMgPT4gcmVzLmltcylcbiAgfVxuXG4gIGZldGNoSU1PZiAodXNlcklEKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hJTXMoKS50aGVuKGltcyA9PiBpbXMuZmluZChpbSA9PiBpbS51c2VyID09PSB1c2VySUQpKVxuICB9XG5cbiAgZmV0Y2hJTXNPZiAodXNlcnNJRCkge1xuICAgIHJldHVybiB0aGlzLmZldGNoSU1zKCkudGhlbihpbXMgPT4gaW1zLmZpbHRlcihpbSA9PiB1c2Vyc0lELmluY2x1ZGVzKGltLnVzZXIpKSlcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb0FkbWlucyAobWVzc2FnZSkge1xuICAgIGxldCBhZG1pbnNJRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGhpcy5mZXRjaEFkbWlucygpKVxuICAgIGxldCB0YXJnZXRzSU1JRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGhpcy5mZXRjaElNc09mKGFkbWluc0lEKSlcbiAgICB0YXJnZXRzSU1JRC5mb3JFYWNoKHRhcmdldElNSUQgPT4gdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UodGFyZ2V0SU1JRCwgbWVzc2FnZSkpXG4gIH1cblxuICBhc3luYyBzZW5kVG9Vc2VyIChpZCwgbWVzc2FnZSkge1xuICAgIGxldCB0YXJnZXRJTUlEID0gYXdhaXQgdGhpcy5mZXRjaElNT2YoaWQpXG4gICAgdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UodGFyZ2V0SU1JRCwgbWVzc2FnZSlcbiAgfVxuXG4gIGFzeW5jIGRpc3RyaWJ1dGUgKHN1cnZleSkge1xuICAgIGxldCB0YXJnZXRzSUQgPSBleHRyYWN0SURzKGF3YWl0IHRoaXMuZmV0Y2hVc2VycygpKS5maWx0ZXIodGFyZ2V0SUQgPT4gIXN1cnZleS5leGNsdWRlZFVzZXJzSUQuaW5jbHVkZXModGFyZ2V0SUQpKVxuICAgIGxldCB0YXJnZXRzSU1JRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGhpcy5mZXRjaElNc09mKHRhcmdldHNJRCkpXG4gICAgdGFyZ2V0c0lNSUQuZm9yRWFjaCh0YXJnZXRJTUlEID0+IHtcbiAgICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKHRhcmdldElNSUQsIHN1cnZleS5xMS50ZXh0LCB7XG4gICAgICAgIGF0dGFjaG1lbnRzOiBzdXJ2ZXkucTEuYXR0YWNobWVudHNcbiAgICAgIH0pXG4gICAgICBzdXJ2ZXkuaXNTZW50ID0gdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3RcbiJdfQ==