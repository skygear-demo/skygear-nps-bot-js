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
        title: 'Latest survey',
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
      }, {
        title: 'Average score',
        value: (yield activeSurvey.stats).averageScore.toFixed(2),
        short: true
      }];
    } else {
      status.attachments[1].text = 'None';
    }

    return status;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJhY3RpdmVTdXJ2ZXkiLCJzdGF0dXMiLCJhdHRhY2htZW50cyIsInRpdGxlIiwiY29sb3IiLCJmaWVsZHMiLCJ2YWx1ZSIsImZyZXF1ZW5jeSIsInNob3J0IiwidGV4dCIsImZvb3RlciIsInN0YXRzIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsImF2ZXJhZ2VTY29yZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLElBQU4sRUFBYztBQUM3QixVQUFNQyxrQkFBa0IsTUFBTUQsS0FBS0MsZUFBbkM7QUFDQSxVQUFNQyxlQUFlLE1BQU1GLEtBQUtFLFlBQWhDO0FBQ0EsVUFBTUMsU0FBUztBQUNiQyxtQkFBYSxDQUNYO0FBQ0VDLGVBQU8sa0JBRFQ7QUFFRUMsZUFBTztBQUZULE9BRFcsRUFLWDtBQUNFRCxlQUFPLGVBRFQ7QUFFRUMsZUFBTztBQUZULE9BTFc7QUFEQSxLQUFmOztBQWFBLFFBQUlMLGVBQUosRUFBcUI7QUFDbkJFLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JHLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VGLGVBQU8sV0FEVDtBQUVFRyxlQUFPUCxnQkFBZ0JRLFNBRnpCO0FBR0VDLGVBQU87QUFIVCxPQUQ2QixFQU03QjtBQUNFTCxlQUFPLHdCQURUO0FBRUVHLGVBQU8sTUFGVDtBQUdFRSxlQUFPO0FBSFQsT0FONkIsQ0FBL0I7QUFZRCxLQWJELE1BYU87QUFDTFAsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQk8sSUFBdEIsR0FBNkIsTUFBN0I7QUFDQVIsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsR0FBK0IsNENBQS9CO0FBQ0Q7O0FBRUQsUUFBSVYsWUFBSixFQUFrQjtBQUNoQixZQUFNVyxRQUFRLE1BQU1YLGFBQWFXLEtBQWpDO0FBQ0FWLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JHLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VGLGVBQU8sZUFEVDtBQUVFRyxlQUFRLEdBQUVLLE1BQU1DLGVBQWdCLFdBQVVELE1BQU1FLFlBQWEsS0FBSSxDQUFDRixNQUFNRyxZQUFOLEdBQXFCLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFtQyxDQUFuQyxDQUFzQyxHQUZ6RztBQUdFUCxlQUFPO0FBSFQsT0FENkIsRUFNN0I7QUFDRUwsZUFBTyxlQURUO0FBRUVHLGVBQU8sQ0FBQyxNQUFNTixhQUFhVyxLQUFwQixFQUEyQkssWUFBM0IsQ0FBd0NELE9BQXhDLENBQWdELENBQWhELENBRlQ7QUFHRVAsZUFBTztBQUhULE9BTjZCLENBQS9CO0FBWUQsS0FkRCxNQWNPO0FBQ0xQLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JPLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0Q7O0FBRUQsV0FBT1IsTUFBUDtBQUNELEdBckREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG4gIGNvbnN0IHN0YXR1cyA9IHtcbiAgICBhdHRhY2htZW50czogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1NjaGVkdWxlZCBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0xhdGVzdCBzdXJ2ZXknLFxuICAgICAgICBjb2xvcjogJ2dvb2QnXG4gICAgICB9XG4gICAgXVxuICB9XG5cbiAgaWYgKHNjaGVkdWxlZFN1cnZleSkge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS5maWVsZHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnRnJlcXVlbmN5JyxcbiAgICAgICAgdmFsdWU6IHNjaGVkdWxlZFN1cnZleS5mcmVxdWVuY3ksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ1dpbGwgYmUgZGlzdHJpYnV0ZWQgYXQnLFxuICAgICAgICB2YWx1ZTogJ2RhdGUnLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMF0udGV4dCA9ICdOb25lJ1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS5mb290ZXIgPSAnWW91IG1heSBjcmVhdGUgb25lIGJ5IC9ucHMtc2NoZWR1bGUtc3VydmV5J1xuICB9XG5cbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgYWN0aXZlU3VydmV5LnN0YXRzXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzFdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdSZXNwb25zZSByYXRlJyxcbiAgICAgICAgdmFsdWU6IGAke3N0YXRzLnN1Ym1pc3Npb25Db3VudH0gb3V0IG9mICR7c3RhdHMudGFyZ2V0c0NvdW50fSwgJHsoc3RhdHMucmVzcG9uc2VSYXRlICogMTAwKS50b0ZpeGVkKDIpfSVgLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgdmFsdWU6IChhd2FpdCBhY3RpdmVTdXJ2ZXkuc3RhdHMpLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpLFxuICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgfVxuICAgIF1cbiAgfSBlbHNlIHtcbiAgICBzdGF0dXMuYXR0YWNobWVudHNbMV0udGV4dCA9ICdOb25lJ1xuICB9XG5cbiAgcmV0dXJuIHN0YXR1c1xufVxuIl19