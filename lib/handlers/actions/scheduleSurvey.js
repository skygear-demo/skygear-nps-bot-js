'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable */
const { Set } = require('immutable');
const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../../config');
const Survey = require('../../survey');
const Team = require('../../team');
const { extractIDs } = require('../../util');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (teamID, { frequency, excludedUsersID }) {
    let team = yield Team.of(teamID);
    if (yield team.scheduledSurvey) {
      return 'Denied. Only one scheduled survey is allowed.';
    } else if (yield team.distributedSurvey) {
      return 'Denied. There is a survey still open for answering.';
    } else {
      let membersID = Set(extractIDs((yield team.members)));
      let idsToExclude = Set(excludedUsersID.match(/U[A-Z0-9]{8}/g) || []);
      let targetsID = membersID.subtract(idsToExclude).toArray();

      switch (frequency) {
        case 'Once Now':
          let survey = yield Survey.create(teamID, frequency, targetsID, new Date());
          team.bot.distribute(survey);
          return 'Distributing. Your team members will have 48 hours to respond.';
        case 'Weekly':
          // next friday
          let nextDistributionDate = DEVELOPMENT_MODE ? moment().add(7, 's') : moment().day(5);
          yield Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtb21lbnQiLCJERVZFTE9QTUVOVF9NT0RFIiwiU3VydmV5IiwiVGVhbSIsImV4dHJhY3RJRHMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbUlEIiwiZnJlcXVlbmN5IiwiZXhjbHVkZWRVc2Vyc0lEIiwidGVhbSIsIm9mIiwic2NoZWR1bGVkU3VydmV5IiwiZGlzdHJpYnV0ZWRTdXJ2ZXkiLCJtZW1iZXJzSUQiLCJtZW1iZXJzIiwiaWRzVG9FeGNsdWRlIiwibWF0Y2giLCJ0YXJnZXRzSUQiLCJzdWJ0cmFjdCIsInRvQXJyYXkiLCJzdXJ2ZXkiLCJjcmVhdGUiLCJEYXRlIiwiYm90IiwiZGlzdHJpYnV0ZSIsIm5leHREaXN0cmlidXRpb25EYXRlIiwiYWRkIiwiZGF5IiwidG9EYXRlIiwidW5peCIsImZvcm1hdCIsInNjaGVkdWxlU3VydmV5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVFLGdCQUFGLEtBQXVCRixRQUFRLGNBQVIsQ0FBN0I7QUFDQSxNQUFNRyxTQUFTSCxRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU1JLE9BQU9KLFFBQVEsWUFBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSyxVQUFGLEtBQWlCTCxRQUFRLFlBQVIsQ0FBdkI7O0FBRUFNLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBK0JDLE1BQS9CLEVBQXVDLEVBQUVDLFNBQUYsRUFBYUMsZUFBYixFQUF2QyxFQUF1RTtBQUN0RixRQUFJQyxPQUFPLE1BQU1QLEtBQUtRLEVBQUwsQ0FBUUosTUFBUixDQUFqQjtBQUNBLFFBQUksTUFBTUcsS0FBS0UsZUFBZixFQUFnQztBQUM5QixhQUFPLCtDQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUksTUFBTUYsS0FBS0csaUJBQWYsRUFBa0M7QUFDdkMsYUFBTyxxREFBUDtBQUNELEtBRk0sTUFFQTtBQUNMLFVBQUlDLFlBQVloQixJQUFJTSxZQUFXLE1BQU1NLEtBQUtLLE9BQXRCLEVBQUosQ0FBaEI7QUFDQSxVQUFJQyxlQUFlbEIsSUFBSVcsZ0JBQWdCUSxLQUFoQixDQUFzQixlQUF0QixLQUEwQyxFQUE5QyxDQUFuQjtBQUNBLFVBQUlDLFlBQVlKLFVBQVVLLFFBQVYsQ0FBbUJILFlBQW5CLEVBQWlDSSxPQUFqQyxFQUFoQjs7QUFFQSxjQUFRWixTQUFSO0FBQ0UsYUFBSyxVQUFMO0FBQ0UsY0FBSWEsU0FBUyxNQUFNbkIsT0FBT29CLE1BQVAsQ0FBY2YsTUFBZCxFQUFzQkMsU0FBdEIsRUFBaUNVLFNBQWpDLEVBQTRDLElBQUlLLElBQUosRUFBNUMsQ0FBbkI7QUFDQWIsZUFBS2MsR0FBTCxDQUFTQyxVQUFULENBQW9CSixNQUFwQjtBQUNBLGlCQUFPLGdFQUFQO0FBQ0YsYUFBSyxRQUFMO0FBQ0U7QUFDQSxjQUFJSyx1QkFBdUJ6QixtQkFBbUJELFNBQVMyQixHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixDQUFuQixHQUEwQzNCLFNBQVM0QixHQUFULENBQWEsQ0FBYixDQUFyRTtBQUNBLGdCQUFNMUIsT0FBT29CLE1BQVAsQ0FBY2YsTUFBZCxFQUFzQkMsU0FBdEIsRUFBaUNVLFNBQWpDLEVBQTRDUSxxQkFBcUJHLE1BQXJCLEVBQTVDLENBQU47QUFDQSxpQkFBUSx3Q0FBdUNILHFCQUFxQkksSUFBckIsRUFBNEIsMkJBQTBCSixxQkFBcUJLLE1BQXJCLEVBQThCLEdBQW5JO0FBQ0Y7QUFDRSxpQkFBTyxtQkFBUDtBQVhKO0FBYUQ7QUFDRixHQXpCRDs7QUFBQSxXQUFnQ0MsY0FBaEM7QUFBQTtBQUFBOztBQUFBLFNBQWdDQSxjQUFoQztBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5jb25zdCB7IGV4dHJhY3RJRHMgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHNjaGVkdWxlU3VydmV5ICh0ZWFtSUQsIHsgZnJlcXVlbmN5LCBleGNsdWRlZFVzZXJzSUQgfSkge1xuICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICBpZiAoYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICByZXR1cm4gJ0RlbmllZC4gT25seSBvbmUgc2NoZWR1bGVkIHN1cnZleSBpcyBhbGxvd2VkLidcbiAgfSBlbHNlIGlmIChhd2FpdCB0ZWFtLmRpc3RyaWJ1dGVkU3VydmV5KSB7XG4gICAgcmV0dXJuICdEZW5pZWQuIFRoZXJlIGlzIGEgc3VydmV5IHN0aWxsIG9wZW4gZm9yIGFuc3dlcmluZy4nXG4gIH0gZWxzZSB7XG4gICAgbGV0IG1lbWJlcnNJRCA9IFNldChleHRyYWN0SURzKGF3YWl0IHRlYW0ubWVtYmVycykpXG4gICAgbGV0IGlkc1RvRXhjbHVkZSA9IFNldChleGNsdWRlZFVzZXJzSUQubWF0Y2goL1VbQS1aMC05XXs4fS9nKSB8fCBbXSlcbiAgICBsZXQgdGFyZ2V0c0lEID0gbWVtYmVyc0lELnN1YnRyYWN0KGlkc1RvRXhjbHVkZSkudG9BcnJheSgpXG5cbiAgICBzd2l0Y2ggKGZyZXF1ZW5jeSkge1xuICAgICAgY2FzZSAnT25jZSBOb3cnOlxuICAgICAgICBsZXQgc3VydmV5ID0gYXdhaXQgU3VydmV5LmNyZWF0ZSh0ZWFtSUQsIGZyZXF1ZW5jeSwgdGFyZ2V0c0lELCBuZXcgRGF0ZSgpKVxuICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgcmV0dXJuICdEaXN0cmlidXRpbmcuIFlvdXIgdGVhbSBtZW1iZXJzIHdpbGwgaGF2ZSA0OCBob3VycyB0byByZXNwb25kLidcbiAgICAgIGNhc2UgJ1dlZWtseSc6XG4gICAgICAgIC8vIG5leHQgZnJpZGF5XG4gICAgICAgIGxldCBuZXh0RGlzdHJpYnV0aW9uRGF0ZSA9IERFVkVMT1BNRU5UX01PREUgPyBtb21lbnQoKS5hZGQoNywgJ3MnKSA6IG1vbWVudCgpLmRheSg1KVxuICAgICAgICBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW1JRCwgZnJlcXVlbmN5LCB0YXJnZXRzSUQsIG5leHREaXN0cmlidXRpb25EYXRlLnRvRGF0ZSgpKVxuICAgICAgICByZXR1cm4gYFN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIGF0IDwhZGF0ZV4ke25leHREaXN0cmlidXRpb25EYXRlLnVuaXgoKX1ee2RhdGVfc2hvcnR9IGF0IHt0aW1lfXwke25leHREaXN0cmlidXRpb25EYXRlLmZvcm1hdCgpfT5gXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ0ludmFsaWQgZnJlcXVlbmN5J1xuICAgIH1cbiAgfVxufVxuIl19