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
      return `/nps-stop-survey: ${message.ok}`;
    } else {
      return '/nps-stop-survey: No active or scheduled survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJjbG9zZSIsImRlbGV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsVUFBTUMsa0JBQWtCLE1BQU1GLEtBQUtFLGVBQW5DOztBQUVBLFFBQUlELGdCQUFnQkMsZUFBcEIsRUFBcUM7QUFDbkMsVUFBSUQsWUFBSixFQUFrQjtBQUNoQixjQUFNQSxhQUFhRSxLQUFiLEVBQU47QUFDRDtBQUNELFVBQUlELGVBQUosRUFBcUI7QUFDbkIsY0FBTUEsZ0JBQWdCRSxNQUFoQixFQUFOO0FBQ0Q7QUFDRCxhQUFRLHFCQUFvQlIsUUFBUVMsRUFBRyxFQUF2QztBQUNELEtBUkQsTUFRTztBQUNMLGFBQU8saURBQVA7QUFDRDtBQUNGLEdBZkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic3RvcFN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcblxuICBpZiAoYWN0aXZlU3VydmV5IHx8IHNjaGVkdWxlZFN1cnZleSkge1xuICAgIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICAgIGF3YWl0IGFjdGl2ZVN1cnZleS5jbG9zZSgpXG4gICAgfVxuICAgIGlmIChzY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICAgIGF3YWl0IHNjaGVkdWxlZFN1cnZleS5kZWxldGUoKVxuICAgIH1cbiAgICByZXR1cm4gYC9ucHMtc3RvcC1zdXJ2ZXk6ICR7bWVzc2FnZS5va31gXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcvbnBzLXN0b3Atc3VydmV5OiBObyBhY3RpdmUgb3Igc2NoZWR1bGVkIHN1cnZleSdcbiAgfVxufVxuIl19