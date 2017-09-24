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
    } else if (yield team.openingSurvey) {
      return 'Denied. There is a survey still open for answering.';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIm1vbWVudCIsInJlcXVpcmUiLCJERVZFTE9QTUVOVF9NT0RFIiwiU3VydmV5IiwiVGVhbSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtSUQiLCJmcmVxdWVuY3kiLCJleGNsdWRlZFVzZXJzSUQiLCJ0ZWFtIiwib2YiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJvcGVuaW5nU3VydmV5IiwibWF0Y2giLCJzdXJ2ZXkiLCJjcmVhdGUiLCJEYXRlIiwiYm90IiwiZGlzdHJpYnV0ZSIsIm5leHREaXN0cmlidXRpb25EYXRlIiwiYWRkIiwiZGF5IiwidG9EYXRlIiwidW5peCIsImZvcm1hdCIsInNjaGVkdWxlU3VydmV5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLGdCQUFGLEtBQXVCRCxRQUFRLGNBQVIsQ0FBN0I7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU1HLE9BQU9ILFFBQVEsWUFBUixDQUFiOztBQUVBSSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQStCQyxNQUEvQixFQUF1QyxFQUFFQyxTQUFGLEVBQWFDLGVBQWIsRUFBdkMsRUFBdUU7QUFDdEYsUUFBSUMsT0FBTyxNQUFNTixLQUFLTyxFQUFMLENBQVFKLE1BQVIsQ0FBakI7QUFDQSxRQUFJLE1BQU1HLEtBQUtFLGVBQWYsRUFBZ0M7QUFDOUIsYUFBTywrQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLE1BQU1GLEtBQUtHLGFBQWYsRUFBOEI7QUFDbkMsYUFBTyxxREFBUDtBQUNELEtBRk0sTUFFQTtBQUNMSix3QkFBa0JBLGdCQUFnQkssS0FBaEIsQ0FBc0IsZUFBdEIsS0FBMEMsRUFBNUQ7QUFDQSxjQUFRTixTQUFSO0FBQ0UsYUFBSyxVQUFMO0FBQ0UsY0FBSU8sU0FBUyxNQUFNWixPQUFPYSxNQUFQLENBQWNULE1BQWQsRUFBc0JDLFNBQXRCLEVBQWlDQyxlQUFqQyxFQUFrRCxJQUFJUSxJQUFKLEVBQWxELENBQW5CO0FBQ0FQLGVBQUtRLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkosTUFBcEI7QUFDQSxpQkFBTyxnRUFBUDtBQUNGLGFBQUssUUFBTDtBQUNFO0FBQ0EsY0FBSUssdUJBQXVCbEIsbUJBQW1CRixTQUFTcUIsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FBbkIsR0FBMENyQixTQUFTc0IsR0FBVCxDQUFhLENBQWIsQ0FBckU7QUFDQSxnQkFBTW5CLE9BQU9hLE1BQVAsQ0FBY1QsTUFBZCxFQUFzQkMsU0FBdEIsRUFBaUNDLGVBQWpDLEVBQWtEVyxxQkFBcUJHLE1BQXJCLEVBQWxELENBQU47QUFDQSxpQkFBUSx3Q0FBdUNILHFCQUFxQkksSUFBckIsRUFBNEIsMkJBQTBCSixxQkFBcUJLLE1BQXJCLEVBQThCLEdBQW5JO0FBQ0Y7QUFDRSxpQkFBTyxtQkFBUDtBQVhKO0FBYUQ7QUFDRixHQXRCRDs7QUFBQSxXQUFnQ0MsY0FBaEM7QUFBQTtBQUFBOztBQUFBLFNBQWdDQSxjQUFoQztBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IHsgREVWRUxPUE1FTlRfTU9ERSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gc2NoZWR1bGVTdXJ2ZXkgKHRlYW1JRCwgeyBmcmVxdWVuY3ksIGV4Y2x1ZGVkVXNlcnNJRCB9KSB7XG4gIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gIGlmIChhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleSkge1xuICAgIHJldHVybiAnRGVuaWVkLiBPbmx5IG9uZSBzY2hlZHVsZWQgc3VydmV5IGlzIGFsbG93ZWQuJ1xuICB9IGVsc2UgaWYgKGF3YWl0IHRlYW0ub3BlbmluZ1N1cnZleSkge1xuICAgIHJldHVybiAnRGVuaWVkLiBUaGVyZSBpcyBhIHN1cnZleSBzdGlsbCBvcGVuIGZvciBhbnN3ZXJpbmcuJ1xuICB9IGVsc2Uge1xuICAgIGV4Y2x1ZGVkVXNlcnNJRCA9IGV4Y2x1ZGVkVXNlcnNJRC5tYXRjaCgvVVtBLVowLTldezh9L2cpIHx8IFtdXG4gICAgc3dpdGNoIChmcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ09uY2UgTm93JzpcbiAgICAgICAgbGV0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbUlELCBmcmVxdWVuY3ksIGV4Y2x1ZGVkVXNlcnNJRCwgbmV3IERhdGUoKSlcbiAgICAgICAgdGVhbS5ib3QuZGlzdHJpYnV0ZShzdXJ2ZXkpXG4gICAgICAgIHJldHVybiAnRGlzdHJpYnV0aW5nLiBZb3VyIHRlYW0gbWVtYmVycyB3aWxsIGhhdmUgNDggaG91cnMgdG8gcmVzcG9uZC4nXG4gICAgICBjYXNlICdXZWVrbHknOlxuICAgICAgICAvLyBuZXh0IGZyaWRheVxuICAgICAgICBsZXQgbmV4dERpc3RyaWJ1dGlvbkRhdGUgPSBERVZFTE9QTUVOVF9NT0RFID8gbW9tZW50KCkuYWRkKDcsICdzJykgOiBtb21lbnQoKS5kYXkoNSlcbiAgICAgICAgYXdhaXQgU3VydmV5LmNyZWF0ZSh0ZWFtSUQsIGZyZXF1ZW5jeSwgZXhjbHVkZWRVc2Vyc0lELCBuZXh0RGlzdHJpYnV0aW9uRGF0ZS50b0RhdGUoKSlcbiAgICAgICAgcmV0dXJuIGBTdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBhdCA8IWRhdGVeJHtuZXh0RGlzdHJpYnV0aW9uRGF0ZS51bml4KCl9XntkYXRlX3Nob3J0fSBhdCB7dGltZX18JHtuZXh0RGlzdHJpYnV0aW9uRGF0ZS5mb3JtYXQoKX0+YFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdJbnZhbGlkIGZyZXF1ZW5jeSdcbiAgICB9XG4gIH1cbn1cbiJdfQ==