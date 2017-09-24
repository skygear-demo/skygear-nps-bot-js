'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Reply = require('../../reply');
const Survey = require('../../survey');

/**
 * id: 'survey/3b9f8f98-f993-4e1d-81c3-a451e483306b', for skygear.Reference
 * _id: '3b9f8f98-f993-4e1d-81c3-a451e483306b', for query
 */
module.exports = (() => {
  var _ref = _asyncToGenerator(function* (userID, { surveyID, score }) {
    // check survey has closed
    let survey = yield Survey.of(surveyID.substring(7)); // id => _id
    if (survey.isClosed) {
      return 'Survey has already closed.';
    }

    // check has replied score
    let reply = yield Reply.of(surveyID, userID);
    if (reply) {
      return 'You have already replied the question.';
    }

    // create reply record
    reply = yield Reply.create(surveyID, userID, score);
    return {
      text: `Great! Now please tell me a bit more about why you rated ${score}?`,
      attachments: [{
        fallback: 'You are unable to skip this question.',
        callback_id: 'completeReply',
        actions: [{
          name: 'Skip',
          text: 'Skip',
          type: 'button',
          value: JSON.stringify({
            surveyID
          })
        }]
      }]
    };
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL3NhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24uanMiXSwibmFtZXMiOlsiUmVwbHkiLCJyZXF1aXJlIiwiU3VydmV5IiwibW9kdWxlIiwiZXhwb3J0cyIsInVzZXJJRCIsInN1cnZleUlEIiwic2NvcmUiLCJzdXJ2ZXkiLCJvZiIsInN1YnN0cmluZyIsImlzQ2xvc2VkIiwicmVwbHkiLCJjcmVhdGUiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJmYWxsYmFjayIsImNhbGxiYWNrX2lkIiwiYWN0aW9ucyIsIm5hbWUiLCJ0eXBlIiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjs7QUFFQTs7OztBQUlBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLE1BQVAsRUFBZSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosRUFBZixFQUF1QztBQUN0RDtBQUNBLFFBQUlDLFNBQVMsTUFBTU4sT0FBT08sRUFBUCxDQUFVSCxTQUFTSSxTQUFULENBQW1CLENBQW5CLENBQVYsQ0FBbkIsQ0FGc0QsQ0FFRjtBQUNwRCxRQUFJRixPQUFPRyxRQUFYLEVBQXFCO0FBQ25CLGFBQU8sNEJBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQUlDLFFBQVEsTUFBTVosTUFBTVMsRUFBTixDQUFTSCxRQUFULEVBQW1CRCxNQUFuQixDQUFsQjtBQUNBLFFBQUlPLEtBQUosRUFBVztBQUNULGFBQU8sd0NBQVA7QUFDRDs7QUFFRDtBQUNBQSxZQUFRLE1BQU1aLE1BQU1hLE1BQU4sQ0FBYVAsUUFBYixFQUF1QkQsTUFBdkIsRUFBK0JFLEtBQS9CLENBQWQ7QUFDQSxXQUFPO0FBQ0xPLFlBQU8sNERBQTJEUCxLQUFNLEdBRG5FO0FBRUxRLG1CQUFhLENBQ1g7QUFDRUMsa0JBQVUsdUNBRFo7QUFFRUMscUJBQWEsZUFGZjtBQUdFQyxpQkFBUyxDQUNQO0FBQ0VDLGdCQUFNLE1BRFI7QUFFRUwsZ0JBQU0sTUFGUjtBQUdFTSxnQkFBTSxRQUhSO0FBSUVDLGlCQUFPQyxLQUFLQyxTQUFMLENBQWU7QUFDcEJqQjtBQURvQixXQUFmO0FBSlQsU0FETztBQUhYLE9BRFc7QUFGUixLQUFQO0FBbUJELEdBbENEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNhdmVTY29yZUFuZFJlcXVlc3RSZWFzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZXBseSA9IHJlcXVpcmUoJy4uLy4uL3JlcGx5JylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG5cbi8qKlxuICogaWQ6ICdzdXJ2ZXkvM2I5ZjhmOTgtZjk5My00ZTFkLTgxYzMtYTQ1MWU0ODMzMDZiJywgZm9yIHNreWdlYXIuUmVmZXJlbmNlXG4gKiBfaWQ6ICczYjlmOGY5OC1mOTkzLTRlMWQtODFjMy1hNDUxZTQ4MzMwNmInLCBmb3IgcXVlcnlcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodXNlcklELCB7IHN1cnZleUlELCBzY29yZSB9KSA9PiB7XG4gIC8vIGNoZWNrIHN1cnZleSBoYXMgY2xvc2VkXG4gIGxldCBzdXJ2ZXkgPSBhd2FpdCBTdXJ2ZXkub2Yoc3VydmV5SUQuc3Vic3RyaW5nKDcpKSAvLyBpZCA9PiBfaWRcbiAgaWYgKHN1cnZleS5pc0Nsb3NlZCkge1xuICAgIHJldHVybiAnU3VydmV5IGhhcyBhbHJlYWR5IGNsb3NlZC4nXG4gIH1cblxuICAvLyBjaGVjayBoYXMgcmVwbGllZCBzY29yZVxuICBsZXQgcmVwbHkgPSBhd2FpdCBSZXBseS5vZihzdXJ2ZXlJRCwgdXNlcklEKVxuICBpZiAocmVwbHkpIHtcbiAgICByZXR1cm4gJ1lvdSBoYXZlIGFscmVhZHkgcmVwbGllZCB0aGUgcXVlc3Rpb24uJ1xuICB9XG5cbiAgLy8gY3JlYXRlIHJlcGx5IHJlY29yZFxuICByZXBseSA9IGF3YWl0IFJlcGx5LmNyZWF0ZShzdXJ2ZXlJRCwgdXNlcklELCBzY29yZSlcbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiBgR3JlYXQhIE5vdyBwbGVhc2UgdGVsbCBtZSBhIGJpdCBtb3JlIGFib3V0IHdoeSB5b3UgcmF0ZWQgJHtzY29yZX0/YCxcbiAgICBhdHRhY2htZW50czogW1xuICAgICAge1xuICAgICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIHNraXAgdGhpcyBxdWVzdGlvbi4nLFxuICAgICAgICBjYWxsYmFja19pZDogJ2NvbXBsZXRlUmVwbHknLFxuICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1NraXAnLFxuICAgICAgICAgICAgdGV4dDogJ1NraXAnLFxuICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBzdXJ2ZXlJRFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdfQ==