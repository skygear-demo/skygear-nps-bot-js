'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const message = require('../../message');
const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, userID, responseURL, { score, reason }) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3N1Ym1pdFN1cnZleS5qcyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJtZXNzYWdlIiwiUmVwbHkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5SUQiLCJ1c2VySUQiLCJyZXNwb25zZVVSTCIsInNjb3JlIiwicmVhc29uIiwicGFyc2VJbnQiLCJpc05hTiIsImVycm9ycyIsIm5hbWUiLCJlcnJvciIsImNyZWF0ZSIsInBvc3QiLCJ0ZXh0Iiwic3VydmV5IiwiYWNrbm93bGVkZ2VtZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNRSxRQUFRRixRQUFRLGFBQVIsQ0FBZDs7QUFFQUcsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFPQyxRQUFQLEVBQWlCQyxNQUFqQixFQUF5QkMsV0FBekIsRUFBc0MsRUFBRUMsS0FBRixFQUFTQyxNQUFULEVBQXRDLEVBQTREO0FBQzNFRCxZQUFRRSxTQUFTRixLQUFULENBQVI7QUFDQSxRQUFJRyxNQUFNSCxLQUFOLEtBQWdCQSxRQUFRLENBQXhCLElBQTZCQSxRQUFRLEVBQXpDLEVBQTZDO0FBQzNDLGFBQU87QUFDTEksZ0JBQVEsQ0FDTjtBQUNFQyxnQkFBTSxPQURSO0FBRUVDLGlCQUFPO0FBRlQsU0FETTtBQURILE9BQVA7QUFRRDtBQUNELFVBQU1aLE1BQU1hLE1BQU4sQ0FBYVYsUUFBYixFQUF1QkMsTUFBdkIsRUFBK0JFLEtBQS9CLEVBQXNDQyxVQUFVLEVBQWhELENBQU47QUFDQVYsVUFBTWlCLElBQU4sQ0FBV1QsV0FBWCxFQUF3QjtBQUN0QlUsWUFBTWhCLFFBQVFpQixNQUFSLENBQWVDO0FBREMsS0FBeEI7QUFHRCxHQWhCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzdWJtaXRTdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcbmNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgdXNlcklELCByZXNwb25zZVVSTCwgeyBzY29yZSwgcmVhc29uIH0pID0+IHtcbiAgc2NvcmUgPSBwYXJzZUludChzY29yZSlcbiAgaWYgKGlzTmFOKHNjb3JlKSB8fCBzY29yZSA8IDEgfHwgc2NvcmUgPiAxMCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgZXJyb3I6ICdJbnZhbGlkIHNjb3JlJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG4gIGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlcklELCBzY29yZSwgcmVhc29uIHx8ICcnKVxuICBheGlvcy5wb3N0KHJlc3BvbnNlVVJMLCB7XG4gICAgdGV4dDogbWVzc2FnZS5zdXJ2ZXkuYWNrbm93bGVkZ2VtZW50XG4gIH0pXG59XG4iXX0=