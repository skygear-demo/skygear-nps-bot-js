'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team) {
    const scheduledSurvey = yield team.scheduledSurvey;
    const lastestSurvey = yield team.lastestSurvey;
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

    if (lastestSurvey) {
      const stats = yield lastestSurvey.stats;
      status.attachments[1].fields = [{
        title: 'Response rate',
        value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
        short: true
      }, {
        title: 'Average score',
        value: (yield lastestSurvey.stats).averageScore.toFixed(2),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdGF0dXMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJzY2hlZHVsZWRTdXJ2ZXkiLCJsYXN0ZXN0U3VydmV5Iiwic3RhdHVzIiwiYXR0YWNobWVudHMiLCJ0aXRsZSIsImNvbG9yIiwiZmllbGRzIiwidmFsdWUiLCJmcmVxdWVuY3kiLCJzaG9ydCIsInRleHQiLCJmb290ZXIiLCJzdGF0cyIsInN1Ym1pc3Npb25Db3VudCIsInRhcmdldHNDb3VudCIsInJlc3BvbnNlUmF0ZSIsInRvRml4ZWQiLCJhdmVyYWdlU2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxJQUFOLEVBQWM7QUFDN0IsVUFBTUMsa0JBQWtCLE1BQU1ELEtBQUtDLGVBQW5DO0FBQ0EsVUFBTUMsZ0JBQWdCLE1BQU1GLEtBQUtFLGFBQWpDO0FBQ0EsVUFBTUMsU0FBUztBQUNiQyxtQkFBYSxDQUNYO0FBQ0VDLGVBQU8sa0JBRFQ7QUFFRUMsZUFBTztBQUZULE9BRFcsRUFLWDtBQUNFRCxlQUFPLGVBRFQ7QUFFRUMsZUFBTztBQUZULE9BTFc7QUFEQSxLQUFmOztBQWFBLFFBQUlMLGVBQUosRUFBcUI7QUFDbkJFLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JHLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VGLGVBQU8sV0FEVDtBQUVFRyxlQUFPUCxnQkFBZ0JRLFNBRnpCO0FBR0VDLGVBQU87QUFIVCxPQUQ2QixFQU03QjtBQUNFTCxlQUFPLHdCQURUO0FBRUVHLGVBQU8sTUFGVDtBQUdFRSxlQUFPO0FBSFQsT0FONkIsQ0FBL0I7QUFZRCxLQWJELE1BYU87QUFDTFAsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQk8sSUFBdEIsR0FBNkIsTUFBN0I7QUFDQVIsYUFBT0MsV0FBUCxDQUFtQixDQUFuQixFQUFzQlEsTUFBdEIsR0FBK0IsNENBQS9CO0FBQ0Q7O0FBRUQsUUFBSVYsYUFBSixFQUFtQjtBQUNqQixZQUFNVyxRQUFRLE1BQU1YLGNBQWNXLEtBQWxDO0FBQ0FWLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JHLE1BQXRCLEdBQStCLENBQzdCO0FBQ0VGLGVBQU8sZUFEVDtBQUVFRyxlQUFRLEdBQUVLLE1BQU1DLGVBQWdCLFdBQVVELE1BQU1FLFlBQWEsS0FBSSxDQUFDRixNQUFNRyxZQUFOLEdBQXFCLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFtQyxDQUFuQyxDQUFzQyxHQUZ6RztBQUdFUCxlQUFPO0FBSFQsT0FENkIsRUFNN0I7QUFDRUwsZUFBTyxlQURUO0FBRUVHLGVBQU8sQ0FBQyxNQUFNTixjQUFjVyxLQUFyQixFQUE0QkssWUFBNUIsQ0FBeUNELE9BQXpDLENBQWlELENBQWpELENBRlQ7QUFHRVAsZUFBTztBQUhULE9BTjZCLENBQS9CO0FBWUQsS0FkRCxNQWNPO0FBQ0xQLGFBQU9DLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JPLElBQXRCLEdBQTZCLE1BQTdCO0FBQ0Q7O0FBRUQsV0FBT1IsTUFBUDtBQUNELEdBckREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN0YXR1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYXN5bmMgdGVhbSA9PiB7XG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGNvbnN0IGxhc3Rlc3RTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmxhc3Rlc3RTdXJ2ZXlcbiAgY29uc3Qgc3RhdHVzID0ge1xuICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnU2NoZWR1bGVkIHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnTGF0ZXN0IHN1cnZleScsXG4gICAgICAgIGNvbG9yOiAnZ29vZCdcbiAgICAgIH1cbiAgICBdXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5KSB7XG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZpZWxkcyA9IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdGcmVxdWVuY3knLFxuICAgICAgICB2YWx1ZTogc2NoZWR1bGVkU3VydmV5LmZyZXF1ZW5jeSxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnV2lsbCBiZSBkaXN0cmlidXRlZCBhdCcsXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1swXS50ZXh0ID0gJ05vbmUnXG4gICAgc3RhdHVzLmF0dGFjaG1lbnRzWzBdLmZvb3RlciA9ICdZb3UgbWF5IGNyZWF0ZSBvbmUgYnkgL25wcy1zY2hlZHVsZS1zdXJ2ZXknXG4gIH1cblxuICBpZiAobGFzdGVzdFN1cnZleSkge1xuICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgbGFzdGVzdFN1cnZleS5zdGF0c1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS5maWVsZHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgIHZhbHVlOiBgJHtzdGF0cy5zdWJtaXNzaW9uQ291bnR9IG91dCBvZiAke3N0YXRzLnRhcmdldHNDb3VudH0sICR7KHN0YXRzLnJlc3BvbnNlUmF0ZSAqIDEwMCkudG9GaXhlZCgyKX0lYCxcbiAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnQXZlcmFnZSBzY29yZScsXG4gICAgICAgIHZhbHVlOiAoYXdhaXQgbGFzdGVzdFN1cnZleS5zdGF0cykuYXZlcmFnZVNjb3JlLnRvRml4ZWQoMiksXG4gICAgICAgIHNob3J0OiB0cnVlXG4gICAgICB9XG4gICAgXVxuICB9IGVsc2Uge1xuICAgIHN0YXR1cy5hdHRhY2htZW50c1sxXS50ZXh0ID0gJ05vbmUnXG4gIH1cblxuICByZXR1cm4gc3RhdHVzXG59XG4iXX0=