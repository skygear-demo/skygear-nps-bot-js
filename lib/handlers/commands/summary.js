'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');
const { toLocalDate } = require('../../util');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, userID, [$1, ...rest]) {
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
        return 'No survey found';
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

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9zdW1tYXJ5LmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwidG9Mb2NhbERhdGUiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJ1c2VySUQiLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJhdHRhY2htZW50cyIsInN1cnZleSIsInN0YXRzIiwic3VtbWFyeSIsInRpdGxlIiwiZGlzdHJpYnV0aW9uRGF0ZSIsImZpZWxkcyIsInZhbHVlIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsInNob3J0IiwiYXZlcmFnZVNjb3JlIiwiY2xvc2luZ0RhdGUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTSxFQUFFQyxXQUFGLEtBQWtCRCxRQUFRLFlBQVIsQ0FBeEI7O0FBRUEsTUFBTUUsZ0JBQWdCLENBQ3BCLE9BRG9CLENBQXRCOztBQUlBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsTUFBYixFQUFxQixDQUFDQyxFQUFELEVBQUssR0FBR0MsSUFBUixDQUFyQixFQUF1QztBQUN0RCxVQUFNQyxVQUFVVixRQUFRVSxPQUFSLENBQWdCLGNBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsWUFBTUMsa0JBQWtCQyxTQUFTTCxFQUFULENBQXhCOztBQUVBLFVBQUlNLE9BQUo7QUFDQSxVQUFJRixlQUFKLEVBQXFCO0FBQUU7QUFDckJFLGtCQUFVLE1BQU1SLEtBQUtTLFVBQUwsQ0FBZ0JILGVBQWhCLENBQWhCO0FBQ0QsT0FGRCxNQUVPLElBQUlULGNBQWNhLFFBQWQsQ0FBdUJSLEVBQXZCLENBQUosRUFBZ0M7QUFDckNNLGtCQUFVLE1BQU1SLEtBQUtTLFVBQUwsRUFBaEI7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPTCxRQUFRTyxLQUFmO0FBQ0Q7O0FBRUQsVUFBSUgsUUFBUUgsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixlQUFPLGlCQUFQO0FBQ0Q7O0FBRUQsWUFBTU8sY0FBYyxFQUFwQjtBQUNBLFdBQUssSUFBSUMsTUFBVCxJQUFtQkwsT0FBbkIsRUFBNEI7QUFDMUIsY0FBTU0sUUFBUSxNQUFNRCxPQUFPQyxLQUEzQjtBQUNBLGNBQU1DLFVBQVU7QUFDZEMsaUJBQVEsNkJBQTRCcEIsWUFBWWlCLE9BQU9JLGdCQUFuQixDQUFxQyxFQUQzRDtBQUVkQyxrQkFBUSxDQUNOO0FBQ0VGLG1CQUFPLGVBRFQ7QUFFRUcsbUJBQVEsR0FBRUwsTUFBTU0sZUFBZ0IsV0FBVU4sTUFBTU8sWUFBYSxLQUFJLENBQUNQLE1BQU1RLFlBQU4sR0FBcUIsR0FBdEIsRUFBMkJDLE9BQTNCLENBQW1DLENBQW5DLENBQXNDLEdBRnpHO0FBR0VDLG1CQUFPO0FBSFQsV0FETSxFQU1OO0FBQ0VSLG1CQUFPLGVBRFQ7QUFFRUcsbUJBQU9MLE1BQU1XLFlBQU4sQ0FBbUJGLE9BQW5CLENBQTJCLENBQTNCLENBRlQ7QUFHRUMsbUJBQU87QUFIVCxXQU5NLEVBV047QUFDRVIsbUJBQU8sV0FEVDtBQUVFRyxtQkFBT3ZCLFlBQVlpQixPQUFPYSxXQUFuQjtBQUZULFdBWE07QUFGTSxTQUFoQjtBQW1CQWQsb0JBQVllLElBQVosQ0FBaUJaLE9BQWpCO0FBQ0Q7O0FBRUQsYUFBTztBQUNMSDtBQURLLE9BQVA7QUFHRCxLQTVDRCxNQTRDTztBQUNMLGFBQU9SLFFBQVFPLEtBQWY7QUFDRDtBQUNGLEdBbEREOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN1bW1hcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5jb25zdCB7IHRvTG9jYWxEYXRlIH0gPSByZXF1aXJlKCcuLi8uLi91dGlsJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCB1c2VySUQsIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1zdW1tYXJ5J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBudW1iZXJPZlN1cnZleXMgPSBwYXJzZUludCgkMSlcblxuICAgIGxldCBzdXJ2ZXlzXG4gICAgaWYgKG51bWJlck9mU3VydmV5cykgeyAvLyBpZiAkMSBpcyBhIG51bWJlciwgcGFyc2UgIT0gTmFOXG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKG51bWJlck9mU3VydmV5cylcbiAgICB9IGVsc2UgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgICB9XG5cbiAgICBpZiAoc3VydmV5cy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJ05vIHN1cnZleSBmb3VuZCdcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2htZW50cyA9IFtdXG4gICAgZm9yIChsZXQgc3VydmV5IG9mIHN1cnZleXMpIHtcbiAgICAgIGNvbnN0IHN0YXRzID0gYXdhaXQgc3VydmV5LnN0YXRzXG4gICAgICBjb25zdCBzdW1tYXJ5ID0ge1xuICAgICAgICB0aXRsZTogYFN1bW1hcnkgb2Ygc3VydmV5IHNlbnQgYXQgJHt0b0xvY2FsRGF0ZShzdXJ2ZXkuZGlzdHJpYnV0aW9uRGF0ZSl9YCxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdSZXNwb25zZSByYXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiBgJHtzdGF0cy5zdWJtaXNzaW9uQ291bnR9IG91dCBvZiAke3N0YXRzLnRhcmdldHNDb3VudH0sICR7KHN0YXRzLnJlc3BvbnNlUmF0ZSAqIDEwMCkudG9GaXhlZCgyKX0lYCxcbiAgICAgICAgICAgIHNob3J0OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ0F2ZXJhZ2Ugc2NvcmUnLFxuICAgICAgICAgICAgdmFsdWU6IHN0YXRzLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpLFxuICAgICAgICAgICAgc2hvcnQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ2xvc2VkIGF0JyxcbiAgICAgICAgICAgIHZhbHVlOiB0b0xvY2FsRGF0ZShzdXJ2ZXkuY2xvc2luZ0RhdGUpXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICBhdHRhY2htZW50cy5wdXNoKHN1bW1hcnkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF0dGFjaG1lbnRzXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21tYW5kLnVzYWdlXG4gIH1cbn1cbiJdfQ==