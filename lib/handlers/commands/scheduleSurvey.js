'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const Survey = require('../../survey');

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
        switch (frequency) {
          case 'now':
            team.bot.distribute(survey);
            survey.isSent = true;
            survey.update();
            return message.ok + '. The survey will be distributed now';
          case 'weekly':
            return message.ok + '. The survey will be distributed at the coming week.';
          case 'monthly':
            return message.ok + '. The survey will be distributed at the coming month.';
          case 'quarterly':
            return message.ok + '. The survey will be distributed at the coming quarter.';
          default:
            throw new Error('Invalid frequency');
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsImFjdGl2ZVN1cnZleSIsImVycm9yIiwiYWN0aXZlU3VydmV5RXhpc3RzIiwic2NoZWR1bGVkU3VydmV5IiwiYWxyZWFkeVNjaGVkdWxlZCIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwib2siLCJFcnJvciIsImlsbGVnYWxPcHRpb24iLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1DLFNBQVNELFFBQVEsY0FBUixDQUFmOztBQUVBLE1BQU1FLGdCQUFnQixDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixXQUhvQixFQUlwQixhQUpvQixDQUF0Qjs7QUFPQTtBQUNBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxZQUFZTCxHQUFHTSxNQUFILENBQVUsQ0FBVixDQUFsQixDQUQ4QixDQUNDOztBQUUvQixZQUFJLE1BQU1QLEtBQUtRLFlBQWYsRUFBNkI7QUFDM0IsaUJBQU9MLFFBQVFNLEtBQVIsQ0FBY0Msa0JBQXJCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFNVixLQUFLVyxlQUFmLEVBQWdDO0FBQzlCLGlCQUFPUixRQUFRTSxLQUFSLENBQWNHLGdCQUFyQjtBQUNEOztBQUVELGNBQU1DLFNBQVMsTUFBTWpCLE9BQU9rQixNQUFQLENBQWNkLEtBQUtlLE9BQW5CLEVBQTRCVCxTQUE1QixFQUF1Q04sS0FBS2dCLFNBQTVDLENBQXJCLENBWDhCLENBVzhDO0FBQzVFLGdCQUFRVixTQUFSO0FBQ0UsZUFBSyxLQUFMO0FBQ0VOLGlCQUFLaUIsR0FBTCxDQUFTQyxVQUFULENBQW9CTCxNQUFwQjtBQUNBQSxtQkFBT00sTUFBUCxHQUFnQixJQUFoQjtBQUNBTixtQkFBT08sTUFBUDtBQUNBLG1CQUFPMUIsUUFBUTJCLEVBQVIsR0FBYSxzQ0FBcEI7QUFDRixlQUFLLFFBQUw7QUFDRSxtQkFBTzNCLFFBQVEyQixFQUFSLEdBQWEsc0RBQXBCO0FBQ0YsZUFBSyxTQUFMO0FBQ0UsbUJBQU8zQixRQUFRMkIsRUFBUixHQUFhLHVEQUFwQjtBQUNGLGVBQUssV0FBTDtBQUNFLG1CQUFPM0IsUUFBUTJCLEVBQVIsR0FBYSx5REFBcEI7QUFDRjtBQUNFLGtCQUFNLElBQUlDLEtBQUosQ0FBVSxtQkFBVixDQUFOO0FBYko7QUFlRCxPQTNCRCxNQTJCTztBQUNMLGVBQU9uQixRQUFRTSxLQUFSLENBQWNjLGFBQWQsQ0FBNEJ0QixFQUE1QixJQUFrQyxJQUFsQyxHQUF5Q0UsUUFBUXFCLEtBQXhEO0FBQ0Q7QUFDRixLQS9CRCxNQStCTztBQUNMLGFBQU9yQixRQUFRcUIsS0FBZjtBQUNEO0FBQ0YsR0FyQ0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2NoZWR1bGVTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1ub3cnLFxuICAnLS13ZWVrbHknLFxuICAnLS1tb250aGx5JyxcbiAgJy0tcXVhcnRlcmx5J1xuXVxuXG4vLyBpbWl0YXRlIHNoZWxsIHNjcmlwdFxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgWyQxLCAuLi5yZXN0XSkgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLXNjaGVkdWxlLXN1cnZleSddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBjb25zdCBmcmVxdWVuY3kgPSAkMS5zdWJzdHIoMikgLy8gcmVtb3ZlIHByZWZpeCBcIi0tXCJcblxuICAgICAgaWYgKGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5KSB7XG4gICAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmFjdGl2ZVN1cnZleUV4aXN0c1xuICAgICAgfVxuXG4gICAgICBpZiAoYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuYWxyZWFkeVNjaGVkdWxlZFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzdXJ2ZXkgPSBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW0uc2xhY2tJRCwgZnJlcXVlbmN5LCB0ZWFtLnRhcmdldHNJRCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgc3dpdGNoIChmcmVxdWVuY3kpIHtcbiAgICAgICAgY2FzZSAnbm93JzpcbiAgICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgICBzdXJ2ZXkuaXNTZW50ID0gdHJ1ZVxuICAgICAgICAgIHN1cnZleS51cGRhdGUoKVxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLm9rICsgJy4gVGhlIHN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIG5vdydcbiAgICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5vayArICcuIFRoZSBzdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBhdCB0aGUgY29taW5nIHdlZWsuJ1xuICAgICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5vayArICcuIFRoZSBzdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBhdCB0aGUgY29taW5nIG1vbnRoLidcbiAgICAgICAgY2FzZSAncXVhcnRlcmx5JzpcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5vayArICcuIFRoZSBzdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBhdCB0aGUgY29taW5nIHF1YXJ0ZXIuJ1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmVxdWVuY3knKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbGxlZ2FsT3B0aW9uKCQxKSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=