'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');

module.exports = class Reply {
  constructor(record) {
    this._record = record;
  }

  // create
  static get Record() {
    return skygear.Record.extend('reply');
  }

  static create(surveyID, userID, score, reason) {
    return _asyncToGenerator(function* () {
      const record = yield db.save(new Reply.Record({
        survey: new skygear.Reference({
          id: surveyID
        }),
        userID,
        score,
        reason
      }));
      return new Reply(record);
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlcGx5IiwiY29uc3RydWN0b3IiLCJyZWNvcmQiLCJfcmVjb3JkIiwiUmVjb3JkIiwiZXh0ZW5kIiwiY3JlYXRlIiwic3VydmV5SUQiLCJ1c2VySUQiLCJzY29yZSIsInJlYXNvbiIsInNhdmUiLCJzdXJ2ZXkiLCJSZWZlcmVuY2UiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsTUFBUixDQUFYOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEtBQU4sQ0FBWTtBQUMzQkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRDtBQUNBLGFBQVdFLE1BQVgsR0FBcUI7QUFDbkIsV0FBT1QsUUFBUVMsTUFBUixDQUFlQyxNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDRDs7QUFFRCxTQUFhQyxNQUFiLENBQXFCQyxRQUFyQixFQUErQkMsTUFBL0IsRUFBdUNDLEtBQXZDLEVBQThDQyxNQUE5QyxFQUFzRDtBQUFBO0FBQ3BELFlBQU1SLFNBQVMsTUFBTUwsR0FBR2MsSUFBSCxDQUFRLElBQUlYLE1BQU1JLE1BQVYsQ0FBaUI7QUFDNUNRLGdCQUFRLElBQUlqQixRQUFRa0IsU0FBWixDQUFzQjtBQUM1QkMsY0FBSVA7QUFEd0IsU0FBdEIsQ0FEb0M7QUFJNUNDLGNBSjRDO0FBSzVDQyxhQUw0QztBQU01Q0M7QUFONEMsT0FBakIsQ0FBUixDQUFyQjtBQVFBLGFBQU8sSUFBSVYsS0FBSixDQUFVRSxNQUFWLENBQVA7QUFUb0Q7QUFVckQ7QUFwQjBCLENBQTdCIiwiZmlsZSI6InJlcGx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBSZXBseSB7XG4gIGNvbnN0cnVjdG9yIChyZWNvcmQpIHtcbiAgICB0aGlzLl9yZWNvcmQgPSByZWNvcmRcbiAgfVxuXG4gIC8vIGNyZWF0ZVxuICBzdGF0aWMgZ2V0IFJlY29yZCAoKSB7XG4gICAgcmV0dXJuIHNreWdlYXIuUmVjb3JkLmV4dGVuZCgncmVwbHknKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAoc3VydmV5SUQsIHVzZXJJRCwgc2NvcmUsIHJlYXNvbikge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFJlcGx5LlJlY29yZCh7XG4gICAgICBzdXJ2ZXk6IG5ldyBza3lnZWFyLlJlZmVyZW5jZSh7XG4gICAgICAgIGlkOiBzdXJ2ZXlJRFxuICAgICAgfSksXG4gICAgICB1c2VySUQsXG4gICAgICBzY29yZSxcbiAgICAgIHJlYXNvblxuICAgIH0pKVxuICAgIHJldHVybiBuZXcgUmVwbHkocmVjb3JkKVxuICB9XG59XG4iXX0=