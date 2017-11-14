'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const message = require('../../message');
const Team = require('../../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const activeSurvey = yield team.activeSurvey;
    if (activeSurvey) {
      const silentTargetsID = Set(activeSurvey.targetsID).subtract(Set((yield activeSurvey.respondentsID)));
      const team = yield Team.of(activeSurvey.teamID);
      team.bot.sendToUsers(silentTargetsID, 'Hi! Please submit the NPS survey. We need your opinions to improve:)');
      team.bot.distribute(activeSurvey, silentTargetsID);
      return `/nps-send-reminder: ${message.ok}`;
    } else {
      return '/nps-send-reminder: No active survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzaWxlbnRUYXJnZXRzSUQiLCJ0YXJnZXRzSUQiLCJzdWJ0cmFjdCIsInJlc3BvbmRlbnRzSUQiLCJvZiIsInRlYW1JRCIsImJvdCIsInNlbmRUb1VzZXJzIiwiZGlzdHJpYnV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsUUFBSUEsWUFBSixFQUFrQjtBQUNoQixZQUFNQyxrQkFBa0JSLElBQUlPLGFBQWFFLFNBQWpCLEVBQTRCQyxRQUE1QixDQUFxQ1YsS0FBSSxNQUFNTyxhQUFhSSxhQUF2QixFQUFyQyxDQUF4QjtBQUNBLFlBQU1MLE9BQU8sTUFBTUgsS0FBS1MsRUFBTCxDQUFRTCxhQUFhTSxNQUFyQixDQUFuQjtBQUNBUCxXQUFLUSxHQUFMLENBQVNDLFdBQVQsQ0FBcUJQLGVBQXJCLEVBQXNDLHNFQUF0QztBQUNBRixXQUFLUSxHQUFMLENBQVNFLFVBQVQsQ0FBb0JULFlBQXBCLEVBQWtDQyxlQUFsQztBQUNBLGFBQVEsdUJBQXNCTixRQUFRZSxFQUFHLEVBQXpDO0FBQ0QsS0FORCxNQU1PO0FBQ0wsYUFBTyxzQ0FBUDtBQUNEO0FBQ0YsR0FYRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzZW5kUmVtaW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFNldCB9ID0gcmVxdWlyZSgnaW1tdXRhYmxlJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGNvbnN0IHNpbGVudFRhcmdldHNJRCA9IFNldChhY3RpdmVTdXJ2ZXkudGFyZ2V0c0lEKS5zdWJ0cmFjdChTZXQoYXdhaXQgYWN0aXZlU3VydmV5LnJlc3BvbmRlbnRzSUQpKVxuICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKGFjdGl2ZVN1cnZleS50ZWFtSUQpXG4gICAgdGVhbS5ib3Quc2VuZFRvVXNlcnMoc2lsZW50VGFyZ2V0c0lELCAnSGkhIFBsZWFzZSBzdWJtaXQgdGhlIE5QUyBzdXJ2ZXkuIFdlIG5lZWQgeW91ciBvcGluaW9ucyB0byBpbXByb3ZlOiknKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoYWN0aXZlU3VydmV5LCBzaWxlbnRUYXJnZXRzSUQpXG4gICAgcmV0dXJuIGAvbnBzLXNlbmQtcmVtaW5kZXI6ICR7bWVzc2FnZS5va31gXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcvbnBzLXNlbmQtcmVtaW5kZXI6IE5vIGFjdGl2ZSBzdXJ2ZXknXG4gIH1cbn1cbiJdfQ==