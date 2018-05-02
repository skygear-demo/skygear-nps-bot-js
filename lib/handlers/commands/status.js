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
      console.log(stats.npsScore);

      if (stats.npsScore !== undefined) {
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

      console.log(stats.npsMessage);
      if (stats.npsMessage !== undefined) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsInRvTG9jYWxEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInN0YXJ0T2YiLCJFcnJvciIsImZpZWxkcyIsInZhbHVlIiwic2hvcnQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm5wc1Njb3JlIiwidW5kZWZpbmVkIiwibnBzUmF0aW5nIiwibnBzTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsUUFBUixDQUFmO0FBQ0EsTUFBTSxFQUFFQyxXQUFGLEtBQWtCRCxRQUFRLFlBQVIsQ0FBeEI7O0FBRUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBTUMsSUFBTixFQUFjO0FBQzdCLFVBQU1DLGtCQUFrQixNQUFNRCxLQUFLQyxlQUFuQztBQUNBLFVBQU1DLGVBQWUsTUFBTUYsS0FBS0UsWUFBaEM7QUFDQSxVQUFNQyxTQUFTO0FBQ2JDLFlBQU0sY0FETztBQUViQyxtQkFBYSxDQUNYO0FBQ0VDLGVBQU8sa0JBRFQ7QUFFRUMsZUFBTztBQUZULE9BRFcsRUFLWDtBQUNFRCxlQUFPLGVBRFQ7QUFFRUMsZUFBTztBQUZULE9BTFcsRUFTWDtBQUNFRCxlQUFPLFdBRFQ7QUFFRUMsZUFBTztBQUZULE9BVFcsRUFhWDtBQUNFRCxlQUFPLFlBRFQ7QUFFRUMsZUFBTztBQUZULE9BYlc7QUFGQSxLQUFmOztBQXNCQSxRQUFJ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QUFDRDs7QUFFRCxXQUFPRCxNQUFQO0FBQ0QsR0F4R0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic3RhdHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IHsgdG9Mb2NhbERhdGUgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIHRlYW0gPT4ge1xuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuICBjb25zdCBzdGF0dXMgPSB7XG4gICAgdGV4dDogJy9ucHMtc3RhdHVzOicsXG4gICAgYXR0YWNobWVudHM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdTY2hlZHVsZWQgc3VydmV5JyxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBY3RpdmUgc3VydmV5JyxcbiAgICAgICAgY29sb3I6ICdnb29kJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdOUFMgU2NvcmUnLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ05QUyBSZXN1bHQnLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9XG4gICAgXVxuICB9XG5cbiAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgIGxldCBkaXN0cmlidXRpb25EYXRlXG4gICAgc3dpdGNoIChzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5KSB7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICd3Jykuc3RhcnRPZignd2VlaycpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnTScpLnN0YXJ0T2YoJ21vbnRoJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3F1YXJ0ZXJseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ1EnKS5zdGFydE9mKCdxdWFydGVyJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmVxZW5jeScpXG4gICAgfVxuXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdGcmVxdWVuY3knLFxuICAgICAgICB2YWx1ZTogc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnV2lsbCBiZSBkaXN0cmlidXRlZCBhdCcsXG4gICAgICAgIHZhbHVlOiB0b0xvY2FsRGF0ZShkaXN0cmlidXRpb25EYXRlKSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLnRleHQgPSAnTm9uZSdcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0uZm9vdGVyID0gJ1lvdSBtYXkgY3JlYXRlIG9uZSBieSAvbnBzLXNjaGVkdWxlLXN1cnZleSdcbiAgfVxuXG4gIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICBjb25zdCBzdGF0cyA9IGF3YWl0IGFjdGl2ZVN1cnZleS5zdGF0c1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgIHZhbHVlOiBgJHtzdGF0cy5zdWJtaXNzaW9uQ291bnR9IG91dCBvZiAke3N0YXRzLnRhcmdldHNDb3VudH0sICR7KHN0YXRzLnJlc3BvbnNlUmF0ZSAqIDEwMCkudG9GaXhlZCgyKX0lYCxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH1cbiAgICBdXG4gICAgaWYgKHN0YXRzLmF2ZXJhZ2VTY29yZSkge1xuICAgICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLmZpZWxkcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgdmFsdWU6IHN0YXRzLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RhdHMubnBzU2NvcmUpXG5cbiAgICBpZiAoc3RhdHMubnBzU2NvcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RhdHVzLmF0dGFjaG1lbnRzWzJdLmZpZWxkcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiAnU2NvcmUgICgtMTAwIHRvIDEwMCknLFxuICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5ucHNTY29yZS50b0ZpeGVkKDIpfSAke3N0YXRzLm5wc1JhdGluZ31gLFxuICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ1RvdGFsIHN1Ym1pc3Npb25zJyxcbiAgICAgICAgICB2YWx1ZTogc3RhdHMuc3VibWlzc2lvbkNvdW50LFxuICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhzdGF0cy5ucHNNZXNzYWdlKVxuICAgIGlmIChzdGF0cy5ucHNNZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN0YXR1cy5hdHRhY2htZW50c1szXS5maWVsZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ1doYXQgZG9lcyBteSBOUFMgc2NvcmUgbWVhbj8nLFxuICAgICAgICAgIHZhbHVlOiBzdGF0cy5ucHNNZXNzYWdlXG4gICAgICAgIH1dXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS50ZXh0ID0gJ05vbmUnXG4gIH1cblxuICByZXR1cm4gc3RhdHVzXG59XG4iXX0=