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
          let survey = yield Survey.create(teamID, excludedUsersID, new Date());
          team.bot.distribute(survey);
          return 'Distributing. Your team members will have 48 hours to respond.';
        case 'Weekly':
          // next friday
          let nextDistributionDate = DEVELOPMENT_MODE ? moment().add(7, 's') : moment().day(5);
          yield Survey.create(teamID, excludedUsersID, nextDistributionDate.toDate());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1vbWVudCIsInJlcXVpcmUiLCJERVZFTE9QTUVOVF9NT0RFIiwiU3VydmV5IiwiVGVhbSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtSUQiLCJmcmVxdWVuY3kiLCJleGNsdWRlZFVzZXJzSUQiLCJ0ZWFtIiwib2YiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJtYXRjaCIsInN1cnZleSIsImNyZWF0ZSIsIkRhdGUiLCJib3QiLCJkaXN0cmlidXRlIiwibmV4dERpc3RyaWJ1dGlvbkRhdGUiLCJhZGQiLCJkYXkiLCJ0b0RhdGUiLCJ1bml4IiwiZm9ybWF0Iiwic2NoZWR1bGVTdXJ2ZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUMsZ0JBQUYsS0FBdUJELFFBQVEsY0FBUixDQUE3QjtBQUNBLE1BQU1FLFNBQVNGLFFBQVEsY0FBUixDQUFmO0FBQ0EsTUFBTUcsT0FBT0gsUUFBUSxZQUFSLENBQWI7O0FBRUFJLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBK0JDLE1BQS9CLEVBQXVDLEVBQUVDLFNBQUYsRUFBYUMsZUFBYixFQUF2QyxFQUF1RTtBQUN0RixRQUFJQyxPQUFPLE1BQU1OLEtBQUtPLEVBQUwsQ0FBUUosTUFBUixDQUFqQjtBQUNBLFFBQUksTUFBTUcsS0FBS0UsZUFBZixFQUFnQztBQUM5QixhQUFPLCtDQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0xILHdCQUFrQkEsZ0JBQWdCSSxLQUFoQixDQUFzQixlQUF0QixLQUEwQyxFQUE1RDtBQUNBLGNBQVFMLFNBQVI7QUFDRSxhQUFLLFVBQUw7QUFDRSxjQUFJTSxTQUFTLE1BQU1YLE9BQU9ZLE1BQVAsQ0FBY1IsTUFBZCxFQUFzQkUsZUFBdEIsRUFBdUMsSUFBSU8sSUFBSixFQUF2QyxDQUFuQjtBQUNBTixlQUFLTyxHQUFMLENBQVNDLFVBQVQsQ0FBb0JKLE1BQXBCO0FBQ0EsaUJBQU8sZ0VBQVA7QUFDRixhQUFLLFFBQUw7QUFDRTtBQUNBLGNBQUlLLHVCQUF1QmpCLG1CQUFtQkYsU0FBU29CLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLENBQW5CLEdBQTBDcEIsU0FBU3FCLEdBQVQsQ0FBYSxDQUFiLENBQXJFO0FBQ0EsZ0JBQU1sQixPQUFPWSxNQUFQLENBQWNSLE1BQWQsRUFBc0JFLGVBQXRCLEVBQXVDVSxxQkFBcUJHLE1BQXJCLEVBQXZDLENBQU47QUFDQSxpQkFBUSx3Q0FBdUNILHFCQUFxQkksSUFBckIsRUFBNEIsMkJBQTBCSixxQkFBcUJLLE1BQXJCLEVBQThCLEdBQW5JO0FBQ0Y7QUFDRSxpQkFBTyxtQkFBUDtBQVhKO0FBYUQ7QUFDRixHQXBCRDs7QUFBQSxXQUFnQ0MsY0FBaEM7QUFBQTtBQUFBOztBQUFBLFNBQWdDQSxjQUFoQztBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gc2NoZWR1bGVTdXJ2ZXkgKHRlYW1JRCwgeyBmcmVxdWVuY3ksIGV4Y2x1ZGVkVXNlcnNJRCB9KSB7XG4gIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gIGlmIChhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleSkge1xuICAgIHJldHVybiAnRGVuaWVkLiBPbmx5IG9uZSBzY2hlZHVsZWQgc3VydmV5IGlzIGFsbG93ZWQuJ1xuICB9IGVsc2Uge1xuICAgIGV4Y2x1ZGVkVXNlcnNJRCA9IGV4Y2x1ZGVkVXNlcnNJRC5tYXRjaCgvVVtBLVowLTldezh9L2cpIHx8IFtdXG4gICAgc3dpdGNoIChmcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ09uY2UgTm93JzpcbiAgICAgICAgbGV0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbUlELCBleGNsdWRlZFVzZXJzSUQsIG5ldyBEYXRlKCkpXG4gICAgICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgICAgICByZXR1cm4gJ0Rpc3RyaWJ1dGluZy4gWW91ciB0ZWFtIG1lbWJlcnMgd2lsbCBoYXZlIDQ4IGhvdXJzIHRvIHJlc3BvbmQuJ1xuICAgICAgY2FzZSAnV2Vla2x5JzpcbiAgICAgICAgLy8gbmV4dCBmcmlkYXlcbiAgICAgICAgbGV0IG5leHREaXN0cmlidXRpb25EYXRlID0gREVWRUxPUE1FTlRfTU9ERSA/IG1vbWVudCgpLmFkZCg3LCAncycpIDogbW9tZW50KCkuZGF5KDUpXG4gICAgICAgIGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbUlELCBleGNsdWRlZFVzZXJzSUQsIG5leHREaXN0cmlidXRpb25EYXRlLnRvRGF0ZSgpKVxuICAgICAgICByZXR1cm4gYFN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIGF0IDwhZGF0ZV4ke25leHREaXN0cmlidXRpb25EYXRlLnVuaXgoKX1ee2RhdGVfc2hvcnR9IGF0IHt0aW1lfXwke25leHREaXN0cmlidXRpb25EYXRlLmZvcm1hdCgpfT5gXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0ludmFsaWQgZnJlcXVlbmN5J1xuICAgIH1cbiAgfVxufVxuIl19