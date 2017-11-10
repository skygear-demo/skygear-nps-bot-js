'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../survey');
const Team = require('../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (frequency) {
    let scheduledSurveys;
    switch (frequency) {
      case 'weekly':
        scheduledSurveys = yield Survey.weekly;
        break;
      case 'monthly':
        scheduledSurveys = yield Survey.monthly;
        break;
      case 'quarterly':
        scheduledSurveys = yield Survey.quarterly;
        break;
      default:
        throw new Error('Invalid frequency');
    }

    for (let scheduledSurvey of scheduledSurveys) {
      const team = yield Team.of(scheduledSurvey.teamID);
      // close old active survey
      const oldSurvey = yield team.activeSurvey;
      if (oldSurvey) {
        yield oldSurvey.close();
      }
      // send new survey
      team.bot.distribute(scheduledSurvey);
      scheduledSurvey.distributionDate = new Date();
      scheduledSurvey.isSent = true;
      yield scheduledSurvey.update();
      // clone to reschedule
      yield Survey.create(scheduledSurvey.teamID, scheduledSurvey.frequency, scheduledSurvey.targetsID);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5LmpzIl0sIm5hbWVzIjpbIlN1cnZleSIsInJlcXVpcmUiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsImZyZXF1ZW5jeSIsInNjaGVkdWxlZFN1cnZleXMiLCJ3ZWVrbHkiLCJtb250aGx5IiwicXVhcnRlcmx5IiwiRXJyb3IiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJ0ZWFtIiwib2YiLCJ0ZWFtSUQiLCJvbGRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJjbG9zZSIsImJvdCIsImRpc3RyaWJ1dGUiLCJkaXN0cmlidXRpb25EYXRlIiwiRGF0ZSIsImlzU2VudCIsInVwZGF0ZSIsImNyZWF0ZSIsInRhcmdldHNJRCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsV0FBUixDQUFmO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7O0FBRUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsU0FBTixFQUFtQjtBQUNsQyxRQUFJQyxnQkFBSjtBQUNBLFlBQVFELFNBQVI7QUFDRSxXQUFLLFFBQUw7QUFDRUMsMkJBQW1CLE1BQU1OLE9BQU9PLE1BQWhDO0FBQ0E7QUFDRixXQUFLLFNBQUw7QUFDRUQsMkJBQW1CLE1BQU1OLE9BQU9RLE9BQWhDO0FBQ0E7QUFDRixXQUFLLFdBQUw7QUFDRUYsMkJBQW1CLE1BQU1OLE9BQU9TLFNBQWhDO0FBQ0E7QUFDRjtBQUNFLGNBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFYSjs7QUFjQSxTQUFLLElBQUlDLGVBQVQsSUFBNEJMLGdCQUE1QixFQUE4QztBQUM1QyxZQUFNTSxPQUFPLE1BQU1WLEtBQUtXLEVBQUwsQ0FBUUYsZ0JBQWdCRyxNQUF4QixDQUFuQjtBQUNBO0FBQ0EsWUFBTUMsWUFBWSxNQUFNSCxLQUFLSSxZQUE3QjtBQUNBLFVBQUlELFNBQUosRUFBZTtBQUNiLGNBQU1BLFVBQVVFLEtBQVYsRUFBTjtBQUNEO0FBQ0Q7QUFDQUwsV0FBS00sR0FBTCxDQUFTQyxVQUFULENBQW9CUixlQUFwQjtBQUNBQSxzQkFBZ0JTLGdCQUFoQixHQUFtQyxJQUFJQyxJQUFKLEVBQW5DO0FBQ0FWLHNCQUFnQlcsTUFBaEIsR0FBeUIsSUFBekI7QUFDQSxZQUFNWCxnQkFBZ0JZLE1BQWhCLEVBQU47QUFDQTtBQUNBLFlBQU12QixPQUFPd0IsTUFBUCxDQUFjYixnQkFBZ0JHLE1BQTlCLEVBQXNDSCxnQkFBZ0JOLFNBQXRELEVBQWlFTSxnQkFBZ0JjLFNBQWpGLENBQU47QUFDRDtBQUNGLEdBL0JEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImRpc3RyaWJ1dGVTY2hlZHVsZWRTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi9zdXJ2ZXknKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZyZXF1ZW5jeSA9PiB7XG4gIGxldCBzY2hlZHVsZWRTdXJ2ZXlzXG4gIHN3aXRjaCAoZnJlcXVlbmN5KSB7XG4gICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgIHNjaGVkdWxlZFN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkud2Vla2x5XG4gICAgICBicmVha1xuICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgc2NoZWR1bGVkU3VydmV5cyA9IGF3YWl0IFN1cnZleS5tb250aGx5XG4gICAgICBicmVha1xuICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICBzY2hlZHVsZWRTdXJ2ZXlzID0gYXdhaXQgU3VydmV5LnF1YXJ0ZXJseVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyZXF1ZW5jeScpXG4gIH1cblxuICBmb3IgKGxldCBzY2hlZHVsZWRTdXJ2ZXkgb2Ygc2NoZWR1bGVkU3VydmV5cykge1xuICAgIGNvbnN0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHNjaGVkdWxlZFN1cnZleS50ZWFtSUQpXG4gICAgLy8gY2xvc2Ugb2xkIGFjdGl2ZSBzdXJ2ZXlcbiAgICBjb25zdCBvbGRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICAgIGlmIChvbGRTdXJ2ZXkpIHtcbiAgICAgIGF3YWl0IG9sZFN1cnZleS5jbG9zZSgpXG4gICAgfVxuICAgIC8vIHNlbmQgbmV3IHN1cnZleVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc2NoZWR1bGVkU3VydmV5KVxuICAgIHNjaGVkdWxlZFN1cnZleS5kaXN0cmlidXRpb25EYXRlID0gbmV3IERhdGUoKVxuICAgIHNjaGVkdWxlZFN1cnZleS5pc1NlbnQgPSB0cnVlXG4gICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LnVwZGF0ZSgpXG4gICAgLy8gY2xvbmUgdG8gcmVzY2hlZHVsZVxuICAgIGF3YWl0IFN1cnZleS5jcmVhdGUoc2NoZWR1bGVkU3VydmV5LnRlYW1JRCwgc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSwgc2NoZWR1bGVkU3VydmV5LnRhcmdldHNJRClcbiAgfVxufVxuIl19