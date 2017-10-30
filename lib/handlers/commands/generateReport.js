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
      if (VALID_OPTIONS.includes($1)) {
        const report = {
          text: 'Report of all survey:',
          attachments: []
        };
        const surveys = yield team.getSurveys();
        for (let survey of surveys) {
          report.attachments.push({
            title: 'Survey at ' + survey.updatedAt,
            text: yield reportOf(survey)
          });
        }
        return report;
      } else if (parseInt($1)) {
        const numberOfSurveys = parseInt($1);
        const surveys = yield team.getSurveys(numberOfSurveys);
        const report = {
          text: `Report of last ${Math.min($1, numberOfSurveys)} survey:`,
          attachments: []
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9nZW5lcmF0ZVJlcG9ydC5qcyJdLCJuYW1lcyI6WyJzdXJ2ZXkiLCJyZXBsaWVzIiwibWFwIiwicmVwbHkiLCJzY29yZSIsInJlYXNvbiIsImpvaW4iLCJyZXBvcnRPZiIsIm1lc3NhZ2UiLCJyZXF1aXJlIiwiVkFMSURfT1BUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiJDEiLCJyZXN0IiwiY29tbWFuZCIsImxlbmd0aCIsImluY2x1ZGVzIiwicmVwb3J0IiwidGV4dCIsImF0dGFjaG1lbnRzIiwic3VydmV5cyIsImdldFN1cnZleXMiLCJwdXNoIiwidGl0bGUiLCJ1cGRhdGVkQXQiLCJwYXJzZUludCIsIm51bWJlck9mU3VydmV5cyIsIk1hdGgiLCJtaW4iLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OytCQU1BLFdBQXlCQSxNQUF6QixFQUFpQztBQUMvQixVQUFNQyxVQUFVLENBQUMsTUFBTUQsT0FBT0MsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkI7QUFBQSxhQUFVLEdBQUVDLE1BQU1DLEtBQU0sSUFBR0QsTUFBTUUsTUFBTyxFQUF4QztBQUFBLEtBQTNCLENBQWhCO0FBQ0EsV0FBTyxtQkFBbUJKLFFBQVFLLElBQVIsQ0FBYSxJQUFiLENBQTFCO0FBQ0QsRzs7a0JBSGNDLFE7Ozs7Ozs7QUFOZixNQUFNQyxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7O0FBRUEsTUFBTUMsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQVNBQyxPQUFPQyxPQUFQO0FBQUEsZ0NBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVSLFFBQVFRLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxTQUFTO0FBQ2JDLGdCQUFNLHVCQURPO0FBRWJDLHVCQUFhO0FBRkEsU0FBZjtBQUlBLGNBQU1DLFVBQVUsTUFBTVQsS0FBS1UsVUFBTCxFQUF0QjtBQUNBLGFBQUssSUFBSXZCLE1BQVQsSUFBbUJzQixPQUFuQixFQUE0QjtBQUMxQkgsaUJBQU9FLFdBQVAsQ0FBbUJHLElBQW5CLENBQXdCO0FBQ3RCQyxtQkFBTyxlQUFlekIsT0FBTzBCLFNBRFA7QUFFdEJOLGtCQUFNLE1BQU1iLFNBQVNQLE1BQVQ7QUFGVSxXQUF4QjtBQUlEO0FBQ0QsZUFBT21CLE1BQVA7QUFDRCxPQWJELE1BYU8sSUFBSVEsU0FBU2IsRUFBVCxDQUFKLEVBQWtCO0FBQ3ZCLGNBQU1jLGtCQUFrQkQsU0FBU2IsRUFBVCxDQUF4QjtBQUNBLGNBQU1RLFVBQVUsTUFBTVQsS0FBS1UsVUFBTCxDQUFnQkssZUFBaEIsQ0FBdEI7QUFDQSxjQUFNVCxTQUFTO0FBQ2JDLGdCQUFPLGtCQUFpQlMsS0FBS0MsR0FBTCxDQUFTaEIsRUFBVCxFQUFhYyxlQUFiLENBQThCLFVBRHpDO0FBRWJQLHVCQUFhO0FBRkEsU0FBZjtBQUlBLGFBQUssSUFBSXJCLE1BQVQsSUFBbUJzQixPQUFuQixFQUE0QjtBQUMxQkgsaUJBQU9FLFdBQVAsQ0FBbUJHLElBQW5CLENBQXdCO0FBQ3RCQyxtQkFBTyxlQUFlekIsT0FBTzBCLFNBRFA7QUFFdEJOLGtCQUFNLE1BQU1iLFNBQVNQLE1BQVQ7QUFGVSxXQUF4QjtBQUlEO0FBQ0QsZUFBT21CLE1BQVA7QUFDRCxPQWRNLE1BY0E7QUFDTCxlQUFPSCxRQUFRZSxLQUFmO0FBQ0Q7QUFDRixLQS9CRCxNQStCTztBQUNMLGFBQU9mLFFBQVFlLEtBQWY7QUFDRDtBQUNGLEdBckNEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlUmVwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1hbGwnXG5dXG5cbmFzeW5jIGZ1bmN0aW9uIHJlcG9ydE9mIChzdXJ2ZXkpIHtcbiAgY29uc3QgcmVwbGllcyA9IChhd2FpdCBzdXJ2ZXkucmVwbGllcykubWFwKHJlcGx5ID0+IGAke3JlcGx5LnNjb3JlfSAke3JlcGx5LnJlYXNvbn1gKVxuICByZXR1cm4gJ3Njb3JlIHJlYXNvblxcbicgKyByZXBsaWVzLmpvaW4oJ1xcbicpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1nZW5lcmF0ZS1yZXBvcnQnXVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgY29uc3QgcmVwb3J0ID0ge1xuICAgICAgICB0ZXh0OiAnUmVwb3J0IG9mIGFsbCBzdXJ2ZXk6JyxcbiAgICAgICAgYXR0YWNobWVudHM6IFtdXG4gICAgICB9XG4gICAgICBjb25zdCBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKClcbiAgICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICAgIHJlcG9ydC5hdHRhY2htZW50cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogJ1N1cnZleSBhdCAnICsgc3VydmV5LnVwZGF0ZWRBdCxcbiAgICAgICAgICB0ZXh0OiBhd2FpdCByZXBvcnRPZihzdXJ2ZXkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwb3J0XG4gICAgfSBlbHNlIGlmIChwYXJzZUludCgkMSkpIHtcbiAgICAgIGNvbnN0IG51bWJlck9mU3VydmV5cyA9IHBhcnNlSW50KCQxKVxuICAgICAgY29uc3Qgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cyhudW1iZXJPZlN1cnZleXMpXG4gICAgICBjb25zdCByZXBvcnQgPSB7XG4gICAgICAgIHRleHQ6IGBSZXBvcnQgb2YgbGFzdCAke01hdGgubWluKCQxLCBudW1iZXJPZlN1cnZleXMpfSBzdXJ2ZXk6YCxcbiAgICAgICAgYXR0YWNobWVudHM6IFtdXG4gICAgICB9XG4gICAgICBmb3IgKGxldCBzdXJ2ZXkgb2Ygc3VydmV5cykge1xuICAgICAgICByZXBvcnQuYXR0YWNobWVudHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICdTdXJ2ZXkgYXQgJyArIHN1cnZleS51cGRhdGVkQXQsXG4gICAgICAgICAgdGV4dDogYXdhaXQgcmVwb3J0T2Yoc3VydmV5KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcG9ydFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=