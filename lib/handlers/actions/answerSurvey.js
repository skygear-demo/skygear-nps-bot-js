'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const Reply = require('../../reply');
const Survey = require('../../survey');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, user, team, choice, triggerID, responseURL) {
    const survey = yield Survey.of(surveyID);
    if (survey.isClosed) {
      return 'This survey has closed';
    }

    if (yield user.hasReplied(surveyID)) {
      return 'You have already answered';
    }

    if (choice === 'yes') {
      team.bot.openSurveyDialog(surveyID, triggerID, responseURL);
    } else {
      yield Reply.create(surveyID, user.id, null, null);
      return message.survey.farewellText;
    }
  });

  return function (_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL2Fuc3dlclN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlJlcGx5IiwiU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInN1cnZleUlEIiwidXNlciIsInRlYW0iLCJjaG9pY2UiLCJ0cmlnZ2VySUQiLCJyZXNwb25zZVVSTCIsInN1cnZleSIsIm9mIiwiaXNDbG9zZWQiLCJoYXNSZXBsaWVkIiwiYm90Iiwib3BlblN1cnZleURpYWxvZyIsImNyZWF0ZSIsImlkIiwiZmFyZXdlbGxUZXh0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTUMsUUFBUUQsUUFBUSxhQUFSLENBQWQ7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGNBQVIsQ0FBZjs7QUFFQUcsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxRQUFQLEVBQWlCQyxJQUFqQixFQUF1QkMsSUFBdkIsRUFBNkJDLE1BQTdCLEVBQXFDQyxTQUFyQyxFQUFnREMsV0FBaEQsRUFBZ0U7QUFDL0UsVUFBTUMsU0FBUyxNQUFNVCxPQUFPVSxFQUFQLENBQVVQLFFBQVYsQ0FBckI7QUFDQSxRQUFJTSxPQUFPRSxRQUFYLEVBQXFCO0FBQ25CLGFBQU8sd0JBQVA7QUFDRDs7QUFFRCxRQUFJLE1BQU1QLEtBQUtRLFVBQUwsQ0FBZ0JULFFBQWhCLENBQVYsRUFBcUM7QUFDbkMsYUFBTywyQkFBUDtBQUNEOztBQUVELFFBQUlHLFdBQVcsS0FBZixFQUFzQjtBQUNwQkQsV0FBS1EsR0FBTCxDQUFTQyxnQkFBVCxDQUEwQlgsUUFBMUIsRUFBb0NJLFNBQXBDLEVBQStDQyxXQUEvQztBQUNELEtBRkQsTUFFTztBQUNMLFlBQU1ULE1BQU1nQixNQUFOLENBQWFaLFFBQWIsRUFBdUJDLEtBQUtZLEVBQTVCLEVBQWdDLElBQWhDLEVBQXNDLElBQXRDLENBQU47QUFDQSxhQUFPbkIsUUFBUVksTUFBUixDQUFlUSxZQUF0QjtBQUNEO0FBQ0YsR0FoQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiYW5zd2VyU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuLi8uLi9yZXBseScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgdXNlciwgdGVhbSwgY2hvaWNlLCB0cmlnZ2VySUQsIHJlc3BvbnNlVVJMKSA9PiB7XG4gIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5vZihzdXJ2ZXlJRClcbiAgaWYgKHN1cnZleS5pc0Nsb3NlZCkge1xuICAgIHJldHVybiAnVGhpcyBzdXJ2ZXkgaGFzIGNsb3NlZCdcbiAgfVxuXG4gIGlmIChhd2FpdCB1c2VyLmhhc1JlcGxpZWQoc3VydmV5SUQpKSB7XG4gICAgcmV0dXJuICdZb3UgaGF2ZSBhbHJlYWR5IGFuc3dlcmVkJ1xuICB9XG5cbiAgaWYgKGNob2ljZSA9PT0gJ3llcycpIHtcbiAgICB0ZWFtLmJvdC5vcGVuU3VydmV5RGlhbG9nKHN1cnZleUlELCB0cmlnZ2VySUQsIHJlc3BvbnNlVVJMKVxuICB9IGVsc2Uge1xuICAgIGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlci5pZCwgbnVsbCwgbnVsbClcbiAgICByZXR1cm4gbWVzc2FnZS5zdXJ2ZXkuZmFyZXdlbGxUZXh0XG4gIH1cbn1cbiJdfQ==