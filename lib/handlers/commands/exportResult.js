'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const message = require('../../message');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, userID, [$1, ...rest]) {
    const command = message.command['/nps-export-result'];

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

      if (surveys.length < 1) {
        return 'No closed survey found';
      }

      for (let survey of surveys) {
        const replies = (yield survey.replies).map(function (reply) {
          return `\r\n${reply.score},${reply.reason}`;
        });
        yield team.bot.upload('score,reason' + replies, `report-${moment(survey.distributionDate).format('YYYY-MM-DD')}`, userID);
      }

      return message.ok;
    } else {
      return command.usage;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9leHBvcnRSZXN1bHQuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJ1c2VySUQiLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJzdXJ2ZXkiLCJyZXBsaWVzIiwibWFwIiwicmVwbHkiLCJzY29yZSIsInJlYXNvbiIsImJvdCIsInVwbG9hZCIsImRpc3RyaWJ1dGlvbkRhdGUiLCJmb3JtYXQiLCJvayJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBLE1BQU1FLGdCQUFnQixDQUNwQixPQURvQixDQUF0Qjs7QUFJQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWFDLE1BQWIsRUFBcUIsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBckIsRUFBdUM7QUFDdEQsVUFBTUMsVUFBVVIsUUFBUVEsT0FBUixDQUFnQixvQkFBaEIsQ0FBaEI7O0FBRUEsUUFBSUYsTUFBTUMsS0FBS0UsTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxrQkFBa0JDLFNBQVNMLEVBQVQsQ0FBeEI7O0FBRUEsVUFBSU0sT0FBSjtBQUNBLFVBQUlGLGVBQUosRUFBcUI7QUFBRTtBQUNyQkUsa0JBQVUsTUFBTVIsS0FBS1MsVUFBTCxDQUFnQkgsZUFBaEIsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSVQsY0FBY2EsUUFBZCxDQUF1QlIsRUFBdkIsQ0FBSixFQUFnQztBQUNyQ00sa0JBQVUsTUFBTVIsS0FBS1MsVUFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQTtBQUNMLGVBQU9MLFFBQVFPLEtBQWY7QUFDRDs7QUFFRCxVQUFJSCxRQUFRSCxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGVBQU8sd0JBQVA7QUFDRDs7QUFFRCxXQUFLLElBQUlPLE1BQVQsSUFBbUJKLE9BQW5CLEVBQTRCO0FBQzFCLGNBQU1LLFVBQVUsQ0FBQyxNQUFNRCxPQUFPQyxPQUFkLEVBQXVCQyxHQUF2QixDQUEyQjtBQUFBLGlCQUFVLE9BQU1DLE1BQU1DLEtBQU0sSUFBR0QsTUFBTUUsTUFBTyxFQUE1QztBQUFBLFNBQTNCLENBQWhCO0FBQ0EsY0FBTWpCLEtBQUtrQixHQUFMLENBQVNDLE1BQVQsQ0FBZ0IsaUJBQWlCTixPQUFqQyxFQUEyQyxVQUFTbkIsT0FBT2tCLE9BQU9RLGdCQUFkLEVBQWdDQyxNQUFoQyxDQUF1QyxZQUF2QyxDQUFxRCxFQUF6RyxFQUE0R3BCLE1BQTVHLENBQU47QUFDRDs7QUFFRCxhQUFPTCxRQUFRMEIsRUFBZjtBQUNELEtBdEJELE1Bc0JPO0FBQ0wsYUFBT2xCLFFBQVFPLEtBQWY7QUFDRDtBQUNGLEdBNUJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImV4cG9ydFJlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbmNvbnN0IFZBTElEX09QVElPTlMgPSBbXG4gICctLWFsbCdcbl1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgdXNlcklELCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtZXhwb3J0LXJlc3VsdCddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZTdXJ2ZXlzID0gcGFyc2VJbnQoJDEpXG5cbiAgICBsZXQgc3VydmV5c1xuICAgIGlmIChudW1iZXJPZlN1cnZleXMpIHsgLy8gaWYgJDEgaXMgYSBudW1iZXIsIHBhcnNlICE9IE5hTlxuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cyhudW1iZXJPZlN1cnZleXMpXG4gICAgfSBlbHNlIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gICAgfVxuXG4gICAgaWYgKHN1cnZleXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICdObyBjbG9zZWQgc3VydmV5IGZvdW5kJ1xuICAgIH1cblxuICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICBjb25zdCByZXBsaWVzID0gKGF3YWl0IHN1cnZleS5yZXBsaWVzKS5tYXAocmVwbHkgPT4gYFxcclxcbiR7cmVwbHkuc2NvcmV9LCR7cmVwbHkucmVhc29ufWApXG4gICAgICBhd2FpdCB0ZWFtLmJvdC51cGxvYWQoJ3Njb3JlLHJlYXNvbicgKyByZXBsaWVzLCBgcmVwb3J0LSR7bW9tZW50KHN1cnZleS5kaXN0cmlidXRpb25EYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gLCB1c2VySUQpXG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2Uub2tcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=