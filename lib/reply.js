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

  static create(surveyID, score, reason) {
    return _asyncToGenerator(function* () {
      const record = yield db.save(new Reply.Record({
        survey: new skygear.Reference({
          id: surveyID
        }),
        score,
        reason
      }));
      return new Reply(record);
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlcGx5IiwiY29uc3RydWN0b3IiLCJyZWNvcmQiLCJfcmVjb3JkIiwiUmVjb3JkIiwiZXh0ZW5kIiwiY3JlYXRlIiwic3VydmV5SUQiLCJzY29yZSIsInJlYXNvbiIsInNhdmUiLCJzdXJ2ZXkiLCJSZWZlcmVuY2UiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsTUFBUixDQUFYOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLEtBQU4sQ0FBWTtBQUMzQkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRDtBQUNBLGFBQVdFLE1BQVgsR0FBcUI7QUFDbkIsV0FBT1QsUUFBUVMsTUFBUixDQUFlQyxNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDRDs7QUFFRCxTQUFhQyxNQUFiLENBQXFCQyxRQUFyQixFQUErQkMsS0FBL0IsRUFBc0NDLE1BQXRDLEVBQThDO0FBQUE7QUFDNUMsWUFBTVAsU0FBUyxNQUFNTCxHQUFHYSxJQUFILENBQVEsSUFBSVYsTUFBTUksTUFBVixDQUFpQjtBQUM1Q08sZ0JBQVEsSUFBSWhCLFFBQVFpQixTQUFaLENBQXNCO0FBQzVCQyxjQUFJTjtBQUR3QixTQUF0QixDQURvQztBQUk1Q0MsYUFKNEM7QUFLNUNDO0FBTDRDLE9BQWpCLENBQVIsQ0FBckI7QUFPQSxhQUFPLElBQUlULEtBQUosQ0FBVUUsTUFBVixDQUFQO0FBUjRDO0FBUzdDO0FBbkIwQixDQUE3QiIsImZpbGUiOiJyZXBseS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNreWdlYXIgPSByZXF1aXJlKCdza3lnZWFyJylcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYicpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUmVwbHkge1xuICBjb25zdHJ1Y3RvciAocmVjb3JkKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gcmVjb3JkXG4gIH1cblxuICAvLyBjcmVhdGVcbiAgc3RhdGljIGdldCBSZWNvcmQgKCkge1xuICAgIHJldHVybiBza3lnZWFyLlJlY29yZC5leHRlbmQoJ3JlcGx5JylcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUgKHN1cnZleUlELCBzY29yZSwgcmVhc29uKSB7XG4gICAgY29uc3QgcmVjb3JkID0gYXdhaXQgZGIuc2F2ZShuZXcgUmVwbHkuUmVjb3JkKHtcbiAgICAgIHN1cnZleTogbmV3IHNreWdlYXIuUmVmZXJlbmNlKHtcbiAgICAgICAgaWQ6IHN1cnZleUlEXG4gICAgICB9KSxcbiAgICAgIHNjb3JlLFxuICAgICAgcmVhc29uXG4gICAgfSkpXG4gICAgcmV0dXJuIG5ldyBSZXBseShyZWNvcmQpXG4gIH1cbn1cbiJdfQ==