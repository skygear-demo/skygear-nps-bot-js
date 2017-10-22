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

    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `Users below will receive NPS survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9hZGRUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwidGFyZ2V0c0lEIiwiY29uY2F0IiwidG9KUyIsInVwZGF0ZSIsInRhcmdldHMiLCJtYXAiLCJ0YXJnZXRJRCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLGtCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxVQUFNQyxpQkFBaUIsRUFBdkI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7O0FBRURKLFNBQUtZLFNBQUwsR0FBaUJaLEtBQUtZLFNBQUwsQ0FBZUMsTUFBZixDQUFzQlIsY0FBdEIsQ0FBakI7QUFDQUwsU0FBS1ksU0FBTCxHQUFpQmpCLElBQUlLLEtBQUtZLFNBQVQsRUFBb0JFLElBQXBCLEVBQWpCLENBckI2QyxDQXFCRDtBQUM1QyxVQUFNZCxLQUFLZSxNQUFMLEVBQU47O0FBRUEsVUFBTUMsVUFBVWhCLEtBQUtZLFNBQUwsQ0FBZUssR0FBZixDQUFtQjtBQUFBLGFBQWEsS0FBSUMsUUFBUyxHQUExQjtBQUFBLEtBQW5CLENBQWhCO0FBQ0EsV0FBUSx5Q0FBd0NGLFFBQVFHLElBQVIsQ0FBYSxJQUFiLENBQW1CLEVBQW5FO0FBQ0QsR0ExQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiYWRkVGFyZ2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBnaXZlblRhcmdldHMpID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1hZGQtdGFyZ2V0cyddXG5cbiAgaWYgKGdpdmVuVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG5cbiAgY29uc3QgZ2l2ZW5UYXJnZXRzSUQgPSBbXVxuICBmb3IgKGxldCBnaXZlblRhcmdldCBvZiBnaXZlblRhcmdldHMpIHtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vcmVnZXgxMDEuY29tL1xuICAgICAqL1xuICAgIGNvbnN0IHBhcnNlID0gZ2l2ZW5UYXJnZXQubWF0Y2goLzxAKFtVfFddWzAtOUEtWl17OH0pXFx8Py4qPi8pXG4gICAgaWYgKHBhcnNlKSB7XG4gICAgICBnaXZlblRhcmdldHNJRC5wdXNoKHBhcnNlWzFdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbnZhbGlkVXNlcihnaXZlblRhcmdldCkgKyAnXFxuJyArIGNvbW1hbmQudXNhZ2VcbiAgICB9XG4gIH1cblxuICB0ZWFtLnRhcmdldHNJRCA9IHRlYW0udGFyZ2V0c0lELmNvbmNhdChnaXZlblRhcmdldHNJRClcbiAgdGVhbS50YXJnZXRzSUQgPSBTZXQodGVhbS50YXJnZXRzSUQpLnRvSlMoKSAvLyByZW1vdmUgZHVwbGljYXRlc1xuICBhd2FpdCB0ZWFtLnVwZGF0ZSgpXG5cbiAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICByZXR1cm4gYFVzZXJzIGJlbG93IHdpbGwgcmVjZWl2ZSBOUFMgc3VydmV5OlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG59XG4iXX0=