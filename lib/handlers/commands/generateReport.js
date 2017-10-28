'use strict';

let reportOf = (() => {
  var _ref = _asyncToGenerator(function* (survey) {
    const replies = (yield survey.replies).map(function (reply) {
      return `${reply.score} ${reply.reason}`;
    });
    return 'score reason\n' + replies.join('\n');
  });

  return function reportOf(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref2 = _asyncToGenerator(function* (team, [$1, ...rest]) {
    const command = message.command['/nps-generate-report'];

    if ($1 && rest.length === 0) {
      const report = {
        text: 'Report',
        attachments: []
      };
      if (VALID_OPTIONS.includes($1)) {
        const surveys = yield team.getAllSurveys();
        for (let survey of surveys) {
          report.attachments.push({
            title: 'Survey at ' + survey.updatedAt,
            text: yield reportOf(survey)
          });
        }
        return report;
      } else if (parseInt($1)) {
        const surveys = yield team.getSurveys(parseInt($1));
        for (let survey of surveys) {
          report.attachments.push({
            title: 'Survey at ' + survey.updatedAt,
            text: yield reportOf(survey)
          });
        }
        return report;
      } else {
        return command.usage;
      }
    } else {
      return command.usage;
    }
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9nZW5lcmF0ZVJlcG9ydC5qcyJdLCJuYW1lcyI6WyJzdXJ2ZXkiLCJyZXBsaWVzIiwibWFwIiwicmVwbHkiLCJzY29yZSIsInJlYXNvbiIsImpvaW4iLCJyZXBvcnRPZiIsIm1lc3NhZ2UiLCJyZXF1aXJlIiwiVkFMSURfT1BUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiJDEiLCJyZXN0IiwiY29tbWFuZCIsImxlbmd0aCIsInJlcG9ydCIsInRleHQiLCJhdHRhY2htZW50cyIsImluY2x1ZGVzIiwic3VydmV5cyIsImdldEFsbFN1cnZleXMiLCJwdXNoIiwidGl0bGUiLCJ1cGRhdGVkQXQiLCJwYXJzZUludCIsImdldFN1cnZleXMiLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OytCQU1BLFdBQXlCQSxNQUF6QixFQUFpQztBQUMvQixVQUFNQyxVQUFVLENBQUMsTUFBTUQsT0FBT0MsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkI7QUFBQSxhQUFVLEdBQUVDLE1BQU1DLEtBQU0sSUFBR0QsTUFBTUUsTUFBTyxFQUF4QztBQUFBLEtBQTNCLENBQWhCO0FBQ0EsV0FBTyxtQkFBbUJKLFFBQVFLLElBQVIsQ0FBYSxJQUFiLENBQTFCO0FBQ0QsRzs7a0JBSGNDLFE7Ozs7Ozs7QUFOZixNQUFNQyxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7O0FBRUEsTUFBTUMsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQVNBQyxPQUFPQyxPQUFQO0FBQUEsZ0NBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVSLFFBQVFRLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsWUFBTUMsU0FBUztBQUNiQyxjQUFNLFFBRE87QUFFYkMscUJBQWE7QUFGQSxPQUFmO0FBSUEsVUFBSVYsY0FBY1csUUFBZCxDQUF1QlAsRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNUSxVQUFVLE1BQU1ULEtBQUtVLGFBQUwsRUFBdEI7QUFDQSxhQUFLLElBQUl2QixNQUFULElBQW1Cc0IsT0FBbkIsRUFBNEI7QUFDMUJKLGlCQUFPRSxXQUFQLENBQW1CSSxJQUFuQixDQUF3QjtBQUN0QkMsbUJBQU8sZUFBZXpCLE9BQU8wQixTQURQO0FBRXRCUCxrQkFBTSxNQUFNWixTQUFTUCxNQUFUO0FBRlUsV0FBeEI7QUFJRDtBQUNELGVBQU9rQixNQUFQO0FBQ0QsT0FURCxNQVNPLElBQUlTLFNBQVNiLEVBQVQsQ0FBSixFQUFrQjtBQUN2QixjQUFNUSxVQUFVLE1BQU1ULEtBQUtlLFVBQUwsQ0FBZ0JELFNBQVNiLEVBQVQsQ0FBaEIsQ0FBdEI7QUFDQSxhQUFLLElBQUlkLE1BQVQsSUFBbUJzQixPQUFuQixFQUE0QjtBQUMxQkosaUJBQU9FLFdBQVAsQ0FBbUJJLElBQW5CLENBQXdCO0FBQ3RCQyxtQkFBTyxlQUFlekIsT0FBTzBCLFNBRFA7QUFFdEJQLGtCQUFNLE1BQU1aLFNBQVNQLE1BQVQ7QUFGVSxXQUF4QjtBQUlEO0FBQ0QsZUFBT2tCLE1BQVA7QUFDRCxPQVRNLE1BU0E7QUFDTCxlQUFPRixRQUFRYSxLQUFmO0FBQ0Q7QUFDRixLQTFCRCxNQTBCTztBQUNMLGFBQU9iLFFBQVFhLEtBQWY7QUFDRDtBQUNGLEdBaENEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlUmVwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1hbGwnXG5dXG5cbmFzeW5jIGZ1bmN0aW9uIHJlcG9ydE9mIChzdXJ2ZXkpIHtcbiAgY29uc3QgcmVwbGllcyA9IChhd2FpdCBzdXJ2ZXkucmVwbGllcykubWFwKHJlcGx5ID0+IGAke3JlcGx5LnNjb3JlfSAke3JlcGx5LnJlYXNvbn1gKVxuICByZXR1cm4gJ3Njb3JlIHJlYXNvblxcbicgKyByZXBsaWVzLmpvaW4oJ1xcbicpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1nZW5lcmF0ZS1yZXBvcnQnXVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgIHRleHQ6ICdSZXBvcnQnLFxuICAgICAgYXR0YWNobWVudHM6IFtdXG4gICAgfVxuICAgIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgY29uc3Qgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0QWxsU3VydmV5cygpXG4gICAgICBmb3IgKGxldCBzdXJ2ZXkgb2Ygc3VydmV5cykge1xuICAgICAgICByZXBvcnQuYXR0YWNobWVudHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICdTdXJ2ZXkgYXQgJyArIHN1cnZleS51cGRhdGVkQXQsXG4gICAgICAgICAgdGV4dDogYXdhaXQgcmVwb3J0T2Yoc3VydmV5KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcG9ydFxuICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoJDEpKSB7XG4gICAgICBjb25zdCBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKHBhcnNlSW50KCQxKSlcbiAgICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICAgIHJlcG9ydC5hdHRhY2htZW50cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogJ1N1cnZleSBhdCAnICsgc3VydmV5LnVwZGF0ZWRBdCxcbiAgICAgICAgICB0ZXh0OiBhd2FpdCByZXBvcnRPZihzdXJ2ZXkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwb3J0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cbn1cbiJdfQ==