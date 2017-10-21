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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zY2hlZHVsZVN1cnZleS5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlN1cnZleSIsIlZBTElEX09QVElPTlMiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsIiQxIiwicmVzdCIsImNvbW1hbmQiLCJsZW5ndGgiLCJpbmNsdWRlcyIsImZyZXF1ZW5jeSIsInN1YnN0ciIsInN1cnZleSIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0YXJnZXRzSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwib2siLCJlcnJvciIsImlsbGVnYWxPcHRpb24iLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1DLFNBQVNELFFBQVEsY0FBUixDQUFmOztBQUVBLE1BQU1FLGdCQUFnQixDQUNwQixPQURvQixFQUVwQixVQUZvQixFQUdwQixXQUhvQixFQUlwQixhQUpvQixDQUF0Qjs7QUFPQTtBQUNBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0Isc0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsVUFBSVAsY0FBY1EsUUFBZCxDQUF1QkosRUFBdkIsQ0FBSixFQUFnQztBQUM5QixjQUFNSyxZQUFZTCxHQUFHTSxNQUFILENBQVUsQ0FBVixDQUFsQixDQUQ4QixDQUNDO0FBQy9CLGNBQU1DLFNBQVMsTUFBTVosT0FBT2EsTUFBUCxDQUFjVCxLQUFLVSxPQUFuQixFQUE0QkosU0FBNUIsRUFBdUNOLEtBQUtXLFNBQTVDLENBQXJCLENBRjhCLENBRThDO0FBQzVFLFlBQUlMLGNBQWMsS0FBbEIsRUFBeUI7QUFDdkJOLGVBQUtZLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkwsTUFBcEI7QUFDQUEsaUJBQU9NLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQU4saUJBQU9PLE1BQVA7QUFDRDtBQUNELGVBQU9yQixRQUFRc0IsRUFBZjtBQUNELE9BVEQsTUFTTztBQUNMLGVBQU9iLFFBQVFjLEtBQVIsQ0FBY0MsYUFBZCxDQUE0QmpCLEVBQTVCLElBQWtDLElBQWxDLEdBQXlDRSxRQUFRZ0IsS0FBeEQ7QUFDRDtBQUNGLEtBYkQsTUFhTztBQUNMLGFBQU9oQixRQUFRZ0IsS0FBZjtBQUNEO0FBQ0YsR0FuQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2NoZWR1bGVTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1ub3cnLFxuICAnLS13ZWVrbHknLFxuICAnLS1tb250aGx5JyxcbiAgJy0tcXVhcnRlcmx5J1xuXVxuXG4vLyBpbWl0YXRlIHNoZWxsIHNjcmlwdFxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgWyQxLCAuLi5yZXN0XSkgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLXNjaGVkdWxlLXN1cnZleSddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBjb25zdCBmcmVxdWVuY3kgPSAkMS5zdWJzdHIoMikgLy8gcmVtb3ZlIHByZWZpeCBcIi0tXCJcbiAgICAgIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5jcmVhdGUodGVhbS5zbGFja0lELCBmcmVxdWVuY3ksIHRlYW0udGFyZ2V0c0lEKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoZnJlcXVlbmN5ID09PSAnbm93Jykge1xuICAgICAgICB0ZWFtLmJvdC5kaXN0cmlidXRlKHN1cnZleSlcbiAgICAgICAgc3VydmV5LmlzU2VudCA9IHRydWVcbiAgICAgICAgc3VydmV5LnVwZGF0ZSgpXG4gICAgICB9XG4gICAgICByZXR1cm4gbWVzc2FnZS5va1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbGxlZ2FsT3B0aW9uKCQxKSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=