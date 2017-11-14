'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const axios = require('axios');
const message = require('../../message');
const Reply = require('../../reply');
const Survey = require('../../survey');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, user, team, responseURL, { score, reason }) {
    const survey = yield Survey.of(surveyID);
    if (survey.isClosed) {
      return 'This survey has closed';
    }

    if (yield user.hasReplied(surveyID)) {
      return 'You have already answered';
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
    yield Reply.create(surveyID, user.id, score, reason || '');
    axios.post(responseURL, {
      text: message.survey.acknowledgement
    });
  });

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3N1Ym1pdFN1cnZleS5qcyJdLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJtZXNzYWdlIiwiUmVwbHkiLCJTdXJ2ZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5SUQiLCJ1c2VyIiwidGVhbSIsInJlc3BvbnNlVVJMIiwic2NvcmUiLCJyZWFzb24iLCJzdXJ2ZXkiLCJvZiIsImlzQ2xvc2VkIiwiaGFzUmVwbGllZCIsInBhcnNlSW50IiwiaXNOYU4iLCJlcnJvcnMiLCJuYW1lIiwiZXJyb3IiLCJjcmVhdGUiLCJpZCIsInBvc3QiLCJ0ZXh0IiwiYWNrbm93bGVkZ2VtZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7QUFDQSxNQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFDQSxNQUFNRSxRQUFRRixRQUFRLGFBQVIsQ0FBZDtBQUNBLE1BQU1HLFNBQVNILFFBQVEsY0FBUixDQUFmOztBQUVBSSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLFFBQVAsRUFBaUJDLElBQWpCLEVBQXVCQyxJQUF2QixFQUE2QkMsV0FBN0IsRUFBMEMsRUFBRUMsS0FBRixFQUFTQyxNQUFULEVBQTFDLEVBQWdFO0FBQy9FLFVBQU1DLFNBQVMsTUFBTVQsT0FBT1UsRUFBUCxDQUFVUCxRQUFWLENBQXJCO0FBQ0EsUUFBSU0sT0FBT0UsUUFBWCxFQUFxQjtBQUNuQixhQUFPLHdCQUFQO0FBQ0Q7O0FBRUQsUUFBSSxNQUFNUCxLQUFLUSxVQUFMLENBQWdCVCxRQUFoQixDQUFWLEVBQXFDO0FBQ25DLGFBQU8sMkJBQVA7QUFDRDs7QUFFREksWUFBUU0sU0FBU04sS0FBVCxDQUFSO0FBQ0EsUUFBSU8sTUFBTVAsS0FBTixLQUFnQkEsUUFBUSxDQUF4QixJQUE2QkEsUUFBUSxFQUF6QyxFQUE2QztBQUMzQyxhQUFPO0FBQ0xRLGdCQUFRLENBQ047QUFDRUMsZ0JBQU0sT0FEUjtBQUVFQyxpQkFBTztBQUZULFNBRE07QUFESCxPQUFQO0FBUUQ7QUFDRCxVQUFNbEIsTUFBTW1CLE1BQU4sQ0FBYWYsUUFBYixFQUF1QkMsS0FBS2UsRUFBNUIsRUFBZ0NaLEtBQWhDLEVBQXVDQyxVQUFVLEVBQWpELENBQU47QUFDQVosVUFBTXdCLElBQU4sQ0FBV2QsV0FBWCxFQUF3QjtBQUN0QmUsWUFBTXZCLFFBQVFXLE1BQVIsQ0FBZWE7QUFEQyxLQUF4QjtBQUdELEdBekJEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InN1Ym1pdFN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuLi8uLi9yZXBseScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChzdXJ2ZXlJRCwgdXNlciwgdGVhbSwgcmVzcG9uc2VVUkwsIHsgc2NvcmUsIHJlYXNvbiB9KSA9PiB7XG4gIGNvbnN0IHN1cnZleSA9IGF3YWl0IFN1cnZleS5vZihzdXJ2ZXlJRClcbiAgaWYgKHN1cnZleS5pc0Nsb3NlZCkge1xuICAgIHJldHVybiAnVGhpcyBzdXJ2ZXkgaGFzIGNsb3NlZCdcbiAgfVxuXG4gIGlmIChhd2FpdCB1c2VyLmhhc1JlcGxpZWQoc3VydmV5SUQpKSB7XG4gICAgcmV0dXJuICdZb3UgaGF2ZSBhbHJlYWR5IGFuc3dlcmVkJ1xuICB9XG5cbiAgc2NvcmUgPSBwYXJzZUludChzY29yZSlcbiAgaWYgKGlzTmFOKHNjb3JlKSB8fCBzY29yZSA8IDEgfHwgc2NvcmUgPiAxMCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdzY29yZScsXG4gICAgICAgICAgZXJyb3I6ICdJbnZhbGlkIHNjb3JlJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG4gIGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlci5pZCwgc2NvcmUsIHJlYXNvbiB8fCAnJylcbiAgYXhpb3MucG9zdChyZXNwb25zZVVSTCwge1xuICAgIHRleHQ6IG1lc3NhZ2Uuc3VydmV5LmFja25vd2xlZGdlbWVudFxuICB9KVxufVxuIl19