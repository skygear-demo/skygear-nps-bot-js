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

  get hasScheduledSurvey() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('teamID', this.slackID);
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error('Mutiple scheduled survey found');
      }
      return result.length !== 0;
    });
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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZWFtLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiQm90IiwiZGIiLCJTdXJ2ZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0b2tlbiIsInRhcmdldHNJRCIsInNhdmUiLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsImJvdCIsIm1lbWJlcnMiLCJmZXRjaFVzZXJzIiwiaGFzU2NoZWR1bGVkU3VydmV5IiwidGhlbiIsInNjaGVkdWxlZFN1cnZleSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLFVBQVVDLFFBQVEsU0FBUixDQUFoQjtBQUNBLE1BQU1DLE1BQU1ELFFBQVEsT0FBUixDQUFaO0FBQ0EsTUFBTUUsS0FBS0YsUUFBUSxNQUFSLENBQVg7QUFDQSxNQUFNRyxTQUFTSCxRQUFRLFVBQVIsQ0FBZjs7QUFFQUksT0FBT0MsT0FBUCxHQUFpQixNQUFNQyxJQUFOLENBQVc7QUFDMUJDLGNBQWFDLE1BQWIsRUFBcUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFlRCxNQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9YLFFBQVFXLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixNQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsT0FBckIsRUFBOEJDLEtBQTlCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUFBO0FBQzlDLFlBQU1QLFNBQVMsTUFBTU4sR0FBR2MsSUFBSCxDQUFRLElBQUlWLEtBQUtJLE1BQVQsQ0FBZ0IsRUFBRUcsT0FBRixFQUFXQyxLQUFYLEVBQWtCQyxTQUFsQixFQUFoQixDQUFSLENBQXJCO0FBQ0EsYUFBTyxJQUFJVCxJQUFKLENBQVNF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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgQm90ID0gcmVxdWlyZSgnLi9ib3QnKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4vc3VydmV5JylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBUZWFtIHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCd0ZWFtJylcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUgKHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQpIHtcbiAgICBjb25zdCByZWNvcmQgPSBhd2FpdCBkYi5zYXZlKG5ldyBUZWFtLlJlY29yZCh7IHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQgfSkpXG4gICAgcmV0dXJuIG5ldyBUZWFtKHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IHNsYWNrSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3NsYWNrSUQnXVxuICB9XG5cbiAgZ2V0IHRva2VuICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0b2tlbiddXG4gIH1cblxuICBnZXQgdGFyZ2V0c0lEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0YXJnZXRzSUQnXVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIG9mIChzbGFja0lEKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShUZWFtLlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzbGFja0lEJywgc2xhY2tJRClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5KVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXRpcGxlIHRlYW1zIHdpdGggaWRlbnRpY2FsIHNsYWNrSUQgJHtzbGFja0lEfSBmb3VuZGApXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgVGVhbShyZXN1bHRbMF0pIDogbnVsbFxuICB9XG5cbiAgLy8gdXBkYXRlXG4gIHNldCB0b2tlbiAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3Rva2VuJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IHRhcmdldHNJRCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZSAoKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gYXdhaXQgZGIuc2F2ZSh0aGlzLl9yZWNvcmQpXG4gIH1cblxuICAvLyBtaXNjXG4gIGdldCBib3QgKCkge1xuICAgIHJldHVybiBuZXcgQm90KHRoaXMudG9rZW4pXG4gIH1cblxuICBnZXQgbWVtYmVycyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90LmZldGNoVXNlcnMoKVxuICB9XG5cbiAgZ2V0IGhhc1NjaGVkdWxlZFN1cnZleSAoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShTdXJ2ZXkuUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3RlYW1JRCcsIHRoaXMuc2xhY2tJRClcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011dGlwbGUgc2NoZWR1bGVkIHN1cnZleSBmb3VuZCcpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCAhPT0gMFxuICAgIH0pXG4gIH1cblxuICBnZXQgc2NoZWR1bGVkU3VydmV5ICgpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFN1cnZleS5SZWNvcmQpXG4gICAgcXVlcnkuZXF1YWxUbygndGVhbUlEJywgdGhpcy5zbGFja0lEKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ2lzU2VudCcsIGZhbHNlKVxuICAgIHJldHVybiBkYi5xdWVyeShxdWVyeSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXV0aXBsZSBzY2hlZHVsZWQgc3VydmV5IGZvdW5kJylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgU3VydmV5KHJlc3VsdFswXSkgOiBudWxsXG4gICAgfSlcbiAgfVxufVxuIl19