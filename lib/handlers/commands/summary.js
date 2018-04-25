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
            title: 'NPS score (from -100 to 100)',
            value: stats.npsScore.toFixed(2),
            short: true
          }, {
            title: 'Closed at',
            value: toLocalDate(survey.closingDate)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwidG9Mb2NhbERhdGUiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJhdHRhY2htZW50cyIsInN1cnZleSIsInN0YXRzIiwic3VtbWFyeSIsInRpdGxlIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImltYWdlX3VybCIsInNjb3Jlc0NvdW50Iiwiam9pbiIsImZpZWxkcyIsInZhbHVlIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsInNob3J0IiwiYXZlcmFnZVNjb3JlIiwibnBzU2NvcmUiLCJjbG9zaW5nRGF0ZSIsInB1c2giLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFQyxXQUFGLEtBQWtCRCxRQUFRLFlBQVIsQ0FBeEI7O0FBRUEsTUFBTUUsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQUlBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0IsY0FBaEIsQ0FBaEI7O0FBRUEsUUFBSUYsTUFBTUMsS0FBS0UsTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxrQkFBa0JDLFNBQVNMLEVBQVQsQ0FBeEI7O0FBRUEsVUFBSU0sT0FBSjtBQUNBLFVBQUlGLGVBQUosRUFBcUI7QUFBRTtBQUNyQkUsa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxDQUFnQkgsZUFBaEIsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSVIsY0FBY1ksUUFBZCxDQUF1QlIsRUFBdkIsQ0FBSixFQUFnQztBQUNyQ00sa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQTtBQUNMLGVBQU9MLFFBQVFPLEtBQWY7QUFDRDs7QUFFRCxVQUFJSCxRQUFRSCxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGVBQU8sc0NBQVA7QUFDRDs7QUFFRCxZQUFNTyxjQUFjLEVBQXBCO0FBQ0EsV0FBSyxJQUFJQyxNQUFULElBQW1CTCxPQUFuQixFQUE0QjtBQUMxQixjQUFNTSxRQUFRLE1BQU1ELE9BQU9DLEtBQTNCO0FBQ0EsY0FBTUMsVUFBVTtBQUNkQyxpQkFBUSw2QkFBNEJuQixZQUFZZ0IsT0FBT0ksZ0JBQW5CLENBQXFDLEVBRDNEO0FBRWRDLHFCQUFZLDBHQUF5R0osTUFBTUssV0FBTixDQUFrQkMsSUFBbEIsRUFBeUIsNEJBRmhJO0FBR2RDLGtCQUFRLENBQ047QUFDRUwsbUJBQU8sZUFEVDtBQUVFTSxtQkFBUSxHQUFFUixNQUFNUyxlQUFnQixXQUFVVCxNQUFNVSxZQUFhLEtBQUksQ0FBQ1YsTUFBTVcsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRUMsbUJBQU87QUFIVCxXQURNLEVBTU47QUFDRVgsbUJBQU8sZUFEVDtBQUVFTSxtQkFBT1IsTUFBTWMsWUFBTixDQUFtQkYsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FGVDtBQUdFQyxtQkFBTztBQUhULFdBTk0sRUFXTjtBQUNFWCxtQkFBTyw4QkFEVDtBQUVFTSxtQkFBT1IsTUFBTWUsUUFBTixDQUFlSCxPQUFmLENBQXVCLENBQXZCLENBRlQ7QUFHRUMsbUJBQU87QUFIVCxXQVhNLEVBZ0JOO0FBQ0VYLG1CQUFPLFdBRFQ7QUFFRU0sbUJBQU96QixZQUFZZ0IsT0FBT2lCLFdBQW5CO0FBRlQsV0FoQk07QUFITSxTQUFoQjtBQXlCQWxCLG9CQUFZbUIsSUFBWixDQUFpQmhCLE9BQWpCO0FBQ0Q7O0FBRUQsYUFBTztBQUNMaUIsY0FBTSxlQUREO0FBRUxwQjtBQUZLLE9BQVA7QUFJRCxLQW5ERCxNQW1ETztBQUNMLGFBQU9SLFFBQVFPLEtBQWY7QUFDRDtBQUNGLEdBekREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN1bW1hcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCBbJDEsIC4uLnJlc3RdKSA9PiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBtZXNzYWdlLmNvbW1hbmRbJy9ucHMtc3VtbWFyeSddXG5cbiAgaWYgKCQxICYmIHJlc3QubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZTdXJ2ZXlzID0gcGFyc2VJbnQoJDEpXG5cbiAgICBsZXQgc3VydmV5c1xuICAgIGlmIChudW1iZXJPZlN1cnZleXMpIHsgLy8gaWYgJDEgaXMgYSBudW1iZXIsIHBhcnNlICE9IE5hTlxuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cyhudW1iZXJPZlN1cnZleXMpXG4gICAgfSBlbHNlIGlmIChWQUxJRF9PUFRJT05TLmluY2x1ZGVzKCQxKSkge1xuICAgICAgc3VydmV5cyA9IGF3YWl0IHRlYW0uZ2V0U3VydmV5cygpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gICAgfVxuXG4gICAgaWYgKHN1cnZleXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuICcvbnBzLXN1bW1hcnk6IE5vIGNsb3NlZCBzdXJ2ZXkgZm91bmQnXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBbXVxuICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHN1cnZleS5zdGF0c1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgdGl0bGU6IGBTdW1tYXJ5IG9mIHN1cnZleSBzZW50IGF0ICR7dG9Mb2NhbERhdGUoc3VydmV5LmRpc3RyaWJ1dGlvbkRhdGUpfWAsXG4gICAgICAgIGltYWdlX3VybDogYGh0dHBzOi8vaW1hZ2UtY2hhcnRzLmNvbS9jaGFydD9jaHQ9YnZzJmNocz02NDB4MzYwJmNoeHQ9eCx5JmNoeGw9MDp8c2NvcmUlMjAxfDJ8M3w0fDV8Nnw3fDh8OXwxMCZjaGQ9dDoke3N0YXRzLnNjb3Jlc0NvdW50LmpvaW4oKX0mY2h0dD1TY29yZSUyMERpc3RyaWJ1dGlvbmAsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ05QUyBzY29yZSAoZnJvbSAtMTAwIHRvIDEwMCknLFxuICAgICAgICAgICAgdmFsdWU6IHN0YXRzLm5wc1Njb3JlLnRvRml4ZWQoMiksXG4gICAgICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdDbG9zZWQgYXQnLFxuICAgICAgICAgICAgdmFsdWU6IHRvTG9jYWxEYXRlKHN1cnZleS5jbG9zaW5nRGF0ZSlcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGF0dGFjaG1lbnRzLnB1c2goc3VtbWFyeSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDogJy9ucHMtc3VtbWFyeTonLFxuICAgICAgYXR0YWNobWVudHNcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxufVxuIl19