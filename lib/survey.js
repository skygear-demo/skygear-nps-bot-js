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
      } else if (npsScore > 0 && npsScore < 50) {
        npsRating = '✅';
        npsMessage = '✅ Good - Your scores lies in the average range of NPS scores, generally means that your company has met the threshold for employee satisfaction. You don’t have an army of Detractors bad mouthing.';
      } else if (npsScore > 50 && npsScore < 75) {
        npsRating = '🎊';
        npsMessage = '🎊 Exellent - The staff is always attentive, everything’s in order, and there are no major issues. Your company is usually under-promise and over-deliver.';
      } else if (npsScore > 75) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdXJ2ZXkuanMiXSwibmFtZXMiOlsic2t5Z2VhciIsInJlcXVpcmUiLCJkYiIsIlJlcGx5IiwibW9kdWxlIiwiZXhwb3J0cyIsIlN1cnZleSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInRlYW1JRCIsImZyZXF1ZW5jeSIsInRhcmdldHNJRCIsInNhdmUiLCJkaXN0cmlidXRpb25EYXRlIiwiRGF0ZSIsImNsb3NpbmdEYXRlIiwiaXNTZW50IiwiaXNDbG9zZWQiLCJ1cGRhdGVkQXQiLCJpZCIsIm9mIiwicXVlcnkiLCJRdWVyeSIsImVxdWFsVG8iLCJzdWJzdHIiLCJyZXN1bHQiLCJsZW5ndGgiLCJFcnJvciIsIndlZWtseSIsInRoZW4iLCJzdXJ2ZXlzIiwiaSIsInB1c2giLCJtb250aGx5IiwicXVhcnRlcmx5IiwibmV3VmFsdWUiLCJ1cGRhdGUiLCJkZWxldGUiLCJyZXNwb25kZW50c0lEIiwiUmVmZXJlbmNlIiwicmVzcG9uZGVudHMiLCJ1c2VySUQiLCJzdGF0cyIsImxpbWl0Iiwic3VtIiwiY291bnQiLCJzY29yZXNDb3VudCIsIkFycmF5IiwiZmlsbCIsInNjb3JlIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwicHJvbW90ZXJzIiwiZmlsdGVyIiwiaXRlbSIsImRldHJhY3RvcnMiLCJucHNTY29yZSIsIm5wc1JhdGluZyIsIm5wc01lc3NhZ2UiLCJzdWJtaXNzaW9uQ291bnQiLCJ0YXJnZXRzQ291bnQiLCJyZXNwb25zZVJhdGUiLCJhdmVyYWdlU2NvcmUiLCJyZXBsaWVzIiwicmVwbHkiLCJyZWFzb24iLCJjbG9zZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLEtBQUtELFFBQVEsTUFBUixDQUFYO0FBQ0EsTUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7O0FBRUFHLE9BQU9DLE9BQVAsR0FBaUIsTUFB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TixDQUFjLFFBQWQsRUFBd0IsSUFBSTNCLFFBQVEyQyxTQUFaLENBQXNCLEtBQUtsQyxPQUEzQixDQUF4Qjs7QUFFQSxXQUFPUCxHQUFHdUIsS0FBSCxDQUFTQSxLQUFULEVBQWdCUSxJQUFoQixDQUFxQkosVUFBVTtBQUNwQyxZQUFNc0MsVUFBVSxFQUFoQjtBQUNBLFdBQUssSUFBSWhDLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sT0FBT0MsTUFBM0IsRUFBbUNLLEdBQW5DLEVBQXdDO0FBQ3RDLGNBQU1pQyxRQUFRdkMsT0FBT00sQ0FBUCxDQUFkO0FBQ0EsWUFBSW1CLE9BQU9DLFNBQVAsQ0FBaUJhLE1BQU1mLEtBQXZCLENBQUosRUFBbUM7QUFDakNjLGtCQUFRL0IsSUFBUixDQUFhO0FBQ1hpQixtQkFBT2UsTUFBTWYsS0FERjtBQUVYZ0Isb0JBQVFELE1BQU1DO0FBRkgsV0FBYjtBQUlEO0FBQ0Y7QUFDRCxhQUFPRixPQUFQO0FBQ0QsS0FaTSxDQUFQO0FBYUQ7O0FBRURHLFVBQVM7QUFDUCxTQUFLakQsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUtGLFdBQUwsR0FBbUIsSUFBSUQsSUFBSixFQUFuQjtBQUNBLFdBQU8sS0FBS3NCLE1BQUwsRUFBUDtBQUNEO0FBOU8yQixDQUE5QiIsImZpbGUiOiJzdXJ2ZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBza3lnZWFyID0gcmVxdWlyZSgnc2t5Z2VhcicpXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGInKVxuY29uc3QgUmVwbHkgPSByZXF1aXJlKCcuL3JlcGx5JylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTdXJ2ZXkge1xuICBjb25zdHJ1Y3RvciAocmVjb3JkKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gcmVjb3JkXG4gIH1cblxuICAvLyBjcmVhdGVcbiAgc3RhdGljIGdldCBSZWNvcmQgKCkge1xuICAgIHJldHVybiBza3lnZWFyLlJlY29yZC5leHRlbmQoJ3N1cnZleScpXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY3JlYXRlICh0ZWFtSUQsIGZyZXF1ZW5jeSwgdGFyZ2V0c0lEKSB7XG4gICAgY29uc3QgcmVjb3JkID0gYXdhaXQgZGIuc2F2ZShuZXcgU3VydmV5LlJlY29yZCh7XG4gICAgICB0ZWFtSUQsXG4gICAgICBmcmVxdWVuY3ksXG4gICAgICB0YXJnZXRzSUQsXG4gICAgICBkaXN0cmlidXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgY2xvc2luZ0RhdGU6IG5ldyBEYXRlKCksXG4gICAgICBpc1NlbnQ6IGZhbHNlLFxuICAgICAgaXNDbG9zZWQ6IGZhbHNlXG4gICAgfSkpXG4gICAgcmV0dXJuIG5ldyBTdXJ2ZXkocmVjb3JkKVxuICB9XG5cbiAgLy8gcmVhZFxuICBnZXQgdXBkYXRlZEF0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd1cGRhdGVkQXQnXVxuICB9XG5cbiAgZ2V0IGlkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWydpZCddXG4gIH1cblxuICBnZXQgdGVhbUlEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0ZWFtSUQnXVxuICB9XG5cbiAgZ2V0IGZyZXF1ZW5jeSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnZnJlcXVlbmN5J11cbiAgfVxuXG4gIGdldCB0YXJnZXRzSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddXG4gIH1cblxuICBnZXQgZGlzdHJpYnV0aW9uRGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnZGlzdHJpYnV0aW9uRGF0ZSddXG4gIH1cblxuICBnZXQgY2xvc2luZ0RhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2Nsb3NpbmdEYXRlJ11cbiAgfVxuXG4gIGdldCBpc1NlbnQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2lzU2VudCddXG4gIH1cblxuICBnZXQgaXNDbG9zZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ2lzQ2xvc2VkJ11cbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBvZiAoaWQpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnX2lkJywgaWQuc3Vic3RyKDcpKSAvLyByZW1vdmUgJ3N1cnZleS8nIHByZWZpeFxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkocXVlcnkpXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE11dGlwbGUgc3VydmV5cyB3aXRoIGlkZW50aWNhbCBpZCAke2lkfSBmb3VuZGApXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgU3VydmV5KHJlc3VsdFswXSkgOiBudWxsXG4gIH1cblxuICBzdGF0aWMgZ2V0IHdlZWtseSAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShTdXJ2ZXkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2ZyZXF1ZW5jeScsICd3ZWVrbHknKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2lzU2VudCcsIGZhbHNlKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgY29uc3Qgc3VydmV5cyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdXJ2ZXlzLnB1c2gobmV3IFN1cnZleShyZXN1bHRbaV0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cnZleXNcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldCBtb250aGx5ICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnZnJlcXVlbmN5JywgJ21vbnRobHknKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2lzU2VudCcsIGZhbHNlKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgY29uc3Qgc3VydmV5cyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdXJ2ZXlzLnB1c2gobmV3IFN1cnZleShyZXN1bHRbaV0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cnZleXNcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldCBxdWFydGVybHkgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdmcmVxdWVuY3knLCAncXVhcnRlcmx5JylcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxuXG4gIC8vIHVwZGF0ZVxuICBzZXQgdGFyZ2V0c0lEIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsndGFyZ2V0c0lEJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IGRpc3RyaWJ1dGlvbkRhdGUgKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5fcmVjb3JkWydkaXN0cmlidXRpb25EYXRlJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IGNsb3NpbmdEYXRlIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsnY2xvc2luZ0RhdGUnXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBzZXQgaXNTZW50IChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsnaXNTZW50J10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IGlzQ2xvc2VkIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsnaXNDbG9zZWQnXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBhc3luYyB1cGRhdGUgKCkge1xuICAgIHRoaXMuX3JlY29yZCA9IGF3YWl0IGRiLnNhdmUodGhpcy5fcmVjb3JkKVxuICB9XG5cbiAgLy8gZGVsZXRlXG4gIGRlbGV0ZSAoKSB7XG4gICAgZGIuZGVsZXRlKHRoaXMuX3JlY29yZClcbiAgfVxuXG4gIC8vIG1pc2NcblxuICAvLyBjb3VudCBib3RoIHN1Ym1pdHRlZCBhbmQgc2tpcHBlZFxuICBnZXQgcmVzcG9uZGVudHNJRCAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShSZXBseS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygnc3VydmV5JywgbmV3IHNreWdlYXIuUmVmZXJlbmNlKHRoaXMuX3JlY29yZCkpXG5cbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbmRlbnRzID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3BvbmRlbnRzLnB1c2gocmVzdWx0W2ldLnVzZXJJRClcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25kZW50c1xuICAgIH0pXG4gIH1cblxuICBnZXQgc3RhdHMgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoUmVwbHkuUmVjb3JkKVxuICAgIHF1ZXJ5LmxpbWl0ID0gOTk5XG4gICAgcXVlcnkuZXF1YWxUbygnc3VydmV5JywgbmV3IHNreWdlYXIuUmVmZXJlbmNlKHRoaXMuX3JlY29yZCkpXG5cbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBsZXQgY291bnQgPSAwXG4gICAgICBsZXQgc2NvcmVzQ291bnQgPSBBcnJheSgxMCkuZmlsbCgwKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSByZXN1bHRbaV0uc2NvcmVcbiAgICAgICAgLy8gc3VibWl0dGVkOiBudW1iZXI7IHNraXBwZWQ6IG51bGxcbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIoc2NvcmUpKSB7XG4gICAgICAgICAgc3VtICs9IHNjb3JlXG4gICAgICAgICAgY291bnQgKz0gMVxuICAgICAgICAgIHNjb3Jlc0NvdW50W3Njb3JlIC0gMV0gKz0gMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBOUFMgc2NvcmVcbiAgICAgIGxldCBwcm9tb3RlcnMgPSByZXN1bHQuZmlsdGVyKGl0ZW0gPT4geyByZXR1cm4gaXRlbS5zY29yZSA+IDggfSlcbiAgICAgIGxldCBkZXRyYWN0b3JzID0gcmVzdWx0LmZpbHRlcihpdGVtID0+IHsgcmV0dXJuIGl0ZW0uc2NvcmUgPCA3IH0pXG5cbiAgICAgIGxldCBucHNTY29yZSA9IDBcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICBucHNTY29yZSA9ICgocHJvbW90ZXJzLmxlbmd0aCAtIGRldHJhY3RvcnMubGVuZ3RoKSAvIHJlc3VsdC5sZW5ndGgpICogMTAwXG4gICAgICB9XG5cbiAgICAgIC8vIOKaoO+4jyBEYW5nZXIgPCAwIC8g4pyFIEdvb2QgMCAtNTAgLyDwn46KIEV4ZWxsZW50IDUwIHRvIDc1IC8g8J+SryBXb3JsZCBDbGFzcyA3NSAtIDEwMFxuICAgICAgbGV0IG5wc1JhdGluZyA9ICcnXG4gICAgICBsZXQgbnBzTWVzc2FnZSA9ICcnXG5cbiAgICAgIGlmIChucHNTY29yZSA8IDApIHtcbiAgICAgICAgbnBzUmF0aW5nID0gJ+KaoO+4jyAnXG4gICAgICAgIG5wc01lc3NhZ2UgPSAn4pqg77iPICBEYW5nZXIgLSBZb3UgaGF2ZSBtb3JlIERldHJhY3RvcnMgdGhhbiBQcm9tb3RlcnMuIENvbXBhbmllcyBpbiB0aGlzIHBvc2l0aW9uIHRlbmQgdG8gc2VlIHZlcnkgaGlnaCBjaHVybiwgbG93IGludGVybmFsIG9waW5pb24sIGZldyB0YWxlbnQgcmVmZXJyYWxzLCBhbmQgYmFzaWNhbGx5IGV2ZXJ5IG5lZ2F0aXZlIHlvdSB3b3VsZCBhc3NvY2lhdGUgd2l0aCBsb3cgZW1wbG95ZWUgbG95YWx0eS4nXG4gICAgICB9IGVsc2UgaWYgKG5wc1Njb3JlID4gMCAmJiBucHNTY29yZSA8IDUwKSB7XG4gICAgICAgIG5wc1JhdGluZyA9ICfinIUnXG4gICAgICAgIG5wc01lc3NhZ2UgPSAn4pyFIEdvb2QgLSBZb3VyIHNjb3JlcyBsaWVzIGluIHRoZSBhdmVyYWdlIHJhbmdlIG9mIE5QUyBzY29yZXMsIGdlbmVyYWxseSBtZWFucyB0aGF0IHlvdXIgY29tcGFueSBoYXMgbWV0IHRoZSB0aHJlc2hvbGQgZm9yIGVtcGxveWVlIHNhdGlzZmFjdGlvbi4gWW91IGRvbuKAmXQgaGF2ZSBhbiBhcm15IG9mIERldHJhY3RvcnMgYmFkIG1vdXRoaW5nLidcbiAgICAgIH0gZWxzZSBpZiAobnBzU2NvcmUgPiA1MCAmJiBucHNTY29yZSA8IDc1KSB7XG4gICAgICAgIG5wc1JhdGluZyA9ICfwn46KJ1xuICAgICAgICBucHNNZXNzYWdlID0gJ/CfjoogRXhlbGxlbnQgLSBUaGUgc3RhZmYgaXMgYWx3YXlzIGF0dGVudGl2ZSwgZXZlcnl0aGluZ+KAmXMgaW4gb3JkZXIsIGFuZCB0aGVyZSBhcmUgbm8gbWFqb3IgaXNzdWVzLiBZb3VyIGNvbXBhbnkgaXMgdXN1YWxseSB1bmRlci1wcm9taXNlIGFuZCBvdmVyLWRlbGl2ZXIuJ1xuICAgICAgfSBlbHNlIGlmIChucHNTY29yZSA+IDc1KSB7XG4gICAgICAgIG5wc1JhdGluZyA9ICfwn5KvJ1xuICAgICAgICBucHNNZXNzYWdlID0gJ/Cfkq8gV29ybGQgQ2xhc3MgLSBPZmYtdGhlLWNoYXJ0cyBsZXZlbHMgb2YgZW1wbG95ZWUgbG95YWx0eS4gS2VlcCBpdCB1cCEnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Ym1pc3Npb25Db3VudDogY291bnQsXG4gICAgICAgIHRhcmdldHNDb3VudDogdGhpcy50YXJnZXRzSUQubGVuZ3RoLFxuICAgICAgICByZXNwb25zZVJhdGU6IGNvdW50IC8gdGhpcy50YXJnZXRzSUQubGVuZ3RoLCAvLyBzdWJtaXR0ZWQgLyB0YXJnZXRzICMsXG4gICAgICAgIGF2ZXJhZ2VTY29yZTogc3VtIC8gY291bnQsIC8vIGlnbm9yZSBza2lwcGVkIG9yIHNpbGVudCB0YXJnZXRzXG4gICAgICAgIG5wc1Njb3JlOiBucHNTY29yZSxcbiAgICAgICAgbnBzTWVzc2FnZTogbnBzTWVzc2FnZSxcbiAgICAgICAgbnBzUmF0aW5nOiBucHNSYXRpbmcsXG4gICAgICAgIHNjb3Jlc0NvdW50XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldCByZXBsaWVzICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFJlcGx5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzdXJ2ZXknLCBuZXcgc2t5Z2Vhci5SZWZlcmVuY2UodGhpcy5fcmVjb3JkKSlcblxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgY29uc3QgcmVwbGllcyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByZXBseSA9IHJlc3VsdFtpXVxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihyZXBseS5zY29yZSkpIHtcbiAgICAgICAgICByZXBsaWVzLnB1c2goe1xuICAgICAgICAgICAgc2NvcmU6IHJlcGx5LnNjb3JlLFxuICAgICAgICAgICAgcmVhc29uOiByZXBseS5yZWFzb25cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVwbGllc1xuICAgIH0pXG4gIH1cblxuICBjbG9zZSAoKSB7XG4gICAgdGhpcy5pc0Nsb3NlZCA9IHRydWVcbiAgICB0aGlzLmNsb3NpbmdEYXRlID0gbmV3IERhdGUoKVxuICAgIHJldHVybiB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cbiJdfQ==