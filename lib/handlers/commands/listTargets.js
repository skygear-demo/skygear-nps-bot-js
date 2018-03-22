'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    let userCount = targets.length;
    return `/nps-list-targets: \nNPS survey will be sent to ${userCount} users below:\n${targets.join('\n')}`;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9saXN0VGFyZ2V0cy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsInRhcmdldHMiLCJ0YXJnZXRzSUQiLCJtYXAiLCJ0YXJnZXRJRCIsInVzZXJDb3VudCIsImxlbmd0aCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsVUFBVUQsS0FBS0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CO0FBQUEsYUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsS0FBbkIsQ0FBaEI7QUFDQSxRQUFJQyxZQUFZSixRQUFRSyxNQUF4QjtBQUNBLFdBQVEsbURBQWtERCxTQUFVLGtCQUFpQkosUUFBUU0sSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBeEc7QUFDRCxHQUpEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6Imxpc3RUYXJnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICBsZXQgdXNlckNvdW50ID0gdGFyZ2V0cy5sZW5ndGhcbiAgcmV0dXJuIGAvbnBzLWxpc3QtdGFyZ2V0czogXFxuTlBTIHN1cnZleSB3aWxsIGJlIHNlbnQgdG8gJHt1c2VyQ291bnR9IHVzZXJzIGJlbG93OlxcbiR7dGFyZ2V0cy5qb2luKCdcXG4nKX1gXG59XG4iXX0=