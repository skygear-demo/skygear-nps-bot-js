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

    let givenTargetsID = [];
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
    givenTargetsID = Set(givenTargetsID); // remove duplicates

    const oldTargetsID = Set(team.targetsID);
    const newTargetsID = givenTargetsID.subtract(oldTargetsID); // what are given may be already in the list
    if (newTargetsID.size === 0) {
      const targets = team.targetsID.map(function (targetID) {
        return `<@${targetID}>`;
      });
      return `/nps-add-targets: Nobody added, here is the list of current targets:\n${targets.join('\n')}`;
    }
    team.targetsID = oldTargetsID.concat(newTargetsID).toJS();
    yield team.update();

    const scheduledSurvey = yield team.scheduledSurvey;
    if (scheduledSurvey) {
      scheduledSurvey.targetsID = team.targetsID;
      yield scheduledSurvey.update();
    }

    const newTargets = newTargetsID.map(function (newTargetID) {
      return `<@${newTargetID}>`;
    });
    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `/nps-add-targets: ${newTargets.join(', ')} added, here is the new list effective in next survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9hZGRUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwib2xkVGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwibmV3VGFyZ2V0c0lEIiwic3VidHJhY3QiLCJzaXplIiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiIsImNvbmNhdCIsInRvSlMiLCJ1cGRhdGUiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJuZXdUYXJnZXRzIiwibmV3VGFyZ2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLGtCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxRQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7QUFDREMscUJBQWlCVixJQUFJVSxjQUFKLENBQWpCLENBbkI2QyxDQW1CUjs7QUFFckMsVUFBTU8sZUFBZWpCLElBQUlLLEtBQUthLFNBQVQsQ0FBckI7QUFDQSxVQUFNQyxlQUFlVCxlQUFlVSxRQUFmLENBQXdCSCxZQUF4QixDQUFyQixDQXRCNkMsQ0FzQmM7QUFDM0QsUUFBSUUsYUFBYUUsSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsZUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsT0FBbkIsQ0FBaEI7QUFDQSxhQUFRLHlFQUF3RUYsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBbkc7QUFDRDtBQUNEcEIsU0FBS2EsU0FBTCxHQUFpQkQsYUFBYVMsTUFBYixDQUFvQlAsWUFBcEIsRUFBa0NRLElBQWxDLEVBQWpCO0FBQ0EsVUFBTXRCLEtBQUt1QixNQUFMLEVBQU47O0FBRUEsVUFBTUMsa0JBQWtCLE1BQU14QixLQUFLd0IsZUFBbkM7QUFDQSxRQUFJQSxlQUFKLEVBQXFCO0FBQ25CQSxzQkFBZ0JYLFNBQWhCLEdBQTRCYixLQUFLYSxTQUFqQztBQUNBLFlBQU1XLGdCQUFnQkQsTUFBaEIsRUFBTjtBQUNEOztBQUVELFVBQU1FLGFBQWFYLGFBQWFJLEdBQWIsQ0FBaUI7QUFBQSxhQUFnQixLQUFJUSxXQUFZLEdBQWhDO0FBQUEsS0FBakIsQ0FBbkI7QUFDQSxVQUFNVCxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsYUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsS0FBbkIsQ0FBaEI7QUFDQSxXQUFRLHFCQUFvQk0sV0FBV0wsSUFBWCxDQUFnQixJQUFoQixDQUFzQiwyREFBMERILFFBQVFHLElBQVIsQ0FBYSxJQUFiLENBQW1CLEVBQS9IO0FBQ0QsR0F2Q0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiYWRkVGFyZ2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBnaXZlblRhcmdldHMpID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1hZGQtdGFyZ2V0cyddXG5cbiAgaWYgKGdpdmVuVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG5cbiAgbGV0IGdpdmVuVGFyZ2V0c0lEID0gW11cbiAgZm9yIChsZXQgZ2l2ZW5UYXJnZXQgb2YgZ2l2ZW5UYXJnZXRzKSB7XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL3JlZ2V4MTAxLmNvbS9cbiAgICAgKi9cbiAgICBjb25zdCBwYXJzZSA9IGdpdmVuVGFyZ2V0Lm1hdGNoKC88QChbVXxXXVswLTlBLVpdezh9KVxcfD8uKj4vKVxuICAgIGlmIChwYXJzZSkge1xuICAgICAgZ2l2ZW5UYXJnZXRzSUQucHVzaChwYXJzZVsxXSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuaW52YWxpZFVzZXIoZ2l2ZW5UYXJnZXQpICsgJ1xcbicgKyBjb21tYW5kLnVzYWdlXG4gICAgfVxuICB9XG4gIGdpdmVuVGFyZ2V0c0lEID0gU2V0KGdpdmVuVGFyZ2V0c0lEKSAvLyByZW1vdmUgZHVwbGljYXRlc1xuXG4gIGNvbnN0IG9sZFRhcmdldHNJRCA9IFNldCh0ZWFtLnRhcmdldHNJRClcbiAgY29uc3QgbmV3VGFyZ2V0c0lEID0gZ2l2ZW5UYXJnZXRzSUQuc3VidHJhY3Qob2xkVGFyZ2V0c0lEKSAvLyB3aGF0IGFyZSBnaXZlbiBtYXkgYmUgYWxyZWFkeSBpbiB0aGUgbGlzdFxuICBpZiAobmV3VGFyZ2V0c0lELnNpemUgPT09IDApIHtcbiAgICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gICAgcmV0dXJuIGAvbnBzLWFkZC10YXJnZXRzOiBOb2JvZHkgYWRkZWQsIGhlcmUgaXMgdGhlIGxpc3Qgb2YgY3VycmVudCB0YXJnZXRzOlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG4gIH1cbiAgdGVhbS50YXJnZXRzSUQgPSBvbGRUYXJnZXRzSUQuY29uY2F0KG5ld1RhcmdldHNJRCkudG9KUygpXG4gIGF3YWl0IHRlYW0udXBkYXRlKClcblxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgc2NoZWR1bGVkU3VydmV5LnRhcmdldHNJRCA9IHRlYW0udGFyZ2V0c0lEXG4gICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LnVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCBuZXdUYXJnZXRzID0gbmV3VGFyZ2V0c0lELm1hcChuZXdUYXJnZXRJRCA9PiBgPEAke25ld1RhcmdldElEfT5gKVxuICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gIHJldHVybiBgL25wcy1hZGQtdGFyZ2V0czogJHtuZXdUYXJnZXRzLmpvaW4oJywgJyl9IGFkZGVkLCBoZXJlIGlzIHRoZSBuZXcgbGlzdCBlZmZlY3RpdmUgaW4gbmV4dCBzdXJ2ZXk6XFxuJHt0YXJnZXRzLmpvaW4oJ1xcbicpfWBcbn1cbiJdfQ==