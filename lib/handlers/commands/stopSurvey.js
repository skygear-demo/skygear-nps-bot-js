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
      return `/nps-stop-survey: ${message.ok}. You can use \`/nps-summary 1\` to view the result of the latest survey.`;
    } else {
      return '/nps-stop-survey: No active or scheduled survey.';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdG9wU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJhY3RpdmVTdXJ2ZXkiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJjbG9zZSIsImRlbGV0ZSIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxlQUFlLE1BQU1ELEtBQUtDLFlBQWhDO0FBQ0EsVUFBTUMsa0JBQWtCLE1BQU1GLEtBQUtFLGVBQW5DOztBQUVBLFFBQUlELGdCQUFnQkMsZUFBcEIsRUFBcUM7QUFDbkMsVUFBSUQsWUFBSixFQUFrQjtBQUNoQixjQUFNQSxhQUFhRSxLQUFiLEVBQU47QUFDRDtBQUNELFVBQUlELGVBQUosRUFBcUI7QUFDbkIsY0FBTUEsZ0JBQWdCRSxNQUFoQixFQUFOO0FBQ0Q7QUFDRCxhQUFRLHFCQUFvQlIsUUFBUVMsRUFBRywyRUFBdkM7QUFDRCxLQVJELE1BUU87QUFDTCxhQUFPLGtEQUFQO0FBQ0Q7QUFDRixHQWZEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0b3BTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG5cbiAgaWYgKGFjdGl2ZVN1cnZleSB8fCBzY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgICBhd2FpdCBhY3RpdmVTdXJ2ZXkuY2xvc2UoKVxuICAgIH1cbiAgICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgICBhd2FpdCBzY2hlZHVsZWRTdXJ2ZXkuZGVsZXRlKClcbiAgICB9XG4gICAgcmV0dXJuIGAvbnBzLXN0b3Atc3VydmV5OiAke21lc3NhZ2Uub2t9LiBZb3UgY2FuIHVzZSBcXGAvbnBzLXN1bW1hcnkgMVxcYCB0byB2aWV3IHRoZSByZXN1bHQgb2YgdGhlIGxhdGVzdCBzdXJ2ZXkuYFxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnL25wcy1zdG9wLXN1cnZleTogTm8gYWN0aXZlIG9yIHNjaGVkdWxlZCBzdXJ2ZXkuJ1xuICB9XG59XG4iXX0=