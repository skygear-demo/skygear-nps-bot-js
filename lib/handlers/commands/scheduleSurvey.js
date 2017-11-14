'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const message = require('../../message');
const Survey = require('../../survey');
const { toLocalDate } = require('../../util');

const VALID_OPTIONS = ['--now', '--weekly', '--monthly', '--quarterly'];

// imitate shell script
module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, [$1, ...rest]) {
    const command = message.command['/nps-schedule-survey'];

    if ($1 && rest.length === 0) {
      if (VALID_OPTIONS.includes($1)) {
        const frequency = $1.substr(2); // remove prefix "--"

        if (yield team.activeSurvey) {
          return command.error.activeSurveyExists;
        }

        if (yield team.scheduledSurvey) {
          return command.error.alreadyScheduled;
        }

        const survey = yield Survey.create(team.slackID, frequency, team.targetsID); // eslint-disable-line
        let distributionDate;
        switch (frequency) {
          case 'now':
            team.bot.distribute(survey);
            survey.distributionDate = new Date();
            survey.isSent = true;
            survey.update();
            return message.ok + '. The survey will be distributed now.';
          case 'weekly':
            distributionDate = moment().add(1, 'w').startOf('week');
            break;
          case 'monthly':
            distributionDate = moment().add(1, 'M').startOf('month');
            break;
          case 'quarterly':
            distributionDate = moment().add(1, 'Q').startOf('quarter');
            break;
          default:
            throw new Error('Invalid frequency');
        }
        return `/nps-schedule-survey: The survey will be distributed at ${toLocalDate(distributionDate)}.`;
      } else {
        return command.error.illegalOption($1) + '\n' + command.usage;
      }
    } else {
      return command.usage;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlN1cnZleSIsInRvTG9jYWxEYXRlIiwiVkFMSURfT1BUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiJDEiLCJyZXN0IiwiY29tbWFuZCIsImxlbmd0aCIsImluY2x1ZGVzIiwiZnJlcXVlbmN5Iiwic3Vic3RyIiwiYWN0aXZlU3VydmV5IiwiZXJyb3IiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhbHJlYWR5U2NoZWR1bGVkIiwic3VydmV5IiwiY3JlYXRlIiwic2xhY2tJRCIsInRhcmdldHNJRCIsImRpc3RyaWJ1dGlvbkRhdGUiLCJib3QiLCJkaXN0cmlidXRlIiwiRGF0ZSIsImlzU2VudCIsInVwZGF0ZSIsIm9rIiwiYWRkIiwic3RhcnRPZiIsIkVycm9yIiwiaWxsZWdhbE9wdGlvbiIsInVzYWdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUcsV0FBRixLQUFrQkgsUUFBUSxZQUFSLENBQXhCOztBQUVBLE1BQU1JLGdCQUFnQixDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixXQUhvQixFQUlwQixhQUpvQixDQUF0Qjs7QUFPQTtBQUNBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxZQUFZTCxHQUFHTSxNQUFILENBQVUsQ0FBVixDQUFsQixDQUQ4QixDQUNDOztBQUUvQixZQUFJLE1BQU1QLEtBQUtRLFlBQWYsRUFBNkI7QUFDM0IsaUJBQU9MLFFBQVFNLEtBQVIsQ0FBY0Msa0JBQXJCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFNVixLQUFLVyxlQUFmLEVBQWdDO0FBQzlCLGlCQUFPUixRQUFRTSxLQUFSLENBQWNHLGdCQUFyQjtBQUNEOztBQUVELGNBQU1DLFNBQVMsTUFBTWxCLE9BQU9tQixNQUFQLENBQWNkLEtBQUtlLE9BQW5CLEVBQTRCVCxTQUE1QixFQUF1Q04sS0FBS2dCLFNBQTVDLENBQXJCLENBWDhCLENBVzhDO0FBQzVFLFlBQUlDLGdCQUFKO0FBQ0EsZ0JBQVFYLFNBQVI7QUFDRSxlQUFLLEtBQUw7QUFDRU4saUJBQUtrQixHQUFMLENBQVNDLFVBQVQsQ0FBb0JOLE1BQXBCO0FBQ0FBLG1CQUFPSSxnQkFBUCxHQUEwQixJQUFJRyxJQUFKLEVBQTFCO0FBQ0FQLG1CQUFPUSxNQUFQLEdBQWdCLElBQWhCO0FBQ0FSLG1CQUFPUyxNQUFQO0FBQ0EsbUJBQU81QixRQUFRNkIsRUFBUixHQUFhLHVDQUFwQjtBQUNGLGVBQUssUUFBTDtBQUNFTiwrQkFBbUJ6QixTQUFTZ0MsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLE1BQTdCLENBQW5CO0FBQ0E7QUFDRixlQUFLLFNBQUw7QUFDRVIsK0JBQW1CekIsU0FBU2dDLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixPQUE3QixDQUFuQjtBQUNBO0FBQ0YsZUFBSyxXQUFMO0FBQ0VSLCtCQUFtQnpCLFNBQVNnQyxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsU0FBN0IsQ0FBbkI7QUFDQTtBQUNGO0FBQ0Usa0JBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFqQko7QUFtQkEsZUFBUSwyREFBMEQ5QixZQUFZcUIsZ0JBQVosQ0FBOEIsR0FBaEc7QUFDRCxPQWpDRCxNQWlDTztBQUNMLGVBQU9kLFFBQVFNLEtBQVIsQ0FBY2tCLGFBQWQsQ0FBNEIxQixFQUE1QixJQUFrQyxJQUFsQyxHQUF5Q0UsUUFBUXlCLEtBQXhEO0FBQ0Q7QUFDRixLQXJDRCxNQXFDTztBQUNMLGFBQU96QixRQUFReUIsS0FBZjtBQUNEO0FBQ0YsR0EzQ0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2NoZWR1bGVTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcbmNvbnN0IHsgdG9Mb2NhbERhdGUgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1ub3cnLFxuICAnLS13ZWVrbHknLFxuICAnLS1tb250aGx5JyxcbiAgJy0tcXVhcnRlcmx5J1xuXVxuXG4vLyBpbWl0YXRlIHNoZWxsIHNjcmlwdFxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgWyQxLCAuLi5yZXN0XSkgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLXNjaGVkdWxlLXN1cnZleSddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBjb25zdCBmcmVxdWVuY3kgPSAkMS5zdWJzdHIoMikgLy8gcmVtb3ZlIHByZWZpeCBcIi0tXCJcblxuICAgICAgaWYgKGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5KSB7XG4gICAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmFjdGl2ZVN1cnZleUV4aXN0c1xuICAgICAgfVxuXG4gICAgICBpZiAoYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuYWxyZWFkeVNjaGVkdWxlZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdXJ2ZXkgPSBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW0uc2xhY2tJRCwgZnJlcXVlbmN5LCB0ZWFtLnRhcmdldHNJRCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgbGV0IGRpc3RyaWJ1dGlvbkRhdGVcbiAgICAgIHN3aXRjaCAoZnJlcXVlbmN5KSB7XG4gICAgICAgIGNhc2UgJ25vdyc6XG4gICAgICAgICAgdGVhbS5ib3QuZGlzdHJpYnV0ZShzdXJ2ZXkpXG4gICAgICAgICAgc3VydmV5LmRpc3RyaWJ1dGlvbkRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgICAgc3VydmV5LmlzU2VudCA9IHRydWVcbiAgICAgICAgICBzdXJ2ZXkudXBkYXRlKClcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5vayArICcuIFRoZSBzdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBub3cuJ1xuICAgICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ3cnKS5zdGFydE9mKCd3ZWVrJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICdNJykuc3RhcnRPZignbW9udGgnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnUScpLnN0YXJ0T2YoJ3F1YXJ0ZXInKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyZXF1ZW5jeScpXG4gICAgICB9XG4gICAgICByZXR1cm4gYC9ucHMtc2NoZWR1bGUtc3VydmV5OiBUaGUgc3VydmV5IHdpbGwgYmUgZGlzdHJpYnV0ZWQgYXQgJHt0b0xvY2FsRGF0ZShkaXN0cmlidXRpb25EYXRlKX0uYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbGxlZ2FsT3B0aW9uKCQxKSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=