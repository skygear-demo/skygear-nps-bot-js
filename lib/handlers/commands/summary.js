'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const { toLocalDate } = require('../../util');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, [$1, ...rest]) {
    const command = message.command['/nps-summary'];

    if ($1 && rest.length === 0) {
      const numberOfSurveys = parseInt($1);

      let surveys;
      if (numberOfSurveys) {
        // if $1 is a number, parse != NaN
        surveys = yield team.getSurveys(numberOfSurveys);
      } else if (VALID_OPTIONS.includes($1)) {
        surveys = yield team.getSurveys();
      } else {
        return command.usage;
      }

      if (surveys.length < 1) {
        return '/nps-summary: No closed survey found';
      }

      const attachments = [];
      for (let survey of surveys) {
        const stats = yield survey.stats;
        const summary = {
          title: `Summary of survey sent at ${toLocalDate(survey.distributionDate)}`,
          image_url: `https://image-charts.com/chart?cht=bvs&chs=640x360&chxt=x,y&chxl=0:|score%201|2|3|4|5|6|7|8|9|10&chd=t:${stats.scoresCount.join()}&chtt=Score%20Distribution`,
          fields: [{
            title: 'Response rate',
            value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
            short: true
          }, {
            title: 'Average score',
            value: stats.averageScore.toFixed(2),
            short: true
          }, {
            title: 'NPS score (-100 to 100)',
            value: `${stats.npsScore.toFixed(2)} ${stats.npsRating}`,
            short: true
          }, {
            title: 'Closed at',
            value: toLocalDate(survey.closingDate),
            short: true
          }, {
            title: 'NPS Result',
            value: stats.npsMessage
          }]
        };
        attachments.push(summary);
      }

      return {
        text: '/nps-summary:',
        attachments
      };
    } else {
      return command.usage;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwidG9Mb2NhbERhdGUiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJhdHRhY2htZW50cyIsInN1cnZleSIsInN0YXRzIiwic3VtbWFyeSIsInRpdGxlIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImltYWdlX3VybCIsInNjb3Jlc0NvdW50Iiwiam9pbiIsImZpZWxkcyIsInZhbHVlIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsInNob3J0IiwiYXZlcmFnZVNjb3JlIiwibnBzU2NvcmUiLCJucHNSYXRpbmciLCJjbG9zaW5nRGF0ZSIsIm5wc01lc3NhZ2UiLCJwdXNoIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsZUFBUixDQUFoQjtBQUNBLE1BQU0sRUFBRUMsV0FBRixLQUFrQkQsUUFBUSxZQUFSLENBQXhCOztBQUVBLE1BQU1FLGdCQUFnQixDQUNwQixPQURvQixDQUF0Qjs7QUFJQUMsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxJQUFQLEVBQWEsQ0FBQ0MsRUFBRCxFQUFLLEdBQUdDLElBQVIsQ0FBYixFQUErQjtBQUM5QyxVQUFNQyxVQUFVVCxRQUFRUyxPQUFSLENBQWdCLGNBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsWUFBTUMsa0JBQWtCQyxTQUFTTCxFQUFULENBQXhCOztBQUVBLFVBQUlNLE9BQUo7QUFDQSxVQUFJRixlQUFKLEVBQXFCO0FBQUU7QUFDckJFLGtCQUFVLE1BQU1QLEtBQUtRLFVBQUwsQ0FBZ0JILGVBQWhCLENBQWhCO0FBQ0QsT0FGRCxNQUVPLElBQUlSLGNBQWNZLFFBQWQsQ0FBdUJSLEVBQXZCLENBQUosRUFBZ0M7QUFDckNNLGtCQUFVLE1BQU1QLEtBQUtRLFVBQUwsRUFBaEI7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPTCxRQUFRTyxLQUFmO0FBQ0Q7O0FBRUQsVUFBSUgsUUFBUUgsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixlQUFPLHNDQUFQO0FBQ0Q7O0FBRUQsWUFBTU8sY0FBYyxFQUFwQjtBQUNBLFdBQUssSUFBSUMsTUFBVCxJQUFtQkwsT0FBbkIsRUFBNEI7QUFDMUIsY0FBTU0sUUFBUSxNQUFNRCxPQUFPQyxLQUEzQjtBQUNBLGNBQU1DLFVBQVU7QUFDZEMsaUJBQVEsNkJBQTRCbkIsWUFBWWdCLE9BQU9JLGdCQUFuQixDQUFxQyxFQUQzRDtBQUVkQyxxQkFBWSwwR0FBeUdKLE1BQU1LLFdBQU4sQ0FBa0JDLElBQWxCLEVBQXlCLDRCQUZoSTtBQUdkQyxrQkFBUSxDQUNOO0FBQ0VMLG1CQUFPLGVBRFQ7QUFFRU0sbUJBQVEsR0FBRVIsTUFBTVMsZUFBZ0IsV0FBVVQsTUFBTVUsWUFBYSxLQUFJLENBQUNWLE1BQU1XLFlBQU4sR0FBcUIsR0FBdEIsRUFBMkJDLE9BQTNCLENBQW1DLENBQW5DLENBQXNDLEdBRnpHO0FBR0VDLG1CQUFPO0FBSFQsV0FETSxFQU1OO0FBQ0VYLG1CQUFPLGVBRFQ7QUFFRU0sbUJBQU9SLE1BQU1jLFlBQU4sQ0FBbUJGLE9BQW5CLENBQTJCLENBQTNCLENBRlQ7QUFHRUMsbUJBQU87QUFIVCxXQU5NLEVBV047QUFDRVgsbUJBQU8seUJBRFQ7QUFFRU0sbUJBQVEsR0FBRVIsTUFBTWUsUUFBTixDQUFlSCxPQUFmLENBQXVCLENBQXZCLENBQTBCLElBQUdaLE1BQU1nQixTQUFVLEVBRnpEO0FBR0VILG1CQUFPO0FBSFQsV0FYTSxFQWdCTjtBQUNFWCxtQkFBTyxXQURUO0FBRUVNLG1CQUFPekIsWUFBWWdCLE9BQU9rQixXQUFuQixDQUZUO0FBR0VKLG1CQUFPO0FBSFQsV0FoQk0sRUFxQk47QUFDRVgsbUJBQU8sWUFEVDtBQUVFTSxtQkFBT1IsTUFBTWtCO0FBRmYsV0FyQk07QUFITSxTQUFoQjtBQThCQXBCLG9CQUFZcUIsSUFBWixDQUFpQmxCLE9BQWpCO0FBQ0Q7O0FBRUQsYUFBTztBQUNMbUIsY0FBTSxlQUREO0FBRUx0QjtBQUZLLE9BQVA7QUFJRCxLQXhERCxNQXdETztBQUNMLGFBQU9SLFFBQVFPLEtBQWY7QUFDRDtBQUNGLEdBOUREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN1bW1hcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtc3VtbWFyeSddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZTdXJ2ZXlzID0gcGFyc2VJbnQoJDEpXG5cbiAgICBsZXQgc3VydmV5c1xuICAgIGlmIChudW1iZXJPZlN1cnZleXMpIHsgLy8gaWYgJDEgaXMgYSBudW1iZXIsIHBhcnNlICE9IE5hTlxuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cyhudW1iZXJPZlN1cnZleXMpXG4gICAgfSBlbHNlIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gICAgfVxuXG4gICAgaWYgKHN1cnZleXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcvbnBzLXN1bW1hcnk6IE5vIGNsb3NlZCBzdXJ2ZXkgZm91bmQnXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBbXVxuICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHN1cnZleS5zdGF0c1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgdGl0bGU6IGBTdW1tYXJ5IG9mIHN1cnZleSBzZW50IGF0ICR7dG9Mb2NhbERhdGUoc3VydmV5LmRpc3RyaWJ1dGlvbkRhdGUpfWAsXG4gICAgICAgIGltYWdlX3VybDogYGh0dHBzOi8vaW1hZ2UtY2hhcnRzLmNvbS9jaGFydD9jaHQ9YnZzJmNocz02NDB4MzYwJmNoeHQ9eCx5JmNoeGw9MDp8c2NvcmUlMjAxfDJ8M3w0fDV8Nnw3fDh8OXwxMCZjaGQ9dDoke3N0YXRzLnNjb3Jlc0NvdW50LmpvaW4oKX0mY2h0dD1TY29yZSUyMERpc3RyaWJ1dGlvbmAsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ05QUyBzY29yZSAoLTEwMCB0byAxMDApJyxcbiAgICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5ucHNTY29yZS50b0ZpeGVkKDIpfSAke3N0YXRzLm5wc1JhdGluZ31gLFxuICAgICAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ2xvc2VkIGF0JyxcbiAgICAgICAgICAgIHZhbHVlOiB0b0xvY2FsRGF0ZShzdXJ2ZXkuY2xvc2luZ0RhdGUpLFxuICAgICAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnTlBTIFJlc3VsdCcsXG4gICAgICAgICAgICB2YWx1ZTogc3RhdHMubnBzTWVzc2FnZVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgYXR0YWNobWVudHMucHVzaChzdW1tYXJ5KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiAnL25wcy1zdW1tYXJ5OicsXG4gICAgICBhdHRhY2htZW50c1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=