'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const moment = require('moment');
const message = require('../../message');

const VALID_OPTIONS = ['--all'];

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, userID, [$1, ...rest]) {
    const command = message.command['/nps-export-result'];

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
        return '/nps-export-result: No closed survey found';
      }

      for (let survey of surveys) {
        const replies = (yield survey.replies).map(function (reply) {
          return `\r\n${reply.score},${reply.reason}`;
        });
        const stats = yield survey.stats;
        yield team.bot.upload('score,reason' + replies, `Response rate: ${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%\nAverage score: ${stats.averageScore.toFixed(2)}`, `report-${moment(survey.distributionDate).format('YYYY-MM-DD')}`, userID);
      }

      return '/nps-export-result:';
    } else {
      return command.usage;
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9jb21tYW5kcy9leHBvcnRSZXN1bHQuanMiXSwibmFtZXMiOlsibW9tZW50IiwicmVxdWlyZSIsIm1lc3NhZ2UiLCJWQUxJRF9PUFRJT05TIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJ1c2VySUQiLCIkMSIsInJlc3QiLCJjb21tYW5kIiwibGVuZ3RoIiwibnVtYmVyT2ZTdXJ2ZXlzIiwicGFyc2VJbnQiLCJzdXJ2ZXlzIiwiZ2V0U3VydmV5cyIsImluY2x1ZGVzIiwidXNhZ2UiLCJzdXJ2ZXkiLCJyZXBsaWVzIiwibWFwIiwicmVwbHkiLCJzY29yZSIsInJlYXNvbiIsInN0YXRzIiwiYm90IiwidXBsb2FkIiwic3VibWlzc2lvbkNvdW50IiwidGFyZ2V0c0NvdW50IiwicmVzcG9uc2VSYXRlIiwidG9GaXhlZCIsImF2ZXJhZ2VTY29yZSIsImRpc3RyaWJ1dGlvbkRhdGUiLCJmb3JtYXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxTQUFTQyxRQUFRLFFBQVIsQ0FBZjtBQUNBLE1BQU1DLFVBQVVELFFBQVEsZUFBUixDQUFoQjs7QUFFQSxNQUFNRSxnQkFBZ0IsQ0FDcEIsT0FEb0IsQ0FBdEI7O0FBSUFDLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsSUFBUCxFQUFhQyxNQUFiLEVBQXFCLENBQUNDLEVBQUQsRUFBSyxHQUFHQyxJQUFSLENBQXJCLEVBQXVDO0FBQ3RELFVBQU1DLFVBQVVSLFFBQVFRLE9BQVIsQ0FBZ0Isb0JBQWhCLENBQWhCOztBQUVBLFFBQUlGLE1BQU1DLEtBQUtFLE1BQUwsS0FBZ0IsQ0FBMUIsRUFBNkI7QUFDM0IsWUFBTUMsa0JBQWtCQyxTQUFTTCxFQUFULENBQXhCOztBQUVBLFVBQUlNLE9BQUo7QUFDQSxVQUFJRixlQUFKLEVBQXFCO0FBQUU7QUFDckJFLGtCQUFVLE1BQU1SLEtBQUtTLFVBQUwsQ0FBZ0JILGVBQWhCLENBQWhCO0FBQ0QsT0FGRCxNQUVPLElBQUlULGNBQWNhLFFBQWQsQ0FBdUJSLEVBQXZCLENBQUosRUFBZ0M7QUFDckNNLGtCQUFVLE1BQU1SLEtBQUtTLFVBQUwsRUFBaEI7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPTCxRQUFRTyxLQUFmO0FBQ0Q7O0FBRUQsVUFBSUgsUUFBUUgsTUFBUixHQUFpQixDQUFyQixFQUF3QjtBQUN0QixlQUFPLDRDQUFQO0FBQ0Q7O0FBRUQsV0FBSyxJQUFJTyxNQUFULElBQW1CSixPQUFuQixFQUE0QjtBQUMxQixjQUFNSyxVQUFVLENBQUMsTUFBTUQsT0FBT0MsT0FBZCxFQUF1QkMsR0FBdkIsQ0FBMkI7QUFBQSxpQkFBVSxPQUFNQyxNQUFNQyxLQUFNLElBQUdELE1BQU1FLE1BQU8sRUFBNUM7QUFBQSxTQUEzQixDQUFoQjtBQUNBLGNBQU1DLFFBQVEsTUFBTU4sT0FBT00sS0FBM0I7QUFDQSxjQUFNbEIsS0FBS21CLEdBQUwsQ0FBU0MsTUFBVCxDQUFnQixpQkFBaUJQLE9BQWpDLEVBQTJDLGtCQUFpQkssTUFBTUcsZUFBZ0IsV0FBVUgsTUFBTUksWUFBYSxLQUFJLENBQUNKLE1BQU1LLFlBQU4sR0FBcUIsR0FBdEIsRUFBMkJDLE9BQTNCLENBQW1DLENBQW5DLENBQXNDLHFCQUFvQk4sTUFBTU8sWUFBTixDQUFtQkQsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FBOEIsRUFBM00sRUFBK00sVUFBUzlCLE9BQU9rQixPQUFPYyxnQkFBZCxFQUFnQ0MsTUFBaEMsQ0FBdUMsWUFBdkMsQ0FBcUQsRUFBN1EsRUFBZ1IxQixNQUFoUixDQUFOO0FBQ0Q7O0FBRUQsYUFBTyxxQkFBUDtBQUNELEtBdkJELE1BdUJPO0FBQ0wsYUFBT0csUUFBUU8sS0FBZjtBQUNEO0FBQ0YsR0E3QkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiZXhwb3J0UmVzdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50JylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxuY29uc3QgVkFMSURfT1BUSU9OUyA9IFtcbiAgJy0tYWxsJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtLCB1c2VySUQsIFskMSwgLi4ucmVzdF0pID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IG1lc3NhZ2UuY29tbWFuZFsnL25wcy1leHBvcnQtcmVzdWx0J11cblxuICBpZiAoJDEgJiYgcmVzdC5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBudW1iZXJPZlN1cnZleXMgPSBwYXJzZUludCgkMSlcblxuICAgIGxldCBzdXJ2ZXlzXG4gICAgaWYgKG51bWJlck9mU3VydmV5cykgeyAvLyBpZiAkMSBpcyBhIG51bWJlciwgcGFyc2UgIT0gTmFOXG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKG51bWJlck9mU3VydmV5cylcbiAgICB9IGVsc2UgaWYgKFZBTElEX09QVElPTlMuaW5jbHVkZXMoJDEpKSB7XG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgdGVhbS5nZXRTdXJ2ZXlzKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgICB9XG5cbiAgICBpZiAoc3VydmV5cy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gJy9ucHMtZXhwb3J0LXJlc3VsdDogTm8gY2xvc2VkIHN1cnZleSBmb3VuZCdcbiAgICB9XG5cbiAgICBmb3IgKGxldCBzdXJ2ZXkgb2Ygc3VydmV5cykge1xuICAgICAgY29uc3QgcmVwbGllcyA9IChhd2FpdCBzdXJ2ZXkucmVwbGllcykubWFwKHJlcGx5ID0+IGBcXHJcXG4ke3JlcGx5LnNjb3JlfSwke3JlcGx5LnJlYXNvbn1gKVxuICAgICAgY29uc3Qgc3RhdHMgPSBhd2FpdCBzdXJ2ZXkuc3RhdHNcbiAgICAgIGF3YWl0IHRlYW0uYm90LnVwbG9hZCgnc2NvcmUscmVhc29uJyArIHJlcGxpZXMsIGBSZXNwb25zZSByYXRlOiAke3N0YXRzLnN1Ym1pc3Npb25Db3VudH0gb3V0IG9mICR7c3RhdHMudGFyZ2V0c0NvdW50fSwgJHsoc3RhdHMucmVzcG9uc2VSYXRlICogMTAwKS50b0ZpeGVkKDIpfSVcXG5BdmVyYWdlIHNjb3JlOiAke3N0YXRzLmF2ZXJhZ2VTY29yZS50b0ZpeGVkKDIpfWAsIGByZXBvcnQtJHttb21lbnQoc3VydmV5LmRpc3RyaWJ1dGlvbkRhdGUpLmZvcm1hdCgnWVlZWS1NTS1ERCcpfWAsIHVzZXJJRClcbiAgICB9XG5cbiAgICByZXR1cm4gJy9ucHMtZXhwb3J0LXJlc3VsdDonXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1hbmQudXNhZ2VcbiAgfVxufVxuIl19