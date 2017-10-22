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

  static get weekly() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('frequency', 'weekly');
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      const surveys = [];
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]));
      }
      return surveys;
    });
  }

  static get monthly() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('frequency', 'monthly');
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      const surveys = [];
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]));
      }
      return surveys;
    });
  }

  static get quarterly() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('frequency', 'quarterly');
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      const surveys = [];
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]));
      }
      return surveys;
    });
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

  // delete
  delete() {
    db.delete(this._record);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdXJ2ZXkuanMiXSwibmFtZXMiOlsic2t5Z2VhciIsInJlcXVpcmUiLCJkYiIsIm1vZHVsZSIsImV4cG9ydHMiLCJTdXJ2ZXkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJ0ZWFtSUQiLCJmcmVxdWVuY3kiLCJ0YXJnZXRzSUQiLCJzYXZlIiwiaXNTZW50IiwiaWQiLCJ3ZWVrbHkiLCJxdWVyeSIsIlF1ZXJ5IiwiZXF1YWxUbyIsInRoZW4iLCJyZXN1bHQiLCJzdXJ2ZXlzIiwiaSIsImxlbmd0aCIsInB1c2giLCJtb250aGx5IiwicXVhcnRlcmx5IiwibmV3VmFsdWUiLCJ1cGRhdGUiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDs7QUFFQUUsT0FBT0MsT0FBUCxHQUFpQixNQUFNQyxNQUFOLENBQWE7QUFDNUJDLGNBQWFDLE1BQWIsRUFBcUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFlRCxNQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9ULFFBQVFTLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixRQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsTUFBckIsRUFBNkJDLFNBQTdCLEVBQXdDQyxTQUF4QyxFQUFtRDtBQUFBO0FBQ2pELFlBQU1QLFNBQVMsTUFBTUwsR0FBR2EsSUFBSCxDQUFRLElBQUlWLE9BQU9JLE1BQVgsQ0FBa0I7QUFDN0NHLGNBRDZDO0FBRTdDQyxpQkFGNkM7QUFHN0NDLGlCQUg2QztBQUk3Q0UsZ0JBQVE7QUFKcUMsT0FBbEIsQ0FBUixDQUFyQjtBQU1BLGFBQU8sSUFBSVgsTUFBSixDQUFXRSxNQUFYLENBQVA7QUFQaUQ7QUFRbEQ7O0FBRUQ7QUFDQSxNQUFJVSxFQUFKLEdBQVU7QUFD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LENBQTlCIiwiZmlsZSI6InN1cnZleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNreWdlYXIgPSByZXF1aXJlKCdza3lnZWFyJylcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYicpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU3VydmV5IHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdzdXJ2ZXknKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAodGVhbUlELCBmcmVxdWVuY3ksIHRhcmdldHNJRCkge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFN1cnZleS5SZWNvcmQoe1xuICAgICAgdGVhbUlELFxuICAgICAgZnJlcXVlbmN5LFxuICAgICAgdGFyZ2V0c0lELFxuICAgICAgaXNTZW50OiBmYWxzZVxuICAgIH0pKVxuICAgIHJldHVybiBuZXcgU3VydmV5KHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IGlkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpZCddXG4gIH1cblxuICBnZXQgdGVhbUlEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0ZWFtSUQnXVxuICB9XG5cbiAgZ2V0IGZyZXF1ZW5jeSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnZnJlcXVlbmN5J11cbiAgfVxuXG4gIGdldCB0YXJnZXRzSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddXG4gIH1cblxuICBnZXQgaXNTZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpc1NlbnQnXVxuICB9XG5cbiAgc3RhdGljIGdldCB3ZWVrbHkgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdmcmVxdWVuY3knLCAnd2Vla2x5JylcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbW9udGhseSAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShTdXJ2ZXkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2ZyZXF1ZW5jeScsICdtb250aGx5JylcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgcXVhcnRlcmx5ICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnZnJlcXVlbmN5JywgJ3F1YXJ0ZXJseScpXG4gICAgcXVlcnkuZXF1YWxUbygnaXNTZW50JywgZmFsc2UpXG4gICAgcmV0dXJuIGRiLnF1ZXJ5KHF1ZXJ5KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBjb25zdCBzdXJ2ZXlzID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN1cnZleXMucHVzaChuZXcgU3VydmV5KHJlc3VsdFtpXSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3VydmV5c1xuICAgIH0pXG4gIH1cblxuICAvLyB1cGRhdGVcbiAgc2V0IGlzU2VudCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ2lzU2VudCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZSAoKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gYXdhaXQgZGIuc2F2ZSh0aGlzLl9yZWNvcmQpXG4gIH1cblxuICAvLyBkZWxldGVcbiAgZGVsZXRlICgpIHtcbiAgICBkYi5kZWxldGUodGhpcy5fcmVjb3JkKVxuICB9XG59XG4iXX0=