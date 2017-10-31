'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, userID, [$1, ...rest]) {
    const command = message.command['/nps-generate-report'];

    if ($1 && rest.length === 0) {
      const numberOfSurveys = parseInt($1);

      let surveys;
      if (numberOfSurveys) {
        // if $1 is a number, parse != NaN
        surveys = yield team.getSurveys(numberOfSurveys);
      } else if (VALID_OPTIONS.includes($1)) {
        surveys = yield team.getSurveys();
      } else {
        return command.usage;
      }

      for (let survey of surveys) {
        const replies = (yield survey.replies).map(function (reply) {
          return `\r\n${reply.score},${reply.reason}`;
        });
        yield team.bot.upload('score,reason' + replies, 'report', userID);
      }
    } else {
      return command.usage;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9nZW5lcmF0ZVJlcG9ydC5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsInVzZXJJRCIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJudW1iZXJPZlN1cnZleXMiLCJwYXJzZUludCIsInN1cnZleXMiLCJnZXRTdXJ2ZXlzIiwiaW5jbHVkZXMiLCJ1c2FnZSIsInN1cnZleSIsInJlcGxpZXMiLCJtYXAiLCJyZXBseSIsInNjb3JlIiwicmVhc29uIiwiYm90IiwidXBsb2FkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBLE1BQU1DLGdCQUFnQixDQUNwQixPQURvQixDQUF0Qjs7QUFJQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWFDLE1BQWIsRUFBcUIsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBckIsRUFBdUM7QUFDdEQsVUFBTUMsVUFBVVQsUUFBUVMsT0FBUixDQUFnQixzQkFBaEIsQ0FBaEI7O0FBRUEsUUFBSUYsTUFBTUMsS0FBS0UsTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxrQkFBa0JDLFNBQVNMLEVBQVQsQ0FBeEI7O0FBRUEsVUFBSU0sT0FBSjtBQUNBLFVBQUlGLGVBQUosRUFBcUI7QUFBRTtBQUNyQkUsa0JBQVUsTUFBTVIsS0FBS1MsVUFBTCxDQUFnQkgsZUFBaEIsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSVQsY0FBY2EsUUFBZCxDQUF1QlIsRUFBdkIsQ0FBSixFQUFnQztBQUNyQ00sa0JBQVUsTUFBTVIsS0FBS1MsVUFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQTtBQUNMLGVBQU9MLFFBQVFPLEtBQWY7QUFDRDs7QUFFRCxXQUFLLElBQUlDLE1BQVQsSUFBbUJKLE9BQW5CLEVBQTRCO0FBQzFCLGNBQU1LLFVBQVUsQ0FBQyxNQUFNRCxPQUFPQyxPQUFkLEVBQXVCQyxHQUF2QixDQUEyQjtBQUFBLGlCQUFVLE9BQU1DLE1BQU1DLEtBQU0sSUFBR0QsTUFBTUUsTUFBTyxFQUE1QztBQUFBLFNBQTNCLENBQWhCO0FBQ0EsY0FBTWpCLEtBQUtrQixHQUFMLENBQVNDLE1BQVQsQ0FBZ0IsaUJBQWlCTixPQUFqQyxFQUEwQyxRQUExQyxFQUFvRFosTUFBcEQsQ0FBTjtBQUNEO0FBQ0YsS0FoQkQsTUFnQk87QUFDTCxhQUFPRyxRQUFRTyxLQUFmO0FBQ0Q7QUFDRixHQXRCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZVJlcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCB1c2VySUQsIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1nZW5lcmF0ZS1yZXBvcnQnXVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IG51bWJlck9mU3VydmV5cyA9IHBhcnNlSW50KCQxKVxuXG4gICAgbGV0IHN1cnZleXNcbiAgICBpZiAobnVtYmVyT2ZTdXJ2ZXlzKSB7IC8vIGlmICQxIGlzIGEgbnVtYmVyLCBwYXJzZSAhPSBOYU5cbiAgICAgIHN1cnZleXMgPSBhd2FpdCB0ZWFtLmdldFN1cnZleXMobnVtYmVyT2ZTdXJ2ZXlzKVxuICAgIH0gZWxzZSBpZiAoVkFMSURfT1BUSU9OUy5pbmNsdWRlcygkMSkpIHtcbiAgICAgIHN1cnZleXMgPSBhd2FpdCB0ZWFtLmdldFN1cnZleXMoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICAgIH1cblxuICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICBjb25zdCByZXBsaWVzID0gKGF3YWl0IHN1cnZleS5yZXBsaWVzKS5tYXAocmVwbHkgPT4gYFxcclxcbiR7cmVwbHkuc2NvcmV9LCR7cmVwbHkucmVhc29ufWApXG4gICAgICBhd2FpdCB0ZWFtLmJvdC51cGxvYWQoJ3Njb3JlLHJlYXNvbicgKyByZXBsaWVzLCAncmVwb3J0JywgdXNlcklEKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=