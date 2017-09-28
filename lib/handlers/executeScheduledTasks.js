'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { closeSurveys, distributeScheduledSurveys, remindUncompletedRespondents } = require('./tasks');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log(new Date());
    yield closeSurveys();
    yield remindUncompletedRespondents();
    yield distributeScheduledSurveys();
  });

  function executeScheduledTasks() {
    return _ref.apply(this, arguments);
  }

  return executeScheduledTasks;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9leGVjdXRlU2NoZWR1bGVkVGFza3MuanMiXSwibmFtZXMiOlsiY2xvc2VTdXJ2ZXlzIiwiZGlzdHJpYnV0ZVNjaGVkdWxlZFN1cnZleXMiLCJyZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnRzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25zb2xlIiwibG9nIiwiRGF0ZSIsImV4ZWN1dGVTY2hlZHVsZWRUYXNrcyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsWUFBRixFQUFnQkMsMEJBQWhCLEVBQTRDQyw0QkFBNUMsS0FBNkVDLFFBQVEsU0FBUixDQUFuRjs7QUFFQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixhQUF3QztBQUN2REMsWUFBUUMsR0FBUixDQUFZLElBQUlDLElBQUosRUFBWjtBQUNBLFVBQU1SLGNBQU47QUFDQSxVQUFNRSw4QkFBTjtBQUNBLFVBQU1ELDRCQUFOO0FBQ0QsR0FMRDs7QUFBQSxXQUFnQ1EscUJBQWhDO0FBQUE7QUFBQTs7QUFBQSxTQUFnQ0EscUJBQWhDO0FBQUEiLCJmaWxlIjoiZXhlY3V0ZVNjaGVkdWxlZFRhc2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjbG9zZVN1cnZleXMsIGRpc3RyaWJ1dGVTY2hlZHVsZWRTdXJ2ZXlzLCByZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnRzIH0gPSByZXF1aXJlKCcuL3Rhc2tzJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBleGVjdXRlU2NoZWR1bGVkVGFza3MgKCkge1xuICBjb25zb2xlLmxvZyhuZXcgRGF0ZSgpKVxuICBhd2FpdCBjbG9zZVN1cnZleXMoKVxuICBhd2FpdCByZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnRzKClcbiAgYXdhaXQgZGlzdHJpYnV0ZVNjaGVkdWxlZFN1cnZleXMoKVxufVxuIl19