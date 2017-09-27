'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Team = require('../../team');
const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (teamID, userID, reason, IMID) {
    let team = yield Team.of(teamID);
    let survey = yield team.distributedSurvey;
    if (survey) {
      // check survey has closed
      if (survey.isClosed) {
        return team.bot.sendToChannel(IMID, 'Survey has already closed.');
      }
      // check has submitted score
      let reply = yield Reply.of(survey.id, userID);
      if (reply) {
        // check has replied reason
        if (reply.isCompleted) {
          return team.bot.sendToChannel(IMID, 'You have already finish the survey.');
        } else {
          reply.reason = reason;
          reply.isCompleted = true;
          reply.update();
          return team.bot.sendToChannel(IMID, 'Thank you for your reply.');
        }
      }
      // else ignore
    } else {
      return team.bot.sendToChannel(IMID, 'No survey is opening now.');
    }
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvc2F2ZVJlYXNvbi5qcyJdLCJuYW1lcyI6WyJUZWFtIiwicmVxdWlyZSIsIlJlcGx5IiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW1JRCIsInVzZXJJRCIsInJlYXNvbiIsIklNSUQiLCJ0ZWFtIiwib2YiLCJzdXJ2ZXkiLCJkaXN0cmlidXRlZFN1cnZleSIsImlzQ2xvc2VkIiwiYm90Iiwic2VuZFRvQ2hhbm5lbCIsInJlcGx5IiwiaWQiLCJpc0NvbXBsZXRlZCIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLE9BQU9DLFFBQVEsWUFBUixDQUFiO0FBQ0EsTUFBTUMsUUFBUUQsUUFBUSxhQUFSLENBQWQ7O0FBRUFFLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsTUFBUCxFQUFlQyxNQUFmLEVBQXVCQyxNQUF2QixFQUErQkMsSUFBL0IsRUFBd0M7QUFDdkQsUUFBSUMsT0FBTyxNQUFNVCxLQUFLVSxFQUFMLENBQVFMLE1BQVIsQ0FBakI7QUFDQSxRQUFJTSxTQUFTLE1BQU1GLEtBQUtHLGlCQUF4QjtBQUNBLFFBQUlELE1BQUosRUFBWTtBQUNWO0FBQ0EsVUFBSUEsT0FBT0UsUUFBWCxFQUFxQjtBQUNuQixlQUFPSixLQUFLSyxHQUFMLENBQVNDLGFBQVQsQ0FBdUJQLElBQXZCLEVBQTZCLDRCQUE3QixDQUFQO0FBQ0Q7QUFDRDtBQUNBLFVBQUlRLFFBQVEsTUFBTWQsTUFBTVEsRUFBTixDQUFTQyxPQUFPTSxFQUFoQixFQUFvQlgsTUFBcEIsQ0FBbEI7QUFDQSxVQUFJVSxLQUFKLEVBQVc7QUFDVDtBQUNBLFlBQUlBLE1BQU1FLFdBQVYsRUFBdUI7QUFDckIsaUJBQU9ULEtBQUtLLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QlAsSUFBdkIsRUFBNkIscUNBQTdCLENBQVA7QUFDRCxTQUZELE1BRU87QUFDTFEsZ0JBQU1ULE1BQU4sR0FBZUEsTUFBZjtBQUNBUyxnQkFBTUUsV0FBTixHQUFvQixJQUFwQjtBQUNBRixnQkFBTUcsTUFBTjtBQUNBLGlCQUFPVixLQUFLSyxHQUFMLENBQVNDLGFBQVQsQ0FBdUJQLElBQXZCLEVBQTZCLDJCQUE3QixDQUFQO0FBQ0Q7QUFDRjtBQUNEO0FBQ0QsS0FuQkQsTUFtQk87QUFDTCxhQUFPQyxLQUFLSyxHQUFMLENBQVNDLGFBQVQsQ0FBdUJQLElBQXZCLEVBQTZCLDJCQUE3QixDQUFQO0FBQ0Q7QUFDRixHQXpCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzYXZlUmVhc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL3RlYW0nKVxuY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuLi8uLi9yZXBseScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW1JRCwgdXNlcklELCByZWFzb24sIElNSUQpID0+IHtcbiAgbGV0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgbGV0IHN1cnZleSA9IGF3YWl0IHRlYW0uZGlzdHJpYnV0ZWRTdXJ2ZXlcbiAgaWYgKHN1cnZleSkge1xuICAgIC8vIGNoZWNrIHN1cnZleSBoYXMgY2xvc2VkXG4gICAgaWYgKHN1cnZleS5pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIHRlYW0uYm90LnNlbmRUb0NoYW5uZWwoSU1JRCwgJ1N1cnZleSBoYXMgYWxyZWFkeSBjbG9zZWQuJylcbiAgICB9XG4gICAgLy8gY2hlY2sgaGFzIHN1Ym1pdHRlZCBzY29yZVxuICAgIGxldCByZXBseSA9IGF3YWl0IFJlcGx5Lm9mKHN1cnZleS5pZCwgdXNlcklEKVxuICAgIGlmIChyZXBseSkge1xuICAgICAgLy8gY2hlY2sgaGFzIHJlcGxpZWQgcmVhc29uXG4gICAgICBpZiAocmVwbHkuaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRlYW0uYm90LnNlbmRUb0NoYW5uZWwoSU1JRCwgJ1lvdSBoYXZlIGFscmVhZHkgZmluaXNoIHRoZSBzdXJ2ZXkuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGx5LnJlYXNvbiA9IHJlYXNvblxuICAgICAgICByZXBseS5pc0NvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgcmVwbHkudXBkYXRlKClcbiAgICAgICAgcmV0dXJuIHRlYW0uYm90LnNlbmRUb0NoYW5uZWwoSU1JRCwgJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseS4nKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlnbm9yZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0ZWFtLmJvdC5zZW5kVG9DaGFubmVsKElNSUQsICdObyBzdXJ2ZXkgaXMgb3BlbmluZyBub3cuJylcbiAgfVxufVxuIl19