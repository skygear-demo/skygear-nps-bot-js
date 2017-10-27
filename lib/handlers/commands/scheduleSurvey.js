'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const Survey = require('../../survey');

const VALID_OPTIONS = ['--now', '--weekly', '--monthly', '--quarterly'];

// imitate shell script
module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, [$1, ...rest]) {
    const command = message.command['/nps-schedule-survey'];

    if (yield team.hasScheduledSurvey) {
      return command.error.alreadyScheduled;
    }

    if ($1 && rest.length === 0) {
      if (VALID_OPTIONS.includes($1)) {
        const frequency = $1.substr(2); // remove prefix "--"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJoYXNTY2hlZHVsZWRTdXJ2ZXkiLCJlcnJvciIsImFscmVhZHlTY2hlZHVsZWQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwib2siLCJpbGxlZ2FsT3B0aW9uIiwidXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxNQUFNRSxnQkFBZ0IsQ0FDcEIsT0FEb0IsRUFFcEIsVUFGb0IsRUFHcEIsV0FIb0IsRUFJcEIsYUFKb0IsQ0FBdEI7O0FBT0E7QUFDQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWEsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBYixFQUErQjtBQUM5QyxVQUFNQyxVQUFVVCxRQUFRUyxPQUFSLENBQWdCLHNCQUFoQixDQUFoQjs7QUFFQSxRQUFJLE1BQU1ILEtBQUtJLGtCQUFmLEVBQW1DO0FBQ2pDLGFBQU9ELFFBQVFFLEtBQVIsQ0FBY0MsZ0JBQXJCO0FBQ0Q7O0FBRUQsUUFBSUwsTUFBTUMsS0FBS0ssTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixVQUFJVixjQUFjVyxRQUFkLENBQXVCUCxFQUF2QixDQUFKLEVBQWdDO0FBQzlCLGNBQU1RLFlBQVlSLEdBQUdTLE1BQUgsQ0FBVSxDQUFWLENBQWxCLENBRDhCLENBQ0M7QUFDL0IsY0FBTUMsU0FBUyxNQUFNZixPQUFPZ0IsTUFBUCxDQUFjWixLQUFLYSxPQUFuQixFQUE0QkosU0FBNUIsRUFBdUNULEtBQUtjLFNBQTVDLENBQXJCLENBRjhCLENBRThDO0FBQzVFLFlBQUlMLGNBQWMsS0FBbEIsRUFBeUI7QUFDdkJULGVBQUtlLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkwsTUFBcEI7QUFDQUEsaUJBQU9NLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQU4saUJBQU9PLE1BQVA7QUFDRDtBQUNELGVBQU94QixRQUFReUIsRUFBZjtBQUNELE9BVEQsTUFTTztBQUNMLGVBQU9oQixRQUFRRSxLQUFSLENBQWNlLGFBQWQsQ0FBNEJuQixFQUE1QixJQUFrQyxJQUFsQyxHQUF5Q0UsUUFBUWtCLEtBQXhEO0FBQ0Q7QUFDRixLQWJELE1BYU87QUFDTCxhQUFPbEIsUUFBUWtCLEtBQWY7QUFDRDtBQUNGLEdBdkJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tbm93JyxcbiAgJy0td2Vla2x5JyxcbiAgJy0tbW9udGhseScsXG4gICctLXF1YXJ0ZXJseSdcbl1cblxuLy8gaW1pdGF0ZSBzaGVsbCBzY3JpcHRcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zY2hlZHVsZS1zdXJ2ZXknXVxuXG4gIGlmIChhd2FpdCB0ZWFtLmhhc1NjaGVkdWxlZFN1cnZleSkge1xuICAgIHJldHVybiBjb21tYW5kLmVycm9yLmFscmVhZHlTY2hlZHVsZWRcbiAgfVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgY29uc3QgZnJlcXVlbmN5ID0gJDEuc3Vic3RyKDIpIC8vIHJlbW92ZSBwcmVmaXggXCItLVwiXG4gICAgICBjb25zdCBzdXJ2ZXkgPSBhd2FpdCBTdXJ2ZXkuY3JlYXRlKHRlYW0uc2xhY2tJRCwgZnJlcXVlbmN5LCB0ZWFtLnRhcmdldHNJRCkgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgaWYgKGZyZXF1ZW5jeSA9PT0gJ25vdycpIHtcbiAgICAgICAgdGVhbS5ib3QuZGlzdHJpYnV0ZShzdXJ2ZXkpXG4gICAgICAgIHN1cnZleS5pc1NlbnQgPSB0cnVlXG4gICAgICAgIHN1cnZleS51cGRhdGUoKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1lc3NhZ2Uub2tcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuaWxsZWdhbE9wdGlvbigkMSkgKyAnXFxuJyArIGNvbW1hbmQudXNhZ2VcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxufVxuIl19