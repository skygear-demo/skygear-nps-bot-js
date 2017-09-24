'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Team = require('../../team');
const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (teamID, userID, reason, channelID) {
    let team = yield Team.of(teamID);
    let survey = yield team.openingSurvey;
    if (survey) {
      // check survey has closed
      if (survey.isClosed) {
        return team.bot.sendToChannel(channelID, 'Survey has already closed.');
      }

      // check has submitted score
      let reply = yield Reply.of(survey.id, userID);
      if (reply) {
        // check has replied reason
        if (reply.isCompleted) {
          return team.bot.sendToChannel(channelID, 'You have already finish the survey.');
        } else {
          reply.reason = reason;
          reply.isCompleted = true;
          reply.update();
          return team.bot.sendToChannel(channelID, 'Thank you for your reply.');
        }
      } else {
        // ignore
      }
    } else {
      return team.bot.sendToChannel(channelID, 'No survey is opening now.');
    }
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvc2F2ZVJlYXNvbi5qcyJdLCJuYW1lcyI6WyJUZWFtIiwicmVxdWlyZSIsIlJlcGx5IiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW1JRCIsInVzZXJJRCIsInJlYXNvbiIsImNoYW5uZWxJRCIsInRlYW0iLCJvZiIsInN1cnZleSIsIm9wZW5pbmdTdXJ2ZXkiLCJpc0Nsb3NlZCIsImJvdCIsInNlbmRUb0NoYW5uZWwiLCJyZXBseSIsImlkIiwiaXNDb21wbGV0ZWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxPQUFPQyxRQUFRLFlBQVIsQ0FBYjtBQUNBLE1BQU1DLFFBQVFELFFBQVEsYUFBUixDQUFkOztBQUVBRSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLE1BQVAsRUFBZUMsTUFBZixFQUF1QkMsTUFBdkIsRUFBK0JDLFNBQS9CLEVBQTZDO0FBQzVELFFBQUlDLE9BQU8sTUFBTVQsS0FBS1UsRUFBTCxDQUFRTCxNQUFSLENBQWpCO0FBQ0EsUUFBSU0sU0FBUyxNQUFNRixLQUFLRyxhQUF4QjtBQUNBLFFBQUlELE1BQUosRUFBWTtBQUNWO0FBQ0EsVUFBSUEsT0FBT0UsUUFBWCxFQUFxQjtBQUNuQixlQUFPSixLQUFLSyxHQUFMLENBQVNDLGFBQVQsQ0FBdUJQLFNBQXZCLEVBQWtDLDRCQUFsQyxDQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJUSxRQUFRLE1BQU1kLE1BQU1RLEVBQU4sQ0FBU0MsT0FBT00sRUFBaEIsRUFBb0JYLE1BQXBCLENBQWxCO0FBQ0EsVUFBSVUsS0FBSixFQUFXO0FBQ1Q7QUFDQSxZQUFJQSxNQUFNRSxXQUFWLEVBQXVCO0FBQ3JCLGlCQUFPVCxLQUFLSyxHQUFMLENBQVNDLGFBQVQsQ0FBdUJQLFNBQXZCLEVBQWtDLHFDQUFsQyxDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0xRLGdCQUFNVCxNQUFOLEdBQWVBLE1BQWY7QUFDQVMsZ0JBQU1FLFdBQU4sR0FBb0IsSUFBcEI7QUFDQUYsZ0JBQU1HLE1BQU47QUFDQSxpQkFBT1YsS0FBS0ssR0FBTCxDQUFTQyxhQUFULENBQXVCUCxTQUF2QixFQUFrQywyQkFBbEMsQ0FBUDtBQUNEO0FBQ0YsT0FWRCxNQVVPO0FBQ0w7QUFDRDtBQUNGLEtBckJELE1BcUJPO0FBQ0wsYUFBT0MsS0FBS0ssR0FBTCxDQUFTQyxhQUFULENBQXVCUCxTQUF2QixFQUFrQywyQkFBbEMsQ0FBUDtBQUNEO0FBQ0YsR0EzQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoic2F2ZVJlYXNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh0ZWFtSUQsIHVzZXJJRCwgcmVhc29uLCBjaGFubmVsSUQpID0+IHtcbiAgbGV0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHRlYW1JRClcbiAgbGV0IHN1cnZleSA9IGF3YWl0IHRlYW0ub3BlbmluZ1N1cnZleVxuICBpZiAoc3VydmV5KSB7XG4gICAgLy8gY2hlY2sgc3VydmV5IGhhcyBjbG9zZWRcbiAgICBpZiAoc3VydmV5LmlzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gdGVhbS5ib3Quc2VuZFRvQ2hhbm5lbChjaGFubmVsSUQsICdTdXJ2ZXkgaGFzIGFscmVhZHkgY2xvc2VkLicpXG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaGFzIHN1Ym1pdHRlZCBzY29yZVxuICAgIGxldCByZXBseSA9IGF3YWl0IFJlcGx5Lm9mKHN1cnZleS5pZCwgdXNlcklEKVxuICAgIGlmIChyZXBseSkge1xuICAgICAgLy8gY2hlY2sgaGFzIHJlcGxpZWQgcmVhc29uXG4gICAgICBpZiAocmVwbHkuaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRlYW0uYm90LnNlbmRUb0NoYW5uZWwoY2hhbm5lbElELCAnWW91IGhhdmUgYWxyZWFkeSBmaW5pc2ggdGhlIHN1cnZleS4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVwbHkucmVhc29uID0gcmVhc29uXG4gICAgICAgIHJlcGx5LmlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgICByZXBseS51cGRhdGUoKVxuICAgICAgICByZXR1cm4gdGVhbS5ib3Quc2VuZFRvQ2hhbm5lbChjaGFubmVsSUQsICdUaGFuayB5b3UgZm9yIHlvdXIgcmVwbHkuJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWdub3JlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB0ZWFtLmJvdC5zZW5kVG9DaGFubmVsKGNoYW5uZWxJRCwgJ05vIHN1cnZleSBpcyBvcGVuaW5nIG5vdy4nKVxuICB9XG59XG4iXX0=