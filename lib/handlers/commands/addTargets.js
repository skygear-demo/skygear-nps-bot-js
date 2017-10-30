'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, givenTargets) {
    const command = message.command['/nps-add-targets'];

    if (givenTargets.length === 0) {
      return command.usage;
    }

    const givenTargetsID = [];
    for (let givenTarget of givenTargets) {
      /**
       * @see https://regex101.com/
       */
      const parse = givenTarget.match(/<@([U|W][0-9A-Z]{8})\|?.*>/);
      if (parse) {
        givenTargetsID.push(parse[1]);
      } else {
        return command.error.invalidUser(givenTarget) + '\n' + command.usage;
      }
    }

    team.targetsID = team.targetsID.concat(givenTargetsID);
    team.targetsID = Set(team.targetsID).toJS(); // remove duplicates
    yield team.update();

    const scheduledSurvey = yield team.scheduledSurvey;
    if (scheduledSurvey) {
      scheduledSurvey.targetsID = team.targetsID;
      yield scheduledSurvey.update();
    }

    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `Users below will receive NPS survey:\n${targets.join('\n')}\n(changes will be effective in next survey)`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9hZGRUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwidGFyZ2V0c0lEIiwiY29uY2F0IiwidG9KUyIsInVwZGF0ZSIsInNjaGVkdWxlZFN1cnZleSIsInRhcmdldHMiLCJtYXAiLCJ0YXJnZXRJRCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLGtCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxVQUFNQyxpQkFBaUIsRUFBdkI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7O0FBRURKLFNBQUtZLFNBQUwsR0FBaUJaLEtBQUtZLFNBQUwsQ0FBZUMsTUFBZixDQUFzQlIsY0FBdEIsQ0FBakI7QUFDQUwsU0FBS1ksU0FBTCxHQUFpQmpCLElBQUlLLEtBQUtZLFNBQVQsRUFBb0JFLElBQXBCLEVBQWpCLENBckI2QyxDQXFCRDtBQUM1QyxVQUFNZCxLQUFLZSxNQUFMLEVBQU47O0FBRUEsVUFBTUMsa0JBQWtCLE1BQU1oQixLQUFLZ0IsZUFBbkM7QUFDQSxRQUFJQSxlQUFKLEVBQXFCO0FBQ25CQSxzQkFBZ0JKLFNBQWhCLEdBQTRCWixLQUFLWSxTQUFqQztBQUNBLFlBQU1JLGdCQUFnQkQsTUFBaEIsRUFBTjtBQUNEOztBQUVELFVBQU1FLFVBQVVqQixLQUFLWSxTQUFMLENBQWVNLEdBQWYsQ0FBbUI7QUFBQSxhQUFhLEtBQUlDLFFBQVMsR0FBMUI7QUFBQSxLQUFuQixDQUFoQjtBQUNBLFdBQVEseUNBQXdDRixRQUFRRyxJQUFSLENBQWEsSUFBYixDQUFtQiw4Q0FBbkU7QUFDRCxHQWhDRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJhZGRUYXJnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIGdpdmVuVGFyZ2V0cykgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLWFkZC10YXJnZXRzJ11cblxuICBpZiAoZ2l2ZW5UYXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cblxuICBjb25zdCBnaXZlblRhcmdldHNJRCA9IFtdXG4gIGZvciAobGV0IGdpdmVuVGFyZ2V0IG9mIGdpdmVuVGFyZ2V0cykge1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9yZWdleDEwMS5jb20vXG4gICAgICovXG4gICAgY29uc3QgcGFyc2UgPSBnaXZlblRhcmdldC5tYXRjaCgvPEAoW1V8V11bMC05QS1aXXs4fSlcXHw/Lio+LylcbiAgICBpZiAocGFyc2UpIHtcbiAgICAgIGdpdmVuVGFyZ2V0c0lELnB1c2gocGFyc2VbMV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmludmFsaWRVc2VyKGdpdmVuVGFyZ2V0KSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfVxuXG4gIHRlYW0udGFyZ2V0c0lEID0gdGVhbS50YXJnZXRzSUQuY29uY2F0KGdpdmVuVGFyZ2V0c0lEKVxuICB0ZWFtLnRhcmdldHNJRCA9IFNldCh0ZWFtLnRhcmdldHNJRCkudG9KUygpIC8vIHJlbW92ZSBkdXBsaWNhdGVzXG4gIGF3YWl0IHRlYW0udXBkYXRlKClcblxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgc2NoZWR1bGVkU3VydmV5LnRhcmdldHNJRCA9IHRlYW0udGFyZ2V0c0lEXG4gICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LnVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gIHJldHVybiBgVXNlcnMgYmVsb3cgd2lsbCByZWNlaXZlIE5QUyBzdXJ2ZXk6XFxuJHt0YXJnZXRzLmpvaW4oJ1xcbicpfVxcbihjaGFuZ2VzIHdpbGwgYmUgZWZmZWN0aXZlIGluIG5leHQgc3VydmV5KWBcbn1cbiJdfQ==