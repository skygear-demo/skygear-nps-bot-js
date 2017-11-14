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
      return `/nps-remove-targets: Nobody removed, here is the list of current targets:\n${targets.join('\n')}`;
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
    return `/nps-remove-targets: ${targetsToBeRemoved.join(', ')} removed, here is the new list effective in next survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9yZW1vdmVUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwib2xkVGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwidGFyZ2V0c0lEVG9CZVJlbW92ZWQiLCJpbnRlcnNlY3QiLCJzaXplIiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiIsInN1YnRyYWN0IiwidG9KUyIsInVwZGF0ZSIsInNjaGVkdWxlZFN1cnZleSIsInRhcmdldHNUb0JlUmVtb3ZlZCIsInRhcmdldElEVG9CZVJlbW92ZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLHFCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxRQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7QUFDREMscUJBQWlCVixJQUFJVSxjQUFKLENBQWpCLENBbkI2QyxDQW1CUjs7QUFFckMsVUFBTU8sZUFBZWpCLElBQUlLLEtBQUthLFNBQVQsQ0FBckI7QUFDQSxVQUFNQyx1QkFBdUJGLGFBQWFHLFNBQWIsQ0FBdUJWLGNBQXZCLENBQTdCLENBdEI2QyxDQXNCdUI7QUFDcEUsUUFBSVMscUJBQXFCRSxJQUFyQixLQUE4QixDQUFsQyxFQUFxQztBQUNuQyxZQUFNQyxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsZUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsT0FBbkIsQ0FBaEI7QUFDQSxhQUFRLDhFQUE2RUYsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBeEc7QUFDRDtBQUNEcEIsU0FBS2EsU0FBTCxHQUFpQkQsYUFBYVMsUUFBYixDQUFzQlAsb0JBQXRCLEVBQTRDUSxJQUE1QyxFQUFqQjtBQUNBLFVBQU10QixLQUFLdUIsTUFBTCxFQUFOOztBQUVBLFVBQU1DLGtCQUFrQixNQUFNeEIsS0FBS3dCLGVBQW5DO0FBQ0EsUUFBSUEsZUFBSixFQUFxQjtBQUNuQkEsc0JBQWdCWCxTQUFoQixHQUE0QmIsS0FBS2EsU0FBakM7QUFDQSxZQUFNVyxnQkFBZ0JELE1BQWhCLEVBQU47QUFDRDs7QUFFRCxVQUFNRSxxQkFBcUJYLHFCQUFxQkksR0FBckIsQ0FBeUI7QUFBQSxhQUF3QixLQUFJUSxtQkFBb0IsR0FBaEQ7QUFBQSxLQUF6QixDQUEzQjtBQUNBLFVBQU1ULFVBQVVqQixLQUFLYSxTQUFMLENBQWVLLEdBQWYsQ0FBbUI7QUFBQSxhQUFhLEtBQUlDLFFBQVMsR0FBMUI7QUFBQSxLQUFuQixDQUFoQjtBQUNBLFdBQVEsd0JBQXVCTSxtQkFBbUJMLElBQW5CLENBQXdCLElBQXhCLENBQThCLDZEQUE0REgsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBNUk7QUFDRCxHQXZDRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJyZW1vdmVUYXJnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIGdpdmVuVGFyZ2V0cykgPT4ge1xuICBjb25zdCBjb21tYW5kID0gbWVzc2FnZS5jb21tYW5kWycvbnBzLXJlbW92ZS10YXJnZXRzJ11cblxuICBpZiAoZ2l2ZW5UYXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cblxuICBsZXQgZ2l2ZW5UYXJnZXRzSUQgPSBbXVxuICBmb3IgKGxldCBnaXZlblRhcmdldCBvZiBnaXZlblRhcmdldHMpIHtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vcmVnZXgxMDEuY29tL1xuICAgICAqL1xuICAgIGNvbnN0IHBhcnNlID0gZ2l2ZW5UYXJnZXQubWF0Y2goLzxAKFtVfFddWzAtOUEtWl17OH0pXFx8Py4qPi8pXG4gICAgaWYgKHBhcnNlKSB7XG4gICAgICBnaXZlblRhcmdldHNJRC5wdXNoKHBhcnNlWzFdKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tbWFuZC5lcnJvci5pbnZhbGlkVXNlcihnaXZlblRhcmdldCkgKyAnXFxuJyArIGNvbW1hbmQudXNhZ2VcbiAgICB9XG4gIH1cbiAgZ2l2ZW5UYXJnZXRzSUQgPSBTZXQoZ2l2ZW5UYXJnZXRzSUQpIC8vIHJlbW92ZSBkdXBsaWNhdGVzXG5cbiAgY29uc3Qgb2xkVGFyZ2V0c0lEID0gU2V0KHRlYW0udGFyZ2V0c0lEKVxuICBjb25zdCB0YXJnZXRzSURUb0JlUmVtb3ZlZCA9IG9sZFRhcmdldHNJRC5pbnRlcnNlY3QoZ2l2ZW5UYXJnZXRzSUQpIC8vIHdoYXQgYXJlIGdpdmVuIG1heSBub3QgaW4gdGhlIGxpc3RcbiAgaWYgKHRhcmdldHNJRFRvQmVSZW1vdmVkLnNpemUgPT09IDApIHtcbiAgICBjb25zdCB0YXJnZXRzID0gdGVhbS50YXJnZXRzSUQubWFwKHRhcmdldElEID0+IGA8QCR7dGFyZ2V0SUR9PmApXG4gICAgcmV0dXJuIGAvbnBzLXJlbW92ZS10YXJnZXRzOiBOb2JvZHkgcmVtb3ZlZCwgaGVyZSBpcyB0aGUgbGlzdCBvZiBjdXJyZW50IHRhcmdldHM6XFxuJHt0YXJnZXRzLmpvaW4oJ1xcbicpfWBcbiAgfVxuICB0ZWFtLnRhcmdldHNJRCA9IG9sZFRhcmdldHNJRC5zdWJ0cmFjdCh0YXJnZXRzSURUb0JlUmVtb3ZlZCkudG9KUygpXG4gIGF3YWl0IHRlYW0udXBkYXRlKClcblxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgc2NoZWR1bGVkU3VydmV5LnRhcmdldHNJRCA9IHRlYW0udGFyZ2V0c0lEXG4gICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LnVwZGF0ZSgpXG4gIH1cblxuICBjb25zdCB0YXJnZXRzVG9CZVJlbW92ZWQgPSB0YXJnZXRzSURUb0JlUmVtb3ZlZC5tYXAodGFyZ2V0SURUb0JlUmVtb3ZlZCA9PiBgPEAke3RhcmdldElEVG9CZVJlbW92ZWR9PmApXG4gIGNvbnN0IHRhcmdldHMgPSB0ZWFtLnRhcmdldHNJRC5tYXAodGFyZ2V0SUQgPT4gYDxAJHt0YXJnZXRJRH0+YClcbiAgcmV0dXJuIGAvbnBzLXJlbW92ZS10YXJnZXRzOiAke3RhcmdldHNUb0JlUmVtb3ZlZC5qb2luKCcsICcpfSByZW1vdmVkLCBoZXJlIGlzIHRoZSBuZXcgbGlzdCBlZmZlY3RpdmUgaW4gbmV4dCBzdXJ2ZXk6XFxuJHt0YXJnZXRzLmpvaW4oJ1xcbicpfWBcbn1cbiJdfQ==