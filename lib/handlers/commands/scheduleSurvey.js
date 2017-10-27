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
        if ((yield team.scheduledSurvey) && frequency !== 'now') {
          return command.error.alreadyScheduled;
        }

        const survey = yield Survey.create(team.slackID, frequency, team.targetsID); // eslint-disable-line
        if (frequency === 'now') {
          team.bot.distribute(survey);
          survey.isSent = true;
          survey.update();
        }
        return message.ok;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsInNjaGVkdWxlZFN1cnZleSIsImVycm9yIiwiYWxyZWFkeVNjaGVkdWxlZCIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwib2siLCJpbGxlZ2FsT3B0aW9uIiwidXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxNQUFNRSxnQkFBZ0IsQ0FDcEIsT0FEb0IsRUFFcEIsVUFGb0IsRUFHcEIsV0FIb0IsRUFJcEIsYUFKb0IsQ0FBdEI7O0FBT0E7QUFDQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWEsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBYixFQUErQjtBQUM5QyxVQUFNQyxVQUFVVCxRQUFRUyxPQUFSLENBQWdCLHNCQUFoQixDQUFoQjs7QUFFQSxRQUFJRixNQUFNQyxLQUFLRSxNQUFMLEtBQWdCLENBQTFCLEVBQTZCO0FBQzNCLFVBQUlQLGNBQWNRLFFBQWQsQ0FBdUJKLEVBQXZCLENBQUosRUFBZ0M7QUFDOUIsY0FBTUssWUFBWUwsR0FBR00sTUFBSCxDQUFVLENBQVYsQ0FBbEIsQ0FEOEIsQ0FDQztBQUMvQixZQUFJLENBQUMsTUFBTVAsS0FBS1EsZUFBWixLQUFnQ0YsY0FBYyxLQUFsRCxFQUF5RDtBQUN2RCxpQkFBT0gsUUFBUU0sS0FBUixDQUFjQyxnQkFBckI7QUFDRDs7QUFFRCxjQUFNQyxTQUFTLE1BQU1mLE9BQU9nQixNQUFQLENBQWNaLEtBQUthLE9BQW5CLEVBQTRCUCxTQUE1QixFQUF1Q04sS0FBS2MsU0FBNUMsQ0FBckIsQ0FOOEIsQ0FNOEM7QUFDNUUsWUFBSVIsY0FBYyxLQUFsQixFQUF5QjtBQUN2Qk4sZUFBS2UsR0FBTCxDQUFTQyxVQUFULENBQW9CTCxNQUFwQjtBQUNBQSxpQkFBT00sTUFBUCxHQUFnQixJQUFoQjtBQUNBTixpQkFBT08sTUFBUDtBQUNEO0FBQ0QsZUFBT3hCLFFBQVF5QixFQUFmO0FBQ0QsT0FiRCxNQWFPO0FBQ0wsZUFBT2hCLFFBQVFNLEtBQVIsQ0FBY1csYUFBZCxDQUE0Qm5CLEVBQTVCLElBQWtDLElBQWxDLEdBQXlDRSxRQUFRa0IsS0FBeEQ7QUFDRDtBQUNGLEtBakJELE1BaUJPO0FBQ0wsYUFBT2xCLFFBQVFrQixLQUFmO0FBQ0Q7QUFDRixHQXZCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzY2hlZHVsZVN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5cbmNvbnN0IFZBTElEX09QVElPTlMgPSBbXG4gICctLW5vdycsXG4gICctLXdlZWtseScsXG4gICctLW1vbnRobHknLFxuICAnLS1xdWFydGVybHknXG5dXG5cbi8vIGltaXRhdGUgc2hlbGwgc2NyaXB0XG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtc2NoZWR1bGUtc3VydmV5J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoVkFMSURfT1BUSU9OUy5pbmNsdWRlcygkMSkpIHtcbiAgICAgIGNvbnN0IGZyZXF1ZW5jeSA9ICQxLnN1YnN0cigyKSAvLyByZW1vdmUgcHJlZml4IFwiLS1cIlxuICAgICAgaWYgKChhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleSkgJiYgZnJlcXVlbmN5ICE9PSAnbm93Jykge1xuICAgICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5hbHJlYWR5U2NoZWR1bGVkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbS5zbGFja0lELCBmcmVxdWVuY3ksIHRlYW0udGFyZ2V0c0lEKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoZnJlcXVlbmN5ID09PSAnbm93Jykge1xuICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgc3VydmV5LmlzU2VudCA9IHRydWVcbiAgICAgICAgc3VydmV5LnVwZGF0ZSgpXG4gICAgICB9XG4gICAgICByZXR1cm4gbWVzc2FnZS5va1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbGxlZ2FsT3B0aW9uKCQxKSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=