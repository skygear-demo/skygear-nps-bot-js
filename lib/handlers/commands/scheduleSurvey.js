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
        return message.ok + `. The survey will be distributed at ${toLocalDate(distributionDate)}.`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlN1cnZleSIsInRvTG9jYWxEYXRlIiwiVkFMSURfT1BUSU9OUyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwiJDEiLCJyZXN0IiwiY29tbWFuZCIsImxlbmd0aCIsImluY2x1ZGVzIiwiZnJlcXVlbmN5Iiwic3Vic3RyIiwiYWN0aXZlU3VydmV5IiwiZXJyb3IiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhbHJlYWR5U2NoZWR1bGVkIiwic3VydmV5IiwiY3JlYXRlIiwic2xhY2tJRCIsInRhcmdldHNJRCIsImRpc3RyaWJ1dGlvbkRhdGUiLCJib3QiLCJkaXN0cmlidXRlIiwiRGF0ZSIsImlzU2VudCIsInVwZGF0ZSIsIm9rIiwiYWRkIiwic3RhcnRPZiIsIkVycm9yIiwiaWxsZWdhbE9wdGlvbiIsInVzYWdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNRSxTQUFTRixRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUcsV0FBRixLQUFrQkgsUUFBUSxZQUFSLENBQXhCOztBQUVBLE1BQU1JLGdCQUFnQixDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixXQUhvQixFQUlwQixhQUpvQixDQUF0Qjs7QUFPQTtBQUNBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxZQUFZTCxHQUFHTSxNQUFILENBQVUsQ0FBVixDQUFsQixDQUQ4QixDQUNDOztBQUUvQixZQUFJLE1BQU1QLEtBQUtRLFlBQWYsRUFBNkI7QUFDM0IsaUJBQU9MLFFBQVFNLEtBQVIsQ0FBY0Msa0JBQXJCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFNVixLQUFLVyxlQUFmLEVBQWdDO0FBQzlCLGlCQUFPUixRQUFRTSxLQUFSLENBQWNHLGdCQUFyQjtBQUNEOztBQUVELGNBQU1DLFNBQVMsTUFBTWxCLE9BQU9tQixNQUFQLENBQWNkLEtBQUtlLE9BQW5CLEVBQTRCVCxTQUE1QixFQUF1Q04sS0FBS2dCLFNBQTVDLENBQXJCLENBWDhCLENBVzhDO0FBQzVFLFlBQUlDLGdCQUFKO0FBQ0EsZ0JBQVFYLFNBQVI7QUFDRSxlQUFLLEtBQUw7QUFDRU4saUJBQUtrQixHQUFMLENBQVNDLFVBQVQsQ0FBb0JOLE1BQXBCO0FBQ0FBLG1CQUFPSSxnQkFBUCxHQUEwQixJQUFJRyxJQUFKLEVBQTFCO0FBQ0FQLG1CQUFPUSxNQUFQLEdBQWdCLElBQWhCO0FBQ0FSLG1CQUFPUyxNQUFQO0FBQ0EsbUJBQU81QixRQUFRNkIsRUFBUixHQUFhLHVDQUFwQjtBQUNGLGVBQUssUUFBTDtBQUNFTiwrQkFBbUJ6QixTQUFTZ0MsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLE1BQTdCLENBQW5CO0FBQ0E7QUFDRixlQUFLLFNBQUw7QUFDRVIsK0JBQW1CekIsU0FBU2dDLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixPQUE3QixDQUFuQjtBQUNBO0FBQ0YsZUFBSyxXQUFMO0FBQ0VSLCtCQUFtQnpCLFNBQVNnQyxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsU0FBN0IsQ0FBbkI7QUFDQTtBQUNGO0FBQ0Usa0JBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFqQko7QUFtQkEsZUFBT2hDLFFBQVE2QixFQUFSLEdBQWMsdUNBQXNDM0IsWUFBWXFCLGdCQUFaLENBQThCLEdBQXpGO0FBQ0QsT0FqQ0QsTUFpQ087QUFDTCxlQUFPZCxRQUFRTSxLQUFSLENBQWNrQixhQUFkLENBQTRCMUIsRUFBNUIsSUFBa0MsSUFBbEMsR0FBeUNFLFFBQVF5QixLQUF4RDtBQUNEO0FBQ0YsS0FyQ0QsTUFxQ087QUFDTCxhQUFPekIsUUFBUXlCLEtBQWY7QUFDRDtBQUNGLEdBM0NEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tbm93JyxcbiAgJy0td2Vla2x5JyxcbiAgJy0tbW9udGhseScsXG4gICctLXF1YXJ0ZXJseSdcbl1cblxuLy8gaW1pdGF0ZSBzaGVsbCBzY3JpcHRcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zY2hlZHVsZS1zdXJ2ZXknXVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgY29uc3QgZnJlcXVlbmN5ID0gJDEuc3Vic3RyKDIpIC8vIHJlbW92ZSBwcmVmaXggXCItLVwiXG5cbiAgICAgIGlmIChhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleSkge1xuICAgICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5hY3RpdmVTdXJ2ZXlFeGlzdHNcbiAgICAgIH1cblxuICAgICAgaWYgKGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmFscmVhZHlTY2hlZHVsZWRcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3VydmV5ID0gYXdhaXQgU3VydmV5LmNyZWF0ZSh0ZWFtLnNsYWNrSUQsIGZyZXF1ZW5jeSwgdGVhbS50YXJnZXRzSUQpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGxldCBkaXN0cmlidXRpb25EYXRlXG4gICAgICBzd2l0Y2ggKGZyZXF1ZW5jeSkge1xuICAgICAgICBjYXNlICdub3cnOlxuICAgICAgICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgICAgICAgIHN1cnZleS5kaXN0cmlidXRpb25EYXRlID0gbmV3IERhdGUoKVxuICAgICAgICAgIHN1cnZleS5pc1NlbnQgPSB0cnVlXG4gICAgICAgICAgc3VydmV5LnVwZGF0ZSgpXG4gICAgICAgICAgcmV0dXJuIG1lc3NhZ2Uub2sgKyAnLiBUaGUgc3VydmV5IHdpbGwgYmUgZGlzdHJpYnV0ZWQgbm93LidcbiAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICd3Jykuc3RhcnRPZignd2VlaycpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnTScpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdxdWFydGVybHknOlxuICAgICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ1EnKS5zdGFydE9mKCdxdWFydGVyJylcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmVxdWVuY3knKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1lc3NhZ2Uub2sgKyBgLiBUaGUgc3VydmV5IHdpbGwgYmUgZGlzdHJpYnV0ZWQgYXQgJHt0b0xvY2FsRGF0ZShkaXN0cmlidXRpb25EYXRlKX0uYFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbGxlZ2FsT3B0aW9uKCQxKSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=