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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5LmpzIl0sIm5hbWVzIjpbIlN1cnZleSIsInJlcXVpcmUiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsImZyZXF1ZW5jeSIsInNjaGVkdWxlZFN1cnZleXMiLCJ3ZWVrbHkiLCJtb250aGx5IiwicXVhcnRlcmx5IiwiRXJyb3IiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJ0ZWFtIiwib2YiLCJ0ZWFtSUQiLCJvbGRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJjbG9zZSIsImJvdCIsImRpc3RyaWJ1dGUiLCJpc1NlbnQiLCJ1cGRhdGUiLCJjcmVhdGUiLCJ0YXJnZXRzSUQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFdBQVIsQ0FBZjtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLFNBQU4sRUFBbUI7QUFDbEMsUUFBSUMsZ0JBQUo7QUFDQSxZQUFRRCxTQUFSO0FBQ0UsV0FBSyxRQUFMO0FBQ0VDLDJCQUFtQixNQUFNTixPQUFPTyxNQUFoQztBQUNBO0FBQ0YsV0FBSyxTQUFMO0FBQ0VELDJCQUFtQixNQUFNTixPQUFPUSxPQUFoQztBQUNBO0FBQ0YsV0FBSyxXQUFMO0FBQ0VGLDJCQUFtQixNQUFNTixPQUFPUyxTQUFoQztBQUNBO0FBQ0Y7QUFDRSxjQUFNLElBQUlDLEtBQUosQ0FBVSxtQkFBVixDQUFOO0FBWEo7O0FBY0EsU0FBSyxJQUFJQyxlQUFULElBQTRCTCxnQkFBNUIsRUFBOEM7QUFDNUMsWUFBTU0sT0FBTyxNQUFNVixLQUFLVyxFQUFMLENBQVFGLGdCQUFnQkcsTUFBeEIsQ0FBbkI7QUFDQTtBQUNBLFlBQU1DLFlBQVksTUFBTUgsS0FBS0ksWUFBN0I7QUFDQSxVQUFJRCxTQUFKLEVBQWU7QUFDYixjQUFNQSxVQUFVRSxLQUFWLEVBQU47QUFDRDtBQUNEO0FBQ0FMLFdBQUtNLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQlIsZUFBcEI7QUFDQUEsc0JBQWdCUyxNQUFoQixHQUF5QixJQUF6QjtBQUNBLFlBQU1ULGdCQUFnQlUsTUFBaEIsRUFBTjtBQUNBO0FBQ0EsWUFBTXJCLE9BQU9zQixNQUFQLENBQWNYLGdCQUFnQkcsTUFBOUIsRUFBc0NILGdCQUFnQk4sU0FBdEQsRUFBaUVNLGdCQUFnQlksU0FBakYsQ0FBTjtBQUNEO0FBQ0YsR0E5QkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZGlzdHJpYnV0ZVNjaGVkdWxlZFN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uL3N1cnZleScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnJlcXVlbmN5ID0+IHtcbiAgbGV0IHNjaGVkdWxlZFN1cnZleXNcbiAgc3dpdGNoIChmcmVxdWVuY3kpIHtcbiAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgc2NoZWR1bGVkU3VydmV5cyA9IGF3YWl0IFN1cnZleS53ZWVrbHlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbW9udGhseSc6XG4gICAgICBzY2hlZHVsZWRTdXJ2ZXlzID0gYXdhaXQgU3VydmV5Lm1vbnRobHlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncXVhcnRlcmx5JzpcbiAgICAgIHNjaGVkdWxlZFN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkucXVhcnRlcmx5XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJlcXVlbmN5JylcbiAgfVxuXG4gIGZvciAobGV0IHNjaGVkdWxlZFN1cnZleSBvZiBzY2hlZHVsZWRTdXJ2ZXlzKSB7XG4gICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2Yoc2NoZWR1bGVkU3VydmV5LnRlYW1JRClcbiAgICAvLyBjbG9zZSBvbGQgYWN0aXZlIHN1cnZleVxuICAgIGNvbnN0IG9sZFN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gICAgaWYgKG9sZFN1cnZleSkge1xuICAgICAgYXdhaXQgb2xkU3VydmV5LmNsb3NlKClcbiAgICB9XG4gICAgLy8gc2VuZCBuZXcgc3VydmV5XG4gICAgdGVhbS5ib3QuZGlzdHJpYnV0ZShzY2hlZHVsZWRTdXJ2ZXkpXG4gICAgc2NoZWR1bGVkU3VydmV5LmlzU2VudCA9IHRydWVcbiAgICBhd2FpdCBzY2hlZHVsZWRTdXJ2ZXkudXBkYXRlKClcbiAgICAvLyBjbG9uZSB0byByZXNjaGVkdWxlXG4gICAgYXdhaXQgU3VydmV5LmNyZWF0ZShzY2hlZHVsZWRTdXJ2ZXkudGVhbUlELCBzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5LCBzY2hlZHVsZWRTdXJ2ZXkudGFyZ2V0c0lEKVxuICB9XG59XG4iXX0=