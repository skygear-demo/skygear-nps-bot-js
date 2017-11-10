'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { toLocalDate } = require('../../util');

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
        value: toLocalDate(distributionDate),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsInRvTG9jYWxEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJhdHRhY2htZW50cyIsInRpdGxlIiwiY29sb3IiLCJkaXN0cmlidXRpb25EYXRlIiwiZnJlcXVlbmN5IiwiYWRkIiwic3RhcnRPZiIsIkVycm9yIiwiZmllbGRzIiwidmFsdWUiLCJzaG9ydCIsInRleHQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLFdBQUYsS0FBa0JELFFBQVEsWUFBUixDQUF4Qjs7QUFFQUUsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsa0JBQWtCLE1BQU1ELEtBQUtDLGVBQW5DO0FBQ0EsVUFBTUMsZUFBZSxNQUFNRixLQUFLRSxZQUFoQztBQUNBLFVBQU1DLFNBQVM7QUFDYkMsbUJBQWEsQ0FDWDtBQUNFQyxlQUFPLGtCQURUO0FBRUVDLGVBQU87QUFGVCxPQURXLEVBS1g7QUFDRUQsZUFBTyxlQURUO0FBRUVDLGVBQU87QUFGVCxPQUxXO0FBREEsS0FBZjs7QUFhQSxRQUFJTCxlQUFKLEVBQXFCO0FBQ25CLFVBQUlNLGdCQUFKO0FBQ0EsY0FBUU4sZ0JBQWdCTyxTQUF4QjtBQUNFLGFBQUssUUFBTDtBQUNFRCw2QkFBbUJaLFNBQVNjLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixNQUE3QixDQUFuQjtBQUNBO0FBQ0YsYUFBSyxTQUFMO0FBQ0VILDZCQUFtQlosU0FBU2MsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLE9BQTdCLENBQW5CO0FBQ0E7QUFDRixhQUFLLFdBQUw7QUFDRUgsNkJBQW1CWixTQUFTYyxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsU0FBN0IsQ0FBbkI7QUFDQTtBQUNGO0FBQ0UsZ0JBQU0sSUFBSUMsS0FBSixDQUFVLGtCQUFWLENBQU47QUFYSjs7QUFjQVIsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsR0FBK0IsQ0FDN0I7QUFDRVAsZUFBTyxXQURUO0FBRUVRLGVBQU9aLGdCQUFnQk8sU0FGekI7QUFHRU0sZUFBTztBQUhULE9BRDZCLEVBTTdCO0FBQ0VULGVBQU8sd0JBRFQ7QUFFRVEsZUFBT2hCLFlBQVlVLGdCQUFaLENBRlQ7QUFHRU8sZUFBTztBQUhULE9BTjZCLENBQS9CO0FBWUQsS0E1QkQsTUE0Qk87QUFDTFgsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlcsSUFBdEIsR0FBNkIsTUFBN0I7QUFDQVosYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlksTUFBdEIsR0FBK0IsNENBQS9CO0FBQ0Q7O0FBRUQsUUFBSWQsWUFBSixFQUFrQjtBQUNoQixZQUFNZSxRQUFRLE1BQU1mLGFBQWFlLEtBQWpDO0FBQ0FkLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VQLGVBQU8sZUFEVDtBQUVFUSxlQUFRLEdBQUVJLE1BQU1DLGVBQWdCLFdBQVVELE1BQU1FLFlBQWEsS0FBSSxDQUFDRixNQUFNRyxZQUFOLEdBQXFCLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFtQyxDQUFuQyxDQUFzQyxHQUZ6RztBQUdFUCxlQUFPO0FBSFQsT0FENkIsQ0FBL0I7QUFPQSxVQUFJRyxNQUFNSyxZQUFWLEVBQXdCO0FBQ3RCbkIsZUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsQ0FBNkJXLElBQTdCLENBQWtDO0FBQ2hDbEIsaUJBQU8sZUFEeUI7QUFFaENRLGlCQUFPSSxNQUFNSyxZQUFOLENBQW1CRCxPQUFuQixDQUEyQixDQUEzQixDQUZ5QjtBQUdoQ1AsaUJBQU87QUFIeUIsU0FBbEM7QUFLRDtBQUNGLEtBaEJELE1BZ0JPO0FBQ0xYLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JXLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0Q7O0FBRUQsV0FBT1osTUFBUDtBQUNELEdBdEVEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpXG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgY29uc3Qgc3RhdHVzID0ge1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2NoZWR1bGVkIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZlIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgbGV0IGRpc3RyaWJ1dGlvbkRhdGVcbiAgICBzd2l0Y2ggKHNjaGVkdWxlZFN1cnZleS5mcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ3cnKS5zdGFydE9mKCd3ZWVrJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICdNJykuc3RhcnRPZignbW9udGgnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncXVhcnRlcmx5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnUScpLnN0YXJ0T2YoJ3F1YXJ0ZXInKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyZXFlbmN5JylcbiAgICB9XG5cbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0ZyZXF1ZW5jeScsXG4gICAgICAgIHZhbHVlOiBzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5LFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdXaWxsIGJlIGRpc3RyaWJ1dGVkIGF0JyxcbiAgICAgICAgdmFsdWU6IHRvTG9jYWxEYXRlKGRpc3RyaWJ1dGlvbkRhdGUpLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0udGV4dCA9ICdOb25lJ1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS5mb290ZXIgPSAnWW91IG1heSBjcmVhdGUgb25lIGJ5IC9ucHMtc2NoZWR1bGUtc3VydmV5J1xuICB9XG5cbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgYWN0aXZlU3VydmV5LnN0YXRzXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdSZXNwb25zZSByYXRlJyxcbiAgICAgICAgdmFsdWU6IGAke3N0YXRzLnN1Ym1pc3Npb25Db3VudH0gb3V0IG9mICR7c3RhdHMudGFyZ2V0c0NvdW50fSwgJHsoc3RhdHMucmVzcG9uc2VSYXRlICogMTAwKS50b0ZpeGVkKDIpfSVgLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgICBpZiAoc3RhdHMuYXZlcmFnZVNjb3JlKSB7XG4gICAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0uZmllbGRzLnB1c2goe1xuICAgICAgICB0aXRsZTogJ0F2ZXJhZ2Ugc2NvcmUnLFxuICAgICAgICB2YWx1ZTogc3RhdHMuYXZlcmFnZVNjb3JlLnRvRml4ZWQoMiksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0udGV4dCA9ICdOb25lJ1xuICB9XG5cbiAgcmV0dXJuIHN0YXR1c1xufVxuIl19