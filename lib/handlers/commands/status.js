'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const { toLocalDate } = require('../../util');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const scheduledSurvey = yield team.scheduledSurvey;
    const activeSurvey = yield team.activeSurvey;
    const status = {
      text: '/nps-status:',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsInRvTG9jYWxEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInN0YXJ0T2YiLCJFcnJvciIsImZpZWxkcyIsInZhbHVlIiwic2hvcnQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLFdBQUYsS0FBa0JELFFBQVEsWUFBUixDQUF4Qjs7QUFFQUUsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsa0JBQWtCLE1BQU1ELEtBQUtDLGVBQW5DO0FBQ0EsVUFBTUMsZUFBZSxNQUFNRixLQUFLRSxZQUFoQztBQUNBLFVBQU1DLFNBQVM7QUFDYkMsWUFBTSxjQURPO0FBRWJDLG1CQUFhLENBQ1g7QUFDRUMsZUFBTyxrQkFEVDtBQUVFQyxlQUFPO0FBRlQsT0FEVyxFQUtYO0FBQ0VELGVBQU8sZUFEVDtBQUVFQyxlQUFPO0FBRlQsT0FMVztBQUZBLEtBQWY7O0FBY0EsUUFBSU4sZUFBSixFQUFxQjtBQUNuQixVQUFJTyxnQkFBSjtBQUNBLGNBQVFQLGdCQUFnQlEsU0FBeEI7QUFDRSxhQUFLLFFBQUw7QUFDRUQsNkJBQW1CYixTQUFTZSxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsTUFBN0IsQ0FBbkI7QUFDQTtBQUNGLGFBQUssU0FBTDtBQUNFSCw2QkFBbUJiLFNBQVNlLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixPQUE3QixDQUFuQjtBQUNBO0FBQ0YsYUFBSyxXQUFMO0FBQ0VILDZCQUFtQmIsU0FBU2UsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLFNBQTdCLENBQW5CO0FBQ0E7QUFDRjtBQUNFLGdCQUFNLElBQUlDLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBWEo7O0FBY0FULGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VQLGVBQU8sV0FEVDtBQUVFUSxlQUFPYixnQkFBZ0JRLFNBRnpCO0FBR0VNLGVBQU87QUFIVCxPQUQ2QixFQU03QjtBQUNFVCxlQUFPLHdCQURUO0FBRUVRLGVBQU9qQixZQUFZVyxnQkFBWixDQUZUO0FBR0VPLGVBQU87QUFIVCxPQU42QixDQUEvQjtBQVlELEtBNUJELE1BNEJPO0FBQ0xaLGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JELElBQXRCLEdBQTZCLE1BQTdCO0FBQ0FELGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JXLE1BQXRCLEdBQStCLDRDQUEvQjtBQUNEOztBQUVELFFBQUlkLFlBQUosRUFBa0I7QUFDaEIsWUFBTWUsUUFBUSxNQUFNZixhQUFhZSxLQUFqQztBQUNBZCxhQUFPRSxXQUFQLENBQW1CLENBQW5CLEVBQXNCUSxNQUF0QixHQUErQixDQUM3QjtBQUNFUCxlQUFPLGVBRFQ7QUFFRVEsZUFBUSxHQUFFRyxNQUFNQyxlQUFnQixXQUFVRCxNQUFNRSxZQUFhLEtBQUksQ0FBQ0YsTUFBTUcsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRU4sZUFBTztBQUhULE9BRDZCLENBQS9CO0FBT0EsVUFBSUUsTUFBTUssWUFBVixFQUF3QjtBQUN0Qm5CLGVBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLENBQTZCVSxJQUE3QixDQUFrQztBQUNoQ2pCLGlCQUFPLGVBRHlCO0FBRWhDUSxpQkFBT0csTUFBTUssWUFBTixDQUFtQkQsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FGeUI7QUFHaENOLGlCQUFPO0FBSHlCLFNBQWxDO0FBS0Q7QUFDRixLQWhCRCxNQWdCTztBQUNMWixhQUFPRSxXQUFQLENBQW1CLENBQW5CLEVBQXNCRCxJQUF0QixHQUE2QixNQUE3QjtBQUNEOztBQUVELFdBQU9ELE1BQVA7QUFDRCxHQXZFRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgeyB0b0xvY2FsRGF0ZSB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gIGNvbnN0IHN0YXR1cyA9IHtcbiAgICB0ZXh0OiAnL25wcy1zdGF0dXM6JyxcbiAgICBhdHRhY2htZW50czogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1NjaGVkdWxlZCBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0FjdGl2ZSBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9XG4gICAgXVxuICB9XG5cbiAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgIGxldCBkaXN0cmlidXRpb25EYXRlXG4gICAgc3dpdGNoIChzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICd3Jykuc3RhcnRPZignd2VlaycpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnTScpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ1EnKS5zdGFydE9mKCdxdWFydGVyJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmVxZW5jeScpXG4gICAgfVxuXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdGcmVxdWVuY3knLFxuICAgICAgICB2YWx1ZTogc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnV2lsbCBiZSBkaXN0cmlidXRlZCBhdCcsXG4gICAgICAgIHZhbHVlOiB0b0xvY2FsRGF0ZShkaXN0cmlidXRpb25EYXRlKSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLnRleHQgPSAnTm9uZSdcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0uZm9vdGVyID0gJ1lvdSBtYXkgY3JlYXRlIG9uZSBieSAvbnBzLXNjaGVkdWxlLXN1cnZleSdcbiAgfVxuXG4gIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICBjb25zdCBzdGF0cyA9IGF3YWl0IGFjdGl2ZVN1cnZleS5zdGF0c1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgIHZhbHVlOiBgJHtzdGF0cy5zdWJtaXNzaW9uQ291bnR9IG91dCBvZiAke3N0YXRzLnRhcmdldHNDb3VudH0sICR7KHN0YXRzLnJlc3BvbnNlUmF0ZSAqIDEwMCkudG9GaXhlZCgyKX0lYCxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gICAgaWYgKHN0YXRzLmF2ZXJhZ2VTY29yZSkge1xuICAgICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLmZpZWxkcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgdmFsdWU6IHN0YXRzLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLnRleHQgPSAnTm9uZSdcbiAgfVxuXG4gIHJldHVybiBzdGF0dXNcbn1cbiJdfQ==