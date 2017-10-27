'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const message = require('../../message');
const Team = require('../../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const survey = yield team.lastestSurvey;
    if (survey) {
      const silentTargetsID = Set(survey.targetsID).subtract(Set((yield survey.respondentsID)));
      const team = yield Team.of(survey.teamID);
      team.bot.sendToUsers(silentTargetsID, 'Hi! Please submit the NPS survey. We need your opinions to improve:)');
      return message.ok;
    } else {
      return 'No scheduled survey';
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zZW5kUmVtaW5kZXIuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzdXJ2ZXkiLCJsYXN0ZXN0U3VydmV5Iiwic2lsZW50VGFyZ2V0c0lEIiwidGFyZ2V0c0lEIiwic3VidHJhY3QiLCJyZXNwb25kZW50c0lEIiwib2YiLCJ0ZWFtSUQiLCJib3QiLCJzZW5kVG9Vc2VycyIsIm9rIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxTQUFTLE1BQU1ELEtBQUtFLGFBQTFCO0FBQ0EsUUFBSUQsTUFBSixFQUFZO0FBQ1YsWUFBTUUsa0JBQWtCVCxJQUFJTyxPQUFPRyxTQUFYLEVBQXNCQyxRQUF0QixDQUErQlgsS0FBSSxNQUFNTyxPQUFPSyxhQUFqQixFQUEvQixDQUF4QjtBQUNBLFlBQU1OLE9BQU8sTUFBTUgsS0FBS1UsRUFBTCxDQUFRTixPQUFPTyxNQUFmLENBQW5CO0FBQ0FSLFdBQUtTLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQlAsZUFBckIsRUFBc0Msc0VBQXRDO0FBQ0EsYUFBT1AsUUFBUWUsRUFBZjtBQUNELEtBTEQsTUFLTztBQUNMLGFBQU8scUJBQVA7QUFDRDtBQUNGLEdBVkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2VuZFJlbWluZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHN1cnZleSA9IGF3YWl0IHRlYW0ubGFzdGVzdFN1cnZleVxuICBpZiAoc3VydmV5KSB7XG4gICAgY29uc3Qgc2lsZW50VGFyZ2V0c0lEID0gU2V0KHN1cnZleS50YXJnZXRzSUQpLnN1YnRyYWN0KFNldChhd2FpdCBzdXJ2ZXkucmVzcG9uZGVudHNJRCkpXG4gICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2Yoc3VydmV5LnRlYW1JRClcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2VycyhzaWxlbnRUYXJnZXRzSUQsICdIaSEgUGxlYXNlIHN1Ym1pdCB0aGUgTlBTIHN1cnZleS4gV2UgbmVlZCB5b3VyIG9waW5pb25zIHRvIGltcHJvdmU6KScpXG4gICAgcmV0dXJuIG1lc3NhZ2Uub2tcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ05vIHNjaGVkdWxlZCBzdXJ2ZXknXG4gIH1cbn1cbiJdfQ==