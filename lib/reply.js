'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');

class Reply {
  constructor(record) {
    this._record = record;
  }

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
        reason: ''
      });
      return db.save(record).then(function (record) {
        return new Reply(record);
      });
    })();
  }

  static of(surveyID, userID) {
    let query = new skygear.Query(Reply.Record);
    query.equalTo('survey', new skygear.Reference({
      id: surveyID
    }));
    query.equalTo('respondent', userID);
    return db.query(query).then(result => result[0] ? new Reply(result[0]) : null);
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwiUmVwbHkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJzdXJ2ZXlJRCIsInVzZXJJRCIsInNjb3JlIiwic3VydmV5IiwiUmVmZXJlbmNlIiwiaWQiLCJyZXNwb25kZW50IiwicmVhc29uIiwic2F2ZSIsInRoZW4iLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibmV3VmFsdWUiLCJpc0NvbXBsZXRlZCIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxNQUFNRSxLQUFOLENBQVk7QUFDVkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRCxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9QLFFBQVFPLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixPQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDQyxLQUF2QyxFQUE4QztBQUFBO0FBQzVDLFVBQUlQLFNBQVMsSUFBSUYsTUFBTUksTUFBVixDQUFpQjtBQUM1Qk0sZ0JBQVEsSUFBSWIsUUFBUWMsU0FBWixDQUFzQjtBQUM1QkMsY0FBSUw7QUFEd0IsU0FBdEIsQ0FEb0I7QUFJNUJNLG9CQUFZTCxNQUpnQjtBQUs1QkMsYUFMNEI7QUFNNUJLLGdCQUFRO0FBTm9CLE9BQWpCLENBQWI7QUFRQSxhQUFPZixHQUFHZ0IsSUFBSCxDQUFRYixNQUFSLEVBQWdCYyxJQUFoQixDQUFxQjtBQUFBLGVBQVUsSUFBSWhCLEtBQUosQ0FBVUUsTUFBVixDQUFWO0FBQUEsT0FBckIsQ0FBUDtBQVQ0QztBQVU3Qzs7QUFFRCxTQUFPZSxFQUFQLENBQVdWLFFBQVgsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLFFBQUlVLFFBQVEsSUFBSXJCLFFBQVFzQixLQUFaLENBQWtCbkIsTUFBTUksTUFBeEIsQ0FBWjtBQUNBYyxVQUFNRSxPQUFOLENBQWMsUUFBZCxFQUF3QixJQUFJdkIsUUFBUWMsU0FBWixDQUFzQjtBQUM1Q0MsVUFBSUw7QUFEd0MsS0FBdEIsQ0FBeEI7QUFHQVcsVUFBTUUsT0FBTixDQUFjLFlBQWQsRUFBNEJaLE1BQTVCO0FBQ0EsV0FBT1QsR0FBR21CLEtBQUgsQ0FBU0EsS0FBVCxFQUFnQkYsSUFBaEIsQ0FBcUJLLFVBQVVBLE9BQU8sQ0FBUCxJQUFZLElBQUlyQixLQUFKLENBQVVxQixPQUFPLENBQVAsQ0FBVixDQUFaLEdBQW1DLElBQWxFLENBQVA7QUFDRDs7QUFFRCxNQUFJUCxNQUFKLENBQVlRLFFBQVosRUFBc0I7QUFDcEIsU0FBS25CLE9BQUwsQ0FBYSxRQUFiLElBQXlCbUIsUUFBekI7QUFDRDs7QUFFRCxNQUFJQyxXQUFKLENBQWlCRCxRQUFqQixFQUEyQjtBQUN6QixTQUFLbkIsT0FBTCxDQUFhLGFBQWIsSUFBOEJtQixRQUE5QjtBQUNEOztBQUVERSxXQUFVO0FBQ1IsV0FBT3pCLEdBQUdnQixJQUFILENBQVEsS0FBS1osT0FBYixFQUFzQmEsSUFBdEIsQ0FBMkJkLFVBQVUsSUFBSUYsS0FBSixDQUFVRSxNQUFWLENBQXJDLENBQVA7QUFDRDtBQXhDUzs7QUEyQ1p1QixPQUFPQyxPQUFQLEdBQWlCMUIsS0FBakIiLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBza3lnZWFyID0gcmVxdWlyZSgnc2t5Z2VhcicpXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGInKVxuXG5jbGFzcyBSZXBseSB7XG4gIGNvbnN0cnVjdG9yIChyZWNvcmQpIHtcbiAgICB0aGlzLl9yZWNvcmQgPSByZWNvcmRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdyZXBseScpXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlIChzdXJ2ZXlJRCwgdXNlcklELCBzY29yZSkge1xuICAgIGxldCByZWNvcmQgPSBuZXcgUmVwbHkuUmVjb3JkKHtcbiAgICAgIHN1cnZleTogbmV3IHNreWdlYXIuUmVmZXJlbmNlKHtcbiAgICAgICAgaWQ6IHN1cnZleUlEXG4gICAgICB9KSxcbiAgICAgIHJlc3BvbmRlbnQ6IHVzZXJJRCxcbiAgICAgIHNjb3JlLFxuICAgICAgcmVhc29uOiAnJ1xuICAgIH0pXG4gICAgcmV0dXJuIGRiLnNhdmUocmVjb3JkKS50aGVuKHJlY29yZCA9PiBuZXcgUmVwbHkocmVjb3JkKSlcbiAgfVxuXG4gIHN0YXRpYyBvZiAoc3VydmV5SUQsIHVzZXJJRCkge1xuICAgIGxldCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFJlcGx5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzdXJ2ZXknLCBuZXcgc2t5Z2Vhci5SZWZlcmVuY2Uoe1xuICAgICAgaWQ6IHN1cnZleUlEXG4gICAgfSkpXG4gICAgcXVlcnkuZXF1YWxUbygncmVzcG9uZGVudCcsIHVzZXJJRClcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdFswXSA/IG5ldyBSZXBseShyZXN1bHRbMF0pIDogbnVsbClcbiAgfVxuXG4gIHNldCByZWFzb24gKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydyZWFzb24nXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBzZXQgaXNDb21wbGV0ZWQgKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydpc0NvbXBsZXRlZCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHVwZGF0ZSAoKSB7XG4gICAgcmV0dXJuIGRiLnNhdmUodGhpcy5fcmVjb3JkKS50aGVuKHJlY29yZCA9PiBuZXcgUmVwbHkocmVjb3JkKSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcGx5XG4iXX0=