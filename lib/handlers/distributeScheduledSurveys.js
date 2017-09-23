'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../config');
const Survey = require('../survey');
const Team = require('../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.readyToSend;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsInJlYWR5VG9TZW5kIiwiZm9yRWFjaCIsInN1cnZleSIsInRlYW0iLCJvZiIsInRlYW1JRCIsImJvdCIsImRpc3RyaWJ1dGUiLCJuZXh0RGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsInNjaGVkdWxlZERhdGV0aW1lIiwiYWRkIiwiZGF5IiwiY3JlYXRlIiwiZXhjbHVkZWRVc2Vyc0lEIiwidG9EYXRlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLGdCQUFGLEtBQXVCRCxRQUFRLFdBQVIsQ0FBN0I7QUFDQSxNQUFNRSxTQUFTRixRQUFRLFdBQVIsQ0FBZjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsU0FBUixDQUFiOztBQUVBSSxPQUFPQyxPQUFQLHFCQUFpQixhQUFZO0FBQzNCLE1BQUlDLFVBQVUsTUFBTUosT0FBT0ssV0FBM0I7QUFDQUQsVUFBUUUsT0FBUjtBQUFBLGtDQUFnQixXQUFNQyxNQUFOLEVBQWdCO0FBQzlCLFVBQUlDLE9BQU8sTUFBTVAsS0FBS1EsRUFBTCxDQUFRRixPQUFPRyxNQUFmLENBQWpCO0FBQ0FGLFdBQUtHLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkwsTUFBcEI7QUFDQTtBQUNBLFVBQUlNLG9CQUFKO0FBQ0EsY0FBUU4sT0FBT08sU0FBZjtBQUNFLGFBQUssUUFBTDtBQUNFRCxpQ0FBdUJkLG1CQUFtQkYsT0FBT1UsT0FBT1EsaUJBQWQsRUFBaUNDLEdBQWpDLENBQXFDLENBQXJDLEVBQXdDLEdBQXhDLENBQW5CLEdBQWtFbkIsT0FBT1UsT0FBT1EsaUJBQWQsRUFBaUNFLEdBQWpDLENBQXFDLENBQXJDLENBQXpGO0FBQ0E7QUFDRjtBQUNFO0FBTEo7QUFPQWpCLGFBQU9rQixNQUFQLENBQWNYLE9BQU9HLE1BQXJCLEVBQTZCSCxPQUFPTyxTQUFwQyxFQUErQ1AsT0FBT1ksZUFBdEQsRUFBdUVOLHFCQUFxQk8sTUFBckIsRUFBdkU7QUFDRCxLQWJEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY0QsQ0FoQkQiLCJmaWxlIjoiZGlzdHJpYnV0ZVNjaGVkdWxlZFN1cnZleXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFIH0gPSByZXF1aXJlKCcuLi9jb25maWcnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBzdXJ2ZXlzID0gYXdhaXQgU3VydmV5LnJlYWR5VG9TZW5kXG4gIHN1cnZleXMuZm9yRWFjaChhc3luYyBzdXJ2ZXkgPT4ge1xuICAgIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgIC8vIHJlLXNjaGVkdWxlXG4gICAgbGV0IG5leHREaXN0cmlidXRpb25EYXRlXG4gICAgc3dpdGNoIChzdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICdXZWVrbHknOlxuICAgICAgICBuZXh0RGlzdHJpYnV0aW9uRGF0ZSA9IERFVkVMT1BNRU5UX01PREUgPyBtb21lbnQoc3VydmV5LnNjaGVkdWxlZERhdGV0aW1lKS5hZGQoNywgJ3MnKSA6IG1vbWVudChzdXJ2ZXkuc2NoZWR1bGVkRGF0ZXRpbWUpLmRheSg1KVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIFN1cnZleS5jcmVhdGUoc3VydmV5LnRlYW1JRCwgc3VydmV5LmZyZXF1ZW5jeSwgc3VydmV5LmV4Y2x1ZGVkVXNlcnNJRCwgbmV4dERpc3RyaWJ1dGlvbkRhdGUudG9EYXRlKCkpXG4gIH0pXG59XG4iXX0=