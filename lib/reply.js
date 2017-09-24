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
      query.equalTo('respondent', userID);
      return db.query(query).then(result => result[0] ? new Reply(result[0]) : null);
    } else {
      return db.query(query).then(result => {
        let records = [];
        for (let i = 0; i < result.length; i++) {
          records.push(new Reply(result[i]));
        }
        return records;
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXBseS5qcyJdLCJuYW1lcyI6WyJza3lnZWFyIiwicmVxdWlyZSIsImRiIiwiUmVwbHkiLCJjb25zdHJ1Y3RvciIsInJlY29yZCIsIl9yZWNvcmQiLCJSZWNvcmQiLCJleHRlbmQiLCJjcmVhdGUiLCJzdXJ2ZXlJRCIsInVzZXJJRCIsInNjb3JlIiwic3VydmV5IiwiUmVmZXJlbmNlIiwiaWQiLCJyZXNwb25kZW50IiwicmVhc29uIiwiaXNDb21wbGV0ZWQiLCJzYXZlIiwidGhlbiIsIm9mIiwicXVlcnkiLCJRdWVyeSIsImVxdWFsVG8iLCJyZXN1bHQiLCJyZWNvcmRzIiwiaSIsImxlbmd0aCIsInB1c2giLCJuZXdWYWx1ZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDs7QUFFQSxNQUFNRSxLQUFOLENBQVk7QUFDVkMsY0FBYUMsTUFBYixFQUFxQjtBQUNuQixTQUFLQyxPQUFMLEdBQWVELE1BQWY7QUFDRDs7QUFFRCxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9QLFFBQVFPLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixPQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDQyxLQUF2QyxFQUE4QztBQUFBO0FBQzVDLFVBQUlQLFNBQVMsSUFBSUYsTUFBTUksTUFBVixDQUFpQjtBQUM1Qk0sZ0JBQVEsSUFBSWIsUUFBUWMsU0FBWixDQUFzQjtBQUM1QkMsY0FBSUw7QUFEd0IsU0FBdEIsQ0FEb0I7QUFJNUJNLG9CQUFZTCxNQUpnQjtBQUs1QkMsYUFMNEI7QUFNNUJLLGdCQUFRLEVBTm9CO0FBTzVCQyxxQkFBYTtBQVBlLE9BQWpCLENBQWI7QUFTQSxhQUFPaEIsR0FBR2lCLElBQUgsQ0FBUWQsTUFBUixFQUFnQmUsSUFBaEIsQ0FBcUI7QUFBQSxlQUFVLElBQUlqQixLQUFKLENBQVVFLE1BQVYsQ0FBVjtBQUFBLE9BQXJCLENBQVA7QUFWNEM7QUFXN0M7O0FBRUQsTUFBSVcsVUFBSixHQUFrQjtBQUNoQixXQUFPLEtBQUtWLE9BQUwsQ0FBYSxZQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJWSxXQUFKLEdBQW1CO0FBQ2pCLFdBQU8sS0FBS1osT0FBTCxDQUFhLGFBQWIsQ0FBUDtBQUNEOztBQUVELFNBQU9lLEVBQVAsQ0FBV1gsUUFBWCxFQUFxQkMsTUFBckIsRUFBNkI7QUFDM0IsUUFBSVcsUUFBUSxJQUFJdEIsUUFBUXVCLEtBQVosQ0FBa0JwQixNQUFNSSxNQUF4QixDQUFaO0FBQ0FlLFVBQU1FLE9BQU4sQ0FBYyxRQUFkLEVBQXdCLElBQUl4QixRQUFRYyxTQUFaLENBQXNCO0FBQzVDQyxVQUFJTDtBQUR3QyxLQUF0QixDQUF4QjtBQUdBLFFBQUlDLE1BQUosRUFBWTtBQUNWVyxZQUFNRSxPQUFOLENBQWMsWUFBZCxFQUE0QmIsTUFBNUI7QUFDQSxhQUFPVCxHQUFHb0IsS0FBSCxDQUFTQSxLQUFULEVBQWdCRixJQUFoQixDQUFxQkssVUFBVUEsT0FBTyxDQUFQLElBQVksSUFBSXRCLEtBQUosQ0FBVXNCLE9BQU8sQ0FBUCxDQUFWLENBQVosR0FBbUMsSUFBbEUsQ0FBUDtBQUNELEtBSEQsTUFHTztBQUNMLGFBQU92QixHQUFHb0IsS0FBSCxDQUFTQSxLQUFULEVBQWdCRixJQUFoQixDQUFxQkssVUFBVTtBQUNwQyxZQUFJQyxVQUFVLEVBQWQ7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsT0FBT0csTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3RDRCxrQkFBUUcsSUFBUixDQUFhLElBQUkxQixLQUFKLENBQVVzQixPQUFPRSxDQUFQLENBQVYsQ0FBYjtBQUNEO0FBQ0QsZUFBT0QsT0FBUDtBQUNELE9BTk0sQ0FBUDtBQU9EO0FBQ0Y7O0FBRUQsTUFBSVQsTUFBSixDQUFZYSxRQUFaLEVBQXNCO0FBQ3BCLFNBQUt4QixPQUFMLENBQWEsUUFBYixJQUF5QndCLFFBQXpCO0FBQ0Q7O0FBRUQsTUFBSVosV0FBSixDQUFpQlksUUFBakIsRUFBMkI7QUFDekIsU0FBS3hCLE9BQUwsQ0FBYSxhQUFiLElBQThCd0IsUUFBOUI7QUFDRDs7QUFFREMsV0FBVTtBQUNSLFdBQU83QixHQUFHaUIsSUFBSCxDQUFRLEtBQUtiLE9BQWIsRUFBc0JjLElBQXRCLENBQTJCZixVQUFVLElBQUlGLEtBQUosQ0FBVUUsTUFBVixDQUFyQyxDQUFQO0FBQ0Q7QUEzRFM7O0FBOERaMkIsT0FBT0MsT0FBUCxHQUFpQjlCLEtBQWpCIiwiZmlsZSI6InJlcGx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcblxuY2xhc3MgUmVwbHkge1xuICBjb25zdHJ1Y3RvciAocmVjb3JkKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gcmVjb3JkXG4gIH1cblxuICBzdGF0aWMgZ2V0IFJlY29yZCAoKSB7XG4gICAgcmV0dXJuIHNreWdlYXIuUmVjb3JkLmV4dGVuZCgncmVwbHknKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAoc3VydmV5SUQsIHVzZXJJRCwgc2NvcmUpIHtcbiAgICBsZXQgcmVjb3JkID0gbmV3IFJlcGx5LlJlY29yZCh7XG4gICAgICBzdXJ2ZXk6IG5ldyBza3lnZWFyLlJlZmVyZW5jZSh7XG4gICAgICAgIGlkOiBzdXJ2ZXlJRFxuICAgICAgfSksXG4gICAgICByZXNwb25kZW50OiB1c2VySUQsXG4gICAgICBzY29yZSxcbiAgICAgIHJlYXNvbjogJycsXG4gICAgICBpc0NvbXBsZXRlZDogZmFsc2VcbiAgICB9KVxuICAgIHJldHVybiBkYi5zYXZlKHJlY29yZCkudGhlbihyZWNvcmQgPT4gbmV3IFJlcGx5KHJlY29yZCkpXG4gIH1cblxuICBnZXQgcmVzcG9uZGVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsncmVzcG9uZGVudCddXG4gIH1cblxuICBnZXQgaXNDb21wbGV0ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2lzQ29tcGxldGVkJ11cbiAgfVxuXG4gIHN0YXRpYyBvZiAoc3VydmV5SUQsIHVzZXJJRCkge1xuICAgIGxldCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFJlcGx5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzdXJ2ZXknLCBuZXcgc2t5Z2Vhci5SZWZlcmVuY2Uoe1xuICAgICAgaWQ6IHN1cnZleUlEXG4gICAgfSkpXG4gICAgaWYgKHVzZXJJRCkge1xuICAgICAgcXVlcnkuZXF1YWxUbygncmVzcG9uZGVudCcsIHVzZXJJRClcbiAgICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4gcmVzdWx0WzBdID8gbmV3IFJlcGx5KHJlc3VsdFswXSkgOiBudWxsKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgbGV0IHJlY29yZHMgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHJlY29yZHMucHVzaChuZXcgUmVwbHkocmVzdWx0W2ldKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3Jkc1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzZXQgcmVhc29uIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsncmVhc29uJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IGlzQ29tcGxldGVkIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsnaXNDb21wbGV0ZWQnXSA9IG5ld1ZhbHVlXG4gIH1cblxuICB1cGRhdGUgKCkge1xuICAgIHJldHVybiBkYi5zYXZlKHRoaXMuX3JlY29yZCkudGhlbihyZWNvcmQgPT4gbmV3IFJlcGx5KHJlY29yZCkpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXBseVxuIl19