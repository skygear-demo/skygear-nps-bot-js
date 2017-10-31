'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('../../../modules/moment');

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
      let distributionDate;
      switch (scheduledSurvey.frequency) {
        case 'weekly':
          distributionDate = moment().add(1, 'w').startOf('week');
          break;
        case 'monthly':
          distributionDate = moment().add(1, 'M').startOf('month');
          break;
        case 'quarterly':
          distributionDate = moment().add(1, 'Q').startOf('quarter');
          break;
        default:
          throw new Error('Invalid freqency');
      }

      status.attachments[0].fields = [{
        title: 'Frequency',
        value: scheduledSurvey.frequency,
        short: true
      }, {
        title: 'Will be distributed at',
        value: `<!date^${distributionDate.unix()}^{date_num}|${distributionDate.format()}>`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0ZWFtIiwic2NoZWR1bGVkU3VydmV5IiwiYWN0aXZlU3VydmV5Iiwic3RhdHVzIiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInN0YXJ0T2YiLCJFcnJvciIsImZpZWxkcyIsInZhbHVlIiwic2hvcnQiLCJ1bml4IiwiZm9ybWF0IiwidGV4dCIsImZvb3RlciIsInN0YXRzIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsImF2ZXJhZ2VTY29yZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLHlCQUFSLENBQWY7O0FBRUFDLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsSUFBTixFQUFjO0FBQzdCLFVBQU1DLGtCQUFrQixNQUFNRCxLQUFLQyxlQUFuQztBQUNBLFVBQU1DLGVBQWUsTUFBTUYsS0FBS0UsWUFBaEM7QUFDQSxVQUFNQyxTQUFTO0FBQ2JDLG1CQUFhLENBQ1g7QUFDRUMsZUFBTyxrQkFEVDtBQUVFQyxlQUFPO0FBRlQsT0FEVyxFQUtYO0FBQ0VELGVBQU8sZUFEVDtBQUVFQyxlQUFPO0FBRlQsT0FMVztBQURBLEtBQWY7O0FBYUEsUUFBSUwsZUFBSixFQUFxQjtBQUNuQixVQUFJTSxnQkFBSjtBQUNBLGNBQVFOLGdCQUFnQk8sU0FBeEI7QUFDRSxhQUFLLFFBQUw7QUFDRUQsNkJBQW1CWCxTQUFTYSxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsTUFBN0IsQ0FBbkI7QUFDQTtBQUNGLGFBQUssU0FBTDtBQUNFSCw2QkFBbUJYLFNBQVNhLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixPQUE3QixDQUFuQjtBQUNBO0FBQ0YsYUFBSyxXQUFMO0FBQ0VILDZCQUFtQlgsU0FBU2EsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLFNBQTdCLENBQW5CO0FBQ0E7QUFDRjtBQUNFLGdCQUFNLElBQUlDLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBWEo7O0FBY0FSLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VQLGVBQU8sV0FEVDtBQUVFUSxlQUFPWixnQkFBZ0JPLFNBRnpCO0FBR0VNLGVBQU87QUFIVCxPQUQ2QixFQU03QjtBQUNFVCxlQUFPLHdCQURUO0FBRUVRLGVBQVEsVUFBU04saUJBQWlCUSxJQUFqQixFQUF3QixlQUFjUixpQkFBaUJTLE1BQWpCLEVBQTBCLEdBRm5GO0FBR0VGLGVBQU87QUFIVCxPQU42QixDQUEvQjtBQVlELEtBNUJELE1BNEJPO0FBQ0xYLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JhLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0FkLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JjLE1BQXRCLEdBQStCLDRDQUEvQjtBQUNEOztBQUVELFFBQUloQixZQUFKLEVBQWtCO0FBQ2hCLFlBQU1pQixRQUFRLE1BQU1qQixhQUFhaUIsS0FBakM7QUFDQWhCLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VQLGVBQU8sZUFEVDtBQUVFUSxlQUFRLEdBQUVNLE1BQU1DLGVBQWdCLFdBQVVELE1BQU1FLFlBQWEsS0FBSSxDQUFDRixNQUFNRyxZQUFOLEdBQXFCLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFtQyxDQUFuQyxDQUFzQyxHQUZ6RztBQUdFVCxlQUFPO0FBSFQsT0FENkIsQ0FBL0I7QUFPQSxVQUFJSyxNQUFNSyxZQUFWLEVBQXdCO0FBQ3RCckIsZUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsQ0FBNkJhLElBQTdCLENBQWtDO0FBQ2hDcEIsaUJBQU8sZUFEeUI7QUFFaENRLGlCQUFPTSxNQUFNSyxZQUFOLENBQW1CRCxPQUFuQixDQUEyQixDQUEzQixDQUZ5QjtBQUdoQ1QsaUJBQU87QUFIeUIsU0FBbEM7QUFLRDtBQUNGLEtBaEJELE1BZ0JPO0FBQ0xYLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JhLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0Q7O0FBRUQsV0FBT2QsTUFBUDtBQUNELEdBdEVEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJy4uLy4uLy4uL21vZHVsZXMvbW9tZW50JylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgY29uc3Qgc3RhdHVzID0ge1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2NoZWR1bGVkIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZlIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgbGV0IGRpc3RyaWJ1dGlvbkRhdGVcbiAgICBzd2l0Y2ggKHNjaGVkdWxlZFN1cnZleS5mcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ3cnKS5zdGFydE9mKCd3ZWVrJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICdNJykuc3RhcnRPZignbW9udGgnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncXVhcnRlcmx5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnUScpLnN0YXJ0T2YoJ3F1YXJ0ZXInKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyZXFlbmN5JylcbiAgICB9XG5cbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0ZyZXF1ZW5jeScsXG4gICAgICAgIHZhbHVlOiBzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5LFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdXaWxsIGJlIGRpc3RyaWJ1dGVkIGF0JyxcbiAgICAgICAgdmFsdWU6IGA8IWRhdGVeJHtkaXN0cmlidXRpb25EYXRlLnVuaXgoKX1ee2RhdGVfbnVtfXwke2Rpc3RyaWJ1dGlvbkRhdGUuZm9ybWF0KCl9PmAsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS50ZXh0ID0gJ05vbmUnXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZvb3RlciA9ICdZb3UgbWF5IGNyZWF0ZSBvbmUgYnkgL25wcy1zY2hlZHVsZS1zdXJ2ZXknXG4gIH1cblxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgY29uc3Qgc3RhdHMgPSBhd2FpdCBhY3RpdmVTdXJ2ZXkuc3RhdHNcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1Jlc3BvbnNlIHJhdGUnLFxuICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICAgIGlmIChzdGF0cy5hdmVyYWdlU2NvcmUpIHtcbiAgICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnQXZlcmFnZSBzY29yZScsXG4gICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS50ZXh0ID0gJ05vbmUnXG4gIH1cblxuICByZXR1cm4gc3RhdHVzXG59XG4iXX0=