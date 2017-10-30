'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const Reply = require('../../reply');
const Survey = require('../../survey');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, userID, team, choice, triggerID, responseURL) {
    const survey = yield Survey.of(surveyID);
    if (survey.isClosed) {
      return 'This survey has closed';
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL2Fuc3dlclN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlJlcGx5IiwiU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInN1cnZleUlEIiwidXNlcklEIiwidGVhbSIsImNob2ljZSIsInRyaWdnZXJJRCIsInJlc3BvbnNlVVJMIiwic3VydmV5Iiwib2YiLCJpc0Nsb3NlZCIsImJvdCIsIm9wZW5TdXJ2ZXlEaWFsb2ciLCJjcmVhdGUiLCJmYXJld2VsbFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNQyxRQUFRRCxRQUFRLGFBQVIsQ0FBZDtBQUNBLE1BQU1FLFNBQVNGLFFBQVEsY0FBUixDQUFmOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLFFBQVAsRUFBaUJDLE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQkMsTUFBL0IsRUFBdUNDLFNBQXZDLEVBQWtEQyxXQUFsRCxFQUFrRTtBQUNqRixVQUFNQyxTQUFTLE1BQU1ULE9BQU9VLEVBQVAsQ0FBVVAsUUFBVixDQUFyQjtBQUNBLFFBQUlNLE9BQU9FLFFBQVgsRUFBcUI7QUFDbkIsYUFBTyx3QkFBUDtBQUNEOztBQUVELFFBQUlMLFdBQVcsS0FBZixFQUFzQjtBQUNwQkQsV0FBS08sR0FBTCxDQUFTQyxnQkFBVCxDQUEwQlYsUUFBMUIsRUFBb0NJLFNBQXBDLEVBQStDQyxXQUEvQztBQUNELEtBRkQsTUFFTztBQUNMLFlBQU1ULE1BQU1lLE1BQU4sQ0FBYVgsUUFBYixFQUF1QkMsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsQ0FBTjtBQUNBLGFBQU9QLFFBQVFZLE1BQVIsQ0FBZU0sWUFBdEI7QUFDRDtBQUNGLEdBWkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiYW5zd2VyU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuLi8uLi9yZXBseScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgdXNlcklELCB0ZWFtLCBjaG9pY2UsIHRyaWdnZXJJRCwgcmVzcG9uc2VVUkwpID0+IHtcbiAgY29uc3Qgc3VydmV5ID0gYXdhaXQgU3VydmV5Lm9mKHN1cnZleUlEKVxuICBpZiAoc3VydmV5LmlzQ2xvc2VkKSB7XG4gICAgcmV0dXJuICdUaGlzIHN1cnZleSBoYXMgY2xvc2VkJ1xuICB9XG5cbiAgaWYgKGNob2ljZSA9PT0gJ3llcycpIHtcbiAgICB0ZWFtLmJvdC5vcGVuU3VydmV5RGlhbG9nKHN1cnZleUlELCB0cmlnZ2VySUQsIHJlc3BvbnNlVVJMKVxuICB9IGVsc2Uge1xuICAgIGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlcklELCBudWxsLCBudWxsKVxuICAgIHJldHVybiBtZXNzYWdlLnN1cnZleS5mYXJld2VsbFRleHRcbiAgfVxufVxuIl19