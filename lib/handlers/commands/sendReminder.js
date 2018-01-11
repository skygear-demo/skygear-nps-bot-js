'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const message = require('../../message');
const Team = require('../../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const activeSurvey = yield team.activeSurvey;
    if (activeSurvey) {
      const command = message.command['/nps-send-reminder'];
      const silentTargetsID = Set(activeSurvey.targetsID).subtract(Set((yield activeSurvey.respondentsID)));
      const team = yield Team.of(activeSurvey.teamID);
      team.bot.sendToUsers(silentTargetsID, command.messages[Math.floor(Math.random() * command.messages.length)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJjb21tYW5kIiwic2lsZW50VGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwic3VidHJhY3QiLCJyZXNwb25kZW50c0lEIiwib2YiLCJ0ZWFtSUQiLCJib3QiLCJzZW5kVG9Vc2VycyIsIm1lc3NhZ2VzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiZGlzdHJpYnV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsUUFBSUEsWUFBSixFQUFrQjtBQUNoQixZQUFNQyxVQUFVTixRQUFRTSxPQUFSLENBQWdCLG9CQUFoQixDQUFoQjtBQUNBLFlBQU1DLGtCQUFrQlQsSUFBSU8sYUFBYUcsU0FBakIsRUFBNEJDLFFBQTVCLENBQXFDWCxLQUFJLE1BQU1PLGFBQWFLLGFBQXZCLEVBQXJDLENBQXhCO0FBQ0EsWUFBTU4sT0FBTyxNQUFNSCxLQUFLVSxFQUFMLENBQVFOLGFBQWFPLE1BQXJCLENBQW5CO0FBQ0FSLFdBQUtTLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQlAsZUFBckIsRUFBc0NELFFBQVFTLFFBQVIsQ0FBaUJDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQlosUUFBUVMsUUFBUixDQUFpQkksTUFBNUMsQ0FBakIsQ0FBdEM7QUFDQWYsV0FBS1MsR0FBTCxDQUFTTyxVQUFULENBQW9CZixZQUFwQixFQUFrQ0UsZUFBbEM7QUFDQSxhQUFRLHVCQUFzQlAsUUFBUXFCLEVBQUcsRUFBekM7QUFDRCxLQVBELE1BT087QUFDTCxhQUFPLHNDQUFQO0FBQ0Q7QUFDRixHQVpEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNlbmRSZW1pbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zZW5kLXJlbWluZGVyJ11cbiAgICBjb25zdCBzaWxlbnRUYXJnZXRzSUQgPSBTZXQoYWN0aXZlU3VydmV5LnRhcmdldHNJRCkuc3VidHJhY3QoU2V0KGF3YWl0IGFjdGl2ZVN1cnZleS5yZXNwb25kZW50c0lEKSlcbiAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZihhY3RpdmVTdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LnNlbmRUb1VzZXJzKHNpbGVudFRhcmdldHNJRCwgY29tbWFuZC5tZXNzYWdlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb21tYW5kLm1lc3NhZ2VzLmxlbmd0aCldKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoYWN0aXZlU3VydmV5LCBzaWxlbnRUYXJnZXRzSUQpXG4gICAgcmV0dXJuIGAvbnBzLXNlbmQtcmVtaW5kZXI6ICR7bWVzc2FnZS5va31gXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcvbnBzLXNlbmQtcmVtaW5kZXI6IE5vIGFjdGl2ZSBzdXJ2ZXknXG4gIH1cbn1cbiJdfQ==