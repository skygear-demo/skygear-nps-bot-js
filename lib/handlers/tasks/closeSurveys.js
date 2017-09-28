'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.candidatesOfClosing;
  for (let survey of surveys) {
    let team = yield Team.of(survey.teamID);
    let replies = yield survey.replies;

    // close survey
    survey.isClosed = true;
    yield survey.update();

    // Send notification to who did not complete the reply
    let targetsID = Set(survey.targetsID);
    let completedRespondentsID = Set(replies.filter(function (reply) {
      return reply.isCompleted;
    }).map(function (reply) {
      return reply.respondent;
    }));
    let uncompletedRespondentsID = targetsID.subtract(completedRespondentsID);
    team.bot.sendToUsers(uncompletedRespondentsID.toArray(), 'Survey has closed.');

    // close all uncompleted replies
    for (let reply of replies) {
      if (!reply.isCompleted) {
        reply.isCompleted = true;
        yield reply.update();
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9jbG9zZVN1cnZleXMuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsImNhbmRpZGF0ZXNPZkNsb3NpbmciLCJzdXJ2ZXkiLCJ0ZWFtIiwib2YiLCJ0ZWFtSUQiLCJyZXBsaWVzIiwiaXNDbG9zZWQiLCJ1cGRhdGUiLCJ0YXJnZXRzSUQiLCJjb21wbGV0ZWRSZXNwb25kZW50c0lEIiwiZmlsdGVyIiwicmVwbHkiLCJpc0NvbXBsZXRlZCIsIm1hcCIsInJlc3BvbmRlbnQiLCJ1bmNvbXBsZXRlZFJlc3BvbmRlbnRzSUQiLCJzdWJ0cmFjdCIsImJvdCIsInNlbmRUb1VzZXJzIiwidG9BcnJheSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sRUFBRUEsR0FBRixLQUFVQyxRQUFRLFdBQVIsQ0FBaEI7QUFDQSxNQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjtBQUNBLE1BQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiOztBQUVBRyxPQUFPQyxPQUFQLHFCQUFpQixhQUFZO0FBQzNCLE1BQUlDLFVBQVUsTUFBTUosT0FBT0ssbUJBQTNCO0FBQ0EsT0FBSyxJQUFJQyxNQUFULElBQW1CRixPQUFuQixFQUE0QjtBQUMxQixRQUFJRyxPQUFPLE1BQU1OLEtBQUtPLEVBQUwsQ0FBUUYsT0FBT0csTUFBZixDQUFqQjtBQUNBLFFBQUlDLFVBQVUsTUFBTUosT0FBT0ksT0FBM0I7O0FBRUE7QUFDQUosV0FBT0ssUUFBUCxHQUFrQixJQUFsQjtBQUNBLFVBQU1MLE9BQU9NLE1BQVAsRUFBTjs7QUFFQTtBQUNBLFFBQUlDLFlBQVlmLElBQUlRLE9BQU9PLFNBQVgsQ0FBaEI7QUFDQSxRQUFJQyx5QkFBeUJoQixJQUFJWSxRQUFRSyxNQUFSLENBQWU7QUFBQSxhQUFTQyxNQUFNQyxXQUFmO0FBQUEsS0FBZixFQUEyQ0MsR0FBM0MsQ0FBK0M7QUFBQSxhQUFTRixNQUFNRyxVQUFmO0FBQUEsS0FBL0MsQ0FBSixDQUE3QjtBQUNBLFFBQUlDLDJCQUEyQlAsVUFBVVEsUUFBVixDQUFtQlAsc0JBQW5CLENBQS9CO0FBQ0FQLFNBQUtlLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQkgseUJBQXlCSSxPQUF6QixFQUFyQixFQUF5RCxvQkFBekQ7O0FBRUE7QUFDQSxTQUFLLElBQUlSLEtBQVQsSUFBa0JOLE9BQWxCLEVBQTJCO0FBQ3pCLFVBQUksQ0FBQ00sTUFBTUMsV0FBWCxFQUF3QjtBQUN0QkQsY0FBTUMsV0FBTixHQUFvQixJQUFwQjtBQUNBLGNBQU1ELE1BQU1KLE1BQU4sRUFBTjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLENBeEJEIiwiZmlsZSI6ImNsb3NlU3VydmV5cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgU2V0IH0gPSByZXF1aXJlKCdpbW11dGFibGUnKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi8uLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBzdXJ2ZXlzID0gYXdhaXQgU3VydmV5LmNhbmRpZGF0ZXNPZkNsb3NpbmdcbiAgZm9yIChsZXQgc3VydmV5IG9mIHN1cnZleXMpIHtcbiAgICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2Yoc3VydmV5LnRlYW1JRClcbiAgICBsZXQgcmVwbGllcyA9IGF3YWl0IHN1cnZleS5yZXBsaWVzXG5cbiAgICAvLyBjbG9zZSBzdXJ2ZXlcbiAgICBzdXJ2ZXkuaXNDbG9zZWQgPSB0cnVlXG4gICAgYXdhaXQgc3VydmV5LnVwZGF0ZSgpXG5cbiAgICAvLyBTZW5kIG5vdGlmaWNhdGlvbiB0byB3aG8gZGlkIG5vdCBjb21wbGV0ZSB0aGUgcmVwbHlcbiAgICBsZXQgdGFyZ2V0c0lEID0gU2V0KHN1cnZleS50YXJnZXRzSUQpXG4gICAgbGV0IGNvbXBsZXRlZFJlc3BvbmRlbnRzSUQgPSBTZXQocmVwbGllcy5maWx0ZXIocmVwbHkgPT4gcmVwbHkuaXNDb21wbGV0ZWQpLm1hcChyZXBseSA9PiByZXBseS5yZXNwb25kZW50KSlcbiAgICBsZXQgdW5jb21wbGV0ZWRSZXNwb25kZW50c0lEID0gdGFyZ2V0c0lELnN1YnRyYWN0KGNvbXBsZXRlZFJlc3BvbmRlbnRzSUQpXG4gICAgdGVhbS5ib3Quc2VuZFRvVXNlcnModW5jb21wbGV0ZWRSZXNwb25kZW50c0lELnRvQXJyYXkoKSwgJ1N1cnZleSBoYXMgY2xvc2VkLicpXG5cbiAgICAvLyBjbG9zZSBhbGwgdW5jb21wbGV0ZWQgcmVwbGllc1xuICAgIGZvciAobGV0IHJlcGx5IG9mIHJlcGxpZXMpIHtcbiAgICAgIGlmICghcmVwbHkuaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgcmVwbHkuaXNDb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgIGF3YWl0IHJlcGx5LnVwZGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=