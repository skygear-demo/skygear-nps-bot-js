'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../message');
const Team = require('../team');
const User = require('../user');
const { log, verify } = require('../util');
const { showCommandButtons } = require('./events');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (req) {
    /**
     * @see https://api.slack.com/events-api#receiving_events
     */
    const {
      team_id: teamID,
      challenge, event, token
    } = log(JSON.parse(req.body));

    if (verify(token)) {
      // one-time verification to enable event subscription
      if (challenge) {
        return challenge;
      }

      let {
        channel: channelID,
        user: userID,
        type
      } = event;

      const team = yield Team.of(teamID);
      switch (type) {
        case 'message':
          // ignore bot messages, avoid loop with self
          if (userID) {
            const user = new User(userID, team);
            if (yield user.isAdmin) {
              showCommandButtons(team, channelID);
            }
          }
          break;
        default:
          break;
      }
    } else {
      throw new Error(message.error.invalidSource);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsIlRlYW0iLCJVc2VyIiwibG9nIiwidmVyaWZ5Iiwic2hvd0NvbW1hbmRCdXR0b25zIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcSIsInRlYW1faWQiLCJ0ZWFtSUQiLCJjaGFsbGVuZ2UiLCJldmVudCIsInRva2VuIiwiSlNPTiIsInBhcnNlIiwiYm9keSIsImNoYW5uZWwiLCJjaGFubmVsSUQiLCJ1c2VyIiwidXNlcklEIiwidHlwZSIsInRlYW0iLCJvZiIsImlzQWRtaW4iLCJFcnJvciIsImVycm9yIiwiaW52YWxpZFNvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsWUFBUixDQUFoQjtBQUNBLE1BQU1DLE9BQU9ELFFBQVEsU0FBUixDQUFiO0FBQ0EsTUFBTUUsT0FBT0YsUUFBUSxTQUFSLENBQWI7QUFDQSxNQUFNLEVBQUVHLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkosUUFBUSxTQUFSLENBQXhCO0FBQ0EsTUFBTSxFQUFFSyxrQkFBRixLQUF5QkwsUUFBUSxVQUFSLENBQS9COztBQUVBTSxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU1DLEdBQU4sRUFBYTtBQUM1Qjs7O0FBR0EsVUFBTTtBQUNKQyxlQUFTQyxNQURMO0FBRUpDLGVBRkksRUFFT0MsS0FGUCxFQUVjQztBQUZkLFFBR0ZWLElBQUlXLEtBQUtDLEtBQUwsQ0FBV1AsSUFBSVEsSUFBZixDQUFKLENBSEo7O0FBS0EsUUFBSVosT0FBT1MsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCO0FBQ0EsVUFBSUYsU0FBSixFQUFlO0FBQ2IsZUFBT0EsU0FBUDtBQUNEOztBQUVELFVBQUk7QUFDRk0saUJBQVNDLFNBRFA7QUFFRkMsY0FBTUMsTUFGSjtBQUdGQztBQUhFLFVBSUFULEtBSko7O0FBTUEsWUFBTVUsT0FBTyxNQUFNckIsS0FBS3NCLEVBQUwsQ0FBUWIsTUFBUixDQUFuQjtBQUNBLGNBQVFXLElBQVI7QUFDRSxhQUFLLFNBQUw7QUFDRTtBQUNBLGNBQUlELE1BQUosRUFBWTtBQUNWLGtCQUFNRCxPQUFPLElBQUlqQixJQUFKLENBQVNrQixNQUFULEVBQWlCRSxJQUFqQixDQUFiO0FBQ0EsZ0JBQUksTUFBTUgsS0FBS0ssT0FBZixFQUF3QjtBQUN0Qm5CLGlDQUFtQmlCLElBQW5CLEVBQXlCSixTQUF6QjtBQUNEO0FBQ0Y7QUFDRDtBQUNGO0FBQ0U7QUFYSjtBQWFELEtBMUJELE1BMEJPO0FBQ0wsWUFBTSxJQUFJTyxLQUFKLENBQVUxQixRQUFRMkIsS0FBUixDQUFjQyxhQUF4QixDQUFOO0FBQ0Q7QUFDRixHQXRDRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJoYW5kbGVFdmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi9tZXNzYWdlJylcbmNvbnN0IFRlYW0gPSByZXF1aXJlKCcuLi90ZWFtJylcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuLi91c2VyJylcbmNvbnN0IHsgbG9nLCB2ZXJpZnkgfSA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuY29uc3QgeyBzaG93Q29tbWFuZEJ1dHRvbnMgfSA9IHJlcXVpcmUoJy4vZXZlbnRzJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyByZXEgPT4ge1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZXZlbnRzLWFwaSNyZWNlaXZpbmdfZXZlbnRzXG4gICAqL1xuICBjb25zdCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIGNoYWxsZW5nZSwgZXZlbnQsIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShyZXEuYm9keSkpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAvLyBvbmUtdGltZSB2ZXJpZmljYXRpb24gdG8gZW5hYmxlIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgIGlmIChjaGFsbGVuZ2UpIHtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2VcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgY2hhbm5lbDogY2hhbm5lbElELFxuICAgICAgdXNlcjogdXNlcklELFxuICAgICAgdHlwZVxuICAgIH0gPSBldmVudFxuXG4gICAgY29uc3QgdGVhbSA9IGF3YWl0IFRlYW0ub2YodGVhbUlEKVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIC8vIGlnbm9yZSBib3QgbWVzc2FnZXMsIGF2b2lkIGxvb3Agd2l0aCBzZWxmXG4gICAgICAgIGlmICh1c2VySUQpIHtcbiAgICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIodXNlcklELCB0ZWFtKVxuICAgICAgICAgIGlmIChhd2FpdCB1c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICAgIHNob3dDb21tYW5kQnV0dG9ucyh0ZWFtLCBjaGFubmVsSUQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5lcnJvci5pbnZhbGlkU291cmNlKVxuICB9XG59XG4iXX0=