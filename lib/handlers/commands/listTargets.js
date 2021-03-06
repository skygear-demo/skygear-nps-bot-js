'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const targets = team.targetsID.map(function (targetID) {
      return `<@${targetID}>`;
    });
    return `/nps-list-targets: Users below will receive NPS survey:\n${targets.join('\n')}`;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9saXN0VGFyZ2V0cy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsInRhcmdldHMiLCJ0YXJnZXRzSUQiLCJtYXAiLCJ0YXJnZXRJRCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsVUFBVUQsS0FBS0UsU0FBTCxDQUFlQyxHQUFmLENBQW1CO0FBQUEsYUFBYSxLQUFJQyxRQUFTLEdBQTFCO0FBQUEsS0FBbkIsQ0FBaEI7QUFDQSxXQUFRLDREQUEyREgsUUFBUUksSUFBUixDQUFhLElBQWIsQ0FBbUIsRUFBdEY7QUFDRCxHQUhEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6Imxpc3RUYXJnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3QgdGFyZ2V0cyA9IHRlYW0udGFyZ2V0c0lELm1hcCh0YXJnZXRJRCA9PiBgPEAke3RhcmdldElEfT5gKVxuICByZXR1cm4gYC9ucHMtbGlzdC10YXJnZXRzOiBVc2VycyBiZWxvdyB3aWxsIHJlY2VpdmUgTlBTIHN1cnZleTpcXG4ke3RhcmdldHMuam9pbignXFxuJyl9YFxufVxuIl19