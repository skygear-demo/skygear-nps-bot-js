'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, givenTargets) {
    const command = message.command['/nps-remove-targets'];

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

    team.targetsID = Set(team.targetsID).subtract(Set(givenTargetsID)).toJS(); // remove duplicates
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9yZW1vdmVUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwidGFyZ2V0c0lEIiwic3VidHJhY3QiLCJ0b0pTIiwidXBkYXRlIiwic2NoZWR1bGVkU3VydmV5IiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsR0FBRixLQUFVQyxRQUFRLFdBQVIsQ0FBaEI7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7O0FBRUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsSUFBUCxFQUFhQyxZQUFiLEVBQThCO0FBQzdDLFVBQU1DLFVBQVVMLFFBQVFLLE9BQVIsQ0FBZ0IscUJBQWhCLENBQWhCOztBQUVBLFFBQUlELGFBQWFFLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsYUFBT0QsUUFBUUUsS0FBZjtBQUNEOztBQUVELFVBQU1DLGlCQUFpQixFQUF2QjtBQUNBLFNBQUssSUFBSUMsV0FBVCxJQUF3QkwsWUFBeEIsRUFBc0M7QUFDcEM7OztBQUdBLFlBQU1NLFFBQVFELFlBQVlFLEtBQVosQ0FBa0IsNEJBQWxCLENBQWQ7QUFDQSxVQUFJRCxLQUFKLEVBQVc7QUFDVEYsdUJBQWVJLElBQWYsQ0FBb0JGLE1BQU0sQ0FBTixDQUFwQjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU9MLFFBQVFRLEtBQVIsQ0FBY0MsV0FBZCxDQUEwQkwsV0FBMUIsSUFBeUMsSUFBekMsR0FBZ0RKLFFBQVFFLEtBQS9EO0FBQ0Q7QUFDRjs7QUFFREosU0FBS1ksU0FBTCxHQUFpQmpCLElBQUlLLEtBQUtZLFNBQVQsRUFBb0JDLFFBQXBCLENBQTZCbEIsSUFBSVUsY0FBSixDQUE3QixFQUFrRFMsSUFBbEQsRUFBakIsQ0FwQjZDLENBb0I2QjtBQUMxRSxVQUFNZCxLQUFLZSxNQUFMLEVBQU47O0FBRUEsVUFBTUMsa0JBQWtCLE1BQU1oQixLQUFLZ0IsZUFBbkM7QUFDQSxRQUFJQSxlQUFKLEVBQXFCO0FBQ25CQSxzQkFBZ0JKLFNBQWhCLEdBQTRCWixLQUFLWSxTQUFqQztBQUNBLFlBQU1JLGdCQUFnQkQsTUFBaEIsRUFBTjtBQUNEOztBQUVELFVBQU1FLFVBQVVqQixLQUFLWSxTQUFMLENBQWVNLEdBQWYsQ0FBbUI7QUFBQSxhQUFhLEtBQUlDLFFBQVMsR0FBMUI7QUFBQSxLQUFuQixDQUFoQjtBQUNBLFdBQVEseUNBQXdDRixRQUFRRyxJQUFSLENBQWEsSUFBYixDQUFtQiw4Q0FBbkU7QUFDRCxHQS9CRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJyZW1vdmVUYXJnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIGdpdmVuVGFyZ2V0cykgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLXJlbW92ZS10YXJnZXRzJ11cblxuICBpZiAoZ2l2ZW5UYXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cblxuICBjb25zdCBnaXZlblRhcmdldHNJRCA9IFtdXG4gIGZvciAobGV0IGdpdmVuVGFyZ2V0IG9mIGdpdmVuVGFyZ2V0cykge1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9yZWdleDEwMS5jb20vXG4gICAgICovXG4gICAgY29uc3QgcGFyc2UgPSBnaXZlblRhcmdldC5tYXRjaCgvPEAoW1V8V11bMC05QS1aXXs4fSlcXHw/Lio+LylcbiAgICBpZiAocGFyc2UpIHtcbiAgICAgIGdpdmVuVGFyZ2V0c0lELnB1c2gocGFyc2VbMV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmludmFsaWRVc2VyKGdpdmVuVGFyZ2V0KSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfVxuXG4gIHRlYW0udGFyZ2V0c0lEID0gU2V0KHRlYW0udGFyZ2V0c0lEKS5zdWJ0cmFjdChTZXQoZ2l2ZW5UYXJnZXRzSUQpKS50b0pTKCkgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcbiAgYXdhaXQgdGVhbS51cGRhdGUoKVxuXG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGlmIChzY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICBzY2hlZHVsZWRTdXJ2ZXkudGFyZ2V0c0lEID0gdGVhbS50YXJnZXRzSURcbiAgICBhd2FpdCBzY2hlZHVsZWRTdXJ2ZXkudXBkYXRlKClcbiAgfVxuXG4gIGNvbnN0IHRhcmdldHMgPSB0ZWFtLnRhcmdldHNJRC5tYXAodGFyZ2V0SUQgPT4gYDxAJHt0YXJnZXRJRH0+YClcbiAgcmV0dXJuIGBVc2VycyBiZWxvdyB3aWxsIHJlY2VpdmUgTlBTIHN1cnZleTpcXG4ke3RhcmdldHMuam9pbignXFxuJyl9XFxuKGNoYW5nZXMgd2lsbCBiZSBlZmZlY3RpdmUgaW4gbmV4dCBzdXJ2ZXkpYFxufVxuIl19