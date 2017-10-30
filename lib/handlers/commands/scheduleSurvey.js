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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsImFjdGl2ZVN1cnZleSIsImVycm9yIiwiYWN0aXZlU3VydmV5RXhpc3RzIiwic2NoZWR1bGVkU3VydmV5IiwiYWxyZWFkeVNjaGVkdWxlZCIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwib2siLCJpbGxlZ2FsT3B0aW9uIiwidXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxNQUFNRSxnQkFBZ0IsQ0FDcEIsT0FEb0IsRUFFcEIsVUFGb0IsRUFHcEIsV0FIb0IsRUFJcEIsYUFKb0IsQ0FBdEI7O0FBT0E7QUFDQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWEsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBYixFQUErQjtBQUM5QyxVQUFNQyxVQUFVVCxRQUFRUyxPQUFSLENBQWdCLHNCQUFoQixDQUFoQjs7QUFFQSxRQUFJRixNQUFNQyxLQUFLRSxNQUFMLEtBQWdCLENBQTFCLEVBQTZCO0FBQzNCLFVBQUlQLGNBQWNRLFFBQWQsQ0FBdUJKLEVBQXZCLENBQUosRUFBZ0M7QUFDOUIsY0FBTUssWUFBWUwsR0FBR00sTUFBSCxDQUFVLENBQVYsQ0FBbEIsQ0FEOEIsQ0FDQzs7QUFFL0IsWUFBSSxNQUFNUCxLQUFLUSxZQUFmLEVBQTZCO0FBQzNCLGlCQUFPTCxRQUFRTSxLQUFSLENBQWNDLGtCQUFyQjtBQUNEOztBQUVELFlBQUksTUFBTVYsS0FBS1csZUFBZixFQUFnQztBQUM5QixpQkFBT1IsUUFBUU0sS0FBUixDQUFjRyxnQkFBckI7QUFDRDs7QUFFRCxjQUFNQyxTQUFTLE1BQU1qQixPQUFPa0IsTUFBUCxDQUFjZCxLQUFLZSxPQUFuQixFQUE0QlQsU0FBNUIsRUFBdUNOLEtBQUtnQixTQUE1QyxDQUFyQixDQVg4QixDQVc4QztBQUM1RSxZQUFJVixjQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCTixlQUFLaUIsR0FBTCxDQUFTQyxVQUFULENBQW9CTCxNQUFwQjtBQUNBQSxpQkFBT00sTUFBUCxHQUFnQixJQUFoQjtBQUNBTixpQkFBT08sTUFBUDtBQUNEO0FBQ0QsZUFBTzFCLFFBQVEyQixFQUFmO0FBQ0QsT0FsQkQsTUFrQk87QUFDTCxlQUFPbEIsUUFBUU0sS0FBUixDQUFjYSxhQUFkLENBQTRCckIsRUFBNUIsSUFBa0MsSUFBbEMsR0FBeUNFLFFBQVFvQixLQUF4RDtBQUNEO0FBQ0YsS0F0QkQsTUFzQk87QUFDTCxhQUFPcEIsUUFBUW9CLEtBQWY7QUFDRDtBQUNGLEdBNUJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNjaGVkdWxlU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tbm93JyxcbiAgJy0td2Vla2x5JyxcbiAgJy0tbW9udGhseScsXG4gICctLXF1YXJ0ZXJseSdcbl1cblxuLy8gaW1pdGF0ZSBzaGVsbCBzY3JpcHRcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zY2hlZHVsZS1zdXJ2ZXknXVxuXG4gIGlmICgkMSAmJiByZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgY29uc3QgZnJlcXVlbmN5ID0gJDEuc3Vic3RyKDIpIC8vIHJlbW92ZSBwcmVmaXggXCItLVwiXG5cbiAgICAgIGlmIChhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleSkge1xuICAgICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5hY3RpdmVTdXJ2ZXlFeGlzdHNcbiAgICAgIH1cblxuICAgICAgaWYgKGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmFscmVhZHlTY2hlZHVsZWRcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3VydmV5ID0gYXdhaXQgU3VydmV5LmNyZWF0ZSh0ZWFtLnNsYWNrSUQsIGZyZXF1ZW5jeSwgdGVhbS50YXJnZXRzSUQpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGlmIChmcmVxdWVuY3kgPT09ICdub3cnKSB7XG4gICAgICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgICAgICBzdXJ2ZXkuaXNTZW50ID0gdHJ1ZVxuICAgICAgICBzdXJ2ZXkudXBkYXRlKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXNzYWdlLm9rXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmlsbGVnYWxPcHRpb24oJDEpICsgJ1xcbicgKyBjb21tYW5kLnVzYWdlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cbn1cbiJdfQ==