'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Reply = require('../../reply');
const Survey = require('../../survey');

/**
 * id: 'survey/3b9f8f98-f993-4e1d-81c3-a451e483306b', for skygear.Reference
 * _id: '3b9f8f98-f993-4e1d-81c3-a451e483306b', for query
 */
module.exports = (() => {
  var _ref = _asyncToGenerator(function* (userID, { surveyID, score }) {
    // check survey has closed
    let survey = yield Survey.of(surveyID.substring(7)); // id => _id
    if (survey.isClosed) {
      return 'Survey has already closed.';
    }

    // check has replied score
    let reply = yield Reply.of(surveyID, userID);
    if (reply) {
      return 'You have already replied the question.';
    }

    // create reply record
    reply = yield Reply.create(surveyID, userID, score);
    return `Great! Now please tell me a bit more about why you rated ${score}?`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24uanMiXSwibmFtZXMiOlsiUmVwbHkiLCJyZXF1aXJlIiwiU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInVzZXJJRCIsInN1cnZleUlEIiwic2NvcmUiLCJzdXJ2ZXkiLCJvZiIsInN1YnN0cmluZyIsImlzQ2xvc2VkIiwicmVwbHkiLCJjcmVhdGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxRQUFRQyxRQUFRLGFBQVIsQ0FBZDtBQUNBLE1BQU1DLFNBQVNELFFBQVEsY0FBUixDQUFmOztBQUVBOzs7O0FBSUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsTUFBUCxFQUFlLEVBQUVDLFFBQUYsRUFBWUMsS0FBWixFQUFmLEVBQXVDO0FBQ3REO0FBQ0EsUUFBSUMsU0FBUyxNQUFNTixPQUFPTyxFQUFQLENBQVVILFNBQVNJLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBVixDQUFuQixDQUZzRCxDQUVGO0FBQ3BELFFBQUlGLE9BQU9HLFFBQVgsRUFBcUI7QUFDbkIsYUFBTyw0QkFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBSUMsUUFBUSxNQUFNWixNQUFNUyxFQUFOLENBQVNILFFBQVQsRUFBbUJELE1BQW5CLENBQWxCO0FBQ0EsUUFBSU8sS0FBSixFQUFXO0FBQ1QsYUFBTyx3Q0FBUDtBQUNEOztBQUVEO0FBQ0FBLFlBQVEsTUFBTVosTUFBTWEsTUFBTixDQUFhUCxRQUFiLEVBQXVCRCxNQUF2QixFQUErQkUsS0FBL0IsQ0FBZDtBQUNBLFdBQVEsNERBQTJEQSxLQUFNLEdBQXpFO0FBQ0QsR0FoQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2F2ZVNjb3JlQW5kUmVxdWVzdFJlYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcblxuLyoqXG4gKiBpZDogJ3N1cnZleS8zYjlmOGY5OC1mOTkzLTRlMWQtODFjMy1hNDUxZTQ4MzMwNmInLCBmb3Igc2t5Z2Vhci5SZWZlcmVuY2VcbiAqIF9pZDogJzNiOWY4Zjk4LWY5OTMtNGUxZC04MWMzLWE0NTFlNDgzMzA2YicsIGZvciBxdWVyeVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh1c2VySUQsIHsgc3VydmV5SUQsIHNjb3JlIH0pID0+IHtcbiAgLy8gY2hlY2sgc3VydmV5IGhhcyBjbG9zZWRcbiAgbGV0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5vZihzdXJ2ZXlJRC5zdWJzdHJpbmcoNykpIC8vIGlkID0+IF9pZFxuICBpZiAoc3VydmV5LmlzQ2xvc2VkKSB7XG4gICAgcmV0dXJuICdTdXJ2ZXkgaGFzIGFscmVhZHkgY2xvc2VkLidcbiAgfVxuXG4gIC8vIGNoZWNrIGhhcyByZXBsaWVkIHNjb3JlXG4gIGxldCByZXBseSA9IGF3YWl0IFJlcGx5Lm9mKHN1cnZleUlELCB1c2VySUQpXG4gIGlmIChyZXBseSkge1xuICAgIHJldHVybiAnWW91IGhhdmUgYWxyZWFkeSByZXBsaWVkIHRoZSBxdWVzdGlvbi4nXG4gIH1cblxuICAvLyBjcmVhdGUgcmVwbHkgcmVjb3JkXG4gIHJlcGx5ID0gYXdhaXQgUmVwbHkuY3JlYXRlKHN1cnZleUlELCB1c2VySUQsIHNjb3JlKVxuICByZXR1cm4gYEdyZWF0ISBOb3cgcGxlYXNlIHRlbGwgbWUgYSBiaXQgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkICR7c2NvcmV9P2Bcbn1cbiJdfQ==