'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const activeSurvey = yield team.activeSurvey;
    const scheduledSurvey = yield team.scheduledSurvey;

    if (activeSurvey || scheduledSurvey) {
      if (activeSurvey) {
        yield activeSurvey.close();
      }
      if (scheduledSurvey) {
        yield scheduledSurvey.delete();
      }
      return message.ok;
    } else {
      return 'No active or scheduled survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJjbG9zZSIsImRlbGV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsVUFBTUMsa0JBQWtCLE1BQU1GLEtBQUtFLGVBQW5DOztBQUVBLFFBQUlELGdCQUFnQkMsZUFBcEIsRUFBcUM7QUFDbkMsVUFBSUQsWUFBSixFQUFrQjtBQUNoQixjQUFNQSxhQUFhRSxLQUFiLEVBQU47QUFDRDtBQUNELFVBQUlELGVBQUosRUFBcUI7QUFDbkIsY0FBTUEsZ0JBQWdCRSxNQUFoQixFQUFOO0FBQ0Q7QUFDRCxhQUFPUixRQUFRUyxFQUFmO0FBQ0QsS0FSRCxNQVFPO0FBQ0wsYUFBTywrQkFBUDtBQUNEO0FBQ0YsR0FmRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdG9wU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuXG4gIGlmIChhY3RpdmVTdXJ2ZXkgfHwgc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgICAgYXdhaXQgYWN0aXZlU3VydmV5LmNsb3NlKClcbiAgICB9XG4gICAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LmRlbGV0ZSgpXG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlLm9rXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdObyBhY3RpdmUgb3Igc2NoZWR1bGVkIHN1cnZleSdcbiAgfVxufVxuIl19