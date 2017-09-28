'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

      let nextDistributionDate = moment();
      switch (frequency) {
        case 'Once Now':
          let survey = yield Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate());
          team.bot.distribute(survey);
          return 'Distributing. Your team members will have 48 hours to respond.';
        case 'Weekly':
          if (DEVELOPMENT_MODE) {
            // distribute and re-schedule survey at next minute 10s
            let this15s = moment().second(15).startOf('second');
            nextDistributionDate = moment().isBefore(this15s) ? this15s : moment().add(1, 'm').second(15).startOf('second');
          } else {
            // distribute and re-schedule survey at next friday 10:00
            let thisFriday = moment().day(5).hour(10).startOf('hour');
            nextDistributionDate = moment().isBefore(thisFriday) ? thisFriday : moment().add(1, 'w').day(5).hour(10).startOf('hour');
          }
          yield Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate());
          return `Survey will be distributed every Fridays at 10:00 since <!date^${nextDistributionDate.unix()}^{date_short} at {time}|${nextDistributionDate.format()}>`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtb21lbnQiLCJERVZFTE9QTUVOVF9NT0RFIiwiU3VydmV5IiwiVGVhbSIsImV4dHJhY3RJRHMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbUlEIiwiZnJlcXVlbmN5IiwiZXhjbHVkZWRVc2Vyc0lEIiwidGVhbSIsIm9mIiwic2NoZWR1bGVkU3VydmV5IiwiZGlzdHJpYnV0ZWRTdXJ2ZXkiLCJtZW1iZXJzSUQiLCJtZW1iZXJzIiwiaWRzVG9FeGNsdWRlIiwibWF0Y2giLCJ0YXJnZXRzSUQiLCJzdWJ0cmFjdCIsInRvQXJyYXkiLCJuZXh0RGlzdHJpYnV0aW9uRGF0ZSIsInN1cnZleSIsImNyZWF0ZSIsInRvRGF0ZSIsImJvdCIsImRpc3RyaWJ1dGUiLCJ0aGlzMTVzIiwic2Vjb25kIiwic3RhcnRPZiIsImlzQmVmb3JlIiwiYWRkIiwidGhpc0ZyaWRheSIsImRheSIsImhvdXIiLCJ1bml4IiwiZm9ybWF0Iiwic2NoZWR1bGVTdXJ2ZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsU0FBU0QsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVFLGdCQUFGLEtBQXVCRixRQUFRLGNBQVIsQ0FBN0I7QUFDQSxNQUFNRyxTQUFTSCxRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU1JLE9BQU9KLFFBQVEsWUFBUixDQUFiO0FBQ0EsTUFBTSxFQUFFSyxVQUFGLEtBQWlCTCxRQUFRLFlBQVIsQ0FBdkI7O0FBRUFNLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBK0JDLE1BQS9CLEVBQXVDLEVBQUVDLFNBQUYsRUFBYUMsZUFBYixFQUF2QyxFQUF1RTtBQUN0RixRQUFJQyxPQUFPLE1BQU1QLEtBQUtRLEVBQUwsQ0FBUUosTUFBUixDQUFqQjtBQUNBLFFBQUksTUFBTUcsS0FBS0UsZUFBZixFQUFnQztBQUM5QixhQUFPLCtDQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUksTUFBTUYsS0FBS0csaUJBQWYsRUFBa0M7QUFDdkMsYUFBTyxxREFBUDtBQUNELEtBRk0sTUFFQTtBQUNMLFVBQUlDLFlBQVloQixJQUFJTSxZQUFXLE1BQU1NLEtBQUtLLE9BQXRCLEVBQUosQ0FBaEI7QUFDQSxVQUFJQyxlQUFlbEIsSUFBSVcsZ0JBQWdCUSxLQUFoQixDQUFzQixlQUF0QixLQUEwQyxFQUE5QyxDQUFuQjtBQUNBLFVBQUlDLFlBQVlKLFVBQVVLLFFBQVYsQ0FBbUJILFlBQW5CLEVBQWlDSSxPQUFqQyxFQUFoQjs7QUFFQSxVQUFJQyx1QkFBdUJyQixRQUEzQjtBQUNBLGNBQVFRLFNBQVI7QUFDRSxhQUFLLFVBQUw7QUFDRSxjQUFJYyxTQUFTLE1BQU1wQixPQUFPcUIsTUFBUCxDQUFjaEIsTUFBZCxFQUFzQkMsU0FBdEIsRUFBaUNVLFNBQWpDLEVBQTRDRyxxQkFBcUJHLE1BQXJCLEVBQTVDLENBQW5CO0FBQ0FkLGVBQUtlLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkosTUFBcEI7QUFDQSxpQkFBTyxnRUFBUDtBQUNGLGFBQUssUUFBTDtBQUNFLGNBQUlyQixnQkFBSixFQUFzQjtBQUNwQjtBQUNBLGdCQUFJMEIsVUFBVTNCLFNBQVM0QixNQUFULENBQWdCLEVBQWhCLEVBQW9CQyxPQUFwQixDQUE0QixRQUE1QixDQUFkO0FBQ0FSLG1DQUF1QnJCLFNBQVM4QixRQUFULENBQWtCSCxPQUFsQixJQUE2QkEsT0FBN0IsR0FBdUMzQixTQUFTK0IsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJILE1BQXJCLENBQTRCLEVBQTVCLEVBQWdDQyxPQUFoQyxDQUF3QyxRQUF4QyxDQUE5RDtBQUNELFdBSkQsTUFJTztBQUNMO0FBQ0EsZ0JBQUlHLGFBQWFoQyxTQUFTaUMsR0FBVCxDQUFhLENBQWIsRUFBZ0JDLElBQWhCLENBQXFCLEVBQXJCLEVBQXlCTCxPQUF6QixDQUFpQyxNQUFqQyxDQUFqQjtBQUNBUixtQ0FBdUJyQixTQUFTOEIsUUFBVCxDQUFrQkUsVUFBbEIsSUFBZ0NBLFVBQWhDLEdBQTZDaEMsU0FBUytCLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCRSxHQUFyQixDQUF5QixDQUF6QixFQUE0QkMsSUFBNUIsQ0FBaUMsRUFBakMsRUFBcUNMLE9BQXJDLENBQTZDLE1BQTdDLENBQXBFO0FBQ0Q7QUFDRCxnQkFBTTNCLE9BQU9xQixNQUFQLENBQWNoQixNQUFkLEVBQXNCQyxTQUF0QixFQUFpQ1UsU0FBakMsRUFBNENHLHFCQUFxQkcsTUFBckIsRUFBNUMsQ0FBTjtBQUNBLGlCQUFRLGtFQUFpRUgscUJBQXFCYyxJQUFyQixFQUE0QiwyQkFBMEJkLHFCQUFxQmUsTUFBckIsRUFBOEIsR0FBN0o7QUFDRjtBQUNFLGlCQUFPLG1CQUFQO0FBbEJKO0FBb0JEO0FBQ0YsR0FqQ0Q7O0FBQUEsV0FBZ0NDLGNBQWhDO0FBQUE7QUFBQTs7QUFBQSxTQUFnQ0EsY0FBaEM7QUFBQSIsImZpbGUiOiJzY2hlZHVsZVN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5jb25zdCB7IGV4dHJhY3RJRHMgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHNjaGVkdWxlU3VydmV5ICh0ZWFtSUQsIHsgZnJlcXVlbmN5LCBleGNsdWRlZFVzZXJzSUQgfSkge1xuICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICBpZiAoYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICByZXR1cm4gJ0RlbmllZC4gT25seSBvbmUgc2NoZWR1bGVkIHN1cnZleSBpcyBhbGxvd2VkLidcbiAgfSBlbHNlIGlmIChhd2FpdCB0ZWFtLmRpc3RyaWJ1dGVkU3VydmV5KSB7XG4gICAgcmV0dXJuICdEZW5pZWQuIFRoZXJlIGlzIGEgc3VydmV5IHN0aWxsIG9wZW4gZm9yIGFuc3dlcmluZy4nXG4gIH0gZWxzZSB7XG4gICAgbGV0IG1lbWJlcnNJRCA9IFNldChleHRyYWN0SURzKGF3YWl0IHRlYW0ubWVtYmVycykpXG4gICAgbGV0IGlkc1RvRXhjbHVkZSA9IFNldChleGNsdWRlZFVzZXJzSUQubWF0Y2goL1VbQS1aMC05XXs4fS9nKSB8fCBbXSlcbiAgICBsZXQgdGFyZ2V0c0lEID0gbWVtYmVyc0lELnN1YnRyYWN0KGlkc1RvRXhjbHVkZSkudG9BcnJheSgpXG5cbiAgICBsZXQgbmV4dERpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKVxuICAgIHN3aXRjaCAoZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICdPbmNlIE5vdyc6XG4gICAgICAgIGxldCBzdXJ2ZXkgPSBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW1JRCwgZnJlcXVlbmN5LCB0YXJnZXRzSUQsIG5leHREaXN0cmlidXRpb25EYXRlLnRvRGF0ZSgpKVxuICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgcmV0dXJuICdEaXN0cmlidXRpbmcuIFlvdXIgdGVhbSBtZW1iZXJzIHdpbGwgaGF2ZSA0OCBob3VycyB0byByZXNwb25kLidcbiAgICAgIGNhc2UgJ1dlZWtseSc6XG4gICAgICAgIGlmIChERVZFTE9QTUVOVF9NT0RFKSB7XG4gICAgICAgICAgLy8gZGlzdHJpYnV0ZSBhbmQgcmUtc2NoZWR1bGUgc3VydmV5IGF0IG5leHQgbWludXRlIDEwc1xuICAgICAgICAgIGxldCB0aGlzMTVzID0gbW9tZW50KCkuc2Vjb25kKDE1KS5zdGFydE9mKCdzZWNvbmQnKVxuICAgICAgICAgIG5leHREaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuaXNCZWZvcmUodGhpczE1cykgPyB0aGlzMTVzIDogbW9tZW50KCkuYWRkKDEsICdtJykuc2Vjb25kKDE1KS5zdGFydE9mKCdzZWNvbmQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpc3RyaWJ1dGUgYW5kIHJlLXNjaGVkdWxlIHN1cnZleSBhdCBuZXh0IGZyaWRheSAxMDowMFxuICAgICAgICAgIGxldCB0aGlzRnJpZGF5ID0gbW9tZW50KCkuZGF5KDUpLmhvdXIoMTApLnN0YXJ0T2YoJ2hvdXInKVxuICAgICAgICAgIG5leHREaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuaXNCZWZvcmUodGhpc0ZyaWRheSkgPyB0aGlzRnJpZGF5IDogbW9tZW50KCkuYWRkKDEsICd3JykuZGF5KDUpLmhvdXIoMTApLnN0YXJ0T2YoJ2hvdXInKVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbUlELCBmcmVxdWVuY3ksIHRhcmdldHNJRCwgbmV4dERpc3RyaWJ1dGlvbkRhdGUudG9EYXRlKCkpXG4gICAgICAgIHJldHVybiBgU3VydmV5IHdpbGwgYmUgZGlzdHJpYnV0ZWQgZXZlcnkgRnJpZGF5cyBhdCAxMDowMCBzaW5jZSA8IWRhdGVeJHtuZXh0RGlzdHJpYnV0aW9uRGF0ZS51bml4KCl9XntkYXRlX3Nob3J0fSBhdCB7dGltZX18JHtuZXh0RGlzdHJpYnV0aW9uRGF0ZS5mb3JtYXQoKX0+YFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdJbnZhbGlkIGZyZXF1ZW5jeSdcbiAgICB9XG4gIH1cbn1cbiJdfQ==