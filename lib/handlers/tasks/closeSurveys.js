'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { Set } = require('immutable');
const Survey = require('../../survey');
const Team = require('../../team');

module.exports = _asyncToGenerator(function* () {
  let surveys = yield Survey.candidatesOfClosing;
  surveys.forEach((() => {
    var _ref2 = _asyncToGenerator(function* (survey) {
      let team = yield Team.of(survey.teamID);
      let replies = yield survey.replies;

      // Send notification to who did not complete the reply
      let targetsID = Set(survey.targetsID);
      let completedRespondentsID = Set(replies.filter(function (reply) {
        return reply.isCompleted;
      }).map(function (reply) {
        return reply.respondent;
      }));
      let uncompletedRespondentsID = targetsID.subtract(completedRespondentsID);
      team.bot.sendToUsers(uncompletedRespondentsID.toArray(), 'Survey has closed.');

      // close survey
      survey.isClosed = true;
      survey.update();

      // close all uncompleted replies
      replies.forEach(function (reply) {
        if (!reply.isCompleted) {
          reply.isCompleted = true;
          reply.update();
        }
      });
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9jbG9zZVN1cnZleXMuanMiXSwibmFtZXMiOlsiU2V0IiwicmVxdWlyZSIsIlN1cnZleSIsIlRlYW0iLCJtb2R1bGUiLCJleHBvcnRzIiwic3VydmV5cyIsImNhbmRpZGF0ZXNPZkNsb3NpbmciLCJmb3JFYWNoIiwic3VydmV5IiwidGVhbSIsIm9mIiwidGVhbUlEIiwicmVwbGllcyIsInRhcmdldHNJRCIsImNvbXBsZXRlZFJlc3BvbmRlbnRzSUQiLCJmaWx0ZXIiLCJyZXBseSIsImlzQ29tcGxldGVkIiwibWFwIiwicmVzcG9uZGVudCIsInVuY29tcGxldGVkUmVzcG9uZGVudHNJRCIsInN1YnRyYWN0IiwiYm90Iiwic2VuZFRvVXNlcnMiLCJ0b0FycmF5IiwiaXNDbG9zZWQiLCJ1cGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLEVBQUVBLEdBQUYsS0FBVUMsUUFBUSxXQUFSLENBQWhCO0FBQ0EsTUFBTUMsU0FBU0QsUUFBUSxjQUFSLENBQWY7QUFDQSxNQUFNRSxPQUFPRixRQUFRLFlBQVIsQ0FBYjs7QUFFQUcsT0FBT0MsT0FBUCxxQkFBaUIsYUFBWTtBQUMzQixNQUFJQyxVQUFVLE1BQU1KLE9BQU9LLG1CQUEzQjtBQUNBRCxVQUFRRSxPQUFSO0FBQUEsa0NBQWdCLFdBQU1DLE1BQU4sRUFBZ0I7QUFDOUIsVUFBSUMsT0FBTyxNQUFNUCxLQUFLUSxFQUFMLENBQVFGLE9BQU9HLE1BQWYsQ0FBakI7QUFDQSxVQUFJQyxVQUFVLE1BQU1KLE9BQU9JLE9BQTNCOztBQUVBO0FBQ0EsVUFBSUMsWUFBWWQsSUFBSVMsT0FBT0ssU0FBWCxDQUFoQjtBQUNBLFVBQUlDLHlCQUF5QmYsSUFBSWEsUUFBUUcsTUFBUixDQUFlO0FBQUEsZUFBU0MsTUFBTUMsV0FBZjtBQUFBLE9BQWYsRUFBMkNDLEdBQTNDLENBQStDO0FBQUEsZUFBU0YsTUFBTUcsVUFBZjtBQUFBLE9BQS9DLENBQUosQ0FBN0I7QUFDQSxVQUFJQywyQkFBMkJQLFVBQVVRLFFBQVYsQ0FBbUJQLHNCQUFuQixDQUEvQjtBQUNBTCxXQUFLYSxHQUFMLENBQVNDLFdBQVQsQ0FBcUJILHlCQUF5QkksT0FBekIsRUFBckIsRUFBeUQsb0JBQXpEOztBQUVBO0FBQ0FoQixhQUFPaUIsUUFBUCxHQUFrQixJQUFsQjtBQUNBakIsYUFBT2tCLE1BQVA7O0FBRUE7QUFDQWQsY0FBUUwsT0FBUixDQUFnQixpQkFBUztBQUN2QixZQUFJLENBQUNTLE1BQU1DLFdBQVgsRUFBd0I7QUFDdEJELGdCQUFNQyxXQUFOLEdBQW9CLElBQXBCO0FBQ0FELGdCQUFNVSxNQUFOO0FBQ0Q7QUFDRixPQUxEO0FBTUQsS0FyQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFzQkQsQ0F4QkQiLCJmaWxlIjoiY2xvc2VTdXJ2ZXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBTZXQgfSA9IHJlcXVpcmUoJ2ltbXV0YWJsZScpXG5jb25zdCBTdXJ2ZXkgPSByZXF1aXJlKCcuLi8uLi9zdXJ2ZXknKVxuY29uc3QgVGVhbSA9IHJlcXVpcmUoJy4uLy4uL3RlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkuY2FuZGlkYXRlc09mQ2xvc2luZ1xuICBzdXJ2ZXlzLmZvckVhY2goYXN5bmMgc3VydmV5ID0+IHtcbiAgICBsZXQgdGVhbSA9IGF3YWl0IFRlYW0ub2Yoc3VydmV5LnRlYW1JRClcbiAgICBsZXQgcmVwbGllcyA9IGF3YWl0IHN1cnZleS5yZXBsaWVzXG5cbiAgICAvLyBTZW5kIG5vdGlmaWNhdGlvbiB0byB3aG8gZGlkIG5vdCBjb21wbGV0ZSB0aGUgcmVwbHlcbiAgICBsZXQgdGFyZ2V0c0lEID0gU2V0KHN1cnZleS50YXJnZXRzSUQpXG4gICAgbGV0IGNvbXBsZXRlZFJlc3BvbmRlbnRzSUQgPSBTZXQocmVwbGllcy5maWx0ZXIocmVwbHkgPT4gcmVwbHkuaXNDb21wbGV0ZWQpLm1hcChyZXBseSA9PiByZXBseS5yZXNwb25kZW50KSlcbiAgICBsZXQgdW5jb21wbGV0ZWRSZXNwb25kZW50c0lEID0gdGFyZ2V0c0lELnN1YnRyYWN0KGNvbXBsZXRlZFJlc3BvbmRlbnRzSUQpXG4gICAgdGVhbS5ib3Quc2VuZFRvVXNlcnModW5jb21wbGV0ZWRSZXNwb25kZW50c0lELnRvQXJyYXkoKSwgJ1N1cnZleSBoYXMgY2xvc2VkLicpXG5cbiAgICAvLyBjbG9zZSBzdXJ2ZXlcbiAgICBzdXJ2ZXkuaXNDbG9zZWQgPSB0cnVlXG4gICAgc3VydmV5LnVwZGF0ZSgpXG5cbiAgICAvLyBjbG9zZSBhbGwgdW5jb21wbGV0ZWQgcmVwbGllc1xuICAgIHJlcGxpZXMuZm9yRWFjaChyZXBseSA9PiB7XG4gICAgICBpZiAoIXJlcGx5LmlzQ29tcGxldGVkKSB7XG4gICAgICAgIHJlcGx5LmlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgICByZXBseS51cGRhdGUoKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG4iXX0=