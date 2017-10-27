'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const survey = yield team.scheduledSurvey;
    if (survey) {
      yield survey.delete();
      return message.ok;
    } else {
      return 'No scheduled survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzdXJ2ZXkiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJkZWxldGUiLCJvayJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjs7QUFFQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsU0FBUyxNQUFNRCxLQUFLRSxlQUExQjtBQUNBLFFBQUlELE1BQUosRUFBWTtBQUNWLFlBQU1BLE9BQU9FLE1BQVAsRUFBTjtBQUNBLGFBQU9QLFFBQVFRLEVBQWY7QUFDRCxLQUhELE1BR087QUFDTCxhQUFPLHFCQUFQO0FBQ0Q7QUFDRixHQVJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0b3BTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGlmIChzdXJ2ZXkpIHtcbiAgICBhd2FpdCBzdXJ2ZXkuZGVsZXRlKClcbiAgICByZXR1cm4gbWVzc2FnZS5va1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gc2NoZWR1bGVkIHN1cnZleSdcbiAgfVxufVxuIl19