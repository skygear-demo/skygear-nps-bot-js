'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, userID, team, choice, triggerID, responseURL) {
    if (choice === 'yes') {
      team.bot.openSurveyDialog(surveyID, triggerID, responseURL);
    } else {
      yield Reply.create(surveyID, userID, null, null);
      return message.survey.farewellText;
    }
  });

  return function (_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL2Fuc3dlclN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlJlcGx5IiwibW9kdWxlIiwiZXhwb3J0cyIsInN1cnZleUlEIiwidXNlcklEIiwidGVhbSIsImNob2ljZSIsInRyaWdnZXJJRCIsInJlc3BvbnNlVVJMIiwiYm90Iiwib3BlblN1cnZleURpYWxvZyIsImNyZWF0ZSIsInN1cnZleSIsImZhcmV3ZWxsVGV4dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1DLFFBQVFELFFBQVEsYUFBUixDQUFkOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLFFBQVAsRUFBaUJDLE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQkMsTUFBL0IsRUFBdUNDLFNBQXZDLEVBQWtEQyxXQUFsRCxFQUFrRTtBQUNqRixRQUFJRixXQUFXLEtBQWYsRUFBc0I7QUFDcEJELFdBQUtJLEdBQUwsQ0FBU0MsZ0JBQVQsQ0FBMEJQLFFBQTFCLEVBQW9DSSxTQUFwQyxFQUErQ0MsV0FBL0M7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNUixNQUFNVyxNQUFOLENBQWFSLFFBQWIsRUFBdUJDLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLElBQXJDLENBQU47QUFDQSxhQUFPTixRQUFRYyxNQUFSLENBQWVDLFlBQXRCO0FBQ0Q7QUFDRixHQVBEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImFuc3dlclN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgdXNlcklELCB0ZWFtLCBjaG9pY2UsIHRyaWdnZXJJRCwgcmVzcG9uc2VVUkwpID0+IHtcbiAgaWYgKGNob2ljZSA9PT0gJ3llcycpIHtcbiAgICB0ZWFtLmJvdC5vcGVuU3VydmV5RGlhbG9nKHN1cnZleUlELCB0cmlnZ2VySUQsIHJlc3BvbnNlVVJMKVxuICB9IGVsc2Uge1xuICAgIGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlcklELCBudWxsLCBudWxsKVxuICAgIHJldHVybiBtZXNzYWdlLnN1cnZleS5mYXJld2VsbFRleHRcbiAgfVxufVxuIl19