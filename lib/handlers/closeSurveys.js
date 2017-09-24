'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../survey');
const Team = require('../team');
const { extractIDs } = require('../util');

module.exports = _asyncToGenerator(function* () {
  let closingSurveys = yield Survey.timeToClose;
  closingSurveys.forEach((() => {
    var _ref2 = _asyncToGenerator(function* (survey) {
      let team = yield Team.of(survey.teamID);
      let replies = yield survey.replies;
      // Send notification to who did not completed the reply
      let surveyTargetsID = extractIDs((yield team.members)).filter(function (memberID) {
        return !survey.excludedUsersID.includes(memberID);
      });
      let completedReplies = replies.filter(function (reply) {
        return reply.isCompleted;
      });
      let usersIDOfcompletedReplies = completedReplies.map(function (reply) {
        return reply.respondent;
      });
      let targetsID = surveyTargetsID.filter(function (targetID) {
        return !usersIDOfcompletedReplies.includes(targetID);
      });
      team.bot.sendToUsers(targetsID, 'Survey has closed.');

      // close all reply
      replies.forEach(function (reply) {
        reply.isCompleted = true;
        reply.update();
      });
      survey.isClosed = true;
      survey.update();
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9jbG9zZVN1cnZleXMuanMiXSwibmFtZXMiOlsiU3VydmV5IiwicmVxdWlyZSIsIlRlYW0iLCJleHRyYWN0SURzIiwibW9kdWxlIiwiZXhwb3J0cyIsImNsb3NpbmdTdXJ2ZXlzIiwidGltZVRvQ2xvc2UiLCJmb3JFYWNoIiwic3VydmV5IiwidGVhbSIsIm9mIiwidGVhbUlEIiwicmVwbGllcyIsInN1cnZleVRhcmdldHNJRCIsIm1lbWJlcnMiLCJmaWx0ZXIiLCJleGNsdWRlZFVzZXJzSUQiLCJpbmNsdWRlcyIsIm1lbWJlcklEIiwiY29tcGxldGVkUmVwbGllcyIsInJlcGx5IiwiaXNDb21wbGV0ZWQiLCJ1c2Vyc0lET2Zjb21wbGV0ZWRSZXBsaWVzIiwibWFwIiwicmVzcG9uZGVudCIsInRhcmdldHNJRCIsInRhcmdldElEIiwiYm90Iiwic2VuZFRvVXNlcnMiLCJ1cGRhdGUiLCJpc0Nsb3NlZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFNBQVNDLFFBQVEsV0FBUixDQUFmO0FBQ0EsTUFBTUMsT0FBT0QsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVFLFVBQUYsS0FBaUJGLFFBQVEsU0FBUixDQUF2Qjs7QUFFQUcsT0FBT0MsT0FBUCxxQkFBaUIsYUFBWTtBQUMzQixNQUFJQyxpQkFBaUIsTUFBTU4sT0FBT08sV0FBbEM7QUFDQUQsaUJBQWVFLE9BQWY7QUFBQSxrQ0FBdUIsV0FBTUMsTUFBTixFQUFnQjtBQUNyQyxVQUFJQyxPQUFPLE1BQU1SLEtBQUtTLEVBQUwsQ0FBUUYsT0FBT0csTUFBZixDQUFqQjtBQUNBLFVBQUlDLFVBQVUsTUFBTUosT0FBT0ksT0FBM0I7QUFDQTtBQUNBLFVBQUlDLGtCQUFrQlgsWUFBVyxNQUFNTyxLQUFLSyxPQUF0QixHQUErQkMsTUFBL0IsQ0FBc0M7QUFBQSxlQUFZLENBQUNQLE9BQU9RLGVBQVAsQ0FBdUJDLFFBQXZCLENBQWdDQyxRQUFoQyxDQUFiO0FBQUEsT0FBdEMsQ0FBdEI7QUFDQSxVQUFJQyxtQkFBbUJQLFFBQVFHLE1BQVIsQ0FBZTtBQUFBLGVBQVNLLE1BQU1DLFdBQWY7QUFBQSxPQUFmLENBQXZCO0FBQ0EsVUFBSUMsNEJBQTRCSCxpQkFBaUJJLEdBQWpCLENBQXFCO0FBQUEsZUFBU0gsTUFBTUksVUFBZjtBQUFBLE9BQXJCLENBQWhDO0FBQ0EsVUFBSUMsWUFBWVosZ0JBQWdCRSxNQUFoQixDQUF1QjtBQUFBLGVBQVksQ0FBQ08sMEJBQTBCTCxRQUExQixDQUFtQ1MsUUFBbkMsQ0FBYjtBQUFBLE9BQXZCLENBQWhCO0FBQ0FqQixXQUFLa0IsR0FBTCxDQUFTQyxXQUFULENBQXFCSCxTQUFyQixFQUFnQyxvQkFBaEM7O0FBRUE7QUFDQWIsY0FBUUwsT0FBUixDQUFnQixpQkFBUztBQUN2QmEsY0FBTUMsV0FBTixHQUFvQixJQUFwQjtBQUNBRCxjQUFNUyxNQUFOO0FBQ0QsT0FIRDtBQUlBckIsYUFBT3NCLFFBQVAsR0FBa0IsSUFBbEI7QUFDQXRCLGFBQU9xQixNQUFQO0FBQ0QsS0FqQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFrQkQsQ0FwQkQiLCJmaWxlIjoiY2xvc2VTdXJ2ZXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IHsgZXh0cmFjdElEcyB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgY2xvc2luZ1N1cnZleXMgPSBhd2FpdCBTdXJ2ZXkudGltZVRvQ2xvc2VcbiAgY2xvc2luZ1N1cnZleXMuZm9yRWFjaChhc3luYyBzdXJ2ZXkgPT4ge1xuICAgIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuICAgIGxldCByZXBsaWVzID0gYXdhaXQgc3VydmV5LnJlcGxpZXNcbiAgICAvLyBTZW5kIG5vdGlmaWNhdGlvbiB0byB3aG8gZGlkIG5vdCBjb21wbGV0ZWQgdGhlIHJlcGx5XG4gICAgbGV0IHN1cnZleVRhcmdldHNJRCA9IGV4dHJhY3RJRHMoYXdhaXQgdGVhbS5tZW1iZXJzKS5maWx0ZXIobWVtYmVySUQgPT4gIXN1cnZleS5leGNsdWRlZFVzZXJzSUQuaW5jbHVkZXMobWVtYmVySUQpKVxuICAgIGxldCBjb21wbGV0ZWRSZXBsaWVzID0gcmVwbGllcy5maWx0ZXIocmVwbHkgPT4gcmVwbHkuaXNDb21wbGV0ZWQpXG4gICAgbGV0IHVzZXJzSURPZmNvbXBsZXRlZFJlcGxpZXMgPSBjb21wbGV0ZWRSZXBsaWVzLm1hcChyZXBseSA9PiByZXBseS5yZXNwb25kZW50KVxuICAgIGxldCB0YXJnZXRzSUQgPSBzdXJ2ZXlUYXJnZXRzSUQuZmlsdGVyKHRhcmdldElEID0+ICF1c2Vyc0lET2Zjb21wbGV0ZWRSZXBsaWVzLmluY2x1ZGVzKHRhcmdldElEKSlcbiAgICB0ZWFtLmJvdC5zZW5kVG9Vc2Vycyh0YXJnZXRzSUQsICdTdXJ2ZXkgaGFzIGNsb3NlZC4nKVxuXG4gICAgLy8gY2xvc2UgYWxsIHJlcGx5XG4gICAgcmVwbGllcy5mb3JFYWNoKHJlcGx5ID0+IHtcbiAgICAgIHJlcGx5LmlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgcmVwbHkudXBkYXRlKClcbiAgICB9KVxuICAgIHN1cnZleS5pc0Nsb3NlZCA9IHRydWVcbiAgICBzdXJ2ZXkudXBkYXRlKClcbiAgfSlcbn1cbiJdfQ==