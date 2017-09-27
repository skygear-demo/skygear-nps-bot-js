'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');

class Reply {
  constructor(record) {
    this._record = record;
  }

  // create
  static get Record() {
    return skygear.Record.extend('reply');
  }

  static create(surveyID, userID, score) {
    return _asyncToGenerator(function* () {
      let record = new Reply.Record({
        survey: new skygear.Reference({
          id: surveyID
        }),
        respondent: userID,
        score,
        reason: '',
        isCompleted: false
      });
      return db.save(record).then(function (record) {
        return new Reply(record);
      });
    })();
  }

  // read
  get respondent() {
    return this._record['respondent'];
  }

  get isCompleted() {
    return this._record['isCompleted'];
  }

  static of(surveyID, userID) {
    let query = new skygear.Query(Reply.Record);
    query.equalTo('survey', new skygear.Reference({
      id: surveyID
    }));
    if (userID) {
      // get once reply belong to that user in a survey
      query.equalTo('respondent', userID);
      return db.query(query).then(result => result[0] ? new Reply(result[0]) : null);
    } else {
      // get all replies belong to that survey
      return db.query(query).then(result => {
        let records = [];
        for (let i = 0; i < result.length; i++) {
          records.push(new Reply(result[i]));
        }
        return records;
      });
    }
  }

  // update
  set reason(newValue) {
    this._record['reason'] = newValue;
  }

  set isCompleted(newValue) {
    this._record['isCompleted'] = newValue;
  }

  update() {
    return db.save(this._record).then(record => new Reply(record));
  }
}

module.exports = Reply;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwiUmVwbHkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJzdXJ2ZXlJRCIsInVzZXJJRCIsInNjb3JlIiwic3VydmV5IiwiUmVmZXJlbmNlIiwiaWQiLCJyZXNwb25kZW50IiwicmVhc29uIiwiaXNDb21wbGV0ZWQiLCJzYXZlIiwidGhlbiIsIm9mIiwicXVlcnkiLCJRdWVyeSIsImVxdWFsVG8iLCJyZXN1bHQiLCJyZWNvcmRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJuZXdWYWx1ZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxNQUFNRSxLQUFOLENBQVk7QUFDVkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRDtBQUNBLGFBQVdFLE1BQVgsR0FBcUI7QUFDbkIsV0FBT1AsUUFBUU8sTUFBUixDQUFlQyxNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDRDs7QUFFRCxTQUFhQyxNQUFiLENBQXFCQyxRQUFyQixFQUErQkMsTUFBL0IsRUFBdUNDLEtBQXZDLEVBQThDO0FBQUE7QUFDNUMsVUFBSVAsU0FBUyxJQUFJRixNQUFNSSxNQUFWLENBQWlCO0FBQzVCTSxnQkFBUSxJQUFJYixRQUFRYyxTQUFaLENBQXNCO0FBQzVCQyxjQUFJTDtBQUR3QixTQUF0QixDQURvQjtBQUk1Qk0sb0JBQVlMLE1BSmdCO0FBSzVCQyxhQUw0QjtBQU01QkssZ0JBQVEsRUFOb0I7QUFPNUJDLHFCQUFhO0FBUGUsT0FBakIsQ0FBYjtBQVNBLGFBQU9oQixHQUFHaUIsSUFBSCxDQUFRZCxNQUFSLEVBQWdCZSxJQUFoQixDQUFxQjtBQUFBLGVBQVUsSUFBSWpCLEtBQUosQ0FBVUUsTUFBVixDQUFWO0FBQUEsT0FBckIsQ0FBUDtBQVY0QztBQVc3Qzs7QUFFRDtBQUNBLE1BQUlXLFVBQUosR0FBa0I7QUFDaEIsV0FBTyxLQUFLVixPQUFMLENBQWEsWUFBYixDQUFQO0FBQ0Q7O0FBRUQsTUFBSVksV0FBSixHQUFtQjtBQUNqQixXQUFPLEtBQUtaLE9BQUwsQ0FBYSxhQUFiLENBQVA7QUFDRDs7QUFFRCxTQUFPZSxFQUFQLENBQVdYLFFBQVgsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLFFBQUlXLFFBQVEsSUFBSXRCLFFBQVF1QixLQUFaLENBQWtCcEIsTUFBTUksTUFBeEIsQ0FBWjtBQUNBZSxVQUFNRSxPQUFOLENBQWMsUUFBZCxFQUF3QixJQUFJeEIsUUFBUWMsU0FBWixDQUFzQjtBQUM1Q0MsVUFBSUw7QUFEd0MsS0FBdEIsQ0FBeEI7QUFHQSxRQUFJQyxNQUFKLEVBQVk7QUFDVjtBQUNBVyxZQUFNRSxPQUFOLENBQWMsWUFBZCxFQUE0QmIsTUFBNUI7QUFDQSxhQUFPVCxHQUFHb0IsS0FBSCxDQUFTQSxLQUFULEVBQWdCRixJQUFoQixDQUFxQkssVUFBVUEsT0FBTyxDQUFQLElBQVksSUFBSXRCLEtBQUosQ0FBVXNCLE9BQU8sQ0FBUCxDQUFWLENBQVosR0FBbUMsSUFBbEUsQ0FBUDtBQUNELEtBSkQsTUFJTztBQUNMO0FBQ0EsYUFBT3ZCLEdBQUdvQixLQUFILENBQVNBLEtBQVQsRUFBZ0JGLElBQWhCLENBQXFCSyxVQUFVO0FBQ3BDLFlBQUlDLFVBQVUsRUFBZDtBQUNBLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixPQUFPRyxNQUEzQixFQUFtQ0QsR0FBbkMsRUFBd0M7QUFDdENELGtCQUFRRyxJQUFSLENBQWEsSUFBSTFCLEtBQUosQ0FBVXNCLE9BQU9FLENBQVAsQ0FBVixDQUFiO0FBQ0Q7QUFDRCxlQUFPRCxPQUFQO0FBQ0QsT0FOTSxDQUFQO0FBT0Q7QUFDRjs7QUFFRDtBQUNBLE1BQUlULE1BQUosQ0FBWWEsUUFBWixFQUFzQjtBQUNwQixTQUFLeEIsT0FBTCxDQUFhLFFBQWIsSUFBeUJ3QixRQUF6QjtBQUNEOztBQUVELE1BQUlaLFdBQUosQ0FBaUJZLFFBQWpCLEVBQTJCO0FBQ3pCLFNBQUt4QixPQUFMLENBQWEsYUFBYixJQUE4QndCLFFBQTlCO0FBQ0Q7O0FBRURDLFdBQVU7QUFDUixXQUFPN0IsR0FBR2lCLElBQUgsQ0FBUSxLQUFLYixPQUFiLEVBQXNCYyxJQUF0QixDQUEyQmYsVUFBVSxJQUFJRixLQUFKLENBQVVFLE1BQVYsQ0FBckMsQ0FBUDtBQUNEO0FBaEVTOztBQW1FWjJCLE9BQU9DLE9BQVAsR0FBaUI5QixLQUFqQiIsImZpbGUiOiJyZXBseS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNreWdlYXIgPSByZXF1aXJlKCdza3lnZWFyJylcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYicpXG5cbmNsYXNzIFJlcGx5IHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdyZXBseScpXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlIChzdXJ2ZXlJRCwgdXNlcklELCBzY29yZSkge1xuICAgIGxldCByZWNvcmQgPSBuZXcgUmVwbHkuUmVjb3JkKHtcbiAgICAgIHN1cnZleTogbmV3IHNreWdlYXIuUmVmZXJlbmNlKHtcbiAgICAgICAgaWQ6IHN1cnZleUlEXG4gICAgICB9KSxcbiAgICAgIHJlc3BvbmRlbnQ6IHVzZXJJRCxcbiAgICAgIHNjb3JlLFxuICAgICAgcmVhc29uOiAnJyxcbiAgICAgIGlzQ29tcGxldGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGRiLnNhdmUocmVjb3JkKS50aGVuKHJlY29yZCA9PiBuZXcgUmVwbHkocmVjb3JkKSlcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IHJlc3BvbmRlbnQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3Jlc3BvbmRlbnQnXVxuICB9XG5cbiAgZ2V0IGlzQ29tcGxldGVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpc0NvbXBsZXRlZCddXG4gIH1cblxuICBzdGF0aWMgb2YgKHN1cnZleUlELCB1c2VySUQpIHtcbiAgICBsZXQgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShSZXBseS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnc3VydmV5JywgbmV3IHNreWdlYXIuUmVmZXJlbmNlKHtcbiAgICAgIGlkOiBzdXJ2ZXlJRFxuICAgIH0pKVxuICAgIGlmICh1c2VySUQpIHtcbiAgICAgIC8vIGdldCBvbmNlIHJlcGx5IGJlbG9uZyB0byB0aGF0IHVzZXIgaW4gYSBzdXJ2ZXlcbiAgICAgIHF1ZXJ5LmVxdWFsVG8oJ3Jlc3BvbmRlbnQnLCB1c2VySUQpXG4gICAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdFswXSA/IG5ldyBSZXBseShyZXN1bHRbMF0pIDogbnVsbClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZ2V0IGFsbCByZXBsaWVzIGJlbG9uZyB0byB0aGF0IHN1cnZleVxuICAgICAgcmV0dXJuIGRiLnF1ZXJ5KHF1ZXJ5KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGxldCByZWNvcmRzID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICByZWNvcmRzLnB1c2gobmV3IFJlcGx5KHJlc3VsdFtpXSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZHNcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlXG4gIHNldCByZWFzb24gKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydyZWFzb24nXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBzZXQgaXNDb21wbGV0ZWQgKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydpc0NvbXBsZXRlZCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGRiLnNhdmUodGhpcy5fcmVjb3JkKS50aGVuKHJlY29yZCA9PiBuZXcgUmVwbHkocmVjb3JkKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcGx5XG4iXX0=