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
          title: 'Score',
          value: `${stats.npsScore.toFixed(2)} / 100`,
          short: true
        }, {
          title: 'Total submission',
          value: stats.submissionCount,
          short: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsInRvTG9jYWxEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZyZXF1ZW5jeSIsImFkZCIsInN0YXJ0T2YiLCJFcnJvciIsImZpZWxkcyIsInZhbHVlIiwic2hvcnQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiLCJwdXNoIiwibnBzU2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLE1BQU0sRUFBRUMsV0FBRixLQUFrQkQsUUFBUSxZQUFSLENBQXhCOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxrQkFBa0IsTUFBTUQsS0FBS0MsZUFBbkM7QUFDQSxVQUFNQyxlQUFlLE1BQU1GLEtBQUtFLFlBQWhDO0FBQ0EsVUFBTUMsU0FBUztBQUNiQyxZQUFNLGNBRE87QUFFYkMsbUJBQWEsQ0FDWDtBQUNFQyxlQUFPLGtCQURUO0FBRUVDLGVBQU87QUFGVCxPQURXLEVBS1g7QUFDRUQsZUFBTyxlQURUO0FBRUVDLGVBQU87QUFGVCxPQUxXLEVBU1g7QUFDRUQsZUFBTyxXQURUO0FBRUVDLGVBQU87QUFGVCxPQVRXO0FBRkEsS0FBZjs7QUFrQkEsUUFBSU4sZUFBSixFQUFxQjtBQUNuQixVQUFJTyxnQkFBSjtBQUNBLGNBQVFQLGdCQUFnQlEsU0FBeEI7QUFDRSxhQUFLLFFBQUw7QUFDRUQsNkJBQW1CYixTQUFTZSxHQUFULENBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQkMsT0FBckIsQ0FBNkIsTUFBN0IsQ0FBbkI7QUFDQTtBQUNGLGFBQUssU0FBTDtBQUNFSCw2QkFBbUJiLFNBQVNlLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCQyxPQUFyQixDQUE2QixPQUE3QixDQUFuQjtBQUNBO0FBQ0YsYUFBSyxXQUFMO0FBQ0VILDZCQUFtQmIsU0FBU2UsR0FBVCxDQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJDLE9BQXJCLENBQTZCLFNBQTdCLENBQW5CO0FBQ0E7QUFDRjtBQUNFLGdCQUFNLElBQUlDLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBWEo7O0FBY0FULGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VQLGVBQU8sV0FEVDtBQUVFUSxlQUFPYixnQkFBZ0JRLFNBRnpCO0FBR0VNLGVBQU87QUFIVCxPQUQ2QixFQU03QjtBQUNFVCxlQUFPLHdCQURUO0FBRUVRLGVBQU9qQixZQUFZVyxnQkFBWixDQUZUO0FBR0VPLGVBQU87QUFIVCxPQU42QixDQUEvQjtBQVlELEtBNUJELE1BNEJPO0FBQ0xaLGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JELElBQXRCLEdBQTZCLE1BQTdCO0FBQ0FELGFBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JXLE1BQXRCLEdBQStCLDRDQUEvQjtBQUNEOztBQUVELFFBQUlkLFlBQUosRUFBa0I7QUFDaEIsWUFBTWUsUUFBUSxNQUFNZixhQUFhZSxLQUFqQztBQUNBZCxhQUFPRSxXQUFQLENBQW1CLENBQW5CLEVBQXNCUSxNQUF0QixHQUErQixDQUM3QjtBQUNFUCxlQUFPLGVBRFQ7QUFFRVEsZUFBUSxHQUFFRyxNQUFNQyxlQUFnQixXQUFVRCxNQUFNRSxZQUFhLEtBQUksQ0FBQ0YsTUFBTUcsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRU4sZUFBTztBQUhULE9BRDZCLENBQS9CO0FBT0EsVUFBSUUsTUFBTUssWUFBVixFQUF3QjtBQUN0Qm5CLGVBQU9FLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JRLE1BQXRCLENBQTZCVSxJQUE3QixDQUFrQztBQUNoQ2pCLGlCQUFPLGVBRHlCO0FBRWhDUSxpQkFBT0csTUFBTUssWUFBTixDQUFtQkQsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FGeUI7QUFHaENOLGlCQUFPO0FBSHlCLFNBQWxDO0FBS0Q7QUFDRCxVQUFJRSxNQUFNTyxRQUFWLEVBQW9CO0FBQ2xCckIsZUFBT0UsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsR0FBK0IsQ0FDN0I7QUFDRVAsaUJBQU8sT0FEVDtBQUVFUSxpQkFBUSxHQUFFRyxNQUFNTyxRQUFOLENBQWVILE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBMEIsUUFGdEM7QUFHRU4saUJBQU87QUFIVCxTQUQ2QixFQU03QjtBQUNFVCxpQkFBTyxrQkFEVDtBQUVFUSxpQkFBT0csTUFBTUMsZUFGZjtBQUdFSCxpQkFBTztBQUhULFNBTjZCLENBQS9CO0FBYUQ7QUFDRixLQS9CRCxNQStCTztBQUNMWixhQUFPRSxXQUFQLENBQW1CLENBQW5CLEVBQXNCRCxJQUF0QixHQUE2QixNQUE3QjtBQUNEOztBQUVELFdBQU9ELE1BQVA7QUFDRCxHQTFGRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKVxuY29uc3QgeyB0b0xvY2FsRGF0ZSB9ID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gIGNvbnN0IHN0YXR1cyA9IHtcbiAgICB0ZXh0OiAnL25wcy1zdGF0dXM6JyxcbiAgICBhdHRhY2htZW50czogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1NjaGVkdWxlZCBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0FjdGl2ZSBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ05QUyBTY29yZScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgbGV0IGRpc3RyaWJ1dGlvbkRhdGVcbiAgICBzd2l0Y2ggKHNjaGVkdWxlZFN1cnZleS5mcmVxdWVuY3kpIHtcbiAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgIGRpc3RyaWJ1dGlvbkRhdGUgPSBtb21lbnQoKS5hZGQoMSwgJ3cnKS5zdGFydE9mKCd3ZWVrJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICBkaXN0cmlidXRpb25EYXRlID0gbW9tZW50KCkuYWRkKDEsICdNJykuc3RhcnRPZignbW9udGgnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncXVhcnRlcmx5JzpcbiAgICAgICAgZGlzdHJpYnV0aW9uRGF0ZSA9IG1vbWVudCgpLmFkZCgxLCAnUScpLnN0YXJ0T2YoJ3F1YXJ0ZXInKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyZXFlbmN5JylcbiAgICB9XG5cbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0uZmllbGRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0ZyZXF1ZW5jeScsXG4gICAgICAgIHZhbHVlOiBzY2hlZHVsZWRTdXJ2ZXkuZnJlcXVlbmN5LFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdXaWxsIGJlIGRpc3RyaWJ1dGVkIGF0JyxcbiAgICAgICAgdmFsdWU6IHRvTG9jYWxEYXRlKGRpc3RyaWJ1dGlvbkRhdGUpLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0udGV4dCA9ICdOb25lJ1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS5mb290ZXIgPSAnWW91IG1heSBjcmVhdGUgb25lIGJ5IC9ucHMtc2NoZWR1bGUtc3VydmV5J1xuICB9XG5cbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgYWN0aXZlU3VydmV5LnN0YXRzXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdSZXNwb25zZSByYXRlJyxcbiAgICAgICAgdmFsdWU6IGAke3N0YXRzLnN1Ym1pc3Npb25Db3VudH0gb3V0IG9mICR7c3RhdHMudGFyZ2V0c0NvdW50fSwgJHsoc3RhdHMucmVzcG9uc2VSYXRlICogMTAwKS50b0ZpeGVkKDIpfSVgLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgICBpZiAoc3RhdHMuYXZlcmFnZVNjb3JlKSB7XG4gICAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0uZmllbGRzLnB1c2goe1xuICAgICAgICB0aXRsZTogJ0F2ZXJhZ2Ugc2NvcmUnLFxuICAgICAgICB2YWx1ZTogc3RhdHMuYXZlcmFnZVNjb3JlLnRvRml4ZWQoMiksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAoc3RhdHMubnBzU2NvcmUpIHtcbiAgICAgIHN0YXR1cy5hdHRhY2htZW50c1syXS5maWVsZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ1Njb3JlJyxcbiAgICAgICAgICB2YWx1ZTogYCR7c3RhdHMubnBzU2NvcmUudG9GaXhlZCgyKX0gLyAxMDBgLFxuICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZTogJ1RvdGFsIHN1Ym1pc3Npb24nLFxuICAgICAgICAgIHZhbHVlOiBzdGF0cy5zdWJtaXNzaW9uQ291bnQsXG4gICAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICBdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS50ZXh0ID0gJ05vbmUnXG4gIH1cblxuICByZXR1cm4gc3RhdHVzXG59XG4iXX0=