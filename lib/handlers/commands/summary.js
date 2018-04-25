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
            title: 'NPS score',
            value: `${stats.npsScore.toFixed(2)} / 100`,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwidG9Mb2NhbERhdGUiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJhdHRhY2htZW50cyIsInN1cnZleSIsInN0YXRzIiwic3VtbWFyeSIsInRpdGxlIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImltYWdlX3VybCIsInNjb3Jlc0NvdW50Iiwiam9pbiIsImZpZWxkcyIsInZhbHVlIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsInNob3J0IiwiYXZlcmFnZVNjb3JlIiwibnBzU2NvcmUiLCJjbG9zaW5nRGF0ZSIsInB1c2giLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFQyxXQUFGLEtBQWtCRCxRQUFRLFlBQVIsQ0FBeEI7O0FBRUEsTUFBTUUsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQUlBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0IsY0FBaEIsQ0FBaEI7O0FBRUEsUUFBSUYsTUFBTUMsS0FBS0UsTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxrQkFBa0JDLFNBQVNMLEVBQVQsQ0FBeEI7O0FBRUEsVUFBSU0sT0FBSjtBQUNBLFVBQUlGLGVBQUosRUFBcUI7QUFBRTtBQUNyQkUsa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxDQUFnQkgsZUFBaEIsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSVIsY0FBY1ksUUFBZCxDQUF1QlIsRUFBdkIsQ0FBSixFQUFnQztBQUNyQ00sa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQTtBQUNMLGVBQU9MLFFBQVFPLEtBQWY7QUFDRDs7QUFFRCxVQUFJSCxRQUFRSCxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGVBQU8sc0NBQVA7QUFDRDs7QUFFRCxZQUFNTyxjQUFjLEVBQXBCO0FBQ0EsV0FBSyxJQUFJQyxNQUFULElBQW1CTCxPQUFuQixFQUE0QjtBQUMxQixjQUFNTSxRQUFRLE1BQU1ELE9BQU9DLEtBQTNCO0FBQ0EsY0FBTUMsVUFBVTtBQUNkQyxpQkFBUSw2QkFBNEJuQixZQUFZZ0IsT0FBT0ksZ0JBQW5CLENBQXFDLEVBRDNEO0FBRWRDLHFCQUFZLDBHQUF5R0osTUFBTUssV0FBTixDQUFrQkMsSUFBbEIsRUFBeUIsNEJBRmhJO0FBR2RDLGtCQUFRLENBQ047QUFDRUwsbUJBQU8sZUFEVDtBQUVFTSxtQkFBUSxHQUFFUixNQUFNUyxlQUFnQixXQUFVVCxNQUFNVSxZQUFhLEtBQUksQ0FBQ1YsTUFBTVcsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRUMsbUJBQU87QUFIVCxXQURNLEVBTU47QUFDRVgsbUJBQU8sZUFEVDtBQUVFTSxtQkFBT1IsTUFBTWMsWUFBTixDQUFtQkYsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FGVDtBQUdFQyxtQkFBTztBQUhULFdBTk0sRUFXTjtBQUNFWCxtQkFBTyxXQURUO0FBRUVNLG1CQUFRLEdBQUVSLE1BQU1lLFFBQU4sQ0FBZUgsT0FBZixDQUF1QixDQUF2QixDQUEwQixRQUZ0QztBQUdFQyxtQkFBTztBQUhULFdBWE0sRUFnQk47QUFDRVgsbUJBQU8sV0FEVDtBQUVFTSxtQkFBT3pCLFlBQVlnQixPQUFPaUIsV0FBbkI7QUFGVCxXQWhCTTtBQUhNLFNBQWhCO0FBeUJBbEIsb0JBQVltQixJQUFaLENBQWlCaEIsT0FBakI7QUFDRDs7QUFFRCxhQUFPO0FBQ0xpQixjQUFNLGVBREQ7QUFFTHBCO0FBRkssT0FBUDtBQUlELEtBbkRELE1BbURPO0FBQ0wsYUFBT1IsUUFBUU8sS0FBZjtBQUNEO0FBQ0YsR0F6REQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic3VtbWFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IHsgdG9Mb2NhbERhdGUgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1hbGwnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zdW1tYXJ5J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBudW1iZXJPZlN1cnZleXMgPSBwYXJzZUludCgkMSlcblxuICAgIGxldCBzdXJ2ZXlzXG4gICAgaWYgKG51bWJlck9mU3VydmV5cykgeyAvLyBpZiAkMSBpcyBhIG51bWJlciwgcGFyc2UgIT0gTmFOXG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKG51bWJlck9mU3VydmV5cylcbiAgICB9IGVsc2UgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgICB9XG5cbiAgICBpZiAoc3VydmV5cy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJy9ucHMtc3VtbWFyeTogTm8gY2xvc2VkIHN1cnZleSBmb3VuZCdcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2htZW50cyA9IFtdXG4gICAgZm9yIChsZXQgc3VydmV5IG9mIHN1cnZleXMpIHtcbiAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgc3VydmV5LnN0YXRzXG4gICAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgICB0aXRsZTogYFN1bW1hcnkgb2Ygc3VydmV5IHNlbnQgYXQgJHt0b0xvY2FsRGF0ZShzdXJ2ZXkuZGlzdHJpYnV0aW9uRGF0ZSl9YCxcbiAgICAgICAgaW1hZ2VfdXJsOiBgaHR0cHM6Ly9pbWFnZS1jaGFydHMuY29tL2NoYXJ0P2NodD1idnMmY2hzPTY0MHgzNjAmY2h4dD14LHkmY2h4bD0wOnxzY29yZSUyMDF8MnwzfDR8NXw2fDd8OHw5fDEwJmNoZD10OiR7c3RhdHMuc2NvcmVzQ291bnQuam9pbigpfSZjaHR0PVNjb3JlJTIwRGlzdHJpYnV0aW9uYCxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdSZXNwb25zZSByYXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5zdWJtaXNzaW9uQ291bnR9IG91dCBvZiAke3N0YXRzLnRhcmdldHNDb3VudH0sICR7KHN0YXRzLnJlc3BvbnNlUmF0ZSAqIDEwMCkudG9GaXhlZCgyKX0lYCxcbiAgICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ0F2ZXJhZ2Ugc2NvcmUnLFxuICAgICAgICAgICAgdmFsdWU6IHN0YXRzLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnTlBTIHNjb3JlJyxcbiAgICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5ucHNTY29yZS50b0ZpeGVkKDIpfSAvIDEwMGAsXG4gICAgICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdDbG9zZWQgYXQnLFxuICAgICAgICAgICAgdmFsdWU6IHRvTG9jYWxEYXRlKHN1cnZleS5jbG9zaW5nRGF0ZSlcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGF0dGFjaG1lbnRzLnB1c2goc3VtbWFyeSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGV4dDogJy9ucHMtc3VtbWFyeTonLFxuICAgICAgYXR0YWNobWVudHNcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxufVxuIl19