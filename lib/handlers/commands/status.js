'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const scheduledSurvey = yield team.scheduledSurvey;
    const activeSurvey = yield team.activeSurvey;
    const status = {
      attachments: [{
        title: 'Scheduled survey',
        color: 'good'
      }, {
        title: 'Active survey',
        color: 'good'
      }]
    };

    if (scheduledSurvey) {
      status.attachments[0].fields = [{
        title: 'Frequency',
        value: scheduledSurvey.frequency,
        short: true
      }, {
        title: 'Will be distributed at',
        value: 'date',
        short: true
      }];
    } else {
      status.attachments[0].text = 'None';
      status.attachments[0].footer = 'You may create one by /nps-schedule-survey';
    }

    if (activeSurvey) {
      const stats = yield activeSurvey.stats;
      status.attachments[1].fields = [{
        title: 'Response rate',
        value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
        short: true
      }];
      if (stats.averageScore) {
        status.attachments[1].fields.push({
          title: 'Average score',
          value: stats.averageScore.toFixed(2),
          short: true
        });
      }
    } else {
      status.attachments[1].text = 'None';
    }

    return status;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJhdHRhY2htZW50cyIsInRpdGxlIiwiY29sb3IiLCJmaWVsZHMiLCJ2YWx1ZSIsImZyZXF1ZW5jeSIsInNob3J0IiwidGV4dCIsImZvb3RlciIsInN0YXRzIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsImF2ZXJhZ2VTY29yZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsa0JBQWtCLE1BQU1ELEtBQUtDLGVBQW5DO0FBQ0EsVUFBTUMsZUFBZSxNQUFNRixLQUFLRSxZQUFoQztBQUNBLFVBQU1DLFNBQVM7QUFDYkMsbUJBQWEsQ0FDWDtBQUNFQyxlQUFPLGtCQURUO0FBRUVDLGVBQU87QUFGVCxPQURXLEVBS1g7QUFDRUQsZUFBTyxlQURUO0FBRUVDLGVBQU87QUFGVCxPQUxXO0FBREEsS0FBZjs7QUFhQSxRQUFJTCxlQUFKLEVBQXFCO0FBQ25CRSxhQUFPQyxXQUFQLENBQW1CLENBQW5CLEVBQXNCRyxNQUF0QixHQUErQixDQUM3QjtBQUNFRixlQUFPLFdBRFQ7QUFFRUcsZUFBT1AsZ0JBQWdCUSxTQUZ6QjtBQUdFQyxlQUFPO0FBSFQsT0FENkIsRUFNN0I7QUFDRUwsZUFBTyx3QkFEVDtBQUVFRyxlQUFPLE1BRlQ7QUFHRUUsZUFBTztBQUhULE9BTjZCLENBQS9CO0FBWUQsS0FiRCxNQWFPO0FBQ0xQLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JPLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0FSLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLDRDQUEvQjtBQUNEOztBQUVELFFBQUlWLFlBQUosRUFBa0I7QUFDaEIsWUFBTVcsUUFBUSxNQUFNWCxhQUFhVyxLQUFqQztBQUNBVixhQUFPQyxXQUFQLENBQW1CLENBQW5CLEVBQXNCRyxNQUF0QixHQUErQixDQUM3QjtBQUNFRixlQUFPLGVBRFQ7QUFFRUcsZUFBUSxHQUFFSyxNQUFNQyxlQUFnQixXQUFVRCxNQUFNRSxZQUFhLEtBQUksQ0FBQ0YsTUFBTUcsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRVAsZUFBTztBQUhULE9BRDZCLENBQS9CO0FBT0EsVUFBSUcsTUFBTUssWUFBVixFQUF3QjtBQUN0QmYsZUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQkcsTUFBdEIsQ0FBNkJZLElBQTdCLENBQWtDO0FBQ2hDZCxpQkFBTyxlQUR5QjtBQUVoQ0csaUJBQU9LLE1BQU1LLFlBQU4sQ0FBbUJELE9BQW5CLENBQTJCLENBQTNCLENBRnlCO0FBR2hDUCxpQkFBTztBQUh5QixTQUFsQztBQUtEO0FBQ0YsS0FoQkQsTUFnQk87QUFDTFAsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQk8sSUFBdEIsR0FBNkIsTUFBN0I7QUFDRDs7QUFFRCxXQUFPUixNQUFQO0FBQ0QsR0F2REQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic3RhdHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgY29uc3Qgc3RhdHVzID0ge1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2NoZWR1bGVkIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZlIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdGcmVxdWVuY3knLFxuICAgICAgICB2YWx1ZTogc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnV2lsbCBiZSBkaXN0cmlidXRlZCBhdCcsXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS50ZXh0ID0gJ05vbmUnXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZvb3RlciA9ICdZb3UgbWF5IGNyZWF0ZSBvbmUgYnkgL25wcy1zY2hlZHVsZS1zdXJ2ZXknXG4gIH1cblxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgY29uc3Qgc3RhdHMgPSBhd2FpdCBhY3RpdmVTdXJ2ZXkuc3RhdHNcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1Jlc3BvbnNlIHJhdGUnLFxuICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICAgIGlmIChzdGF0cy5hdmVyYWdlU2NvcmUpIHtcbiAgICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnQXZlcmFnZSBzY29yZScsXG4gICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS50ZXh0ID0gJ05vbmUnXG4gIH1cblxuICByZXR1cm4gc3RhdHVzXG59XG4iXX0=