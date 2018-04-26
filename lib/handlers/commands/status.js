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
      }, {
        title: 'NPS Score',
        color: 'good'
      }, {
        title: 'NPS Result',
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
      if (stats.npsScore) {
        status.attachments[2].fields = [{
          title: 'Score  (-100 to 100)',
          value: `${stats.npsScore.toFixed(2)} ${stats.npsRating}`,
          short: true
        }, {
          title: 'Total submissions',
          value: stats.submissionCount,
          short: true
        }];
      }

      if (stats.npsMessage) {
        status.attachments[3].fields = [{
          title: 'What does my NPS score mean?',
          value: stats.npsMessage
        }];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsInRvTG9jYWxEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInN0YXJ0T2YiLCJFcnJvciIsImZpZWxkcyIsInZhbHVlIiwic2hvcnQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiLCJwdXNoIiwibnBzU2NvcmUiLCJucHNSYXRpbmciLCJucHNNZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxRQUFSLENBQWY7QUFDQSxNQUFNLEVBQUVDLFdBQUYsS0FBa0JELFFBQVEsWUFBUixDQUF4Qjs7QUFFQUUsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsa0JBQWtCLE1BQU1ELEtBQUtDLGVBQW5DO0FBQ0EsVUFBTUMsZUFBZSxNQUFNRixLQUFLRSxZQUFoQztBQUNBLFVBQU1DLFNBQVM7QUFDYkMsWUFBTSxjQURPO0FBRWJDLG1CQUFhLENBQ1g7QUFDRUMsZUFBTyxrQkFEVDtBQUVFQyxlQUFPO0FBRlQsT0FEVyxFQUtYO0FBQ0VELGVBQU8sZUFEVDtBQUVFQyxlQUFPO0FBRlQsT0FMVyxFQVNYO0FBQ0VELGVBQU8sV0FEVDtBQUVFQyxlQUFPO0FBRlQsT0FUVyxFQWFYO0FBQ0VELGVBQU8sWUFEVDtBQUVFQyxlQUFPO0FBRlQsT0FiVztBQUZBLEtBQWY7O0FBc0JBLFFBQUlOLGVBQUosRUFBcUI7QUFDbkIsVUFBSU8sZ0JB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XG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyB0ZWFtID0+IHtcbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcbiAgY29uc3Qgc3RhdHVzID0ge1xuICAgIHRleHQ6ICcvbnBzLXN0YXR1czonLFxuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2NoZWR1bGVkIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZlIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnTlBTIFNjb3JlJyxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdOUFMgUmVzdWx0JyxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuXG4gIGlmIChzY2hlZHVsZWRTdXJ2ZXkpIHtcbiAgICBsZXQgZGlzdHJpYnV0aW9uRGF0ZVxuICAgIHN3aXRjaCAoc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSkge1xuICAgICAgY2FzZSAnd2Vla2x5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAndycpLnN0YXJ0T2YoJ3dlZWsnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbW9udGhseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ00nKS5zdGFydE9mKCdtb250aCcpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdxdWFydGVybHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICdRJykuc3RhcnRPZigncXVhcnRlcicpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJlcWVuY3knKVxuICAgIH1cblxuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS5maWVsZHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnRnJlcXVlbmN5JyxcbiAgICAgICAgdmFsdWU6IHNjaGVkdWxlZFN1cnZleS5mcmVxdWVuY3ksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ1dpbGwgYmUgZGlzdHJpYnV0ZWQgYXQnLFxuICAgICAgICB2YWx1ZTogdG9Mb2NhbERhdGUoZGlzdHJpYnV0aW9uRGF0ZSksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS50ZXh0ID0gJ05vbmUnXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZvb3RlciA9ICdZb3UgbWF5IGNyZWF0ZSBvbmUgYnkgL25wcy1zY2hlZHVsZS1zdXJ2ZXknXG4gIH1cblxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgY29uc3Qgc3RhdHMgPSBhd2FpdCBhY3RpdmVTdXJ2ZXkuc3RhdHNcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1Jlc3BvbnNlIHJhdGUnLFxuICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICAgIGlmIChzdGF0cy5hdmVyYWdlU2NvcmUpIHtcbiAgICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnQXZlcmFnZSBzY29yZScsXG4gICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChzdGF0cy5ucHNTY29yZSkge1xuICAgICAgc3RhdHVzLmF0dGFjaG1lbnRzWzJdLmZpZWxkcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAnU2NvcmUgICgtMTAwIHRvIDEwMCknLFxuICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5ucHNTY29yZS50b0ZpeGVkKDIpfSAke3N0YXRzLm5wc1JhdGluZ31gLFxuICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ1RvdGFsIHN1Ym1pc3Npb25zJyxcbiAgICAgICAgICB2YWx1ZTogc3RhdHMuc3VibWlzc2lvbkNvdW50LFxuICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICBpZiAoc3RhdHMubnBzTWVzc2FnZSkge1xuICAgICAgc3RhdHVzLmF0dGFjaG1lbnRzWzNdLmZpZWxkcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAnV2hhdCBkb2VzIG15IE5QUyBzY29yZSBtZWFuPycsXG4gICAgICAgICAgdmFsdWU6IHN0YXRzLm5wc01lc3NhZ2VcbiAgICAgICAgfV1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLnRleHQgPSAnTm9uZSdcbiAgfVxuXG4gIHJldHVybiBzdGF0dXNcbn1cbiJdfQ==