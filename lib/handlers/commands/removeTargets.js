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

    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `Users below will receive NPS survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9yZW1vdmVUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwidGFyZ2V0c0lEIiwic3VidHJhY3QiLCJ0b0pTIiwidXBkYXRlIiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsR0FBRixLQUFVQyxRQUFRLFdBQVIsQ0FBaEI7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7O0FBRUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsSUFBUCxFQUFhQyxZQUFiLEVBQThCO0FBQzdDLFVBQU1DLFVBQVVMLFFBQVFLLE9BQVIsQ0FBZ0IscUJBQWhCLENBQWhCOztBQUVBLFFBQUlELGFBQWFFLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsYUFBT0QsUUFBUUUsS0FBZjtBQUNEOztBQUVELFVBQU1DLGlCQUFpQixFQUF2QjtBQUNBLFNBQUssSUFBSUMsV0FBVCxJQUF3QkwsWUFBeEIsRUFBc0M7QUFDcEM7OztBQUdBLFlBQU1NLFFBQVFELFlBQVlFLEtBQVosQ0FBa0IsNEJBQWxCLENBQWQ7QUFDQSxVQUFJRCxLQUFKLEVBQVc7QUFDVEYsdUJBQWVJLElBQWYsQ0FBb0JGLE1BQU0sQ0FBTixDQUFwQjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU9MLFFBQVFRLEtBQVIsQ0FBY0MsV0FBZCxDQUEwQkwsV0FBMUIsSUFBeUMsSUFBekMsR0FBZ0RKLFFBQVFFLEtBQS9EO0FBQ0Q7QUFDRjs7QUFFREosU0FBS1ksU0FBTCxHQUFpQmpCLElBQUlLLEtBQUtZLFNBQVQsRUFBb0JDLFFBQXBCLENBQTZCbEIsSUFBSVUsY0FBSixDQUE3QixFQUFrRFMsSUFBbEQsRUFBakIsQ0FwQjZDLENBb0I2QjtBQUMxRSxVQUFNZCxLQUFLZSxNQUFMLEVBQU47O0FBRUEsVUFBTUMsVUFBVWhCLEtBQUtZLFNBQUwsQ0FBZUssR0FBZixDQUFtQjtBQUFBLGFBQWEsS0FBSUMsUUFBUyxHQUExQjtBQUFBLEtBQW5CLENBQWhCO0FBQ0EsV0FBUSx5Q0FBd0NGLFFBQVFHLElBQVIsQ0FBYSxJQUFiLENBQW1CLEVBQW5FO0FBQ0QsR0F6QkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoicmVtb3ZlVGFyZ2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBnaXZlblRhcmdldHMpID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1yZW1vdmUtdGFyZ2V0cyddXG5cbiAgaWYgKGdpdmVuVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG5cbiAgY29uc3QgZ2l2ZW5UYXJnZXRzSUQgPSBbXVxuICBmb3IgKGxldCBnaXZlblRhcmdldCBvZiBnaXZlblRhcmdldHMpIHtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vcmVnZXgxMDEuY29tL1xuICAgICAqL1xuICAgIGNvbnN0IHBhcnNlID0gZ2l2ZW5UYXJnZXQubWF0Y2goLzxAKFtVfFddWzAtOUEtWl17OH0pXFx8Py4qPi8pXG4gICAgaWYgKHBhcnNlKSB7XG4gICAgICBnaXZlblRhcmdldHNJRC5wdXNoKHBhcnNlWzFdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbnZhbGlkVXNlcihnaXZlblRhcmdldCkgKyAnXFxuJyArIGNvbW1hbmQudXNhZ2VcbiAgICB9XG4gIH1cblxuICB0ZWFtLnRhcmdldHNJRCA9IFNldCh0ZWFtLnRhcmdldHNJRCkuc3VidHJhY3QoU2V0KGdpdmVuVGFyZ2V0c0lEKSkudG9KUygpIC8vIHJlbW92ZSBkdXBsaWNhdGVzXG4gIGF3YWl0IHRlYW0udXBkYXRlKClcblxuICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gIHJldHVybiBgVXNlcnMgYmVsb3cgd2lsbCByZWNlaXZlIE5QUyBzdXJ2ZXk6XFxuJHt0YXJnZXRzLmpvaW4oJ1xcbicpfWBcbn1cbiJdfQ==