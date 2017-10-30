'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const activeSurvey = yield team.activeSurvey;
    const scheduledSurvey = yield team.scheduledSurvey;

    if (activeSurvey) {
      yield activeSurvey.close();
      return 'Survey closed';
    } else if (scheduledSurvey) {
      yield scheduledSurvey.delete();
      return 'Survey unscheduled';
    } else {
      return 'No scheduled survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiYWN0aXZlU3VydmV5Iiwic2NoZWR1bGVkU3VydmV5IiwiY2xvc2UiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsZUFBZSxNQUFNRCxLQUFLQyxZQUFoQztBQUNBLFVBQU1DLGtCQUFrQixNQUFNRixLQUFLRSxlQUFuQzs7QUFFQSxRQUFJRCxZQUFKLEVBQWtCO0FBQ2hCLFlBQU1BLGFBQWFFLEtBQWIsRUFBTjtBQUNBLGFBQU8sZUFBUDtBQUNELEtBSEQsTUFHTyxJQUFJRCxlQUFKLEVBQXFCO0FBQzFCLFlBQU1BLGdCQUFnQkUsTUFBaEIsRUFBTjtBQUNBLGFBQU8sb0JBQVA7QUFDRCxLQUhNLE1BR0E7QUFDTCxhQUFPLHFCQUFQO0FBQ0Q7QUFDRixHQWJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0b3BTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuXG4gIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICBhd2FpdCBhY3RpdmVTdXJ2ZXkuY2xvc2UoKVxuICAgIHJldHVybiAnU3VydmV5IGNsb3NlZCdcbiAgfSBlbHNlIGlmIChzY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICBhd2FpdCBzY2hlZHVsZWRTdXJ2ZXkuZGVsZXRlKClcbiAgICByZXR1cm4gJ1N1cnZleSB1bnNjaGVkdWxlZCdcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ05vIHNjaGVkdWxlZCBzdXJ2ZXknXG4gIH1cbn1cbiJdfQ==