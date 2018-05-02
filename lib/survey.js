'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');
const Reply = require('./reply');

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
        distributionDate: new Date(),
        closingDate: new Date(),
        isSent: false,
        isClosed: false
      }));
      return new Survey(record);
    })();
  }

  // read
  get updatedAt() {
    return this._record['updatedAt'];
  }

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

  get distributionDate() {
    return this._record['distributionDate'];
  }

  get closingDate() {
    return this._record['closingDate'];
  }

  get isSent() {
    return this._record['isSent'];
  }

  get isClosed() {
    return this._record['isClosed'];
  }

  static of(id) {
    return _asyncToGenerator(function* () {
      const query = new skygear.Query(Survey.Record);
      query.equalTo('_id', id.substr(7)); // remove 'survey/' prefix

      const result = yield db.query(query);
      if (result.length > 1) {
        throw new Error(`Mutiple surveys with identical id ${id} found`);
      }
      return result[0] ? new Survey(result[0]) : null;
    })();
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
  set targetsID(newValue) {
    this._record['targetsID'] = newValue;
  }

  set distributionDate(newValue) {
    this._record['distributionDate'] = newValue;
  }

  set closingDate(newValue) {
    this._record['closingDate'] = newValue;
  }

  set isSent(newValue) {
    this._record['isSent'] = newValue;
  }

  set isClosed(newValue) {
    this._record['isClosed'] = newValue;
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

  // misc

  // count both submitted and skipped
  get respondentsID() {
    const query = new skygear.Query(Reply.Record);
    query.equalTo('survey', new skygear.Reference(this._record));

    return db.query(query).then(result => {
      const respondents = [];
      for (let i = 0; i < result.length; i++) {
        respondents.push(result[i].userID);
      }
      return respondents;
    });
  }

  get stats() {
    const query = new skygear.Query(Reply.Record);
    query.limit = 999;
    query.equalTo('survey', new skygear.Reference(this._record));

    return db.query(query).then(result => {
      let sum = 0;
      let count = 0;
      let scoresCount = Array(10).fill(0);
      for (let i = 0; i < result.length; i++) {
        const score = result[i].score;
        // submitted: number; skipped: null
        if (Number.isInteger(score)) {
          sum += score;
          count += 1;
          scoresCount[score - 1] += 1;
        }
      }

      // calculate NPS score
      let promoters = result.filter(item => {
        return item.score > 8;
      });
      let detractors = result.filter(item => {
        return item.score < 7;
      });

      let npsScore = 0;
      if (result.length > 0) {
        npsScore = (promoters.length - detractors.length) / result.length * 100;
      }

      // ⚠️ Danger < 0 / ✅ Good 0 -50 / 🎊 Exellent 50 to 75 / 💯 World Class 75 - 100
      let npsRating = '';
      let npsMessage = '';

      if (npsScore < 0) {
        npsRating = '⚠️ ';
        npsMessage = '⚠️  Danger - You have more Detractors than Promoters. Companies in this position tend to see very high churn, low internal opinion, few talent referrals, and basically every negative you would associate with low employee loyalty.';
      } else if (npsScore >= 0 && npsScore < 50) {
        npsRating = '✅';
        npsMessage = '✅ Good - Your scores lies in the average range of NPS scores, generally means that your company has met the threshold for employee satisfaction. You don’t have an army of Detractors bad mouthing.';
      } else if (npsScore >= 50 && npsScore < 75) {
        npsRating = '🎊';
        npsMessage = '🎊 Exellent - The staff is always attentive, everything’s in order, and there are no major issues. Your company is usually under-promise and over-deliver.';
      } else if (npsScore >= 75) {
        npsRating = '💯';
        npsMessage = '💯 World Class - Off-the-charts levels of employee loyalty. Keep it up!';
      }

      return {
        submissionCount: count,
        targetsCount: this.targetsID.length,
        responseRate: count / this.targetsID.length, // submitted / targets #,
        averageScore: sum / count, // ignore skipped or silent targets
        npsScore: npsScore,
        npsMessage: npsMessage,
        npsRating: npsRating,
        scoresCount
      };
    });
  }

  get replies() {
    const query = new skygear.Query(Reply.Record);
    query.equalTo('survey', new skygear.Reference(this._record));

    return db.query(query).then(result => {
      const replies = [];
      for (let i = 0; i < result.length; i++) {
        const reply = result[i];
        if (Number.isInteger(reply.score)) {
          replies.push({
            score: reply.score,
            reason: reply.reason
          });
        }
      }
      return replies;
    });
  }

  close() {
    this.isClosed = true;
    this.closingDate = new Date();
    return this.update();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdXJ2ZXkuanMiXSwibmFtZXMiOlsic2t5Z2VhciIsInJlcXVpcmUiLCJkYiIsIlJlcGx5IiwibW9kdWxlIiwiZXhwb3J0cyIsIlN1cnZleSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInRlYW1JRCIsImZyZXF1ZW5jeSIsInRhcmdldHNJRCIsInNhdmUiLCJkaXN0cmlidXRpb25EYXRlIiwiRGF0ZSIsImNsb3NpbmdEYXRlIiwiaXNTZW50IiwiaXNDbG9zZWQiLCJ1cGRhdGVkQXQiLCJpZCIsIm9mIiwicXVlcnkiLCJRdWVyeSIsImVxdWFsVG8iLCJzdWJzdHIiLCJyZXN1bHQiLCJsZW5ndGgiLCJFcnJvciIsIndlZWtseSIsInRoZW4iLCJzdXJ2ZXlzIiwiaSIsInB1c2giLCJtb250aGx5IiwicXVhcnRlcmx5IiwibmV3VmFsdWUiLCJ1cGRhdGUiLCJkZWxldGUiLCJyZXNwb25kZW50c0lEIiwiUmVmZXJlbmNlIiwicmVzcG9uZGVudHMiLCJ1c2VySUQiLCJzdGF0cyIsImxpbWl0Iiwic3VtIiwiY291bnQiLCJzY29yZXNDb3VudCIsIkFycmF5IiwiZmlsbCIsInNjb3JlIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwicHJvbW90ZXJzIiwiZmlsdGVyIiwiaXRlbSIsImRldHJhY3RvcnMiLCJucHNTY29yZSIsIm5wc1JhdGluZyIsIm5wc01lc3NhZ2UiLCJzdWJtaXNzaW9uQ291bnQiLCJ0YXJnZXRzQ291bnQiLCJyZXNwb25zZVJhdGUiLCJhdmVyYWdlU2NvcmUiLCJyZXBsaWVzIiwicmVwbHkiLCJyZWFzb24iLCJjbG9zZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsTUFBUixDQUFYO0FBQ0EsTUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7O0FBRUFHLE9BQU9DLE9BQVAsR0FBaUIsTUFB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QU4sQ0FBYyxRQUFkLEVBQXdCLElBQUkzQixRQUFRMkMsU0FBWixDQUFzQixLQUFLbEMsT0FBM0IsQ0FBeEI7O0FBRUEsV0FBT1AsR0FBR3VCLEtBQUgsQ0FBU0EsS0FBVCxFQUFnQlEsSUFBaEIsQ0FBcUJKLFVBQVU7QUFDcEMsWUFBTXNDLFVBQVUsRUFBaEI7QUFDQSxXQUFLLElBQUloQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLE9BQU9DLE1BQTNCLEVBQW1DSyxHQUFuQyxFQUF3QztBQUN0QyxjQUFNaUMsUUFBUXZDLE9BQU9NLENBQVAsQ0FBZDtBQUNBLFlBQUltQixPQUFPQyxTQUFQLENBQWlCYSxNQUFNZixLQUF2QixDQUFKLEVBQW1DO0FBQ2pDYyxrQkFBUS9CLElBQVIsQ0FBYTtBQUNYaUIsbUJBQU9lLE1BQU1mLEtBREY7QUFFWGdCLG9CQUFRRCxNQUFNQztBQUZILFdBQWI7QUFJRDtBQUNGO0FBQ0QsYUFBT0YsT0FBUDtBQUNELEtBWk0sQ0FBUDtBQWFEOztBQUVERyxVQUFTO0FBQ1AsU0FBS2pELFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLRixXQUFMLEdBQW1CLElBQUlELElBQUosRUFBbkI7QUFDQSxXQUFPLEtBQUtzQixNQUFMLEVBQVA7QUFDRDtBQTlPMkIsQ0FBOUIiLCJmaWxlIjoic3VydmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcbmNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi9yZXBseScpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU3VydmV5IHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCdzdXJ2ZXknKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAodGVhbUlELCBmcmVxdWVuY3ksIHRhcmdldHNJRCkge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFN1cnZleS5SZWNvcmQoe1xuICAgICAgdGVhbUlELFxuICAgICAgZnJlcXVlbmN5LFxuICAgICAgdGFyZ2V0c0lELFxuICAgICAgZGlzdHJpYnV0aW9uRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgIGNsb3NpbmdEYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgaXNTZW50OiBmYWxzZSxcbiAgICAgIGlzQ2xvc2VkOiBmYWxzZVxuICAgIH0pKVxuICAgIHJldHVybiBuZXcgU3VydmV5KHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IHVwZGF0ZWRBdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsndXBkYXRlZEF0J11cbiAgfVxuXG4gIGdldCBpZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnaWQnXVxuICB9XG5cbiAgZ2V0IHRlYW1JRCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsndGVhbUlEJ11cbiAgfVxuXG4gIGdldCBmcmVxdWVuY3kgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2ZyZXF1ZW5jeSddXG4gIH1cblxuICBnZXQgdGFyZ2V0c0lEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0YXJnZXRzSUQnXVxuICB9XG5cbiAgZ2V0IGRpc3RyaWJ1dGlvbkRhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2Rpc3RyaWJ1dGlvbkRhdGUnXVxuICB9XG5cbiAgZ2V0IGNsb3NpbmdEYXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydjbG9zaW5nRGF0ZSddXG4gIH1cblxuICBnZXQgaXNTZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpc1NlbnQnXVxuICB9XG5cbiAgZ2V0IGlzQ2xvc2VkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpc0Nsb3NlZCddXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgb2YgKGlkKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShTdXJ2ZXkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ19pZCcsIGlkLnN1YnN0cig3KSkgLy8gcmVtb3ZlICdzdXJ2ZXkvJyBwcmVmaXhcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5KVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXRpcGxlIHN1cnZleXMgd2l0aCBpZGVudGljYWwgaWQgJHtpZH0gZm91bmRgKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0WzBdID8gbmV3IFN1cnZleShyZXN1bHRbMF0pIDogbnVsbFxuICB9XG5cbiAgc3RhdGljIGdldCB3ZWVrbHkgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdmcmVxdWVuY3knLCAnd2Vla2x5JylcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbW9udGhseSAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShTdXJ2ZXkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2ZyZXF1ZW5jeScsICdtb250aGx5JylcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgcXVhcnRlcmx5ICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnZnJlcXVlbmN5JywgJ3F1YXJ0ZXJseScpXG4gICAgcXVlcnkuZXF1YWxUbygnaXNTZW50JywgZmFsc2UpXG4gICAgcmV0dXJuIGRiLnF1ZXJ5KHF1ZXJ5KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBjb25zdCBzdXJ2ZXlzID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN1cnZleXMucHVzaChuZXcgU3VydmV5KHJlc3VsdFtpXSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3VydmV5c1xuICAgIH0pXG4gIH1cblxuICAvLyB1cGRhdGVcbiAgc2V0IHRhcmdldHNJRCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHNldCBkaXN0cmlidXRpb25EYXRlIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsnZGlzdHJpYnV0aW9uRGF0ZSddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHNldCBjbG9zaW5nRGF0ZSAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ2Nsb3NpbmdEYXRlJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IGlzU2VudCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ2lzU2VudCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIHNldCBpc0Nsb3NlZCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ2lzQ2xvc2VkJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlICgpIHtcbiAgICB0aGlzLl9yZWNvcmQgPSBhd2FpdCBkYi5zYXZlKHRoaXMuX3JlY29yZClcbiAgfVxuXG4gIC8vIGRlbGV0ZVxuICBkZWxldGUgKCkge1xuICAgIGRiLmRlbGV0ZSh0aGlzLl9yZWNvcmQpXG4gIH1cblxuICAvLyBtaXNjXG5cbiAgLy8gY291bnQgYm90aCBzdWJtaXR0ZWQgYW5kIHNraXBwZWRcbiAgZ2V0IHJlc3BvbmRlbnRzSUQgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoUmVwbHkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3N1cnZleScsIG5ldyBza3lnZWFyLlJlZmVyZW5jZSh0aGlzLl9yZWNvcmQpKVxuXG4gICAgcmV0dXJuIGRiLnF1ZXJ5KHF1ZXJ5KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBjb25zdCByZXNwb25kZW50cyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXNwb25kZW50cy5wdXNoKHJlc3VsdFtpXS51c2VySUQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uZGVudHNcbiAgICB9KVxuICB9XG5cbiAgZ2V0IHN0YXRzICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFJlcGx5LlJlY29yZClcbiAgICBxdWVyeS5saW1pdCA9IDk5OVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3N1cnZleScsIG5ldyBza3lnZWFyLlJlZmVyZW5jZSh0aGlzLl9yZWNvcmQpKVxuXG4gICAgcmV0dXJuIGRiLnF1ZXJ5KHF1ZXJ5KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBsZXQgc3VtID0gMFxuICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgbGV0IHNjb3Jlc0NvdW50ID0gQXJyYXkoMTApLmZpbGwoMClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gcmVzdWx0W2ldLnNjb3JlXG4gICAgICAgIC8vIHN1Ym1pdHRlZDogbnVtYmVyOyBza2lwcGVkOiBudWxsXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHNjb3JlKSkge1xuICAgICAgICAgIHN1bSArPSBzY29yZVxuICAgICAgICAgIGNvdW50ICs9IDFcbiAgICAgICAgICBzY29yZXNDb3VudFtzY29yZSAtIDFdICs9IDFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWxjdWxhdGUgTlBTIHNjb3JlXG4gICAgICBsZXQgcHJvbW90ZXJzID0gcmVzdWx0LmZpbHRlcihpdGVtID0+IHsgcmV0dXJuIGl0ZW0uc2NvcmUgPiA4IH0pXG4gICAgICBsZXQgZGV0cmFjdG9ycyA9IHJlc3VsdC5maWx0ZXIoaXRlbSA9PiB7IHJldHVybiBpdGVtLnNjb3JlIDwgNyB9KVxuXG4gICAgICBsZXQgbnBzU2NvcmUgPSAwXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgbnBzU2NvcmUgPSAoKHByb21vdGVycy5sZW5ndGggLSBkZXRyYWN0b3JzLmxlbmd0aCkgLyByZXN1bHQubGVuZ3RoKSAqIDEwMFxuICAgICAgfVxuXG4gICAgICAvLyDimqDvuI8gRGFuZ2VyIDwgMCAvIOKchSBHb29kIDAgLTUwIC8g8J+OiiBFeGVsbGVudCA1MCB0byA3NSAvIPCfkq8gV29ybGQgQ2xhc3MgNzUgLSAxMDBcbiAgICAgIGxldCBucHNSYXRpbmcgPSAnJ1xuICAgICAgbGV0IG5wc01lc3NhZ2UgPSAnJ1xuXG4gICAgICBpZiAobnBzU2NvcmUgPCAwKSB7XG4gICAgICAgIG5wc1JhdGluZyA9ICfimqDvuI8gJ1xuICAgICAgICBucHNNZXNzYWdlID0gJ+KaoO+4jyAgRGFuZ2VyIC0gWW91IGhhdmUgbW9yZSBEZXRyYWN0b3JzIHRoYW4gUHJvbW90ZXJzLiBDb21wYW5pZXMgaW4gdGhpcyBwb3NpdGlvbiB0ZW5kIHRvIHNlZSB2ZXJ5IGhpZ2ggY2h1cm4sIGxvdyBpbnRlcm5hbCBvcGluaW9uLCBmZXcgdGFsZW50IHJlZmVycmFscywgYW5kIGJhc2ljYWxseSBldmVyeSBuZWdhdGl2ZSB5b3Ugd291bGQgYXNzb2NpYXRlIHdpdGggbG93IGVtcGxveWVlIGxveWFsdHkuJ1xuICAgICAgfSBlbHNlIGlmIChucHNTY29yZSA+PSAwICYmIG5wc1Njb3JlIDwgNTApIHtcbiAgICAgICAgbnBzUmF0aW5nID0gJ+KchSdcbiAgICAgICAgbnBzTWVzc2FnZSA9ICfinIUgR29vZCAtIFlvdXIgc2NvcmVzIGxpZXMgaW4gdGhlIGF2ZXJhZ2UgcmFuZ2Ugb2YgTlBTIHNjb3JlcywgZ2VuZXJhbGx5IG1lYW5zIHRoYXQgeW91ciBjb21wYW55IGhhcyBtZXQgdGhlIHRocmVzaG9sZCBmb3IgZW1wbG95ZWUgc2F0aXNmYWN0aW9uLiBZb3UgZG9u4oCZdCBoYXZlIGFuIGFybXkgb2YgRGV0cmFjdG9ycyBiYWQgbW91dGhpbmcuJ1xuICAgICAgfSBlbHNlIGlmIChucHNTY29yZSA+PSA1MCAmJiBucHNTY29yZSA8IDc1KSB7XG4gICAgICAgIG5wc1JhdGluZyA9ICfwn46KJ1xuICAgICAgICBucHNNZXNzYWdlID0gJ/CfjoogRXhlbGxlbnQgLSBUaGUgc3RhZmYgaXMgYWx3YXlzIGF0dGVudGl2ZSwgZXZlcnl0aGluZ+KAmXMgaW4gb3JkZXIsIGFuZCB0aGVyZSBhcmUgbm8gbWFqb3IgaXNzdWVzLiBZb3VyIGNvbXBhbnkgaXMgdXN1YWxseSB1bmRlci1wcm9taXNlIGFuZCBvdmVyLWRlbGl2ZXIuJ1xuICAgICAgfSBlbHNlIGlmIChucHNTY29yZSA+PSA3NSkge1xuICAgICAgICBucHNSYXRpbmcgPSAn8J+SrydcbiAgICAgICAgbnBzTWVzc2FnZSA9ICfwn5KvIFdvcmxkIENsYXNzIC0gT2ZmLXRoZS1jaGFydHMgbGV2ZWxzIG9mIGVtcGxveWVlIGxveWFsdHkuIEtlZXAgaXQgdXAhJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWJtaXNzaW9uQ291bnQ6IGNvdW50LFxuICAgICAgICB0YXJnZXRzQ291bnQ6IHRoaXMudGFyZ2V0c0lELmxlbmd0aCxcbiAgICAgICAgcmVzcG9uc2VSYXRlOiBjb3VudCAvIHRoaXMudGFyZ2V0c0lELmxlbmd0aCwgLy8gc3VibWl0dGVkIC8gdGFyZ2V0cyAjLFxuICAgICAgICBhdmVyYWdlU2NvcmU6IHN1bSAvIGNvdW50LCAvLyBpZ25vcmUgc2tpcHBlZCBvciBzaWxlbnQgdGFyZ2V0c1xuICAgICAgICBucHNTY29yZTogbnBzU2NvcmUsXG4gICAgICAgIG5wc01lc3NhZ2U6IG5wc01lc3NhZ2UsXG4gICAgICAgIG5wc1JhdGluZzogbnBzUmF0aW5nLFxuICAgICAgICBzY29yZXNDb3VudFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXQgcmVwbGllcyAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShSZXBseS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnc3VydmV5JywgbmV3IHNreWdlYXIuUmVmZXJlbmNlKHRoaXMuX3JlY29yZCkpXG5cbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHJlcGxpZXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcmVwbHkgPSByZXN1bHRbaV1cbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIocmVwbHkuc2NvcmUpKSB7XG4gICAgICAgICAgcmVwbGllcy5wdXNoKHtcbiAgICAgICAgICAgIHNjb3JlOiByZXBseS5zY29yZSxcbiAgICAgICAgICAgIHJlYXNvbjogcmVwbHkucmVhc29uXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGxpZXNcbiAgICB9KVxuICB9XG5cbiAgY2xvc2UgKCkge1xuICAgIHRoaXMuaXNDbG9zZWQgPSB0cnVlXG4gICAgdGhpcy5jbG9zaW5nRGF0ZSA9IG5ldyBEYXRlKClcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKVxuICB9XG59XG4iXX0=