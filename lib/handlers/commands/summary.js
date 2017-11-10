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
        return 'No closed survey found';
      }

      const attachments = [];
      for (let survey of surveys) {
        const stats = yield survey.stats;
        const summary = {
          title: `Summary of survey sent at ${toLocalDate(survey.distributionDate)}`,
          fields: [{
            title: 'Response rate',
            value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
            short: true
          }, {
            title: 'Average score',
            value: stats.averageScore.toFixed(2),
            short: true
          }, {
            title: 'Closed at',
            value: toLocalDate(survey.closingDate)
          }]
        };
        attachments.push(summary);
      }

      return {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwidG9Mb2NhbERhdGUiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJhdHRhY2htZW50cyIsInN1cnZleSIsInN0YXRzIiwic3VtbWFyeSIsInRpdGxlIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZpZWxkcyIsInZhbHVlIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsInNob3J0IiwiYXZlcmFnZVNjb3JlIiwiY2xvc2luZ0RhdGUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFQyxXQUFGLEtBQWtCRCxRQUFRLFlBQVIsQ0FBeEI7O0FBRUEsTUFBTUUsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQUlBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYSxDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFiLEVBQStCO0FBQzlDLFVBQU1DLFVBQVVULFFBQVFTLE9BQVIsQ0FBZ0IsY0FBaEIsQ0FBaEI7O0FBRUEsUUFBSUYsTUFBTUMsS0FBS0UsTUFBTCxLQUFnQixDQUExQixFQUE2QjtBQUMzQixZQUFNQyxrQkFBa0JDLFNBQVNMLEVBQVQsQ0FBeEI7O0FBRUEsVUFBSU0sT0FBSjtBQUNBLFVBQUlGLGVBQUosRUFBcUI7QUFBRTtBQUNyQkUsa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxDQUFnQkgsZUFBaEIsQ0FBaEI7QUFDRCxPQUZELE1BRU8sSUFBSVIsY0FBY1ksUUFBZCxDQUF1QlIsRUFBdkIsQ0FBSixFQUFnQztBQUNyQ00sa0JBQVUsTUFBTVAsS0FBS1EsVUFBTCxFQUFoQjtBQUNELE9BRk0sTUFFQTtBQUNMLGVBQU9MLFFBQVFPLEtBQWY7QUFDRDs7QUFFRCxVQUFJSCxRQUFRSCxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLGVBQU8sd0JBQVA7QUFDRDs7QUFFRCxZQUFNTyxjQUFjLEVBQXBCO0FBQ0EsV0FBSyxJQUFJQyxNQUFULElBQW1CTCxPQUFuQixFQUE0QjtBQUMxQixjQUFNTSxRQUFRLE1BQU1ELE9BQU9DLEtBQTNCO0FBQ0EsY0FBTUMsVUFBVTtBQUNkQyxpQkFBUSw2QkFBNEJuQixZQUFZZ0IsT0FBT0ksZ0JBQW5CLENBQXFDLEVBRDNEO0FBRWRDLGtCQUFRLENBQ047QUFDRUYsbUJBQU8sZUFEVDtBQUVFRyxtQkFBUSxHQUFFTCxNQUFNTSxlQUFnQixXQUFVTixNQUFNTyxZQUFhLEtBQUksQ0FBQ1AsTUFBTVEsWUFBTixHQUFxQixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBbUMsQ0FBbkMsQ0FBc0MsR0FGekc7QUFHRUMsbUJBQU87QUFIVCxXQURNLEVBTU47QUFDRVIsbUJBQU8sZUFEVDtBQUVFRyxtQkFBT0wsTUFBTVcsWUFBTixDQUFtQkYsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FGVDtBQUdFQyxtQkFBTztBQUhULFdBTk0sRUFXTjtBQUNFUixtQkFBTyxXQURUO0FBRUVHLG1CQUFPdEIsWUFBWWdCLE9BQU9hLFdBQW5CO0FBRlQsV0FYTTtBQUZNLFNBQWhCO0FBbUJBZCxvQkFBWWUsSUFBWixDQUFpQlosT0FBakI7QUFDRDs7QUFFRCxhQUFPO0FBQ0xIO0FBREssT0FBUDtBQUdELEtBNUNELE1BNENPO0FBQ0wsYUFBT1IsUUFBUU8sS0FBZjtBQUNEO0FBQ0YsR0FsREQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic3VtbWFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IHsgdG9Mb2NhbERhdGUgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG5jb25zdCBWQUxJRF9PUFRJT05TID0gW1xuICAnLS1hbGwnXG5dXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zdW1tYXJ5J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBudW1iZXJPZlN1cnZleXMgPSBwYXJzZUludCgkMSlcblxuICAgIGxldCBzdXJ2ZXlzXG4gICAgaWYgKG51bWJlck9mU3VydmV5cykgeyAvLyBpZiAkMSBpcyBhIG51bWJlciwgcGFyc2UgIT0gTmFOXG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKG51bWJlck9mU3VydmV5cylcbiAgICB9IGVsc2UgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgICB9XG5cbiAgICBpZiAoc3VydmV5cy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJ05vIGNsb3NlZCBzdXJ2ZXkgZm91bmQnXG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBbXVxuICAgIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHN1cnZleS5zdGF0c1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHtcbiAgICAgICAgdGl0bGU6IGBTdW1tYXJ5IG9mIHN1cnZleSBzZW50IGF0ICR7dG9Mb2NhbERhdGUoc3VydmV5LmRpc3RyaWJ1dGlvbkRhdGUpfWAsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnUmVzcG9uc2UgcmF0ZScsXG4gICAgICAgICAgICB2YWx1ZTogYCR7c3RhdHMuc3VibWlzc2lvbkNvdW50fSBvdXQgb2YgJHtzdGF0cy50YXJnZXRzQ291bnR9LCAkeyhzdGF0cy5yZXNwb25zZVJhdGUgKiAxMDApLnRvRml4ZWQoMil9JWAsXG4gICAgICAgICAgICBzaG9ydDogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdBdmVyYWdlIHNjb3JlJyxcbiAgICAgICAgICAgIHZhbHVlOiBzdGF0cy5hdmVyYWdlU2NvcmUudG9GaXhlZCgyKSxcbiAgICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ0Nsb3NlZCBhdCcsXG4gICAgICAgICAgICB2YWx1ZTogdG9Mb2NhbERhdGUoc3VydmV5LmNsb3NpbmdEYXRlKVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgYXR0YWNobWVudHMucHVzaChzdW1tYXJ5KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBhdHRhY2htZW50c1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbWFuZC51c2FnZVxuICB9XG59XG4iXX0=