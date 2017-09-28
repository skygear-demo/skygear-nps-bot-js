'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { DEVELOPMENT_MODE } = require('../../config');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.candidatesOfDistribution;
  for (let survey of surveys) {
    let team = yield Team.of(survey.teamID);
    team.bot.distribute(survey);

    // re-schedule
    let nextDistributionDate;
    switch (survey.frequency) {
      case 'Weekly':
        nextDistributionDate = DEVELOPMENT_MODE ? moment().add(1, 'm').second(15).startOf('second') : moment().add(1, 'w').day(5).hour(10).startOf('hour');
        break;
      default:
        return;
    }
    yield Survey.create(survey.teamID, survey.frequency, survey.targetsID, nextDistributionDate.toDate());
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5cy5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwiREVWRUxPUE1FTlRfTU9ERSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsImNhbmRpZGF0ZXNPZkRpc3RyaWJ1dGlvbiIsInN1cnZleSIsInRlYW0iLCJvZiIsInRlYW1JRCIsImJvdCIsImRpc3RyaWJ1dGUiLCJuZXh0RGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInNlY29uZCIsInN0YXJ0T2YiLCJkYXkiLCJob3VyIiwiY3JlYXRlIiwidGFyZ2V0c0lEIiwidG9EYXRlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLGdCQUFGLEtBQXVCRCxRQUFRLGNBQVIsQ0FBN0I7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsWUFBUixDQUFiOztBQUVBSSxPQUFPQyxPQUFQLHFCQUFpQixhQUFZO0FBQzNCLE1BQUlDLFVBQVUsTUFBTUosT0FBT0ssd0JBQTNCO0FBQ0EsT0FBSyxJQUFJQyxNQUFULElBQW1CRixPQUFuQixFQUE0QjtBQUMxQixRQUFJRyxPQUFPLE1BQU1OLEtBQUtPLEVBQUwsQ0FBUUYsT0FBT0csTUFBZixDQUFqQjtBQUNBRixTQUFLRyxHQUFMLENBQVNDLFVBQVQsQ0FBb0JMLE1BQXBCOztBQUVBO0FBQ0EsUUFBSU0sb0JBQUo7QUFDQSxZQUFRTixPQUFPTyxTQUFmO0FBQ0UsV0FBSyxRQUFMO0FBQ0VELCtCQUF1QmIsbUJBQW1CRixTQUFTaUIsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE1BQXJCLENBQTRCLEVBQTVCLEVBQWdDQyxPQUFoQyxDQUF3QyxRQUF4QyxDQUFuQixHQUF1RW5CLFNBQVNpQixHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkcsR0FBckIsQ0FBeUIsQ0FBekIsRUFBNEJDLElBQTVCLENBQWlDLEVBQWpDLEVBQXFDRixPQUFyQyxDQUE2QyxNQUE3QyxDQUE5RjtBQUNBO0FBQ0Y7QUFDRTtBQUxKO0FBT0EsVUFBTWhCLE9BQU9tQixNQUFQLENBQWNiLE9BQU9HLE1BQXJCLEVBQTZCSCxPQUFPTyxTQUFwQyxFQUErQ1AsT0FBT2MsU0FBdEQsRUFBaUVSLHFCQUFxQlMsTUFBckIsRUFBakUsQ0FBTjtBQUNEO0FBQ0YsQ0FqQkQiLCJmaWxlIjoiZGlzdHJpYnV0ZVNjaGVkdWxlZFN1cnZleXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgeyBERVZFTE9QTUVOVF9NT0RFIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBzdXJ2ZXlzID0gYXdhaXQgU3VydmV5LmNhbmRpZGF0ZXNPZkRpc3RyaWJ1dGlvblxuICBmb3IgKGxldCBzdXJ2ZXkgb2Ygc3VydmV5cykge1xuICAgIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuXG4gICAgLy8gcmUtc2NoZWR1bGVcbiAgICBsZXQgbmV4dERpc3RyaWJ1dGlvbkRhdGVcbiAgICBzd2l0Y2ggKHN1cnZleS5mcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ1dlZWtseSc6XG4gICAgICAgIG5leHREaXN0cmlidXRpb25EYXRlID0gREVWRUxPUE1FTlRfTU9ERSA/IG1vbWVudCgpLmFkZCgxLCAnbScpLnNlY29uZCgxNSkuc3RhcnRPZignc2Vjb25kJykgOiBtb21lbnQoKS5hZGQoMSwgJ3cnKS5kYXkoNSkuaG91cigxMCkuc3RhcnRPZignaG91cicpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgYXdhaXQgU3VydmV5LmNyZWF0ZShzdXJ2ZXkudGVhbUlELCBzdXJ2ZXkuZnJlcXVlbmN5LCBzdXJ2ZXkudGFyZ2V0c0lELCBuZXh0RGlzdHJpYnV0aW9uRGF0ZS50b0RhdGUoKSlcbiAgfVxufVxuIl19