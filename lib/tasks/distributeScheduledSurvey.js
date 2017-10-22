'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../survey');
const Team = require('../team');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (frequency) {
    let surveys;
    switch (frequency) {
      case 'weekly':
        surveys = yield Survey.weekly;
        break;
      case 'monthly':
        surveys = yield Survey.monthly;
        break;
      case 'quarterly':
        surveys = yield Survey.quarterly;
        break;
      default:
        throw new Error('Invalid frequency');
    }

    for (let survey of surveys) {
      const team = yield Team.of(survey.teamID);
      team.bot.distribute(survey);
      survey.isSent = true;
      survey.update();
      // clone the old one to reschedule
      Survey.create(survey.teamID, survey.frequency, survey.targetsID);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrcy9kaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5LmpzIl0sIm5hbWVzIjpbIlN1cnZleSIsInJlcXVpcmUiLCJUZWFtIiwibW9kdWxlIiwiZXhwb3J0cyIsImZyZXF1ZW5jeSIsInN1cnZleXMiLCJ3ZWVrbHkiLCJtb250aGx5IiwicXVhcnRlcmx5IiwiRXJyb3IiLCJzdXJ2ZXkiLCJ0ZWFtIiwib2YiLCJ0ZWFtSUQiLCJib3QiLCJkaXN0cmlidXRlIiwiaXNTZW50IiwidXBkYXRlIiwiY3JlYXRlIiwidGFyZ2V0c0lEIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsU0FBU0MsUUFBUSxXQUFSLENBQWY7QUFDQSxNQUFNQyxPQUFPRCxRQUFRLFNBQVIsQ0FBYjs7QUFFQUUsT0FBT0MsT0FBUDtBQUFBLCtCQUFpQixXQUFNQyxTQUFOLEVBQW1CO0FBQ2xDLFFBQUlDLE9BQUo7QUFDQSxZQUFRRCxTQUFSO0FBQ0UsV0FBSyxRQUFMO0FBQ0VDLGtCQUFVLE1BQU1OLE9BQU9PLE1BQXZCO0FBQ0E7QUFDRixXQUFLLFNBQUw7QUFDRUQsa0JBQVUsTUFBTU4sT0FBT1EsT0FBdkI7QUFDQTtBQUNGLFdBQUssV0FBTDtBQUNFRixrQkFBVSxNQUFNTixPQUFPUyxTQUF2QjtBQUNBO0FBQ0Y7QUFDRSxjQUFNLElBQUlDLEtBQUosQ0FBVSxtQkFBVixDQUFOO0FBWEo7O0FBY0EsU0FBSyxJQUFJQyxNQUFULElBQW1CTCxPQUFuQixFQUE0QjtBQUMxQixZQUFNTSxPQUFPLE1BQU1WLEtBQUtXLEVBQUwsQ0FBUUYsT0FBT0csTUFBZixDQUFuQjtBQUNBRixXQUFLRyxHQUFMLENBQVNDLFVBQVQsQ0FBb0JMLE1BQXBCO0FBQ0FBLGFBQU9NLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQU4sYUFBT08sTUFBUDtBQUNBO0FBQ0FsQixhQUFPbUIsTUFBUCxDQUFjUixPQUFPRyxNQUFyQixFQUE2QkgsT0FBT04sU0FBcEMsRUFBK0NNLE9BQU9TLFNBQXREO0FBQ0Q7QUFDRixHQXhCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJkaXN0cmlidXRlU2NoZWR1bGVkU3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi4vc3VydmV5JylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyBmcmVxdWVuY3kgPT4ge1xuICBsZXQgc3VydmV5c1xuICBzd2l0Y2ggKGZyZXF1ZW5jeSkge1xuICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICBzdXJ2ZXlzID0gYXdhaXQgU3VydmV5LndlZWtseVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdtb250aGx5JzpcbiAgICAgIHN1cnZleXMgPSBhd2FpdCBTdXJ2ZXkubW9udGhseVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdxdWFydGVybHknOlxuICAgICAgc3VydmV5cyA9IGF3YWl0IFN1cnZleS5xdWFydGVybHlcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcmVxdWVuY3knKVxuICB9XG5cbiAgZm9yIChsZXQgc3VydmV5IG9mIHN1cnZleXMpIHtcbiAgICBjb25zdCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuICAgIHRlYW0uYm90LmRpc3RyaWJ1dGUoc3VydmV5KVxuICAgIHN1cnZleS5pc1NlbnQgPSB0cnVlXG4gICAgc3VydmV5LnVwZGF0ZSgpXG4gICAgLy8gY2xvbmUgdGhlIG9sZCBvbmUgdG8gcmVzY2hlZHVsZVxuICAgIFN1cnZleS5jcmVhdGUoc3VydmV5LnRlYW1JRCwgc3VydmV5LmZyZXF1ZW5jeSwgc3VydmV5LnRhcmdldHNJRClcbiAgfVxufVxuIl19