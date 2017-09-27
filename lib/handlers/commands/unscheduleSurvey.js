'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Team = require('../../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (teamID) {
    let team = yield Team.of(teamID);
    let scheduledSurvey = yield team.scheduledSurvey;
    if (scheduledSurvey) {
      yield scheduledSurvey.delete();
      return 'Done';
    } else {
      return 'No scheduled survey, you may create one via /nps-schedule-survey.';
    }
  });

  function unscheduleSurvey(_x) {
    return _ref.apply(this, arguments);
  }

  return unscheduleSurvey;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy91bnNjaGVkdWxlU3VydmV5LmpzIl0sIm5hbWVzIjpbIlRlYW0iLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW1JRCIsInRlYW0iLCJvZiIsInNjaGVkdWxlZFN1cnZleSIsImRlbGV0ZSIsInVuc2NoZWR1bGVTdXJ2ZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxPQUFPQyxRQUFRLFlBQVIsQ0FBYjs7QUFFQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFpQ0MsTUFBakMsRUFBeUM7QUFDeEQsUUFBSUMsT0FBTyxNQUFNTCxLQUFLTSxFQUFMLENBQVFGLE1BQVIsQ0FBakI7QUFDQSxRQUFJRyxrQkFBa0IsTUFBTUYsS0FBS0UsZUFBakM7QUFDQSxRQUFJQSxlQUFKLEVBQXFCO0FBQ25CLFlBQU1BLGdCQUFnQkMsTUFBaEIsRUFBTjtBQUNBLGFBQU8sTUFBUDtBQUNELEtBSEQsTUFHTztBQUNMLGFBQU8sbUVBQVA7QUFDRDtBQUNGLEdBVEQ7O0FBQUEsV0FBZ0NDLGdCQUFoQztBQUFBO0FBQUE7O0FBQUEsU0FBZ0NBLGdCQUFoQztBQUFBIiwiZmlsZSI6InVuc2NoZWR1bGVTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgZnVuY3Rpb24gdW5zY2hlZHVsZVN1cnZleSAodGVhbUlEKSB7XG4gIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZih0ZWFtSUQpXG4gIGxldCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgYXdhaXQgc2NoZWR1bGVkU3VydmV5LmRlbGV0ZSgpXG4gICAgcmV0dXJuICdEb25lJ1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnTm8gc2NoZWR1bGVkIHN1cnZleSwgeW91IG1heSBjcmVhdGUgb25lIHZpYSAvbnBzLXNjaGVkdWxlLXN1cnZleS4nXG4gIH1cbn1cbiJdfQ==