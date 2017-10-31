'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('../../../modules/moment');
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
        let distributionDate;
        switch (frequency) {
          case 'now':
            team.bot.distribute(survey);
            survey.isSent = true;
            survey.update();
            return message.ok + '. The survey will be distributed now.';
          case 'weekly':
            distributionDate = moment().add(1, 'w').startOf('week');
            return message.ok + `. The survey will be distributed at <!date^${distributionDate.unix()}^{date_num}|${distributionDate.format()}>.`;
          case 'monthly':
            distributionDate = moment().add(1, 'M').startOf('month');
            return message.ok + `. The survey will be distributed at <!date^${distributionDate.unix()}^{date_num}|${distributionDate.format()}>.`;
          case 'quarterly':
            distributionDate = moment().add(1, 'Q').startOf('quarter');
            return message.ok + `. The survey will be distributed at <!date^${distributionDate.unix()}^{date_num}|${distributionDate.format()}>.`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtb21lbnQiLCJyZXF1aXJlIiwibWVzc2FnZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsImFjdGl2ZVN1cnZleSIsImVycm9yIiwiYWN0aXZlU3VydmV5RXhpc3RzIiwic2NoZWR1bGVkU3VydmV5IiwiYWxyZWFkeVNjaGVkdWxlZCIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJkaXN0cmlidXRpb25EYXRlIiwiYm90IiwiZGlzdHJpYnV0ZSIsImlzU2VudCIsInVwZGF0ZSIsIm9rIiwiYWRkIiwic3RhcnRPZiIsInVuaXgiLCJmb3JtYXQiLCJFcnJvciIsImlsbGVnYWxPcHRpb24iLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEseUJBQVIsQ0FBZjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLFNBQVNGLFFBQVEsY0FBUixDQUFmOztBQUVBLE1BQU1HLGdCQUFnQixDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixXQUhvQixFQUlwQixhQUpvQixDQUF0Qjs7QUFPQTtBQUNBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVSLFFBQVFRLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxZQUFZTCxHQUFHTSxNQUFILENBQVUsQ0FBVixDQUFsQixDQUQ4QixDQUNDOztBQUUvQixZQUFJLE1BQU1QLEtBQUtRLFlBQWYsRUFBNkI7QUFDM0IsaUJBQU9MLFFBQVFNLEtBQVIsQ0FBY0Msa0JBQXJCO0FBQ0Q7O0FBRUQsWUFBSSxNQUFNVixLQUFLVyxlQUFmLEVBQWdDO0FBQzlCLGlCQUFPUixRQUFRTSxLQUFSLENBQWNHLGdCQUFyQjtBQUNEOztBQUVELGNBQU1DLFNBQVMsTUFBTWpCLE9BQU9rQixNQUFQLENBQWNkLEtBQUtlLE9BQW5CLEVBQTRCVCxTQUE1QixFQUF1Q04sS0FBS2dCLFNBQTVDLENBQXJCLENBWDhCLENBVzhDO0FBQzVFLFlBQUlDLGdCQUFKO0FBQ0EsZ0JBQVFYLFNBQVI7QUFDRSxlQUFLLEtBQUw7QUFDRU4saUJBQUtrQixHQUFMLENBQVNDLFVBQVQsQ0FBb0JOLE1BQXBCO0FBQ0FBLG1CQUFPTyxNQUFQLEdBQWdCLElBQWhCO0FBQ0FQLG1CQUFPUSxNQUFQO0FBQ0EsbUJBQU8xQixRQUFRMkIsRUFBUixHQUFhLHVDQUFwQjtBQUNGLGVBQUssUUFBTDtBQUNFTCwrQkFBbUJ4QixTQUFTOEIsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLE1BQTdCLENBQW5CO0FBQ0EsbUJBQU83QixRQUFRMkIsRUFBUixHQUFjLDhDQUE2Q0wsaUJBQWlCUSxJQUFqQixFQUF3QixlQUFjUixpQkFBaUJTLE1BQWpCLEVBQTBCLElBQWxJO0FBQ0YsZUFBSyxTQUFMO0FBQ0VULCtCQUFtQnhCLFNBQVM4QixHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsT0FBN0IsQ0FBbkI7QUFDQSxtQkFBTzdCLFFBQVEyQixFQUFSLEdBQWMsOENBQTZDTCxpQkFBaUJRLElBQWpCLEVBQXdCLGVBQWNSLGlCQUFpQlMsTUFBakIsRUFBMEIsSUFBbEk7QUFDRixlQUFLLFdBQUw7QUFDRVQsK0JBQW1CeEIsU0FBUzhCLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixTQUE3QixDQUFuQjtBQUNBLG1CQUFPN0IsUUFBUTJCLEVBQVIsR0FBYyw4Q0FBNkNMLGlCQUFpQlEsSUFBakIsRUFBd0IsZUFBY1IsaUJBQWlCUyxNQUFqQixFQUEwQixJQUFsSTtBQUNGO0FBQ0Usa0JBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFoQko7QUFrQkQsT0EvQkQsTUErQk87QUFDTCxlQUFPeEIsUUFBUU0sS0FBUixDQUFjbUIsYUFBZCxDQUE0QjNCLEVBQTVCLElBQWtDLElBQWxDLEdBQXlDRSxRQUFRMEIsS0FBeEQ7QUFDRDtBQUNGLEtBbkNELE1BbUNPO0FBQ0wsYUFBTzFCLFFBQVEwQixLQUFmO0FBQ0Q7QUFDRixHQXpDRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzY2hlZHVsZVN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvbW9tZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5cbmNvbnN0IFZBTElEX09QVElPTlMgPSBbXG4gICctLW5vdycsXG4gICctLXdlZWtseScsXG4gICctLW1vbnRobHknLFxuICAnLS1xdWFydGVybHknXG5dXG5cbi8vIGltaXRhdGUgc2hlbGwgc2NyaXB0XG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtc2NoZWR1bGUtc3VydmV5J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoVkFMSURfT1BUSU9OUy5pbmNsdWRlcygkMSkpIHtcbiAgICAgIGNvbnN0IGZyZXF1ZW5jeSA9ICQxLnN1YnN0cigyKSAvLyByZW1vdmUgcHJlZml4IFwiLS1cIlxuXG4gICAgICBpZiAoYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXkpIHtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuYWN0aXZlU3VydmV5RXhpc3RzXG4gICAgICB9XG5cbiAgICAgIGlmIChhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleSkge1xuICAgICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5hbHJlYWR5U2NoZWR1bGVkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbS5zbGFja0lELCBmcmVxdWVuY3ksIHRlYW0udGFyZ2V0c0lEKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBsZXQgZGlzdHJpYnV0aW9uRGF0ZVxuICAgICAgc3dpdGNoIChmcmVxdWVuY3kpIHtcbiAgICAgICAgY2FzZSAnbm93JzpcbiAgICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgICBzdXJ2ZXkuaXNTZW50ID0gdHJ1ZVxuICAgICAgICAgIHN1cnZleS51cGRhdGUoKVxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLm9rICsgJy4gVGhlIHN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIG5vdy4nXG4gICAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAndycpLnN0YXJ0T2YoJ3dlZWsnKVxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLm9rICsgYC4gVGhlIHN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIGF0IDwhZGF0ZV4ke2Rpc3RyaWJ1dGlvbkRhdGUudW5peCgpfV57ZGF0ZV9udW19fCR7ZGlzdHJpYnV0aW9uRGF0ZS5mb3JtYXQoKX0+LmBcbiAgICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnTScpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZS5vayArIGAuIFRoZSBzdXJ2ZXkgd2lsbCBiZSBkaXN0cmlidXRlZCBhdCA8IWRhdGVeJHtkaXN0cmlidXRpb25EYXRlLnVuaXgoKX1ee2RhdGVfbnVtfXwke2Rpc3RyaWJ1dGlvbkRhdGUuZm9ybWF0KCl9Pi5gXG4gICAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnUScpLnN0YXJ0T2YoJ3F1YXJ0ZXInKVxuICAgICAgICAgIHJldHVybiBtZXNzYWdlLm9rICsgYC4gVGhlIHN1cnZleSB3aWxsIGJlIGRpc3RyaWJ1dGVkIGF0IDwhZGF0ZV4ke2Rpc3RyaWJ1dGlvbkRhdGUudW5peCgpfV57ZGF0ZV9udW19fCR7ZGlzdHJpYnV0aW9uRGF0ZS5mb3JtYXQoKX0+LmBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJlcXVlbmN5JylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuaWxsZWdhbE9wdGlvbigkMSkgKyAnXFxuJyArIGNvbW1hbmQudXNhZ2VcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxufVxuIl19