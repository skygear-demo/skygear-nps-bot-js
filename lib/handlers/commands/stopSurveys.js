'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const surveys = yield team.scheduledSurveys;

    if (surveys.length === 0) {
      return 'No scheduled survey';
    }

    for (let survey of surveys) {
      yield survey.delete();
    }
    return message.ok;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5cy5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwic3VydmV5cyIsInNjaGVkdWxlZFN1cnZleXMiLCJsZW5ndGgiLCJzdXJ2ZXkiLCJkZWxldGUiLCJvayJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjs7QUFFQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsVUFBVSxNQUFNRCxLQUFLRSxnQkFBM0I7O0FBRUEsUUFBSUQsUUFBUUUsTUFBUixLQUFtQixDQUF2QixFQUEwQjtBQUN4QixhQUFPLHFCQUFQO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJQyxNQUFULElBQW1CSCxPQUFuQixFQUE0QjtBQUMxQixZQUFNRyxPQUFPQyxNQUFQLEVBQU47QUFDRDtBQUNELFdBQU9ULFFBQVFVLEVBQWY7QUFDRCxHQVhEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0b3BTdXJ2ZXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlzXG5cbiAgaWYgKHN1cnZleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdObyBzY2hlZHVsZWQgc3VydmV5J1xuICB9XG5cbiAgZm9yIChsZXQgc3VydmV5IG9mIHN1cnZleXMpIHtcbiAgICBhd2FpdCBzdXJ2ZXkuZGVsZXRlKClcbiAgfVxuICByZXR1cm4gbWVzc2FnZS5va1xufVxuIl19