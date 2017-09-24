'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../config');
const Survey = require('../survey');
const Team = require('../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.timeToSend;
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
      Survey.create(survey.teamID, survey.frequency, survey.excludedUsersID, nextDistributionDate.toDate());
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsInRpbWVUb1NlbmQiLCJmb3JFYWNoIiwic3VydmV5IiwidGVhbSIsIm9mIiwidGVhbUlEIiwiYm90IiwiZGlzdHJpYnV0ZSIsIm5leHREaXN0cmlidXRpb25EYXRlIiwiZnJlcXVlbmN5Iiwic2NoZWR1bGVkRGF0ZXRpbWUiLCJhZGQiLCJkYXkiLCJjcmVhdGUiLCJleGNsdWRlZFVzZXJzSUQiLCJ0b0RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUMsZ0JBQUYsS0FBdUJELFFBQVEsV0FBUixDQUE3QjtBQUNBLE1BQU1FLFNBQVNGLFFBQVEsV0FBUixDQUFmO0FBQ0EsTUFBTUcsT0FBT0gsUUFBUSxTQUFSLENBQWI7O0FBRUFJLE9BQU9DLE9BQVAscUJBQWlCLGFBQVk7QUFDM0IsTUFBSUMsVUFBVSxNQUFNSixPQUFPSyxVQUEzQjtBQUNBRCxVQUFRRSxPQUFSO0FBQUEsa0NBQWdCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDOUIsVUFBSUMsT0FBTyxNQUFNUCxLQUFLUSxFQUFMLENBQVFGLE9BQU9HLE1BQWYsQ0FBakI7QUFDQUYsV0FBS0csR0FBTCxDQUFTQyxVQUFULENBQW9CTCxNQUFwQjtBQUNBO0FBQ0EsVUFBSU0sb0JBQUo7QUFDQSxjQUFRTixPQUFPTyxTQUFmO0FBQ0UsYUFBSyxRQUFMO0FBQ0VELGlDQUF1QmQsbUJBQW1CRixPQUFPVSxPQUFPUSxpQkFBZCxFQUFpQ0MsR0FBakMsQ0FBcUMsQ0FBckMsRUFBd0MsR0FBeEMsQ0FBbkIsR0FBa0VuQixPQUFPVSxPQUFPUSxpQkFBZCxFQUFpQ0UsR0FBakMsQ0FBcUMsQ0FBckMsQ0FBekY7QUFDQTtBQUNGO0FBQ0U7QUFMSjtBQU9BakIsYUFBT2tCLE1BQVAsQ0FBY1gsT0FBT0csTUFBckIsRUFBNkJILE9BQU9PLFNBQXBDLEVBQStDUCxPQUFPWSxlQUF0RCxFQUF1RU4scUJBQXFCTyxNQUFyQixFQUF2RTtBQUNELEtBYkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFjRCxDQWhCRCIsImZpbGUiOiJkaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpXG5jb25zdCB7IERFVkVMT1BNRU5UX01PREUgfSA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi9zdXJ2ZXknKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkudGltZVRvU2VuZFxuICBzdXJ2ZXlzLmZvckVhY2goYXN5bmMgc3VydmV5ID0+IHtcbiAgICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2Yoc3VydmV5LnRlYW1JRClcbiAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAvLyByZS1zY2hlZHVsZVxuICAgIGxldCBuZXh0RGlzdHJpYnV0aW9uRGF0ZVxuICAgIHN3aXRjaCAoc3VydmV5LmZyZXF1ZW5jeSkge1xuICAgICAgY2FzZSAnV2Vla2x5JzpcbiAgICAgICAgbmV4dERpc3RyaWJ1dGlvbkRhdGUgPSBERVZFTE9QTUVOVF9NT0RFID8gbW9tZW50KHN1cnZleS5zY2hlZHVsZWREYXRldGltZSkuYWRkKDcsICdzJykgOiBtb21lbnQoc3VydmV5LnNjaGVkdWxlZERhdGV0aW1lKS5kYXkoNSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBTdXJ2ZXkuY3JlYXRlKHN1cnZleS50ZWFtSUQsIHN1cnZleS5mcmVxdWVuY3ksIHN1cnZleS5leGNsdWRlZFVzZXJzSUQsIG5leHREaXN0cmlidXRpb25EYXRlLnRvRGF0ZSgpKVxuICB9KVxufVxuIl19