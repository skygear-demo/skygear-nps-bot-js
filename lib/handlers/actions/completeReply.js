'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Reply = require('../../reply');
const Survey = require('../../survey');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (userID, { surveyID }) {
    let survey = yield Survey.of(surveyID.substring(7)); // id => _id
    if (survey.isClosed) {
      return 'Survey has already closed.';
    }

    let reply = yield Reply.of(surveyID, userID);
    reply.isCompleted = true;
    reply.update();
    return 'Thank you for your reply.';
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL2NvbXBsZXRlUmVwbHkuanMiXSwibmFtZXMiOlsiUmVwbHkiLCJyZXF1aXJlIiwiU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInVzZXJJRCIsInN1cnZleUlEIiwic3VydmV5Iiwib2YiLCJzdWJzdHJpbmciLCJpc0Nsb3NlZCIsInJlcGx5IiwiaXNDb21wbGV0ZWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxRQUFRQyxRQUFRLGFBQVIsQ0FBZDtBQUNBLE1BQU1DLFNBQVNELFFBQVEsY0FBUixDQUFmOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLE1BQVAsRUFBZSxFQUFFQyxRQUFGLEVBQWYsRUFBZ0M7QUFDL0MsUUFBSUMsU0FBUyxNQUFNTCxPQUFPTSxFQUFQLENBQVVGLFNBQVNHLFNBQVQsQ0FBbUIsQ0FBbkIsQ0FBVixDQUFuQixDQUQrQyxDQUNLO0FBQ3BELFFBQUlGLE9BQU9HLFFBQVgsRUFBcUI7QUFDbkIsYUFBTyw0QkFBUDtBQUNEOztBQUVELFFBQUlDLFFBQVEsTUFBTVgsTUFBTVEsRUFBTixDQUFTRixRQUFULEVBQW1CRCxNQUFuQixDQUFsQjtBQUNBTSxVQUFNQyxXQUFOLEdBQW9CLElBQXBCO0FBQ0FELFVBQU1FLE1BQU47QUFDQSxXQUFPLDJCQUFQO0FBQ0QsR0FWRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJjb21wbGV0ZVJlcGx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuLi8uLi9yZXBseScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh1c2VySUQsIHsgc3VydmV5SUQgfSkgPT4ge1xuICBsZXQgc3VydmV5ID0gYXdhaXQgU3VydmV5Lm9mKHN1cnZleUlELnN1YnN0cmluZyg3KSkgLy8gaWQgPT4gX2lkXG4gIGlmIChzdXJ2ZXkuaXNDbG9zZWQpIHtcbiAgICByZXR1cm4gJ1N1cnZleSBoYXMgYWxyZWFkeSBjbG9zZWQuJ1xuICB9XG5cbiAgbGV0IHJlcGx5ID0gYXdhaXQgUmVwbHkub2Yoc3VydmV5SUQsIHVzZXJJRClcbiAgcmVwbHkuaXNDb21wbGV0ZWQgPSB0cnVlXG4gIHJlcGx5LnVwZGF0ZSgpXG4gIHJldHVybiAnVGhhbmsgeW91IGZvciB5b3VyIHJlcGx5Lidcbn1cbiJdfQ==