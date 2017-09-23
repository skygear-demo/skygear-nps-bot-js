'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../../config');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (teamID, { frequency, excludedUsersID }) {
    let team = yield Team.of(teamID);
    if (yield team.scheduledSurvey) {
      return 'Denied. Only one scheduled survey is allowed.';
    } else {
      excludedUsersID = excludedUsersID.match(/U[A-Z0-9]{8}/g) || [];
      switch (frequency) {
        case 'Once Now':
          let survey = yield Survey.create(teamID, frequency, excludedUsersID, new Date());
          team.bot.distribute(survey);
          return 'Distributing. Your team members will have 48 hours to respond.';
        case 'Weekly':
          // next friday
          let nextDistributionDate = DEVELOPMENT_MODE ? moment().add(7, 's') : moment().day(5);
          yield Survey.create(teamID, frequency, excludedUsersID, nextDistributionDate.toDate());
          return `Survey will be distributed at <!date^${nextDistributionDate.unix()}^{date_short} at {time}|${nextDistributionDate.format()}>`;
        default:
          return 'Invalid frequency';
      }
    }
  });

  function scheduleSurvey(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return scheduleSurvey;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1vbWVudCIsInJlcXVpcmUiLCJERVZFTE9QTUVOVF9NT0RFIiwiU3VydmV5IiwiVGVhbSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtSUQiLCJmcmVxdWVuY3kiLCJleGNsdWRlZFVzZXJzSUQiLCJ0ZWFtIiwib2YiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJtYXRjaCIsInN1cnZleSIsImNyZWF0ZSIsIkRhdGUiLCJib3QiLCJkaXN0cmlidXRlIiwibmV4dERpc3RyaWJ1dGlvbkRhdGUiLCJhZGQiLCJkYXkiLCJ0b0RhdGUiLCJ1bml4IiwiZm9ybWF0Iiwic2NoZWR1bGVTdXJ2ZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUMsZ0JBQUYsS0FBdUJELFFBQVEsY0FBUixDQUE3QjtBQUNBLE1BQU1FLFNBQVNGLFFBQVEsY0FBUixDQUFmO0FBQ0EsTUFBTUcsT0FBT0gsUUFBUSxZQUFSLENBQWI7O0FBRUFJLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBK0JDLE1BQS9CLEVBQXVDLEVBQUVDLFNBQUYsRUFBYUMsZUFBYixFQUF2QyxFQUF1RTtBQUN0RixRQUFJQyxPQUFPLE1BQU1OLEtBQUtPLEVBQUwsQ0FBUUosTUFBUixDQUFqQjtBQUNBLFFBQUksTUFBTUcsS0FBS0UsZUFBZixFQUFnQztBQUM5QixhQUFPLCtDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0xILHdCQUFrQkEsZ0JBQWdCSSxLQUFoQixDQUFzQixlQUF0QixLQUEwQyxFQUE1RDtBQUNBLGNBQVFMLFNBQVI7QUFDRSxhQUFLLFVBQUw7QUFDRSxjQUFJTSxTQUFTLE1BQU1YLE9BQU9ZLE1BQVAsQ0FBY1IsTUFBZCxFQUFzQkMsU0FBdEIsRUFBaUNDLGVBQWpDLEVBQWtELElBQUlPLElBQUosRUFBbEQsQ0FBbkI7QUFDQU4sZUFBS08sR0FBTCxDQUFTQyxVQUFULENBQW9CSixNQUFwQjtBQUNBLGlCQUFPLGdFQUFQO0FBQ0YsYUFBSyxRQUFMO0FBQ0U7QUFDQSxjQUFJSyx1QkFBdUJqQixtQkFBbUJGLFNBQVNvQixHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixDQUFuQixHQUEwQ3BCLFNBQVNxQixHQUFULENBQWEsQ0FBYixDQUFyRTtBQUNBLGdCQUFNbEIsT0FBT1ksTUFBUCxDQUFjUixNQUFkLEVBQXNCQyxTQUF0QixFQUFpQ0MsZUFBakMsRUFBa0RVLHFCQUFxQkcsTUFBckIsRUFBbEQsQ0FBTjtBQUNBLGlCQUFRLHdDQUF1Q0gscUJBQXFCSSxJQUFyQixFQUE0QiwyQkFBMEJKLHFCQUFxQkssTUFBckIsRUFBOEIsR0FBbkk7QUFDRjtBQUNFLGlCQUFPLG1CQUFQO0FBWEo7QUFhRDtBQUNGLEdBcEJEOztBQUFBLFdBQWdDQyxjQUFoQztBQUFBO0FBQUE7O0FBQUEsU0FBZ0NBLGNBQWhDO0FBQUEiLCJmaWxlIjoic2NoZWR1bGVTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmdW5jdGlvbiBzY2hlZHVsZVN1cnZleSAodGVhbUlELCB7IGZyZXF1ZW5jeSwgZXhjbHVkZWRVc2Vyc0lEIH0pIHtcbiAgbGV0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgaWYgKGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgcmV0dXJuICdEZW5pZWQuIE9ubHkgb25lIHNjaGVkdWxlZCBzdXJ2ZXkgaXMgYWxsb3dlZC4nXG4gIH0gZWxzZSB7XG4gICAgZXhjbHVkZWRVc2Vyc0lEID0gZXhjbHVkZWRVc2Vyc0lELm1hdGNoKC9VW0EtWjAtOV17OH0vZykgfHwgW11cbiAgICBzd2l0Y2ggKGZyZXF1ZW5jeSkge1xuICAgICAgY2FzZSAnT25jZSBOb3cnOlxuICAgICAgICBsZXQgc3VydmV5ID0gYXdhaXQgU3VydmV5LmNyZWF0ZSh0ZWFtSUQsIGZyZXF1ZW5jeSwgZXhjbHVkZWRVc2Vyc0lELCBuZXcgRGF0ZSgpKVxuICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgcmV0dXJuICdEaXN0cmlidXRpbmcuIFlvdXIgdGVhbSBtZW1iZXJzIHdpbGwgaGF2ZSA0OCBob3VycyB0byByZXNwb25kLidcbiAgICAgIGNhc2UgJ1dlZWtseSc6XG4gICAgICAgIC8vIG5leHQgZnJpZGF5XG4gICAgICAgIGxldCBuZXh0RGlzdHJpYnV0aW9uRGF0ZSA9IERFVkVMT1BNRU5UX01PREUgPyBtb21lbnQoKS5hZGQoNywgJ3MnKSA6IG1vbWVudCgpLmRheSg1KVxuICAgICAgICBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW1JRCwgZnJlcXVlbmN5LCBleGNsdWRlZFVzZXJzSUQsIG5leHREaXN0cmlidXRpb25EYXRlLnRvRGF0ZSgpKVxuICAgICAgICByZXR1cm4gYFN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIGF0IDwhZGF0ZV4ke25leHREaXN0cmlidXRpb25EYXRlLnVuaXgoKX1ee2RhdGVfc2hvcnR9IGF0IHt0aW1lfXwke25leHREaXN0cmlidXRpb25EYXRlLmZvcm1hdCgpfT5gXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0ludmFsaWQgZnJlcXVlbmN5J1xuICAgIH1cbiAgfVxufVxuIl19