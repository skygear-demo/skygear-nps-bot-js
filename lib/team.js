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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZWFtLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiQm90IiwiZGIiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0b2tlbiIsInRhcmdldHNJRCIsInNhdmUiLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsImJvdCIsIm1lbWJlcnMiLCJmZXRjaFVzZXJzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxTQUFSLENBQWhCO0FBQ0EsTUFBTUMsTUFBTUQsUUFBUSxPQUFSLENBQVo7QUFDQSxNQUFNRSxLQUFLRixRQUFRLE1BQVIsQ0FBWDs7QUFFQUcsT0FBT0MsT0FBUCxHQUFpQixNQUFNQyxJQUFOLENBQVc7QUFDMUJDLGNBQWFDLE1BQWIsRUFBcUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFlRCxNQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFXRSxNQUFYLEdBQXFCO0FBQ25CLFdBQU9WLFFBQVFVLE1BQVIsQ0FBZUMsTUFBZixDQUFzQixNQUF0QixDQUFQO0FBQ0Q7O0FBRUQsU0FBYUMsTUFBYixDQUFxQkMsT0FBckIsRUFBOEJDLEtBQTlCLEVBQXFDQyxTQUFyQyxFQUFnRDtBQUFBO0FBQzlDLFlBQU1QLFNBQVMsTUFBTUwsR0FBR2EsSUFBSCxDQUFRLElBQUlWLEtBQUtJLE1BQVQsQ0FBZ0IsRUFBRUcsT0FBRixFQUFXQyxLQUFYLEVBQWtCQyxTQUFsQixFQUFoQixDQUFSLENBQXJCO0FBQ0EsYUFBTyxJQUFJVCxJQUFKLENBQVNFLE1BQVQsQ0FBUDtBQUY4QztBQUcvQzs7QUFFRDtBQUNBLE1BQUlLLE9BQUosR0FBZTtBQUNiLFdBQU8sS0FBS0osT0FBTCxDQUFhLFNBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlLLEtBQUosR0FBYTtBQUNYLFdBQU8sS0FBS0wsT0FBTCxDQUFhLE9BQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlNLFNBQUosR0FBaUI7QUFDZixXQUFPLEtBQUtOLE9BQUwsQ0FBYSxXQUFiLENBQVA7QUFDRDs7QUFFRCxTQUFhUSxFQUFiLENBQWlCSixPQUFqQixFQUEwQjtBQUFBO0FBQ3hCLFlBQU1LLFFBQVEsSUFBSWxCLFFBQVFtQixLQUFaLENBQWtCYixLQUFLSSxNQUF2QixDQUFkO0FBQ0FRLFlBQU1FLE9BQU4sQ0FBYyxTQUFkLEVBQXlCUCxPQUF6Qjs7QUFFQSxZQUFNUSxTQUFTLE1BQU1sQixHQUFHZSxLQUFILENBQVNBLEtBQVQsQ0FBckI7QUFDQSxVQUFJRyxPQUFPQyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGNBQU0sSUFBSUMsS0FBSixDQUFXLHdDQUF1Q1YsT0FBUSxRQUExRCxDQUFOO0FBQ0Q7QUFDRCxhQUFPUSxPQUFPLENBQVAsSUFBWSxJQUFJZixJQUFKLENBQVNlLE9BQU8sQ0FBUCxDQUFULENBQVosR0FBa0MsSUFBekM7QUFSd0I7QUFTekI7O0FBRUQ7QUFDQSxNQUFJUCxLQUFKLENBQVdVLFFBQVgsRUFBcUI7QUFDbkIsU0FBS2YsT0FBTCxDQUFhLE9BQWIsSUFBd0JlLFFBQXhCO0FBQ0Q7O0FBRUtDLFFBQU4sR0FBZ0I7QUFBQTs7QUFBQTtBQUNkLFlBQUtoQixPQUFMLEdBQWUsTUFBTU4sR0FBR2EsSUFBSCxDQUFRLE1BQUtQLE9BQWIsQ0FBckI7QUFEYztBQUVmOztBQUVEO0FBQ0EsTUFBSWlCLEdBQUosR0FBVztBQUNULFdBQU8sSUFBSXhCLEdBQUosQ0FBUSxLQUFLWSxLQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJYSxPQUFKLEdBQWU7QUFDYixXQUFPLEtBQUtELEdBQUwsQ0FBU0UsVUFBVCxFQUFQO0FBQ0Q7QUF2RHlCLENBQTVCIiwiZmlsZSI6InRlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBza3lnZWFyID0gcmVxdWlyZSgnc2t5Z2VhcicpXG5jb25zdCBCb3QgPSByZXF1aXJlKCcuL2JvdCcpXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vZGInKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFRlYW0ge1xuICBjb25zdHJ1Y3RvciAocmVjb3JkKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gcmVjb3JkXG4gIH1cblxuICAvLyBjcmVhdGVcbiAgc3RhdGljIGdldCBSZWNvcmQgKCkge1xuICAgIHJldHVybiBza3lnZWFyLlJlY29yZC5leHRlbmQoJ3RlYW0nKVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNyZWF0ZSAoc2xhY2tJRCwgdG9rZW4sIHRhcmdldHNJRCkge1xuICAgIGNvbnN0IHJlY29yZCA9IGF3YWl0IGRiLnNhdmUobmV3IFRlYW0uUmVjb3JkKHsgc2xhY2tJRCwgdG9rZW4sIHRhcmdldHNJRCB9KSlcbiAgICByZXR1cm4gbmV3IFRlYW0ocmVjb3JkKVxuICB9XG5cbiAgLy8gcmVhZFxuICBnZXQgc2xhY2tJRCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZFsnc2xhY2tJRCddXG4gIH1cblxuICBnZXQgdG9rZW4gKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3Rva2VuJ11cbiAgfVxuXG4gIGdldCB0YXJnZXRzSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddXG4gIH1cblxuICBzdGF0aWMgYXN5bmMgb2YgKHNsYWNrSUQpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFRlYW0uUmVjb3JkKVxuICAgIHF1ZXJ5LmVxdWFsVG8oJ3NsYWNrSUQnLCBzbGFja0lEKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGIucXVlcnkocXVlcnkpXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE11dGlwbGUgdGVhbXMgd2l0aCBpZGVudGljYWwgc2xhY2tJRCAke3NsYWNrSUR9IGZvdW5kYClcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFswXSA/IG5ldyBUZWFtKHJlc3VsdFswXSkgOiBudWxsXG4gIH1cblxuICAvLyB1cGRhdGVcbiAgc2V0IHRva2VuIChuZXdWYWx1ZSkge1xuICAgIHRoaXMuX3JlY29yZFsndG9rZW4nXSA9IG5ld1ZhbHVlXG4gIH1cblxuICBhc3luYyB1cGRhdGUgKCkge1xuICAgIHRoaXMuX3JlY29yZCA9IGF3YWl0IGRiLnNhdmUodGhpcy5fcmVjb3JkKVxuICB9XG5cbiAgLy8gbWlzY1xuICBnZXQgYm90ICgpIHtcbiAgICByZXR1cm4gbmV3IEJvdCh0aGlzLnRva2VuKVxuICB9XG5cbiAgZ2V0IG1lbWJlcnMgKCkge1xuICAgIHJldHVybiB0aGlzLmJvdC5mZXRjaFVzZXJzKClcbiAgfVxufVxuIl19