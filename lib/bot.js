'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { WebClient } = require('@slack/client');
const message = require('./message');
const { extractIDs } = require('./util');

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

  fetchIMs() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const res = yield _this3._client.im.list();
      return res.ims;
    })();
  }

  sendToChannel(id, message, attachments = []) {
    this._client.chat.postMessage(id, message, { attachments });
  }

  // Derived methods
  fetchIMsOf(usersID) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const ims = yield _this4.fetchIMs();
      return ims.filter(function (im) {
        return usersID.includes(im.user);
      });
    })();
  }

  sendToUsers(usersID, message, attachments = []) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const ims = yield _this5.fetchIMsOf(usersID);
      const imsID = extractIDs(ims);
      for (let imID of imsID) {
        _this5.sendToChannel(imID, message, attachments);
      }
    })();
  }

  distribute(survey) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      return _this6.sendToUsers(survey.targetsID, '', [{
        title: message.survey.title,
        fallback: 'You are unable to answer the survey',
        callback_id: JSON.stringify({
          callback: 'answerSurvey',
          id: survey.id
        }),
        actions: [{
          name: 'choice',
          text: 'Answer',
          type: 'button',
          value: 'Answer',
          style: 'primary'
        }, {
          name: 'choice',
          text: 'Skip',
          type: 'button',
          value: 'Skip',
          style: 'danger',
          confirm: {
            title: 'Are you sure?',
            text: 'The team needs your opinions to improve!',
            ok_text: 'Maybe next time'
          }
        }]
      }]);
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ib3QuanMiXSwibmFtZXMiOlsiV2ViQ2xpZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsIkJvdCIsImNvbnN0cnVjdG9yIiwidG9rZW4iLCJfY2xpZW50IiwiZmV0Y2hVc2VycyIsInJlcyIsInVzZXJzIiwibGlzdCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJtZW1iZXIiLCJpc19ib3QiLCJuYW1lIiwiZGVsZXRlZCIsImZldGNoVXNlciIsImlkIiwiaW5mbyIsInVzZXIiLCJmZXRjaElNcyIsImltIiwiaW1zIiwic2VuZFRvQ2hhbm5lbCIsImF0dGFjaG1lbnRzIiwiY2hhdCIsInBvc3RNZXNzYWdlIiwiZmV0Y2hJTXNPZiIsInVzZXJzSUQiLCJpbmNsdWRlcyIsInNlbmRUb1VzZXJzIiwiaW1zSUQiLCJpbUlEIiwiZGlzdHJpYnV0ZSIsInN1cnZleSIsInRhcmdldHNJRCIsInRpdGxlIiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJ0ZXh0IiwidHlwZSIsInZhbHVlIiwic3R5bGUiLCJjb25maXJtIiwib2tfdGV4dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsU0FBRixLQUFnQkMsUUFBUSxlQUFSLENBQXRCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFRSxVQUFGLEtBQWlCRixRQUFRLFFBQVIsQ0FBdkI7O0FBRUE7OztBQUdBRyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEdBQU4sQ0FBVTtBQUN6QkMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxPQUFMLEdBQWUsSUFBSVQsU0FBSixDQUFjUSxLQUFkLENBQWY7QUFDRDs7QUFFRDtBQUNNRSxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsWUFBTUMsTUFBTSxNQUFNLE1BQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQkMsSUFBbkIsRUFBbEI7QUFDQTtBQUNBLGFBQU9GLElBQUlHLE9BQUosQ0FBWUMsTUFBWixDQUFtQjtBQUFBLGVBQVUsRUFBRUMsT0FBT0MsTUFBUCxJQUFpQkQsT0FBT0UsSUFBUCxLQUFnQixVQUFqQyxJQUErQ0YsT0FBT0csT0FBeEQsQ0FBVjtBQUFBLE9BQW5CLENBQVA7QUFIa0I7QUFJbkI7O0FBRUtDLFdBQU4sQ0FBaUJDLEVBQWpCLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsWUFBTVYsTUFBTSxNQUFNLE9BQUtGLE9BQUwsQ0FBYUcsS0FBYixDQUFtQlUsSUFBbkIsQ0FBd0JELEVBQXhCLENBQWxCO0FBQ0EsYUFBT1YsSUFBSVksSUFBWDtBQUZtQjtBQUdwQjs7QUFFS0MsVUFBTixHQUFrQjtBQUFBOztBQUFBO0FBQ2hCLFlBQU1iLE1BQU0sTUFBTSxPQUFLRixPQUFMLENBQWFnQixFQUFiLENBQWdCWixJQUFoQixFQUFsQjtBQUNBLGFBQU9GLElBQUllLEdBQVg7QUFGZ0I7QUFHakI7O0FBRURDLGdCQUFlTixFQUFmLEVBQW1CbkIsT0FBbkIsRUFBNEIwQixjQUFjLEVBQTFDLEVBQThDO0FBQzVDLFNBQUtuQixPQUFMLENBQWFvQixJQUFiLENBQWtCQyxXQUFsQixDQUE4QlQsRUFBOUIsRUFBa0NuQixPQUFsQyxFQUEyQyxFQUFFMEIsV0FBRixFQUEzQztBQUNEOztBQUVEO0FBQ01HLFlBQU4sQ0FBa0JDLE9BQWxCLEVBQTJCO0FBQUE7O0FBQUE7QUFDekIsWUFBTU4sTUFBTSxNQUFNLE9BQUtGLFFBQUwsRUFBbEI7QUFDQSxhQUFPRSxJQUFJWCxNQUFKLENBQVc7QUFBQSxlQUFNaUIsUUFBUUMsUUFBUixDQUFpQlIsR0FBR0YsSUFBcEIsQ0FBTjtBQUFBLE9BQVgsQ0FBUDtBQUZ5QjtBQUcxQjs7QUFFS1csYUFBTixDQUFtQkYsT0FBbkIsRUFBNEI5QixPQUE1QixFQUFxQzBCLGNBQWMsRUFBbkQsRUFBdUQ7QUFBQTs7QUFBQTtBQUNyRCxZQUFNRixNQUFNLE1BQU0sT0FBS0ssVUFBTCxDQUFnQkMsT0FBaEIsQ0FBbEI7QUFDQSxZQUFNRyxRQUFRaEMsV0FBV3VCLEdBQVgsQ0FBZDtBQUNBLFdBQUssSUFBSVUsSUFBVCxJQUFpQkQsS0FBakIsRUFBd0I7QUFDdEIsZUFBS1IsYUFBTCxDQUFtQlMsSUFBbkIsRUFBeUJsQyxPQUF6QixFQUFrQzBCLFdBQWxDO0FBQ0Q7QUFMb0Q7QUFNdEQ7O0FBRUtTLFlBQU4sQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQUE7O0FBQUE7QUFDeEIsYUFBTyxPQUFLSixXQUFMLENBQWlCSSxPQUFPQyxTQUF4QixFQUFtQyxFQUFuQyxFQUF1QyxDQUM1QztBQUNFQyxlQUFPdEMsUUFBUW9DLE1BQVIsQ0FBZUUsS0FEeEI7QUFFRUMsa0JBQVUscUNBRlo7QUFHRUMscUJBQWFDLEtBQUtDLFNBQUwsQ0FBZTtBQUMxQkMsb0JBQVUsY0FEZ0I7QUFFMUJ4QixjQUFJaUIsT0FBT2pCO0FBRmUsU0FBZixDQUhmO0FBT0V5QixpQkFBUyxDQUNQO0FBQ0U1QixnQkFBTSxRQURSO0FBRUU2QixnQkFBTSxRQUZSO0FBR0VDLGdCQUFNLFFBSFI7QUFJRUMsaUJBQU8sUUFKVDtBQUtFQyxpQkFBTztBQUxULFNBRE8sRUFRUDtBQUNFaEMsZ0JBQU0sUUFEUjtBQUVFNkIsZ0JBQU0sTUFGUjtBQUdFQyxnQkFBTSxRQUhSO0FBSUVDLGlCQUFPLE1BSlQ7QUFLRUMsaUJBQU8sUUFMVDtBQU1FQyxtQkFBUztBQUNQWCxtQkFBTyxlQURBO0FBRVBPLGtCQUFNLDBDQUZDO0FBR1BLLHFCQUFTO0FBSEY7QUFOWCxTQVJPO0FBUFgsT0FENEMsQ0FBdkMsQ0FBUDtBQUR3QjtBQWdDekI7QUF4RXdCLENBQTNCIiwiZmlsZSI6ImJvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgV2ViQ2xpZW50IH0gPSByZXF1aXJlKCdAc2xhY2svY2xpZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuL21lc3NhZ2UnKVxuY29uc3QgeyBleHRyYWN0SURzIH0gPSByZXF1aXJlKCcuL3V0aWwnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9hcGkuc2xhY2suY29tL21ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBCb3Qge1xuICBjb25zdHJ1Y3RvciAodG9rZW4pIHtcbiAgICB0aGlzLl9jbGllbnQgPSBuZXcgV2ViQ2xpZW50KHRva2VuKVxuICB9XG5cbiAgLy8gQVBJIHdyYXBwZXJzXG4gIGFzeW5jIGZldGNoVXNlcnMgKCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2NsaWVudC51c2Vycy5saXN0KClcbiAgICAvLyBuZWl0aGVyIGEgYm90IG9yIGEgZm9ybWVyIG1lbWJlclxuICAgIHJldHVybiByZXMubWVtYmVycy5maWx0ZXIobWVtYmVyID0+ICEobWVtYmVyLmlzX2JvdCB8fCBtZW1iZXIubmFtZSA9PT0gJ3NsYWNrYm90JyB8fCBtZW1iZXIuZGVsZXRlZCkpXG4gIH1cblxuICBhc3luYyBmZXRjaFVzZXIgKGlkKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LnVzZXJzLmluZm8oaWQpXG4gICAgcmV0dXJuIHJlcy51c2VyXG4gIH1cblxuICBhc3luYyBmZXRjaElNcyAoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5fY2xpZW50LmltLmxpc3QoKVxuICAgIHJldHVybiByZXMuaW1zXG4gIH1cblxuICBzZW5kVG9DaGFubmVsIChpZCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIHRoaXMuX2NsaWVudC5jaGF0LnBvc3RNZXNzYWdlKGlkLCBtZXNzYWdlLCB7IGF0dGFjaG1lbnRzIH0pXG4gIH1cblxuICAvLyBEZXJpdmVkIG1ldGhvZHNcbiAgYXN5bmMgZmV0Y2hJTXNPZiAodXNlcnNJRCkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXMoKVxuICAgIHJldHVybiBpbXMuZmlsdGVyKGltID0+IHVzZXJzSUQuaW5jbHVkZXMoaW0udXNlcikpXG4gIH1cblxuICBhc3luYyBzZW5kVG9Vc2VycyAodXNlcnNJRCwgbWVzc2FnZSwgYXR0YWNobWVudHMgPSBbXSkge1xuICAgIGNvbnN0IGltcyA9IGF3YWl0IHRoaXMuZmV0Y2hJTXNPZih1c2Vyc0lEKVxuICAgIGNvbnN0IGltc0lEID0gZXh0cmFjdElEcyhpbXMpXG4gICAgZm9yIChsZXQgaW1JRCBvZiBpbXNJRCkge1xuICAgICAgdGhpcy5zZW5kVG9DaGFubmVsKGltSUQsIG1lc3NhZ2UsIGF0dGFjaG1lbnRzKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRpc3RyaWJ1dGUgKHN1cnZleSkge1xuICAgIHJldHVybiB0aGlzLnNlbmRUb1VzZXJzKHN1cnZleS50YXJnZXRzSUQsICcnLCBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLnN1cnZleS50aXRsZSxcbiAgICAgICAgZmFsbGJhY2s6ICdZb3UgYXJlIHVuYWJsZSB0byBhbnN3ZXIgdGhlIHN1cnZleScsXG4gICAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY2FsbGJhY2s6ICdhbnN3ZXJTdXJ2ZXknLFxuICAgICAgICAgIGlkOiBzdXJ2ZXkuaWRcbiAgICAgICAgfSksXG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2hvaWNlJyxcbiAgICAgICAgICAgIHRleHQ6ICdBbnN3ZXInLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogJ0Fuc3dlcicsXG4gICAgICAgICAgICBzdHlsZTogJ3ByaW1hcnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2hvaWNlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTa2lwJyxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgdmFsdWU6ICdTa2lwJyxcbiAgICAgICAgICAgIHN0eWxlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGNvbmZpcm06IHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgICAgICAgICAgdGV4dDogJ1RoZSB0ZWFtIG5lZWRzIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZSEnLFxuICAgICAgICAgICAgICBva190ZXh0OiAnTWF5YmUgbmV4dCB0aW1lJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0pXG4gIH1cbn1cbiJdfQ==