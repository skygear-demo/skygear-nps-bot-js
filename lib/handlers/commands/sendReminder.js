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
      return message.ok;
    } else {
      return 'No active survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzaWxlbnRUYXJnZXRzSUQiLCJ0YXJnZXRzSUQiLCJzdWJ0cmFjdCIsInJlc3BvbmRlbnRzSUQiLCJvZiIsInRlYW1JRCIsImJvdCIsInNlbmRUb1VzZXJzIiwiZGlzdHJpYnV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsUUFBSUEsWUFBSixFQUFrQjtBQUNoQixZQUFNQyxrQkFBa0JSLElBQUlPLGFBQWFFLFNBQWpCLEVBQTRCQyxRQUE1QixDQUFxQ1YsS0FBSSxNQUFNTyxhQUFhSSxhQUF2QixFQUFyQyxDQUF4QjtBQUNBLFlBQU1MLE9BQU8sTUFBTUgsS0FBS1MsRUFBTCxDQUFRTCxhQUFhTSxNQUFyQixDQUFuQjtBQUNBUCxXQUFLUSxHQUFMLENBQVNDLFdBQVQsQ0FBcUJQLGVBQXJCLEVBQXNDLHNFQUF0QztBQUNBRixXQUFLUSxHQUFMLENBQVNFLFVBQVQsQ0FBb0JULFlBQXBCLEVBQWtDQyxlQUFsQztBQUNBLGFBQU9OLFFBQVFlLEVBQWY7QUFDRCxLQU5ELE1BTU87QUFDTCxhQUFPLGtCQUFQO0FBQ0Q7QUFDRixHQVhEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNlbmRSZW1pbmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgY29uc3Qgc2lsZW50VGFyZ2V0c0lEID0gU2V0KGFjdGl2ZVN1cnZleS50YXJnZXRzSUQpLnN1YnRyYWN0KFNldChhd2FpdCBhY3RpdmVTdXJ2ZXkucmVzcG9uZGVudHNJRCkpXG4gICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YoYWN0aXZlU3VydmV5LnRlYW1JRClcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2VycyhzaWxlbnRUYXJnZXRzSUQsICdIaSEgUGxlYXNlIHN1Ym1pdCB0aGUgTlBTIHN1cnZleS4gV2UgbmVlZCB5b3VyIG9waW5pb25zIHRvIGltcHJvdmU6KScpXG4gICAgdGVhbS5ib3QuZGlzdHJpYnV0ZShhY3RpdmVTdXJ2ZXksIHNpbGVudFRhcmdldHNJRClcbiAgICByZXR1cm4gbWVzc2FnZS5va1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gYWN0aXZlIHN1cnZleSdcbiAgfVxufVxuIl19