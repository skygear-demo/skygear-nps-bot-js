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
        reason: '',
        isCompleted: false
      });
      return db.save(record).then(function (record) {
        return new Reply(record);
      });
    })();
  }

  get isCompleted() {
    return this._record['isCompleted'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwiUmVwbHkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJzdXJ2ZXlJRCIsInVzZXJJRCIsInNjb3JlIiwic3VydmV5IiwiUmVmZXJlbmNlIiwiaWQiLCJyZXNwb25kZW50IiwicmVhc29uIiwiaXNDb21wbGV0ZWQiLCJzYXZlIiwidGhlbiIsIm9mIiwicXVlcnkiLCJRdWVyeSIsImVxdWFsVG8iLCJyZXN1bHQiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxNQUFNRSxLQUFOLENBQVk7QUFDVkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRCxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9QLFFBQVFPLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixPQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDQyxLQUF2QyxFQUE4QztBQUFBO0FBQzVDLFVBQUlQLFNBQVMsSUFBSUYsTUFBTUksTUFBVixDQUFpQjtBQUM1Qk0sZ0JBQVEsSUFBSWIsUUFBUWMsU0FBWixDQUFzQjtBQUM1QkMsY0FBSUw7QUFEd0IsU0FBdEIsQ0FEb0I7QUFJNUJNLG9CQUFZTCxNQUpnQjtBQUs1QkMsYUFMNEI7QUFNNUJLLGdCQUFRLEVBTm9CO0FBTzVCQyxxQkFBYTtBQVBlLE9BQWpCLENBQWI7QUFTQSxhQUFPaEIsR0FBR2lCLElBQUgsQ0FBUWQsTUFBUixFQUFnQmUsSUFBaEIsQ0FBcUI7QUFBQSxlQUFVLElBQUlqQixLQUFKLENBQVVFLE1BQVYsQ0FBVjtBQUFBLE9BQXJCLENBQVA7QUFWNEM7QUFXN0M7O0FBRUQsTUFBSWEsV0FBSixHQUFtQjtBQUNqQixXQUFPLEtBQUtaLE9BQUwsQ0FBYSxhQUFiLENBQVA7QUFDRDs7QUFFRCxTQUFPZSxFQUFQLENBQVdYLFFBQVgsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLFFBQUlXLFFBQVEsSUFBSXRCLFFBQVF1QixLQUFaLENBQWtCcEIsTUFBTUksTUFBeEIsQ0FBWjtBQUNBZSxVQUFNRSxPQUFOLENBQWMsUUFBZCxFQUF3QixJQUFJeEIsUUFBUWMsU0FBWixDQUFzQjtBQUM1Q0MsVUFBSUw7QUFEd0MsS0FBdEIsQ0FBeEI7QUFHQVksVUFBTUUsT0FBTixDQUFjLFlBQWQsRUFBNEJiLE1BQTVCO0FBQ0EsV0FBT1QsR0FBR29CLEtBQUgsQ0FBU0EsS0FBVCxFQUFnQkYsSUFBaEIsQ0FBcUJLLFVBQVVBLE9BQU8sQ0FBUCxJQUFZLElBQUl0QixLQUFKLENBQVVzQixPQUFPLENBQVAsQ0FBVixDQUFaLEdBQW1DLElBQWxFLENBQVA7QUFDRDs7QUFFRCxNQUFJUixNQUFKLENBQVlTLFFBQVosRUFBc0I7QUFDcEIsU0FBS3BCLE9BQUwsQ0FBYSxRQUFiLElBQXlCb0IsUUFBekI7QUFDRDs7QUFFRCxNQUFJUixXQUFKLENBQWlCUSxRQUFqQixFQUEyQjtBQUN6QixTQUFLcEIsT0FBTCxDQUFhLGFBQWIsSUFBOEJvQixRQUE5QjtBQUNEOztBQUVEQyxXQUFVO0FBQ1IsV0FBT3pCLEdBQUdpQixJQUFILENBQVEsS0FBS2IsT0FBYixFQUFzQmMsSUFBdEIsQ0FBMkJmLFVBQVUsSUFBSUYsS0FBSixDQUFVRSxNQUFWLENBQXJDLENBQVA7QUFDRDtBQTdDUzs7QUFnRFp1QixPQUFPQyxPQUFQLEdBQWlCMUIsS0FBakIiLCJmaWxlIjoicmVwbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBza3lnZWFyID0gcmVxdWlyZSgnc2t5Z2VhcicpXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGInKVxuXG5jbGFzcyBSZXBseSB7XG4gIGNvbnN0cnVjdG9yIChyZWNvcmQpIHtcbiAgICB0aGlzLl9yZWNvcmQgPSByZWNvcmRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdyZXBseScpXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlIChzdXJ2ZXlJRCwgdXNlcklELCBzY29yZSkge1xuICAgIGxldCByZWNvcmQgPSBuZXcgUmVwbHkuUmVjb3JkKHtcbiAgICAgIHN1cnZleTogbmV3IHNreWdlYXIuUmVmZXJlbmNlKHtcbiAgICAgICAgaWQ6IHN1cnZleUlEXG4gICAgICB9KSxcbiAgICAgIHJlc3BvbmRlbnQ6IHVzZXJJRCxcbiAgICAgIHNjb3JlLFxuICAgICAgcmVhc29uOiAnJyxcbiAgICAgIGlzQ29tcGxldGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGRiLnNhdmUocmVjb3JkKS50aGVuKHJlY29yZCA9PiBuZXcgUmVwbHkocmVjb3JkKSlcbiAgfVxuXG4gIGdldCBpc0NvbXBsZXRlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnaXNDb21wbGV0ZWQnXVxuICB9XG5cbiAgc3RhdGljIG9mIChzdXJ2ZXlJRCwgdXNlcklEKSB7XG4gICAgbGV0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoUmVwbHkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3N1cnZleScsIG5ldyBza3lnZWFyLlJlZmVyZW5jZSh7XG4gICAgICBpZDogc3VydmV5SURcbiAgICB9KSlcbiAgICBxdWVyeS5lcXVhbFRvKCdyZXNwb25kZW50JywgdXNlcklEKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4gcmVzdWx0WzBdID8gbmV3IFJlcGx5KHJlc3VsdFswXSkgOiBudWxsKVxuICB9XG5cbiAgc2V0IHJlYXNvbiAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3JlYXNvbiddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHNldCBpc0NvbXBsZXRlZCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ2lzQ29tcGxldGVkJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgdXBkYXRlICgpIHtcbiAgICByZXR1cm4gZGIuc2F2ZSh0aGlzLl9yZWNvcmQpLnRoZW4ocmVjb3JkID0+IG5ldyBSZXBseShyZWNvcmQpKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVwbHlcbiJdfQ==