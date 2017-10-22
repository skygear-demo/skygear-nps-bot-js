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

  get scheduledSurveys() {
    const query = new skygear.Query(Survey.Record);
    query.equalTo('isSent', false);
    return db.query(query).then(result => {
      const surveys = [];
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]));
      }
      return surveys;
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZWFtLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiQm90IiwiZGIiLCJTdXJ2ZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwiVGVhbSIsImNvbnN0cnVjdG9yIiwicmVjb3JkIiwiX3JlY29yZCIsIlJlY29yZCIsImV4dGVuZCIsImNyZWF0ZSIsInNsYWNrSUQiLCJ0b2tlbiIsInRhcmdldHNJRCIsInNhdmUiLCJvZiIsInF1ZXJ5IiwiUXVlcnkiLCJlcXVhbFRvIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiLCJuZXdWYWx1ZSIsInVwZGF0ZSIsImJvdCIsIm1lbWJlcnMiLCJmZXRjaFVzZXJzIiwic2NoZWR1bGVkU3VydmV5cyIsInRoZW4iLCJzdXJ2ZXlzIiwiaSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxNQUFNRCxRQUFRLE9BQVIsQ0FBWjtBQUNBLE1BQU1FLEtBQUtGLFFBQVEsTUFBUixDQUFYO0FBQ0EsTUFBTUcsU0FBU0gsUUFBUSxVQUFSLENBQWY7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUIsTUFBTUMsSUFBTixDQUFXO0FBQzFCQyxjQUFhQyxNQUFiLEVBQXFCO0FBQ25CLFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUNEOztBQUVEO0FBQ0EsYUFBV0UsTUFBWCxHQUFxQjtBQUNuQixXQUFPWCxRQUFRVyxNQUFSLENBQWVDLE1BQWYsQ0FBc0IsTUFBdEIsQ0FBUDtBQUNEOztBQUVELFNBQWFDLE1BQWIsQ0FBcUJDLE9BQXJCLEVBQThCQyxLQUE5QixFQUFxQ0MsU0FBckMsRUFBZ0Q7QUFBQTtBQUM5QyxZQUFNUCxTQUFTLE1BQU1OLEdBQUdjLElBQUgsQ0FBUSxJQUFJVixLQUFLSSxNQUFULENBQWdCLEVBQUVHLE9BQUYsRUFBV0MsS0FBWCxFQUFrQkMsU0FBbEIsRUFBaEIsQ0FBUixDQUFyQjtBQUNBLGFBQU8sSUFBSVQsSUFBSixDQUFTRSxNQUFULENBQVA7QUFGOEM7QUFHL0M7O0FBRUQ7QUFDQSxNQUFJSyxPQUFKLEdBQWU7QUFDYixXQUFPLEtBQUtKLE9BQUwsQ0FBYSxTQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJSyxLQUFKLEdBQWE7QUFDWCxXQUFPLEtBQUtMLE9BQUwsQ0FBYSxPQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJTSxTQUFKLEdBQWlCO0FBQ2YsV0FBTyxLQUFLTixPQUFMLENBQWEsV0FBYixDQUFQO0FBQ0Q7O0FBRUQsU0FBYVEsRUFBYixDQUFpQkosT0FBakIsRUFBMEI7QUFBQTtBQUN4QixZQUFNSyxRQUFRLElBQUluQixRQUFRb0IsS0FBWixDQUFrQmIsS0FBS0ksTUFBdkIsQ0FBZDtBQUNBUSxZQUFNRSxPQUFOLENBQWMsU0FBZCxFQUF5QlAsT0FBekI7O0FBRUEsWUFBTVEsU0FBUyxNQUFNbkIsR0FBR2dCLEtBQUgsQ0FBU0EsS0FBVCxDQUFyQjtBQUNBLFVBQUlHLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsY0FBTSxJQUFJQyxLQUFKLENBQVcsd0NBQXVDVixPQUFRLFFBQTFELENBQU47QUFDRDtBQUNELGFBQU9RLE9BQU8sQ0FBUCxJQUFZLElBQUlmLElBQUosQ0FBU2UsT0FBTyxDQUFQLENBQVQsQ0FBWixHQUFrQyxJQUF6QztBQVJ3QjtBQVN6Qjs7QUFFRDtBQUNBLE1BQUlQLEtBQUosQ0FBV1UsUUFBWCxFQUFxQjtBQUNuQixTQUFLZixPQUFMLENBQWEsT0FBYixJQUF3QmUsUUFBeEI7QUFDRDs7QUFFRCxNQUFJVCxTQUFKLENBQWVTLFFBQWYsRUFBeUI7QUFDdkIsU0FBS2YsT0FBTCxDQUFhLFdBQWIsSUFBNEJlLFFBQTVCO0FBQ0Q7O0FBRUtDLFFBQU4sR0FBZ0I7QUFBQTs7QUFBQTtBQUNkLFlBQUtoQixPQUFMLEdBQWUsTUFBTVAsR0FBR2MsSUFBSCxDQUFRLE1BQUtQLE9BQWIsQ0FBckI7QUFEYztBQUVmOztBQUVEO0FBQ0EsTUFBSWlCLEdBQUosR0FBVztBQUNULFdBQU8sSUFBSXpCLEdBQUosQ0FBUSxLQUFLYSxLQUFiLENBQVA7QUFDRDs7QUFFRCxNQUFJYSxPQUFKLEdBQWU7QUFDYixXQUFPLEtBQUtELEdBQUwsQ0FBU0UsVUFBVCxFQUFQO0FBQ0Q7O0FBRUQsTUFBSUMsZ0JBQUosR0FBd0I7QUFDdEIsVUFBTVgsUUFBUSxJQUFJbkIsUUFBUW9CLEtBQVosQ0FBa0JoQixPQUFPTyxNQUF6QixDQUFkO0FBQ0FRLFVBQU1FLE9BQU4sQ0FBYyxRQUFkLEVBQXdCLEtBQXhCO0FBQ0EsV0FBT2xCLEdBQUdnQixLQUFILENBQVNBLEtBQVQsRUFBZ0JZLElBQWhCLENBQXFCVCxVQUFVO0FBQ3BDLFlBQU1VLFVBQVUsRUFBaEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVgsT0FBT0MsTUFBM0IsRUFBbUNVLEdBQW5DLEVBQXdDO0FBQ3RDRCxnQkFBUUUsSUFBUixDQUFhLElBQUk5QixNQUFKLENBQVdrQixPQUFPVyxDQUFQLENBQVgsQ0FBYjtBQUNEO0FBQ0QsYUFBT0QsT0FBUDtBQUNELEtBTk0sQ0FBUDtBQU9EO0FBdkV5QixDQUE1QiIsImZpbGUiOiJ0ZWFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2t5Z2VhciA9IHJlcXVpcmUoJ3NreWdlYXInKVxuY29uc3QgQm90ID0gcmVxdWlyZSgnLi9ib3QnKVxuY29uc3QgZGIgPSByZXF1aXJlKCcuL2RiJylcbmNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4vc3VydmV5JylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBUZWFtIHtcbiAgY29uc3RydWN0b3IgKHJlY29yZCkge1xuICAgIHRoaXMuX3JlY29yZCA9IHJlY29yZFxuICB9XG5cbiAgLy8gY3JlYXRlXG4gIHN0YXRpYyBnZXQgUmVjb3JkICgpIHtcbiAgICByZXR1cm4gc2t5Z2Vhci5SZWNvcmQuZXh0ZW5kKCd0ZWFtJylcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUgKHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQpIHtcbiAgICBjb25zdCByZWNvcmQgPSBhd2FpdCBkYi5zYXZlKG5ldyBUZWFtLlJlY29yZCh7IHNsYWNrSUQsIHRva2VuLCB0YXJnZXRzSUQgfSkpXG4gICAgcmV0dXJuIG5ldyBUZWFtKHJlY29yZClcbiAgfVxuXG4gIC8vIHJlYWRcbiAgZ2V0IHNsYWNrSUQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRbJ3NsYWNrSUQnXVxuICB9XG5cbiAgZ2V0IHRva2VuICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0b2tlbiddXG4gIH1cblxuICBnZXQgdGFyZ2V0c0lEICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkWyd0YXJnZXRzSUQnXVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIG9mIChzbGFja0lEKSB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgc2t5Z2Vhci5RdWVyeShUZWFtLlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzbGFja0lEJywgc2xhY2tJRClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5KVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXRpcGxlIHRlYW1zIHdpdGggaWRlbnRpY2FsIHNsYWNrSUQgJHtzbGFja0lEfSBmb3VuZGApXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRbMF0gPyBuZXcgVGVhbShyZXN1bHRbMF0pIDogbnVsbFxuICB9XG5cbiAgLy8gdXBkYXRlXG4gIHNldCB0b2tlbiAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3Rva2VuJ10gPSBuZXdWYWx1ZVxuICB9XG5cbiAgc2V0IHRhcmdldHNJRCAobmV3VmFsdWUpIHtcbiAgICB0aGlzLl9yZWNvcmRbJ3RhcmdldHNJRCddID0gbmV3VmFsdWVcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZSAoKSB7XG4gICAgdGhpcy5fcmVjb3JkID0gYXdhaXQgZGIuc2F2ZSh0aGlzLl9yZWNvcmQpXG4gIH1cblxuICAvLyBtaXNjXG4gIGdldCBib3QgKCkge1xuICAgIHJldHVybiBuZXcgQm90KHRoaXMudG9rZW4pXG4gIH1cblxuICBnZXQgbWVtYmVycyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90LmZldGNoVXNlcnMoKVxuICB9XG5cbiAgZ2V0IHNjaGVkdWxlZFN1cnZleXMgKCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IHNreWdlYXIuUXVlcnkoU3VydmV5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdpc1NlbnQnLCBmYWxzZSlcbiAgICByZXR1cm4gZGIucXVlcnkocXVlcnkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IHN1cnZleXMgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3VydmV5cy5wdXNoKG5ldyBTdXJ2ZXkocmVzdWx0W2ldKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXJ2ZXlzXG4gICAgfSlcbiAgfVxufVxuIl19