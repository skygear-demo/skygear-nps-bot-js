'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const message = require('../../message');
const Reply = require('../../reply');
const Survey = require('../../survey');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, userID, responseURL, { score, reason }) {
    const survey = yield Survey.of(surveyID);
    if (survey.isClosed) {
      axios.post(responseURL, {
        text: 'This survey has closed'
      });
      return;
    }

    score = parseInt(score);
    if (isNaN(score) || score < 1 || score > 10) {
      return {
        errors: [{
          name: 'score',
          error: 'Invalid score'
        }]
      };
    }
    yield Reply.create(surveyID, userID, score, reason || '');
    axios.post(responseURL, {
      text: message.survey.acknowledgement
    });
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3N1Ym1pdFN1cnZleS5qcyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJtZXNzYWdlIiwiUmVwbHkiLCJTdXJ2ZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5SUQiLCJ1c2VySUQiLCJyZXNwb25zZVVSTCIsInNjb3JlIiwicmVhc29uIiwic3VydmV5Iiwib2YiLCJpc0Nsb3NlZCIsInBvc3QiLCJ0ZXh0IiwicGFyc2VJbnQiLCJpc05hTiIsImVycm9ycyIsIm5hbWUiLCJlcnJvciIsImNyZWF0ZSIsImFja25vd2xlZGdlbWVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0FBQ0EsTUFBTUMsVUFBVUQsUUFBUSxlQUFSLENBQWhCO0FBQ0EsTUFBTUUsUUFBUUYsUUFBUSxhQUFSLENBQWQ7QUFDQSxNQUFNRyxTQUFTSCxRQUFRLGNBQVIsQ0FBZjs7QUFFQUksT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxRQUFQLEVBQWlCQyxNQUFqQixFQUF5QkMsV0FBekIsRUFBc0MsRUFBRUMsS0FBRixFQUFTQyxNQUFULEVBQXRDLEVBQTREO0FBQzNFLFVBQU1DLFNBQVMsTUFBTVIsT0FBT1MsRUFBUCxDQUFVTixRQUFWLENBQXJCO0FBQ0EsUUFBSUssT0FBT0UsUUFBWCxFQUFxQjtBQUNuQmQsWUFBTWUsSUFBTixDQUFXTixXQUFYLEVBQXdCO0FBQ3RCTyxjQUFNO0FBRGdCLE9BQXhCO0FBR0E7QUFDRDs7QUFFRE4sWUFBUU8sU0FBU1AsS0FBVCxDQUFSO0FBQ0EsUUFBSVEsTUFBTVIsS0FBTixLQUFnQkEsUUFBUSxDQUF4QixJQUE2QkEsUUFBUSxFQUF6QyxFQUE2QztBQUMzQyxhQUFPO0FBQ0xTLGdCQUFRLENBQ047QUFDRUMsZ0JBQU0sT0FEUjtBQUVFQyxpQkFBTztBQUZULFNBRE07QUFESCxPQUFQO0FBUUQ7QUFDRCxVQUFNbEIsTUFBTW1CLE1BQU4sQ0FBYWYsUUFBYixFQUF1QkMsTUFBdkIsRUFBK0JFLEtBQS9CLEVBQXNDQyxVQUFVLEVBQWhELENBQU47QUFDQVgsVUFBTWUsSUFBTixDQUFXTixXQUFYLEVBQXdCO0FBQ3RCTyxZQUFNZCxRQUFRVSxNQUFSLENBQWVXO0FBREMsS0FBeEI7QUFHRCxHQXhCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdWJtaXRTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoc3VydmV5SUQsIHVzZXJJRCwgcmVzcG9uc2VVUkwsIHsgc2NvcmUsIHJlYXNvbiB9KSA9PiB7XG4gIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5vZihzdXJ2ZXlJRClcbiAgaWYgKHN1cnZleS5pc0Nsb3NlZCkge1xuICAgIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICAgIHRleHQ6ICdUaGlzIHN1cnZleSBoYXMgY2xvc2VkJ1xuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBzY29yZSA9IHBhcnNlSW50KHNjb3JlKVxuICBpZiAoaXNOYU4oc2NvcmUpIHx8IHNjb3JlIDwgMSB8fCBzY29yZSA+IDEwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3Njb3JlJyxcbiAgICAgICAgICBlcnJvcjogJ0ludmFsaWQgc2NvcmUnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbiAgYXdhaXQgUmVwbHkuY3JlYXRlKHN1cnZleUlELCB1c2VySUQsIHNjb3JlLCByZWFzb24gfHwgJycpXG4gIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICB0ZXh0OiBtZXNzYWdlLnN1cnZleS5hY2tub3dsZWRnZW1lbnRcbiAgfSlcbn1cbiJdfQ==