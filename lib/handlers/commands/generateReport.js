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
          text: 'Report of all survey',
          attachments: []
        };
        const surveys = yield team.getAllSurveys();
        for (let survey of surveys) {
          report.attachments.push({
            title: 'Survey at ' + survey.updatedAt,
            text: yield reportOf(survey)
          });
        }
        return report;
      } else if (parseInt($1)) {
        const report = {
          text: `Report of last ${$1} survey`,
          attachments: []
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9nZW5lcmF0ZVJlcG9ydC5qcyJdLCJuYW1lcyI6WyJzdXJ2ZXkiLCJyZXBsaWVzIiwibWFwIiwicmVwbHkiLCJzY29yZSIsInJlYXNvbiIsImpvaW4iLCJyZXBvcnRPZiIsIm1lc3NhZ2UiLCJyZXF1aXJlIiwiVkFMSURfT1BUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiJDEiLCJyZXN0IiwiY29tbWFuZCIsImxlbmd0aCIsImluY2x1ZGVzIiwicmVwb3J0IiwidGV4dCIsImF0dGFjaG1lbnRzIiwic3VydmV5cyIsImdldEFsbFN1cnZleXMiLCJwdXNoIiwidGl0bGUiLCJ1cGRhdGVkQXQiLCJwYXJzZUludCIsImdldFN1cnZleXMiLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OytCQU1BLFdBQXlCQSxNQUF6QixFQUFpQztBQUMvQixVQUFNQyxVQUFVLENBQUMsTUFBTUQsT0FBT0MsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkI7QUFBQSxhQUFVLEdBQUVDLE1BQU1DLEtBQU0sSUFBR0QsTUFBTUUsTUFBTyxFQUF4QztBQUFBLEtBQTNCLENBQWhCO0FBQ0EsV0FBTyxtQkFBbUJKLFFBQVFLLElBQVIsQ0FBYSxJQUFiLENBQTFCO0FBQ0QsRzs7a0JBSGNDLFE7Ozs7Ozs7QUFOZixNQUFNQyxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7O0FBRUEsTUFBTUMsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQVNBQyxPQUFPQyxPQUFQO0FBQUEsZ0NBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVSLFFBQVFRLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxTQUFTO0FBQ2JDLGdCQUFNLHNCQURPO0FBRWJDLHVCQUFhO0FBRkEsU0FBZjtBQUlBLGNBQU1DLFVBQVUsTUFBTVQsS0FBS1UsYUFBTCxFQUF0QjtBQUNBLGFBQUssSUFBSXZCLE1BQVQsSUFBbUJzQixPQUFuQixFQUE0QjtBQUMxQkgsaUJBQU9FLFdBQVAsQ0FBbUJHLElBQW5CLENBQXdCO0FBQ3RCQyxtQkFBTyxlQUFlekIsT0FBTzBCLFNBRFA7QUFFdEJOLGtCQUFNLE1BQU1iLFNBQVNQLE1BQVQ7QUFGVSxXQUF4QjtBQUlEO0FBQ0QsZUFBT21CLE1BQVA7QUFDRCxPQWJELE1BYU8sSUFBSVEsU0FBU2IsRUFBVCxDQUFKLEVBQWtCO0FBQ3ZCLGNBQU1LLFNBQVM7QUFDYkMsZ0JBQU8sa0JBQWlCTixFQUFHLFNBRGQ7QUFFYk8sdUJBQWE7QUFGQSxTQUFmO0FBSUEsY0FBTUMsVUFBVSxNQUFNVCxLQUFLZSxVQUFMLENBQWdCRCxTQUFTYixFQUFULENBQWhCLENBQXRCO0FBQ0EsYUFBSyxJQUFJZCxNQUFULElBQW1Cc0IsT0FBbkIsRUFBNEI7QUFDMUJILGlCQUFPRSxXQUFQLENBQW1CRyxJQUFuQixDQUF3QjtBQUN0QkMsbUJBQU8sZUFBZXpCLE9BQU8wQixTQURQO0FBRXRCTixrQkFBTSxNQUFNYixTQUFTUCxNQUFUO0FBRlUsV0FBeEI7QUFJRDtBQUNELGVBQU9tQixNQUFQO0FBQ0QsT0FiTSxNQWFBO0FBQ0wsZUFBT0gsUUFBUWEsS0FBZjtBQUNEO0FBQ0YsS0E5QkQsTUE4Qk87QUFDTCxhQUFPYixRQUFRYSxLQUFmO0FBQ0Q7QUFDRixHQXBDRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZVJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5hc3luYyBmdW5jdGlvbiByZXBvcnRPZiAoc3VydmV5KSB7XG4gIGNvbnN0IHJlcGxpZXMgPSAoYXdhaXQgc3VydmV5LnJlcGxpZXMpLm1hcChyZXBseSA9PiBgJHtyZXBseS5zY29yZX0gJHtyZXBseS5yZWFzb259YClcbiAgcmV0dXJuICdzY29yZSByZWFzb25cXG4nICsgcmVwbGllcy5qb2luKCdcXG4nKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtZ2VuZXJhdGUtcmVwb3J0J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoVkFMSURfT1BUSU9OUy5pbmNsdWRlcygkMSkpIHtcbiAgICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgICAgdGV4dDogJ1JlcG9ydCBvZiBhbGwgc3VydmV5JyxcbiAgICAgICAgYXR0YWNobWVudHM6IFtdXG4gICAgICB9XG4gICAgICBjb25zdCBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRBbGxTdXJ2ZXlzKClcbiAgICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICAgIHJlcG9ydC5hdHRhY2htZW50cy5wdXNoKHtcbiAgICAgICAgICB0aXRsZTogJ1N1cnZleSBhdCAnICsgc3VydmV5LnVwZGF0ZWRBdCxcbiAgICAgICAgICB0ZXh0OiBhd2FpdCByZXBvcnRPZihzdXJ2ZXkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwb3J0XG4gICAgfSBlbHNlIGlmIChwYXJzZUludCgkMSkpIHtcbiAgICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgICAgdGV4dDogYFJlcG9ydCBvZiBsYXN0ICR7JDF9IHN1cnZleWAsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXVxuICAgICAgfVxuICAgICAgY29uc3Qgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cyhwYXJzZUludCgkMSkpXG4gICAgICBmb3IgKGxldCBzdXJ2ZXkgb2Ygc3VydmV5cykge1xuICAgICAgICByZXBvcnQuYXR0YWNobWVudHMucHVzaCh7XG4gICAgICAgICAgdGl0bGU6ICdTdXJ2ZXkgYXQgJyArIHN1cnZleS51cGRhdGVkQXQsXG4gICAgICAgICAgdGV4dDogYXdhaXQgcmVwb3J0T2Yoc3VydmV5KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcG9ydFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=