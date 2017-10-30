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
      return message.ok;
    } else {
      return 'No active survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzaWxlbnRUYXJnZXRzSUQiLCJ0YXJnZXRzSUQiLCJzdWJ0cmFjdCIsInJlc3BvbmRlbnRzSUQiLCJvZiIsInRlYW1JRCIsImJvdCIsInNlbmRUb1VzZXJzIiwib2siXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxZQUFSLENBQWI7O0FBRUFHLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsSUFBTixFQUFjO0FBQzdCLFVBQU1DLGVBQWUsTUFBTUQsS0FBS0MsWUFBaEM7QUFDQSxRQUFJQSxZQUFKLEVBQWtCO0FBQ2hCLFlBQU1DLGtCQUFrQlIsSUFBSU8sYUFBYUUsU0FBakIsRUFBNEJDLFFBQTVCLENBQXFDVixLQUFJLE1BQU1PLGFBQWFJLGFBQXZCLEVBQXJDLENBQXhCO0FBQ0EsWUFBTUwsT0FBTyxNQUFNSCxLQUFLUyxFQUFMLENBQVFMLGFBQWFNLE1BQXJCLENBQW5CO0FBQ0FQLFdBQUtRLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQlAsZUFBckIsRUFBc0Msc0VBQXRDO0FBQ0EsYUFBT04sUUFBUWMsRUFBZjtBQUNELEtBTEQsTUFLTztBQUNMLGFBQU8sa0JBQVA7QUFDRDtBQUNGLEdBVkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2VuZFJlbWluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICBjb25zdCBzaWxlbnRUYXJnZXRzSUQgPSBTZXQoYWN0aXZlU3VydmV5LnRhcmdldHNJRCkuc3VidHJhY3QoU2V0KGF3YWl0IGFjdGl2ZVN1cnZleS5yZXNwb25kZW50c0lEKSlcbiAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZihhY3RpdmVTdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LnNlbmRUb1VzZXJzKHNpbGVudFRhcmdldHNJRCwgJ0hpISBQbGVhc2Ugc3VibWl0IHRoZSBOUFMgc3VydmV5LiBXZSBuZWVkIHlvdXIgb3BpbmlvbnMgdG8gaW1wcm92ZTopJylcbiAgICByZXR1cm4gbWVzc2FnZS5va1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gYWN0aXZlIHN1cnZleSdcbiAgfVxufVxuIl19