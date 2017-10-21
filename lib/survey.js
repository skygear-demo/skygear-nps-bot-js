'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');

module.exports = class Survey {
  constructor(record) {
    this._record = record;
  }

  // create
  static get Record() {
    return skygear.Record.extend('survey');
  }

  static create(teamID, frequency, targetsID) {
    return _asyncToGenerator(function* () {
      const record = yield db.save(new Survey.Record({
        teamID,
        frequency,
        targetsID,
        isSent: false
      }));
      return new Survey(record);
    })();
  }

  // read
  get id() {
    return this._record['id'];
  }

  get teamID() {
    return this._record['teamID'];
  }

  get frequency() {
    return this._record['frequency'];
  }

  get targetsID() {
    return this._record['targetsID'];
  }

  get isSent() {
    return this._record['isSent'];
  }

  // update
  set isSent(newValue) {
    this._record['isSent'] = newValue;
  }

  update() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this._record = yield db.save(_this._record);
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdXJ2ZXkuanMiXSwibmFtZXMiOlsic2t5Z2VhciIsInJlcXVpcmUiLCJkYiIsIm1vZHVsZSIsImV4cG9ydHMiLCJTdXJ2ZXkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJ0ZWFtSUQiLCJmcmVxdWVuY3kiLCJ0YXJnZXRzSUQiLCJzYXZlIiwiaXNTZW50IiwiaWQiLCJuZXdWYWx1ZSIsInVwZGF0ZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsTUFBUixDQUFYOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLE1BQU4sQ0FBYTtBQUM1QkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRDtBQUNBLGFBQVdFLE1BQVgsR0FBcUI7QUFDbkIsV0FBT1QsUUFBUVMsTUFBUixDQUFlQyxNQUFmLENBQXNCLFFBQXRCLENBQVA7QUFDRDs7QUFFRCxTQUFhQyxNQUFiLENBQXFCQyxNQUFyQixFQUE2QkMsU0FBN0IsRUFBd0NDLFNBQXhDLEVBQW1EO0FBQUE7QUFDakQsWUFBTVAsU0FBUyxNQUFNTCxHQUFHYSxJQUFILENBQVEsSUFBSVYsT0FBT0ksTUFBWCxDQUFrQjtBQUM3Q0csY0FENkM7QUFFN0NDLGlCQUY2QztBQUc3Q0MsaUJBSDZDO0FBSTdDRSxnQkFBUTtBQUpxQyxPQUFsQixDQUFSLENBQXJCO0FBTUEsYUFBTyxJQUFJWCxNQUFKLENBQVdFLE1BQVgsQ0FBUDtBQVBpRDtBQVFsRDs7QUFFRDtBQUNBLE1BQUlVLEVBQUosR0FBVTtBQUNSLFdBQU8sS0FBS1QsT0FBTCxDQUFhLElBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlJLE1BQUosR0FBYztBQUNaLFdBQU8sS0FBS0osT0FBTCxDQUFhLFFBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlLLFNBQUosR0FBaUI7QUFDZixXQUFPLEtBQUtMLE9BQUwsQ0FBYSxXQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJTSxTQUFKLEdBQWlCO0FBQ2YsV0FBTyxLQUFLTixPQUFMLENBQWEsV0FBYixDQUFQO0FBQ0Q7O0FBRUQsTUFBSVEsTUFBSixHQUFjO0FBQ1osV0FBTyxLQUFLUixPQUFMLENBQWEsUUFBYixDQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxNQUFJUSxNQUFKLENBQVlFLFFBQVosRUFBc0I7QUFDcEIsU0FBS1YsT0FBTCxDQUFhLFFBQWIsSUFBeUJVLFFBQXpCO0FBQ0Q7O0FBRUtDLFFBQU4sR0FBZ0I7QUFBQTs7QUFBQTtBQUNkLFlBQUtYLE9BQUwsR0FBZSxNQUFNTixHQUFHYSxJQUFILENBQVEsTUFBS1AsT0FBYixDQUFyQjtBQURjO0FBRWY7QUFoRDJCLENBQTlCIiwiZmlsZSI6InN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNreWdlYXIgPSByZXF1aXJlKCdza3lnZWFyJylcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYicpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU3VydmV5IHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdzdXJ2ZXknKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAodGVhbUlELCBmcmVxdWVuY3ksIHRhcmdldHNJRCkge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFN1cnZleS5SZWNvcmQoe1xuICAgICAgdGVhbUlELFxuICAgICAgZnJlcXVlbmN5LFxuICAgICAgdGFyZ2V0c0lELFxuICAgICAgaXNTZW50OiBmYWxzZVxuICAgIH0pKVxuICAgIHJldHVybiBuZXcgU3VydmV5KHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IGlkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpZCddXG4gIH1cblxuICBnZXQgdGVhbUlEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0ZWFtSUQnXVxuICB9XG5cbiAgZ2V0IGZyZXF1ZW5jeSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnZnJlcXVlbmN5J11cbiAgfVxuXG4gIGdldCB0YXJnZXRzSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddXG4gIH1cblxuICBnZXQgaXNTZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpc1NlbnQnXVxuICB9XG5cbiAgLy8gdXBkYXRlXG4gIHNldCBpc1NlbnQgKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydpc1NlbnQnXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBhc3luYyB1cGRhdGUgKCkge1xuICAgIHRoaXMuX3JlY29yZCA9IGF3YWl0IGRiLnNhdmUodGhpcy5fcmVjb3JkKVxuICB9XG59XG4iXX0=