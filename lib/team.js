'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const Bot = require('./bot');
const db = require('./db');
const Survey = require('./survey');

module.exports = class Team {
  constructor(record) {
    this._record = record;
  }

  // create
  static get Record() {
    return skygear.Record.extend('team');
  }

  static create(slackID, token, targetsID) {
    return _asyncToGenerator(function* () {
      const record = yield db.save(new Team.Record({ slackID, token, targetsID }));
      return new Team(record);
    })();
  }

  // read
  get slackID() {
    return this._record['slackID'];
  }

  get token() {
    return this._record['token'];
  }

  get targetsID() {
    return this._record['targetsID'];
  }

  static of(slackID) {
    return _asyncToGenerator(function* () {
      const query = new skygear.Query(Team.Record);
      query.equalTo('slackID', slackID);

      const result = yield db.query(query);
      if (result.length > 1) {
        throw new Error(`Mutiple teams with identical slackID ${slackID} found`);
      }
      return result[0] ? new Team(result[0]) : null;
    })();
  }

  // update
  set token(newValue) {
    this._record['token'] = newValue;
  }

  set targetsID(newValue) {
    this._record['targetsID'] = newValue;
  }

  update() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this._record = yield db.save(_this._record);
    })();
  }

  // misc
  get bot() {
    return new Bot(this.token);
  }

  get members() {
    return this.bot.fetchUsers();
  }

  get scheduledSurvey() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('teamID', this.slackID);
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error('Mutiple scheduled survey found');
      }
      return result[0] ? new Survey(result[0]) : null;
    });
  }

  get activeSurvey() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('teamID', this.slackID);
    query.equalTo('isSent', true);
    query.equalTo('isClosed', false);
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error('Mutiple active survey found');
      }
      return result[0] ? new Survey(result[0]) : null;
    });
  }

  getSurveys(number) {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('teamID', this.slackID);
    query.equalTo('isSent', true);
    query.equalTo('isClosed', true);
    query.addDescending('_updated_at');
    if (number) {
      query.limit = number;
    }
    return db.query(query).then(result => {
      const surveys = [];
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]));
      }
      return surveys;
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZWFtLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiQm90IiwiZGIiLCJTdXJ2ZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0b2tlbiIsInRhcmdldHNJRCIsInNhdmUiLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsImJvdCIsIm1lbWJlcnMiLCJmZXRjaFVzZXJzIiwic2NoZWR1bGVkU3VydmV5IiwidGhlbiIsImFjdGl2ZVN1cnZleSIsImdldFN1cnZleXMiLCJudW1iZXIiLCJhZGREZXNjZW5kaW5nIiwibGltaXQiLCJzdXJ2ZXlzIiwiaSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxNQUFNRCxRQUFRLE9BQVIsQ0FBWjtBQUNBLE1BQU1FLEtBQUtGLFFBQVEsTUFBUixDQUFYO0FBQ0EsTUFBTUcsU0FBU0gsUUFBUSxVQUFSLENBQWY7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsSUFBTixDQUFXO0FBQzFCQyxjQUFhQyxNQUFiLEVBQXFCO0FBQ25CLFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUNEOztBQUVEO0FBQ0EsYUFBV0UsTUFBWCxHQUFxQjtBQUNuQixXQUFPWCxRQUFRVyxNQUFSLENBQWVDLE1BQWYsQ0FBc0IsTUFBdEIsQ0FBUDtBQUNEOztBQUVELFNBQWFDLE1BQWIsQ0FBcUJDLE9BQXJCLEVBQThCQyxLQUE5QixFQUFxQ0MsU0FBckMsRUFBZ0Q7QUFBQTtBQUM5QyxZQUFNUCxTQUFTLE1BQU1OLEdBQUdjLElBQUgsQ0FBUSxJQUFJVixLQUFLSSxNQUFULENBQWdCLEVBQUVHLE9BQUYsRUFBV0Ms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QVUsNkJBQVYsQ0FBTjtBQUNEO0FBQ0QsYUFBT0YsT0FBTyxDQUFQLElBQVksSUFBSWxCLE1BQUosQ0FBV2tCLE9BQU8sQ0FBUCxDQUFYLENBQVosR0FBb0MsSUFBM0M7QUFDRCxLQUxNLENBQVA7QUFNRDs7QUFFRFcsYUFBWUMsTUFBWixFQUFvQjtBQUNsQixVQUFNZixRQUFRLElBQUluQixRQUFRb0IsS0FBWixDQUFrQmhCLE9BQU9PLE1BQXpCLENBQWQ7QUFDQVEsVUFBTUUsT0FBTixDQUFjLFFBQWQsRUFBd0IsS0FBS1AsT0FBN0I7QUFDQUssVUFBTUUsT0FBTixDQUFjLFFBQWQsRUFBd0IsSUFBeEI7QUFDQUYsVUFBTUUsT0FBTixDQUFjLFVBQWQsRUFBMEIsSUFBMUI7QUFDQUYsVUFBTWdCLGFBQU4sQ0FBb0IsYUFBcEI7QUFDQSxRQUFJRCxNQUFKLEVBQVk7QUFDVmYsWUFBTWlCLEtBQU4sR0FBY0YsTUFBZDtBQUNEO0FBQ0QsV0FBTy9CLEdBQUdnQixLQUFILENBQVNBLEtBQVQsRUFBZ0JZLElBQWhCLENBQXFCVCxVQUFVO0FBQ3BDLFlBQU1lLFVBQVUsRUFBaEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSWhCLE9BQU9DLE1BQTNCLEVBQW1DZSxHQUFuQyxFQUF3QztBQUN0Q0QsZ0JBQVFFLElBQVIsQ0FBYSxJQUFJbkMsTUFBSixDQUFXa0IsT0FBT2dCLENBQVAsQ0FBWCxDQUFiO0FBQ0Q7QUFDRCxhQUFPRCxPQUFQO0FBQ0QsS0FOTSxDQUFQO0FBT0Q7QUF0R3lCLENBQTVCIiwiZmlsZSI6InRlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBza3lnZWFyID0gcmVxdWlyZSgnc2t5Z2VhcicpXG5jb25zdCBCb3QgPSByZXF1aXJlKCcuL2JvdCcpXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGInKVxuY29uc3QgU3VydmV5ID0gcmVxdWlyZSgnLi9zdXJ2ZXknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRlYW0ge1xuICBjb25zdHJ1Y3RvciAocmVjb3JkKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gcmVjb3JkXG4gIH1cblxuICAvLyBjcmVhdGVcbiAgc3RhdGljIGdldCBSZWNvcmQgKCkge1xuICAgIHJldHVybiBza3lnZWFyLlJlY29yZC5leHRlbmQoJ3RlYW0nKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAoc2xhY2tJRCwgdG9rZW4sIHRhcmdldHNJRCkge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFRlYW0uUmVjb3JkKHsgc2xhY2tJRCwgdG9rZW4sIHRhcmdldHNJRCB9KSlcbiAgICByZXR1cm4gbmV3IFRlYW0ocmVjb3JkKVxuICB9XG5cbiAgLy8gcmVhZFxuICBnZXQgc2xhY2tJRCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnc2xhY2tJRCddXG4gIH1cblxuICBnZXQgdG9rZW4gKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3Rva2VuJ11cbiAgfVxuXG4gIGdldCB0YXJnZXRzSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgb2YgKHNsYWNrSUQpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFRlYW0uUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3NsYWNrSUQnLCBzbGFja0lEKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkocXVlcnkpXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE11dGlwbGUgdGVhbXMgd2l0aCBpZGVudGljYWwgc2xhY2tJRCAke3NsYWNrSUR9IGZvdW5kYClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFswXSA/IG5ldyBUZWFtKHJlc3VsdFswXSkgOiBudWxsXG4gIH1cblxuICAvLyB1cGRhdGVcbiAgc2V0IHRva2VuIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsndG9rZW4nXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBzZXQgdGFyZ2V0c0lEIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsndGFyZ2V0c0lEJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlICgpIHtcbiAgICB0aGlzLl9yZWNvcmQgPSBhd2FpdCBkYi5zYXZlKHRoaXMuX3JlY29yZClcbiAgfVxuXG4gIC8vIG1pc2NcbiAgZ2V0IGJvdCAoKSB7XG4gICAgcmV0dXJuIG5ldyBCb3QodGhpcy50b2tlbilcbiAgfVxuXG4gIGdldCBtZW1iZXJzICgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3QuZmV0Y2hVc2VycygpXG4gIH1cblxuICBnZXQgc2NoZWR1bGVkU3VydmV5ICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygndGVhbUlEJywgdGhpcy5zbGFja0lEKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2lzU2VudCcsIGZhbHNlKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXV0aXBsZSBzY2hlZHVsZWQgc3VydmV5IGZvdW5kJylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgU3VydmV5KHJlc3VsdFswXSkgOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIGdldCBhY3RpdmVTdXJ2ZXkgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCd0ZWFtSUQnLCB0aGlzLnNsYWNrSUQpXG4gICAgcXVlcnkuZXF1YWxUbygnaXNTZW50JywgdHJ1ZSlcbiAgICBxdWVyeS5lcXVhbFRvKCdpc0Nsb3NlZCcsIGZhbHNlKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXV0aXBsZSBhY3RpdmUgc3VydmV5IGZvdW5kJylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgU3VydmV5KHJlc3VsdFswXSkgOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIGdldFN1cnZleXMgKG51bWJlcikge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCd0ZWFtSUQnLCB0aGlzLnNsYWNrSUQpXG4gICAgcXVlcnkuZXF1YWxUbygnaXNTZW50JywgdHJ1ZSlcbiAgICBxdWVyeS5lcXVhbFRvKCdpc0Nsb3NlZCcsIHRydWUpXG4gICAgcXVlcnkuYWRkRGVzY2VuZGluZygnX3VwZGF0ZWRfYXQnKVxuICAgIGlmIChudW1iZXIpIHtcbiAgICAgIHF1ZXJ5LmxpbWl0ID0gbnVtYmVyXG4gICAgfVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgY29uc3Qgc3VydmV5cyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdXJ2ZXlzLnB1c2gobmV3IFN1cnZleShyZXN1bHRbaV0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1cnZleXNcbiAgICB9KVxuICB9XG59XG4iXX0=