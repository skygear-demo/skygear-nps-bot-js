'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const Bot = require('./bot');
const db = require('./db');

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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZWFtLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiQm90IiwiZGIiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0b2tlbiIsInRhcmdldHNJRCIsInNhdmUiLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsImJvdCIsIm1lbWJlcnMiLCJmZXRjaFVzZXJzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxTQUFSLENBQWhCO0FBQ0EsTUFBTUMsTUFBTUQsUUFBUSxPQUFSLENBQVo7QUFDQSxNQUFNRSxLQUFLRixRQUFRLE1BQVIsQ0FBWDs7QUFFQUcsT0FBT0MsT0FBUCxHQUFpQixNQUFNQyxJQUFOLENBQVc7QUFDMUJDLGNBQWFDLE1BQWIsRUFBcUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFlRCxNQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9WLFFBQVFVLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixNQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsT0FBckIsRUFBOEJDLEtBQTlCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUFBO0FBQzlDLFlBQU1QLFNBQVMsTUFBTUwsR0FBR2EsSUFBSCxDQUFRLElBQUlWLEtBQUtJLE1BQVQsQ0FBZ0IsRUFBRUcsT0FBRixFQUFXQyxLQUFYLEVBQWtCQyxTQUFsQixFQUFoQixDQUFSLENBQXJCO0FBQ0EsYUFBTyxJQUFJVCxJQUFKLENBQVNFLE1BQVQsQ0FBUDtBQUY4QztBQUcvQzs7QUFFRDtBQUNBLE1BQUlLLE9BQUosR0FBZTtBQUNiLFdBQU8sS0FBS0osT0FBTCxDQUFhLFNBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlLLEtBQUosR0FBYTtBQUNYLFdBQU8sS0FBS0wsT0FBTCxDQUFhLE9BQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlNLFNBQUosR0FBaUI7QUFDZixXQUFPLEtBQUtOLE9BQUwsQ0FBYSxXQUFiLENBQVA7QUFDRDs7QUFFRCxTQUFhUSxFQUFiLENBQWlCSixPQUFqQixFQUEwQjtBQUFBO0FBQ3hCLFlBQU1LLFFBQVEsSUFBSWxCLFFBQVFtQixLQUFaLENBQWtCYixLQUFLSSxNQUF2QixDQUFkO0FBQ0FRLFlBQU1FLE9BQU4sQ0FBYyxTQUFkLEVBQXlCUCxPQUF6Qjs7QUFFQSxZQUFNUSxTQUFTLE1BQU1sQixHQUFHZSxLQUFILENBQVNBLEtBQVQsQ0FBckI7QUFDQSxVQUFJRyxPQUFPQyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGNBQU0sSUFBSUMsS0FBSixDQUFXLHdDQUF1Q1YsT0FBUSxRQUExRCxDQUFOO0FBQ0Q7QUFDRCxhQUFPUSxPQUFPLENBQVAsSUFBWSxJQUFJZixJQUFKLENBQVNlLE9BQU8sQ0FBUCxDQUFULENBQVosR0FBa0MsSUFBekM7QUFSd0I7QUFTekI7O0FBRUQ7QUFDQSxNQUFJUCxLQUFKLENBQVdVLFFBQVgsRUFBcUI7QUFDbkIsU0FBS2YsT0FBTCxDQUFhLE9BQWIsSUFBd0JlLFFBQXhCO0FBQ0Q7O0FBRUQsTUFBSVQsU0FBSixDQUFlUyxRQUFmLEVBQXlCO0FBQ3ZCLFNBQUtmLE9BQUwsQ0FBYSxXQUFiLElBQTRCZSxRQUE1QjtBQUNEOztBQUVLQyxRQUFOLEdBQWdCO0FBQUE7O0FBQUE7QUFDZCxZQUFLaEIsT0FBTCxHQUFlLE1BQU1OLEdBQUdhLElBQUgsQ0FBUSxNQUFLUCxPQUFiLENBQXJCO0FBRGM7QUFFZjs7QUFFRDtBQUNBLE1BQUlpQixHQUFKLEdBQVc7QUFDVCxXQUFPLElBQUl4QixHQUFKLENBQVEsS0FBS1ksS0FBYixDQUFQO0FBQ0Q7O0FBRUQsTUFBSWEsT0FBSixHQUFlO0FBQ2IsV0FBTyxLQUFLRCxHQUFMLENBQVNFLFVBQVQsRUFBUDtBQUNEO0FBM0R5QixDQUE1QiIsImZpbGUiOiJ0ZWFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgQm90ID0gcmVxdWlyZSgnLi9ib3QnKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBUZWFtIHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCd0ZWFtJylcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUgKHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQpIHtcbiAgICBjb25zdCByZWNvcmQgPSBhd2FpdCBkYi5zYXZlKG5ldyBUZWFtLlJlY29yZCh7IHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQgfSkpXG4gICAgcmV0dXJuIG5ldyBUZWFtKHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IHNsYWNrSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3NsYWNrSUQnXVxuICB9XG5cbiAgZ2V0IHRva2VuICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0b2tlbiddXG4gIH1cblxuICBnZXQgdGFyZ2V0c0lEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0YXJnZXRzSUQnXVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIG9mIChzbGFja0lEKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShUZWFtLlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzbGFja0lEJywgc2xhY2tJRClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5KVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXRpcGxlIHRlYW1zIHdpdGggaWRlbnRpY2FsIHNsYWNrSUQgJHtzbGFja0lEfSBmb3VuZGApXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgVGVhbShyZXN1bHRbMF0pIDogbnVsbFxuICB9XG5cbiAgLy8gdXBkYXRlXG4gIHNldCB0b2tlbiAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3Rva2VuJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IHRhcmdldHNJRCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZSAoKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gYXdhaXQgZGIuc2F2ZSh0aGlzLl9yZWNvcmQpXG4gIH1cblxuICAvLyBtaXNjXG4gIGdldCBib3QgKCkge1xuICAgIHJldHVybiBuZXcgQm90KHRoaXMudG9rZW4pXG4gIH1cblxuICBnZXQgbWVtYmVycyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90LmZldGNoVXNlcnMoKVxuICB9XG59XG4iXX0=