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
      return `Nobody added, here is the list of current targets:\n${targets.join('\n')}`;
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
    return `${newTargets.join(', ')} added, here is the new list effective in next survey:\n${targets.join('\n')}`;
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9hZGRUYXJnZXRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJtZXNzYWdlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJnaXZlblRhcmdldHMiLCJjb21tYW5kIiwibGVuZ3RoIiwidXNhZ2UiLCJnaXZlblRhcmdldHNJRCIsImdpdmVuVGFyZ2V0IiwicGFyc2UiLCJtYXRjaCIsInB1c2giLCJlcnJvciIsImludmFsaWRVc2VyIiwib2xkVGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwibmV3VGFyZ2V0c0lEIiwic3VidHJhY3QiLCJzaXplIiwidGFyZ2V0cyIsIm1hcCIsInRhcmdldElEIiwiam9pbiIsImNvbmNhdCIsInRvSlMiLCJ1cGRhdGUiLCJzY2hlZHVsZWRTdXJ2ZXkiLCJuZXdUYXJnZXRzIiwibmV3VGFyZ2V0SUQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsWUFBYixFQUE4QjtBQUM3QyxVQUFNQyxVQUFVTCxRQUFRSyxPQUFSLENBQWdCLGtCQUFoQixDQUFoQjs7QUFFQSxRQUFJRCxhQUFhRSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGFBQU9ELFFBQVFFLEtBQWY7QUFDRDs7QUFFRCxRQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxTQUFLLElBQUlDLFdBQVQsSUFBd0JMLFlBQXhCLEVBQXNDO0FBQ3BDOzs7QUFHQSxZQUFNTSxRQUFRRCxZQUFZRSxLQUFaLENBQWtCLDRCQUFsQixDQUFkO0FBQ0EsVUFBSUQsS0FBSixFQUFXO0FBQ1RGLHVCQUFlSSxJQUFmLENBQW9CRixNQUFNLENBQU4sQ0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPTCxRQUFRUSxLQUFSLENBQWNDLFdBQWQsQ0FBMEJMLFdBQTFCLElBQXlDLElBQXpDLEdBQWdESixRQUFRRSxLQUEvRDtBQUNEO0FBQ0Y7QUFDREMscUJBQWlCVixJQUFJVSxjQUFKLENBQWpCLENBbkI2QyxDQW1CUjs7QUFFckMsVUFBTU8sZUFBZWpCLElBQUlLLEtBQUthLFNBQVQsQ0FBckI7QUFDQSxVQUFNQyxlQUFlVCxlQUFlVSxRQUFmLENBQXdCSCxZQUF4QixDQUFyQixDQXRCNkMsQ0FzQmM7QUFDM0QsUUFBSUUsYUFBYUUsSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsZUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsT0FBbkIsQ0FBaEI7QUFDQSxhQUFRLHVEQUFzREYsUUFBUUcsSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBakY7QUFDRDtBQUNEcEIsU0FBS2EsU0FBTCxHQUFpQkQsYUFBYVMsTUFBYixDQUFvQlAsWUFBcEIsRUFBa0NRLElBQWxDLEVBQWpCO0FBQ0EsVUFBTXRCLEtBQUt1QixNQUFMLEVBQU47O0FBRUEsVUFBTUMsa0JBQWtCLE1BQU14QixLQUFLd0IsZUFBbkM7QUFDQSxRQUFJQSxlQUFKLEVBQXFCO0FBQ25CQSxzQkFBZ0JYLFNBQWhCLEdBQTRCYixLQUFLYSxTQUFqQztBQUNBLFlBQU1XLGdCQUFnQkQsTUFBaEIsRUFBTjtBQUNEOztBQUVELFVBQU1FLGFBQWFYLGFBQWFJLEdBQWIsQ0FBaUI7QUFBQSxhQUFnQixLQUFJUSxXQUFZLEdBQWhDO0FBQUEsS0FBakIsQ0FBbkI7QUFDQSxVQUFNVCxVQUFVakIsS0FBS2EsU0FBTCxDQUFlSyxHQUFmLENBQW1CO0FBQUEsYUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsS0FBbkIsQ0FBaEI7QUFDQSxXQUFRLEdBQUVNLFdBQVdMLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBc0IsMkRBQTBESCxRQUFRRyxJQUFSLENBQWEsSUFBYixDQUFtQixFQUE3RztBQUNELEdBdkNEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImFkZFRhcmdldHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFNldCB9ID0gcmVxdWlyZSgnaW1tdXRhYmxlJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgZ2l2ZW5UYXJnZXRzKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtYWRkLXRhcmdldHMnXVxuXG4gIGlmIChnaXZlblRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxuXG4gIGxldCBnaXZlblRhcmdldHNJRCA9IFtdXG4gIGZvciAobGV0IGdpdmVuVGFyZ2V0IG9mIGdpdmVuVGFyZ2V0cykge1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9yZWdleDEwMS5jb20vXG4gICAgICovXG4gICAgY29uc3QgcGFyc2UgPSBnaXZlblRhcmdldC5tYXRjaCgvPEAoW1V8V11bMC05QS1aXXs4fSlcXHw/Lio+LylcbiAgICBpZiAocGFyc2UpIHtcbiAgICAgIGdpdmVuVGFyZ2V0c0lELnB1c2gocGFyc2VbMV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLmVycm9yLmludmFsaWRVc2VyKGdpdmVuVGFyZ2V0KSArICdcXG4nICsgY29tbWFuZC51c2FnZVxuICAgIH1cbiAgfVxuICBnaXZlblRhcmdldHNJRCA9IFNldChnaXZlblRhcmdldHNJRCkgLy8gcmVtb3ZlIGR1cGxpY2F0ZXNcblxuICBjb25zdCBvbGRUYXJnZXRzSUQgPSBTZXQodGVhbS50YXJnZXRzSUQpXG4gIGNvbnN0IG5ld1RhcmdldHNJRCA9IGdpdmVuVGFyZ2V0c0lELnN1YnRyYWN0KG9sZFRhcmdldHNJRCkgLy8gd2hhdCBhcmUgZ2l2ZW4gbWF5IGJlIGFscmVhZHkgaW4gdGhlIGxpc3RcbiAgaWYgKG5ld1RhcmdldHNJRC5zaXplID09PSAwKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICAgIHJldHVybiBgTm9ib2R5IGFkZGVkLCBoZXJlIGlzIHRoZSBsaXN0IG9mIGN1cnJlbnQgdGFyZ2V0czpcXG4ke3RhcmdldHMuam9pbignXFxuJyl9YFxuICB9XG4gIHRlYW0udGFyZ2V0c0lEID0gb2xkVGFyZ2V0c0lELmNvbmNhdChuZXdUYXJnZXRzSUQpLnRvSlMoKVxuICBhd2FpdCB0ZWFtLnVwZGF0ZSgpXG5cbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgIHNjaGVkdWxlZFN1cnZleS50YXJnZXRzSUQgPSB0ZWFtLnRhcmdldHNJRFxuICAgIGF3YWl0IHNjaGVkdWxlZFN1cnZleS51cGRhdGUoKVxuICB9XG5cbiAgY29uc3QgbmV3VGFyZ2V0cyA9IG5ld1RhcmdldHNJRC5tYXAobmV3VGFyZ2V0SUQgPT4gYDxAJHtuZXdUYXJnZXRJRH0+YClcbiAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICByZXR1cm4gYCR7bmV3VGFyZ2V0cy5qb2luKCcsICcpfSBhZGRlZCwgaGVyZSBpcyB0aGUgbmV3IGxpc3QgZWZmZWN0aXZlIGluIG5leHQgc3VydmV5OlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG59XG4iXX0=