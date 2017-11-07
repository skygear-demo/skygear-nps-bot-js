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
    const targetsIDToBeRemoved = oldTargetsID.intersect(givenTargetsID); // what are given may not in the list
    if (targetsIDToBeRemoved.size === 0) {
      const targets = team.targetsID.map(function (targetID) {
        return `<@${targetID}>`;
      });
      return `Nobody removed, here is the list of current targets:\n${targets.join('\n')}`;
    }
    team.targetsID = oldTargetsID.subtract(targetsIDToBeRemoved).toJS();
    yield team.update();

    const scheduledSurvey = yield team.scheduledSurvey;
    if (scheduledSurvey) {
      scheduledSurvey.targetsID = team.targetsID;
      yield scheduledSurvey.update();
    }

    const targetsToBeRemoved = targetsIDToBeRemoved.map(function (targetIDToBeRemoved) {
      return `<@${targetIDToBeRemoved}>`;
    });
    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `${targetsToBeRemoved.join(', ')} removed, here is the new list effective in next survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9yZW1vdmVUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwib2xkVGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwidGFyZ2V0c0lEVG9CZVJlbW92ZWQiLCJpbnRlcnNlY3QiLCJzaXplIiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiIsInN1YnRyYWN0IiwidG9KUyIsInVwZGF0ZSIsInNjaGVkdWxlZFN1cnZleSIsInRhcmdldHNUb0JlUmVtb3ZlZCIsInRhcmdldElEVG9CZVJlbW92ZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLHFCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxRQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7QUFDREMscUJBQWlCVixJQUFJVSxjQUFKLENBQWpCLENBbkI2QyxDQW1CUjs7QUFFckMsVUFBTU8sZUFBZWpCLElBQUlLLEtBQUthLFNBQVQsQ0FBckI7QUFDQSxVQUFNQyx1QkFBdUJGLGFBQWFHLFNBQWIsQ0FBdUJWLGNBQXZCLENBQTdCLENBdEI2QyxDQXNCdUI7QUFDcEUsUUFBSVMscUJBQXFCRSxJQUFyQixLQUE4QixDQUFsQyxFQUFxQztBQUNuQyxZQUFNQyxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsZUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsT0FBbkIsQ0FBaEI7QUFDQSxhQUFRLHlEQUF3REYsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBbkY7QUFDRDtBQUNEcEIsU0FBS2EsU0FBTCxHQUFpQkQsYUFBYVMsUUFBYixDQUFzQlAsb0JBQXRCLEVBQTRDUSxJQUE1QyxFQUFqQjtBQUNBLFVBQU10QixLQUFLdUIsTUFBTCxFQUFOOztBQUVBLFVBQU1DLGtCQUFrQixNQUFNeEIsS0FBS3dCLGVBQW5DO0FBQ0EsUUFBSUEsZUFBSixFQUFxQjtBQUNuQkEsc0JBQWdCWCxTQUFoQixHQUE0QmIsS0FBS2EsU0FBakM7QUFDQSxZQUFNVyxnQkFBZ0JELE1BQWhCLEVBQU47QUFDRDs7QUFFRCxVQUFNRSxxQkFBcUJYLHFCQUFxQkksR0FBckIsQ0FBeUI7QUFBQSxhQUF3QixLQUFJUSxtQkFBb0IsR0FBaEQ7QUFBQSxLQUF6QixDQUEzQjtBQUNBLFVBQU1ULFVBQVVqQixLQUFLYSxTQUFMLENBQWVLLEdBQWYsQ0FBbUI7QUFBQSxhQUFhLEtBQUlDLFFBQVMsR0FBMUI7QUFBQSxLQUFuQixDQUFoQjtBQUNBLFdBQVEsR0FBRU0sbUJBQW1CTCxJQUFuQixDQUF3QixJQUF4QixDQUE4Qiw2REFBNERILFFBQVFHLElBQVIsQ0FBYSxJQUFiLENBQW1CLEVBQXZIO0FBQ0QsR0F2Q0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoicmVtb3ZlVGFyZ2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBnaXZlblRhcmdldHMpID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1yZW1vdmUtdGFyZ2V0cyddXG5cbiAgaWYgKGdpdmVuVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG5cbiAgbGV0IGdpdmVuVGFyZ2V0c0lEID0gW11cbiAgZm9yIChsZXQgZ2l2ZW5UYXJnZXQgb2YgZ2l2ZW5UYXJnZXRzKSB7XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL3JlZ2V4MTAxLmNvbS9cbiAgICAgKi9cbiAgICBjb25zdCBwYXJzZSA9IGdpdmVuVGFyZ2V0Lm1hdGNoKC88QChbVXxXXVswLTlBLVpdezh9KVxcfD8uKj4vKVxuICAgIGlmIChwYXJzZSkge1xuICAgICAgZ2l2ZW5UYXJnZXRzSUQucHVzaChwYXJzZVsxXSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQuZXJyb3IuaW52YWxpZFVzZXIoZ2l2ZW5UYXJnZXQpICsgJ1xcbicgKyBjb21tYW5kLnVzYWdlXG4gICAgfVxuICB9XG4gIGdpdmVuVGFyZ2V0c0lEID0gU2V0KGdpdmVuVGFyZ2V0c0lEKSAvLyByZW1vdmUgZHVwbGljYXRlc1xuXG4gIGNvbnN0IG9sZFRhcmdldHNJRCA9IFNldCh0ZWFtLnRhcmdldHNJRClcbiAgY29uc3QgdGFyZ2V0c0lEVG9CZVJlbW92ZWQgPSBvbGRUYXJnZXRzSUQuaW50ZXJzZWN0KGdpdmVuVGFyZ2V0c0lEKSAvLyB3aGF0IGFyZSBnaXZlbiBtYXkgbm90IGluIHRoZSBsaXN0XG4gIGlmICh0YXJnZXRzSURUb0JlUmVtb3ZlZC5zaXplID09PSAwKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICAgIHJldHVybiBgTm9ib2R5IHJlbW92ZWQsIGhlcmUgaXMgdGhlIGxpc3Qgb2YgY3VycmVudCB0YXJnZXRzOlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG4gIH1cbiAgdGVhbS50YXJnZXRzSUQgPSBvbGRUYXJnZXRzSUQuc3VidHJhY3QodGFyZ2V0c0lEVG9CZVJlbW92ZWQpLnRvSlMoKVxuICBhd2FpdCB0ZWFtLnVwZGF0ZSgpXG5cbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgIHNjaGVkdWxlZFN1cnZleS50YXJnZXRzSUQgPSB0ZWFtLnRhcmdldHNJRFxuICAgIGF3YWl0IHNjaGVkdWxlZFN1cnZleS51cGRhdGUoKVxuICB9XG5cbiAgY29uc3QgdGFyZ2V0c1RvQmVSZW1vdmVkID0gdGFyZ2V0c0lEVG9CZVJlbW92ZWQubWFwKHRhcmdldElEVG9CZVJlbW92ZWQgPT4gYDxAJHt0YXJnZXRJRFRvQmVSZW1vdmVkfT5gKVxuICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gIHJldHVybiBgJHt0YXJnZXRzVG9CZVJlbW92ZWQuam9pbignLCAnKX0gcmVtb3ZlZCwgaGVyZSBpcyB0aGUgbmV3IGxpc3QgZWZmZWN0aXZlIGluIG5leHQgc3VydmV5OlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG59XG4iXX0=