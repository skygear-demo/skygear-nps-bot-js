'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.distributed;
  for (let survey of surveys) {
    let team = yield Team.of(survey.teamID);
    let replies = yield survey.replies;

    // Send notification to who did not submit a score, i.e. is target && no reply record
    let targetsID = Set(survey.targetsID);
    let respondentsID = Set(replies.map(function (reply) {
      return reply.respondent;
    }));
    let unresponedUsersID = targetsID.subtract(respondentsID);
    team.bot.sendToUsers(unresponedUsersID.toArray(), 'Please rate a score to help improve the team :) Your identity will be confidential.');

    // Sned notification to who did not provide a reason, i.e. replied but not completed
    let uncompletedRespondentsID = replies.filter(function (reply) {
      return !reply.isCompleted;
    }).map(function (reply) {
      return reply.respondent;
    });
    team.bot.sendToUsers(uncompletedRespondentsID, 'Would you like to tell me the reason? Or you might simply skip the question.');
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9yZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnRzLmpzIl0sIm5hbWVzIjpbIlNldCIsInJlcXVpcmUiLCJTdXJ2ZXkiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsInN1cnZleXMiLCJkaXN0cmlidXRlZCIsInN1cnZleSIsInRlYW0iLCJvZiIsInRlYW1JRCIsInJlcGxpZXMiLCJ0YXJnZXRzSUQiLCJyZXNwb25kZW50c0lEIiwibWFwIiwicmVwbHkiLCJyZXNwb25kZW50IiwidW5yZXNwb25lZFVzZXJzSUQiLCJzdWJ0cmFjdCIsImJvdCIsInNlbmRUb1VzZXJzIiwidG9BcnJheSIsInVuY29tcGxldGVkUmVzcG9uZGVudHNJRCIsImZpbHRlciIsImlzQ29tcGxldGVkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxFQUFFQSxHQUFGLEtBQVVDLFFBQVEsV0FBUixDQUFoQjtBQUNBLE1BQU1DLFNBQVNELFFBQVEsY0FBUixDQUFmO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxZQUFSLENBQWI7O0FBRUFHLE9BQU9DLE9BQVAscUJBQWlCLGFBQVk7QUFDM0IsTUFBSUMsVUFBVSxNQUFNSixPQUFPSyxXQUEzQjtBQUNBLE9BQUssSUFBSUMsTUFBVCxJQUFtQkYsT0FBbkIsRUFBNEI7QUFDMUIsUUFBSUcsT0FBTyxNQUFNTixLQUFLTyxFQUFMLENBQVFGLE9BQU9HLE1BQWYsQ0FBakI7QUFDQSxRQUFJQyxVQUFVLE1BQU1KLE9BQU9JLE9BQTNCOztBQUVBO0FBQ0EsUUFBSUMsWUFBWWIsSUFBSVEsT0FBT0ssU0FBWCxDQUFoQjtBQUNBLFFBQUlDLGdCQUFnQmQsSUFBSVksUUFBUUcsR0FBUixDQUFZO0FBQUEsYUFBU0MsTUFBTUMsVUFBZjtBQUFBLEtBQVosQ0FBSixDQUFwQjtBQUNBLFFBQUlDLG9CQUFvQkwsVUFBVU0sUUFBVixDQUFtQkwsYUFBbkIsQ0FBeEI7QUFDQUwsU0FBS1csR0FBTCxDQUFTQyxXQUFULENBQXFCSCxrQkFBa0JJLE9BQWxCLEVBQXJCLEVBQWtELHFGQUFsRDs7QUFFQTtBQUNBLFFBQUlDLDJCQUEyQlgsUUFBUVksTUFBUixDQUFlO0FBQUEsYUFBUyxDQUFDUixNQUFNUyxXQUFoQjtBQUFBLEtBQWYsRUFBNENWLEdBQTVDLENBQWdEO0FBQUEsYUFBU0MsTUFBTUMsVUFBZjtBQUFBLEtBQWhELENBQS9CO0FBQ0FSLFNBQUtXLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQkUsd0JBQXJCLEVBQStDLDhFQUEvQztBQUNEO0FBQ0YsQ0FoQkQiLCJmaWxlIjoicmVtaW5kVW5jb21wbGV0ZWRSZXNwb25kZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBzdXJ2ZXlzID0gYXdhaXQgU3VydmV5LmRpc3RyaWJ1dGVkXG4gIGZvciAobGV0IHN1cnZleSBvZiBzdXJ2ZXlzKSB7XG4gICAgbGV0IHRlYW0gPSBhd2FpdCBUZWFtLm9mKHN1cnZleS50ZWFtSUQpXG4gICAgbGV0IHJlcGxpZXMgPSBhd2FpdCBzdXJ2ZXkucmVwbGllc1xuXG4gICAgLy8gU2VuZCBub3RpZmljYXRpb24gdG8gd2hvIGRpZCBub3Qgc3VibWl0IGEgc2NvcmUsIGkuZS4gaXMgdGFyZ2V0ICYmIG5vIHJlcGx5IHJlY29yZFxuICAgIGxldCB0YXJnZXRzSUQgPSBTZXQoc3VydmV5LnRhcmdldHNJRClcbiAgICBsZXQgcmVzcG9uZGVudHNJRCA9IFNldChyZXBsaWVzLm1hcChyZXBseSA9PiByZXBseS5yZXNwb25kZW50KSlcbiAgICBsZXQgdW5yZXNwb25lZFVzZXJzSUQgPSB0YXJnZXRzSUQuc3VidHJhY3QocmVzcG9uZGVudHNJRClcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2Vycyh1bnJlc3BvbmVkVXNlcnNJRC50b0FycmF5KCksICdQbGVhc2UgcmF0ZSBhIHNjb3JlIHRvIGhlbHAgaW1wcm92ZSB0aGUgdGVhbSA6KSBZb3VyIGlkZW50aXR5IHdpbGwgYmUgY29uZmlkZW50aWFsLicpXG5cbiAgICAvLyBTbmVkIG5vdGlmaWNhdGlvbiB0byB3aG8gZGlkIG5vdCBwcm92aWRlIGEgcmVhc29uLCBpLmUuIHJlcGxpZWQgYnV0IG5vdCBjb21wbGV0ZWRcbiAgICBsZXQgdW5jb21wbGV0ZWRSZXNwb25kZW50c0lEID0gcmVwbGllcy5maWx0ZXIocmVwbHkgPT4gIXJlcGx5LmlzQ29tcGxldGVkKS5tYXAocmVwbHkgPT4gcmVwbHkucmVzcG9uZGVudClcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2Vycyh1bmNvbXBsZXRlZFJlc3BvbmRlbnRzSUQsICdXb3VsZCB5b3UgbGlrZSB0byB0ZWxsIG1lIHRoZSByZWFzb24/IE9yIHlvdSBtaWdodCBzaW1wbHkgc2tpcCB0aGUgcXVlc3Rpb24uJylcbiAgfVxufVxuIl19