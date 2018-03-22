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
      return `/nps-send-reminder: ${message.ok} Reminders sent!`;
    } else {
      return '/nps-send-reminder: There is no active survey.';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJjb21tYW5kIiwic2lsZW50VGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwic3VidHJhY3QiLCJyZXNwb25kZW50c0lEIiwib2YiLCJ0ZWFtSUQiLCJib3QiLCJzZW5kVG9Vc2VycyIsIm1lc3NhZ2VzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiZGlzdHJpYnV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsUUFBSUEsWUFBSixFQUFrQjtBQUNoQixZQUFNQyxVQUFVTixRQUFRTSxPQUFSLENBQWdCLG9CQUFoQixDQUFoQjtBQUNBLFlBQU1DLGtCQUFrQlQsSUFBSU8sYUFBYUcsU0FBakIsRUFBNEJDLFFBQTVCLENBQXFDWCxLQUFJLE1BQU1PLGFBQWFLLGFBQXZCLEVBQXJDLENBQXhCO0FBQ0EsWUFBTU4sT0FBTyxNQUFNSCxLQUFLVSxFQUFMLENBQVFOLGFBQWFPLE1BQXJCLENBQW5CO0FBQ0FSLFdBQUtTLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQlAsZUFBckIsRUFBc0NELFFBQVFTLFFBQVIsQ0FBaUJDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxLQUFnQlosUUFBUVMsUUFBUixDQUFpQkksTUFBNUMsQ0FBakIsQ0FBdEM7QUFDQWYsV0FBS1MsR0FBTCxDQUFTTyxVQUFULENBQW9CZixZQUFwQixFQUFrQ0UsZUFBbEM7QUFDQSxhQUFRLHVCQUFzQlAsUUFBUXFCLEVBQUcsa0JBQXpDO0FBQ0QsS0FQRCxNQU9PO0FBQ0wsYUFBTyxnREFBUDtBQUNEO0FBQ0YsR0FaRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzZW5kUmVtaW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFNldCB9ID0gcmVxdWlyZSgnaW1tdXRhYmxlJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtc2VuZC1yZW1pbmRlciddXG4gICAgY29uc3Qgc2lsZW50VGFyZ2V0c0lEID0gU2V0KGFjdGl2ZVN1cnZleS50YXJnZXRzSUQpLnN1YnRyYWN0KFNldChhd2FpdCBhY3RpdmVTdXJ2ZXkucmVzcG9uZGVudHNJRCkpXG4gICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YoYWN0aXZlU3VydmV5LnRlYW1JRClcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2VycyhzaWxlbnRUYXJnZXRzSUQsIGNvbW1hbmQubWVzc2FnZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29tbWFuZC5tZXNzYWdlcy5sZW5ndGgpXSlcbiAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKGFjdGl2ZVN1cnZleSwgc2lsZW50VGFyZ2V0c0lEKVxuICAgIHJldHVybiBgL25wcy1zZW5kLXJlbWluZGVyOiAke21lc3NhZ2Uub2t9IFJlbWluZGVycyBzZW50IWBcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJy9ucHMtc2VuZC1yZW1pbmRlcjogVGhlcmUgaXMgbm8gYWN0aXZlIHN1cnZleS4nXG4gIH1cbn1cbiJdfQ==