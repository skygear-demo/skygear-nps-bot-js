'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const message = require('../../message');
const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, responseURL, { score, reason }) {
    score = parseInt(score);
    if (isNaN(score) || score < 1 || score > 10) {
      return {
        errors: [{
          name: 'score',
          error: 'Invalid score'
        }]
      };
    }
    yield Reply.create(surveyID, score, reason || '');
    axios.post(responseURL, {
      text: message.survey.acknowledgement
    });
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3N1Ym1pdFN1cnZleS5qcyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJtZXNzYWdlIiwiUmVwbHkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5SUQiLCJyZXNwb25zZVVSTCIsInNjb3JlIiwicmVhc29uIiwicGFyc2VJbnQiLCJpc05hTiIsImVycm9ycyIsIm5hbWUiLCJlcnJvciIsImNyZWF0ZSIsInBvc3QiLCJ0ZXh0Iiwic3VydmV5IiwiYWNrbm93bGVkZ2VtZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNRSxRQUFRRixRQUFRLGFBQVIsQ0FBZDs7QUFFQUcsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxRQUFQLEVBQWlCQyxXQUFqQixFQUE4QixFQUFFQyxLQUFGLEVBQVNDLE1BQVQsRUFBOUIsRUFBb0Q7QUFDbkVELFlBQVFFLFNBQVNGLEtBQVQsQ0FBUjtBQUNBLFFBQUlHLE1BQU1ILEtBQU4sS0FBZ0JBLFFBQVEsQ0FBeEIsSUFBNkJBLFFBQVEsRUFBekMsRUFBNkM7QUFDM0MsYUFBTztBQUNMSSxnQkFBUSxDQUNOO0FBQ0VDLGdCQUFNLE9BRFI7QUFFRUMsaUJBQU87QUFGVCxTQURNO0FBREgsT0FBUDtBQVFEO0FBQ0QsVUFBTVgsTUFBTVksTUFBTixDQUFhVCxRQUFiLEVBQXVCRSxLQUF2QixFQUE4QkMsVUFBVSxFQUF4QyxDQUFOO0FBQ0FULFVBQU1nQixJQUFOLENBQVdULFdBQVgsRUFBd0I7QUFDdEJVLFlBQU1mLFFBQVFnQixNQUFSLENBQWVDO0FBREMsS0FBeEI7QUFHRCxHQWhCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdWJtaXRTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgcmVzcG9uc2VVUkwsIHsgc2NvcmUsIHJlYXNvbiB9KSA9PiB7XG4gIHNjb3JlID0gcGFyc2VJbnQoc2NvcmUpXG4gIGlmIChpc05hTihzY29yZSkgfHwgc2NvcmUgPCAxIHx8IHNjb3JlID4gMTApIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnc2NvcmUnLFxuICAgICAgICAgIGVycm9yOiAnSW52YWxpZCBzY29yZSdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuICBhd2FpdCBSZXBseS5jcmVhdGUoc3VydmV5SUQsIHNjb3JlLCByZWFzb24gfHwgJycpXG4gIGF4aW9zLnBvc3QocmVzcG9uc2VVUkwsIHtcbiAgICB0ZXh0OiBtZXNzYWdlLnN1cnZleS5hY2tub3dsZWRnZW1lbnRcbiAgfSlcbn1cbiJdfQ==