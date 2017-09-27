'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../../config');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.candidatesOfDistribution;
  surveys.forEach((() => {
    var _ref2 = _asyncToGenerator(function* (survey) {
      let team = yield Team.of(survey.teamID);
      team.bot.distribute(survey);
      // re-schedule
      let nextDistributionDate;
      switch (survey.frequency) {
        case 'Weekly':
          nextDistributionDate = DEVELOPMENT_MODE ? moment(survey.scheduledDatetime).add(7, 's') : moment(survey.scheduledDatetime).day(5);
          break;
        default:
          return;
      }
      Survey.create(survey.teamID, survey.frequency, survey.targetsID, nextDistributionDate.toDate());
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsImNhbmRpZGF0ZXNPZkRpc3RyaWJ1dGlvbiIsImZvckVhY2giLCJzdXJ2ZXkiLCJ0ZWFtIiwib2YiLCJ0ZWFtSUQiLCJib3QiLCJkaXN0cmlidXRlIiwibmV4dERpc3RyaWJ1dGlvbkRhdGUiLCJmcmVxdWVuY3kiLCJzY2hlZHVsZWREYXRldGltZSIsImFkZCIsImRheSIsImNyZWF0ZSIsInRhcmdldHNJRCIsInRvRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQ0EsTUFBTSxFQUFFQyxnQkFBRixLQUF1QkQsUUFBUSxjQUFSLENBQTdCO0FBQ0EsTUFBTUUsU0FBU0YsUUFBUSxjQUFSLENBQWY7QUFDQSxNQUFNRyxPQUFPSCxRQUFRLFlBQVIsQ0FBYjs7QUFFQUksT0FBT0MsT0FBUCxxQkFBaUIsYUFBWTtBQUMzQixNQUFJQyxVQUFVLE1BQU1KLE9BQU9LLHdCQUEzQjtBQUNBRCxVQUFRRSxPQUFSO0FBQUEsa0NBQWdCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDOUIsVUFBSUMsT0FBTyxNQUFNUCxLQUFLUSxFQUFMLENBQVFGLE9BQU9HLE1BQWYsQ0FBakI7QUFDQUYsV0FBS0csR0FBTCxDQUFTQyxVQUFULENBQW9CTCxNQUFwQjtBQUNBO0FBQ0EsVUFBSU0sb0JBQUo7QUFDQSxjQUFRTixPQUFPTyxTQUFmO0FBQ0UsYUFBSyxRQUFMO0FBQ0VELGlDQUF1QmQsbUJBQW1CRixPQUFPVSxPQUFPUSxpQkFBZCxFQUFpQ0MsR0FBakMsQ0FBcUMsQ0FBckMsRUFBd0MsR0FBeEMsQ0FBbkIsR0FBa0VuQixPQUFPVSxPQUFPUSxpQkFBZCxFQUFpQ0UsR0FBakMsQ0FBcUMsQ0FBckMsQ0FBekY7QUFDQTtBQUNGO0FBQ0U7QUFMSjtBQU9BakIsYUFBT2tCLE1BQVAsQ0FBY1gsT0FBT0csTUFBckIsRUFBNkJILE9BQU9PLFNBQXBDLEVBQStDUCxPQUFPWSxTQUF0RCxFQUFpRU4scUJBQXFCTyxNQUFyQixFQUFqRTtBQUNELEtBYkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFjRCxDQWhCRCIsImZpbGUiOiJkaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpXG5jb25zdCB7IERFVkVMT1BNRU5UX01PREUgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZycpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkuY2FuZGlkYXRlc09mRGlzdHJpYnV0aW9uXG4gIHN1cnZleXMuZm9yRWFjaChhc3luYyBzdXJ2ZXkgPT4ge1xuICAgIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgIC8vIHJlLXNjaGVkdWxlXG4gICAgbGV0IG5leHREaXN0cmlidXRpb25EYXRlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICdXZWVrbHknOlxuICAgICAgICBuZXh0RGlzdHJpYnV0aW9uRGF0ZSA9IERFVkVMT1BNRU5UX01PREUgPyBtb21lbnQoc3VydmV5LnNjaGVkdWxlZERhdGV0aW1lKS5hZGQoNywgJ3MnKSA6IG1vbWVudChzdXJ2ZXkuc2NoZWR1bGVkRGF0ZXRpbWUpLmRheSg1KVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIFN1cnZleS5jcmVhdGUoc3VydmV5LnRlYW1JRCwgc3VydmV5LmZyZXF1ZW5jeSwgc3VydmV5LnRhcmdldHNJRCwgbmV4dERpc3RyaWJ1dGlvbkRhdGUudG9EYXRlKCkpXG4gIH0pXG59XG4iXX0=