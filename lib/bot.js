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
      let targetIMID = (yield _this2.fetchIMOf(id)).id;
      _this2._client.chat.postMessage(targetIMID, message);
    })();
  }

  sendToUsers(ids, message) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let targetsIMID = extractIDs((yield _this3.fetchIMsOf(ids)));
      targetsIMID.forEach(function (targetIMID) {
        _this3._client.chat.postMessage(targetIMID, message);
      });
    })();
  }

  sendToChannel(id, message) {
    this._client.chat.postMessage(id, message);
  }

  distribute(survey) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let targetsID = extractIDs((yield _this4.fetchUsers())).filter(function (targetID) {
        return !survey.excludedUsersID.includes(targetID);
      });
      let targetsIMID = extractIDs((yield _this4.fetchIMsOf(targetsID)));
      targetsIMID.forEach(function (targetIMID) {
        _this4._client.chat.postMessage(targetIMID, survey.q1.text, {
          attachments: survey.q1.attachments
        });
      });
      survey.isSent = true;
      survey.update();
    })();
  }
}

module.exports = Bot;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsImV4dHJhY3RJRHMiLCJCb3QiLCJjb25zdHJ1Y3RvciIsInRva2VuIiwiX2NsaWVudCIsImZldGNoVXNlciIsImlkIiwidXNlcnMiLCJpbmZvIiwidGhlbiIsInJlcyIsInVzZXIiLCJmZXRjaFVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoQWRtaW5zIiwiaXNfYWRtaW4iLCJmZXRjaElNcyIsImltIiwiaW1zIiwiZmV0Y2hJTU9mIiwidXNlcklEIiwiZmluZCIsImZldGNoSU1zT2YiLCJ1c2Vyc0lEIiwiaW5jbHVkZXMiLCJzZW5kVG9BZG1pbnMiLCJtZXNzYWdlIiwiYWRtaW5zSUQiLCJ0YXJnZXRzSU1JRCIsImZvckVhY2giLCJjaGF0IiwicG9zdE1lc3NhZ2UiLCJ0YXJnZXRJTUlEIiwic2VuZFRvVXNlciIsInNlbmRUb1VzZXJzIiwiaWRzIiwic2VuZFRvQ2hhbm5lbCIsImRpc3RyaWJ1dGUiLCJzdXJ2ZXkiLCJ0YXJnZXRzSUQiLCJleGNsdWRlZFVzZXJzSUQiLCJ0YXJnZXRJRCIsInExIiwidGV4dCIsImF0dGFjaG1lbnRzIiwiaXNTZW50IiwidXBkYXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTSxFQUFFQyxVQUFGLEtBQWlCRCxRQUFRLFFBQVIsQ0FBdkI7O0FBRUE7OztBQUdBLE1BQU1FLEdBQU4sQ0FBVTtBQUNSQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLE9BQUwsR0FBZSxJQUFJTixTQUFKLENBQWNLLEtBQWQsQ0FBZjtBQUNEOztBQUVERSxZQUFXQyxFQUFYLEVBQWU7QUFDYixXQUFPLEtBQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQkMs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QyxDQUFoQjtBQUNBLFVBQUliLGNBQWNsQyxZQUFXLE1BQU0sT0FBSzRCLFVBQUwsQ0FBZ0JpQixTQUFoQixDQUFqQixFQUFsQjtBQUNBWCxrQkFBWUMsT0FBWixDQUFvQixzQkFBYztBQUNoQyxlQUFLL0IsT0FBTCxDQUFhZ0MsSUFBYixDQUFrQkMsV0FBbEIsQ0FBOEJDLFVBQTlCLEVBQTBDTSxPQUFPSSxFQUFQLENBQVVDLElBQXBELEVBQTBEO0FBQ3hEQyx1QkFBYU4sT0FBT0ksRUFBUCxDQUFVRTtBQURpQyxTQUExRDtBQUdELE9BSkQ7QUFLQU4sYUFBT08sTUFBUCxHQUFnQixJQUFoQjtBQUNBUCxhQUFPUSxNQUFQO0FBVHdCO0FBVXpCO0FBOURPOztBQWlFVkMsT0FBT0MsT0FBUCxHQUFpQnJELEdBQWpCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi91dGlsJylcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9tZXRob2RzXG4gKi9cbmNsYXNzIEJvdCB7XG4gIGNvbnN0cnVjdG9yICh0b2tlbikge1xuICAgIHRoaXMuX2NsaWVudCA9IG5ldyBXZWJDbGllbnQodG9rZW4pXG4gIH1cblxuICBmZXRjaFVzZXIgKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudC51c2Vycy5pbmZvKGlkKS50aGVuKHJlcyA9PiByZXMudXNlcilcbiAgfVxuXG4gIGZldGNoVXNlcnMgKCkge1xuICAgIC8vIG5laXRoZXIgYSBib3Qgb3IgYSBmb3JtZXIgZW1wbG95ZWVcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50LnVzZXJzLmxpc3QoKS50aGVuKHJlcyA9PiByZXMubWVtYmVycy5maWx0ZXIobWVtYmVyID0+ICEobWVtYmVyLmlzX2JvdCB8fCBtZW1iZXIubmFtZSA9PT0gJ3NsYWNrYm90JyB8fCBtZW1iZXIuZGVsZXRlZCkpKVxuICB9XG5cbiAgZmV0Y2hBZG1pbnMgKCkge1xuICAgIHJldHVybiB0aGlzLmZldGNoVXNlcnMoKS50aGVuKHVzZXJzID0+IHVzZXJzLmZpbHRlcih1c2VyID0+IHVzZXIuaXNfYWRtaW4pKVxuICB9XG5cbiAgZmV0Y2hJTXMgKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGllbnQuaW0ubGlzdCgpLnRoZW4ocmVzID0+IHJlcy5pbXMpXG4gIH1cblxuICBmZXRjaElNT2YgKHVzZXJJRCkge1xuICAgIHJldHVybiB0aGlzLmZldGNoSU1zKCkudGhlbihpbXMgPT4gaW1zLmZpbmQoaW0gPT4gaW0udXNlciA9PT0gdXNlcklEKSlcbiAgfVxuXG4gIGZldGNoSU1zT2YgKHVzZXJzSUQpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaElNcygpLnRoZW4oaW1zID0+IGltcy5maWx0ZXIoaW0gPT4gdXNlcnNJRC5pbmNsdWRlcyhpbS51c2VyKSkpXG4gIH1cblxuICBhc3luYyBzZW5kVG9BZG1pbnMgKG1lc3NhZ2UpIHtcbiAgICBsZXQgYWRtaW5zSUQgPSBleHRyYWN0SURzKGF3YWl0IHRoaXMuZmV0Y2hBZG1pbnMoKSlcbiAgICBsZXQgdGFyZ2V0c0lNSUQgPSBleHRyYWN0SURzKGF3YWl0IHRoaXMuZmV0Y2hJTXNPZihhZG1pbnNJRCkpXG4gICAgdGFyZ2V0c0lNSUQuZm9yRWFjaCh0YXJnZXRJTUlEID0+IHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKHRhcmdldElNSUQsIG1lc3NhZ2UpKVxuICB9XG5cbiAgYXN5bmMgc2VuZFRvVXNlciAoaWQsIG1lc3NhZ2UpIHtcbiAgICBsZXQgdGFyZ2V0SU1JRCA9IChhd2FpdCB0aGlzLmZldGNoSU1PZihpZCkpLmlkXG4gICAgdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UodGFyZ2V0SU1JRCwgbWVzc2FnZSlcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb1VzZXJzIChpZHMsIG1lc3NhZ2UpIHtcbiAgICBsZXQgdGFyZ2V0c0lNSUQgPSBleHRyYWN0SURzKGF3YWl0IHRoaXMuZmV0Y2hJTXNPZihpZHMpKVxuICAgIHRhcmdldHNJTUlELmZvckVhY2godGFyZ2V0SU1JRCA9PiB7XG4gICAgICB0aGlzLl9jbGllbnQuY2hhdC5wb3N0TWVzc2FnZSh0YXJnZXRJTUlELCBtZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBzZW5kVG9DaGFubmVsIChpZCwgbWVzc2FnZSkge1xuICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKGlkLCBtZXNzYWdlKVxuICB9XG5cbiAgYXN5bmMgZGlzdHJpYnV0ZSAoc3VydmV5KSB7XG4gICAgbGV0IHRhcmdldHNJRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGhpcy5mZXRjaFVzZXJzKCkpLmZpbHRlcih0YXJnZXRJRCA9PiAhc3VydmV5LmV4Y2x1ZGVkVXNlcnNJRC5pbmNsdWRlcyh0YXJnZXRJRCkpXG4gICAgbGV0IHRhcmdldHNJTUlEID0gZXh0cmFjdElEcyhhd2FpdCB0aGlzLmZldGNoSU1zT2YodGFyZ2V0c0lEKSlcbiAgICB0YXJnZXRzSU1JRC5mb3JFYWNoKHRhcmdldElNSUQgPT4ge1xuICAgICAgdGhpcy5fY2xpZW50LmNoYXQucG9zdE1lc3NhZ2UodGFyZ2V0SU1JRCwgc3VydmV5LnExLnRleHQsIHtcbiAgICAgICAgYXR0YWNobWVudHM6IHN1cnZleS5xMS5hdHRhY2htZW50c1xuICAgICAgfSlcbiAgICB9KVxuICAgIHN1cnZleS5pc1NlbnQgPSB0cnVlXG4gICAgc3VydmV5LnVwZGF0ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3RcbiJdfQ==