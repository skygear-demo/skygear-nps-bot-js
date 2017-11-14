'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('./db');
const Reply = require('./reply');

module.exports = class User {
  constructor(id, team) {
    this.id = id;
    this.team = team;
  }

  get isAdmin() {
    return this.team.bot.fetchUser(this.id).then(user => user.is_admin);
  }

  hasReplied(surveyID) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const query = new skygear.Query(Reply.Record);
      query.equalTo('survey', new skygear.Reference({
        id: surveyID
      }));
      query.equalTo('userID', _this.id);

      const result = yield db.query(query);
      if (result.length > 1) {
        throw new Error(`Mutiple replies of user ${_this.id} in the same survey ${surveyID}`);
      }
      return result[0];
    })();
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLmpzIl0sIm5hbWVzIjpbInNreWdlYXIiLCJyZXF1aXJlIiwiZGIiLCJSZXBseSIsIm1vZHVsZSIsImV4cG9ydHMiLCJVc2VyIiwiY29uc3RydWN0b3IiLCJpZCIsInRlYW0iLCJpc0FkbWluIiwiYm90IiwiZmV0Y2hVc2VyIiwidGhlbiIsInVzZXIiLCJpc19hZG1pbiIsImhhc1JlcGxpZWQiLCJzdXJ2ZXlJRCIsInF1ZXJ5IiwiUXVlcnkiLCJSZWNvcmQiLCJlcXVhbFRvIiwiUmVmZXJlbmNlIiwicmVzdWx0IiwibGVuZ3RoIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLFNBQVIsQ0FBaEI7QUFDQSxNQUFNQyxLQUFLRCxRQUFRLE1BQVIsQ0FBWDtBQUNBLE1BQU1FLFFBQVFGLFFBQVEsU0FBUixDQUFkOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCLE1BQU1DLElBQU4sQ0FBVztBQUMxQkMsY0FBYUMsRUFBYixFQUFpQkMsSUFBakIsRUFBdUI7QUFDckIsU0FBS0QsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0Q7O0FBRUQsTUFBSUMsT0FBSixHQUFlO0FBQ2IsV0FBTyxLQUFLRCxJQUFMLENBQVVFLEdBQVYsQ0FBY0MsU0FBZCxDQUF3QixLQUFLSixFQUE3QixFQUFpQ0ssSUFBakMsQ0FBc0NDLFFBQVFBLEtBQUtDLFFBQW5ELENBQVA7QUFDRDs7QUFFS0MsWUFBTixDQUFrQkMsUUFBbEIsRUFBNEI7QUFBQTs7QUFBQTtBQUMxQixZQUFNQyxRQUFRLElBQUlsQixRQUFRbUIsS0FBWixDQUFrQmhCLE1BQU1pQixNQUF4QixDQUFkO0FBQ0FGLFlBQU1HLE9BQU4sQ0FBYyxRQUFkLEVBQXdCLElBQUlyQixRQUFRc0IsU0FBWixDQUFzQjtBQUM1Q2QsWUFBSVM7QUFEd0MsT0FBdEIsQ0FBeEI7QUFHQUMsWUFBTUcsT0FBTixDQUFjLFFBQWQsRUFBd0IsTUFBS2IsRUFBN0I7O0FBRUEsWUFBTWUsU0FBUyxNQUFNckIsR0FBR2dCLEtBQUgsQ0FBU0EsS0FBVCxDQUFyQjtBQUNBLFVBQUlLLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsY0FBTSxJQUFJQyxLQUFKLENBQVcsMkJBQTBCLE1BQUtqQixFQUFHLHVCQUFzQlMsUUFBUyxFQUE1RSxDQUFOO0FBQ0Q7QUFDRCxhQUFPTSxPQUFPLENBQVAsQ0FBUDtBQVgwQjtBQVkzQjtBQXRCeUIsQ0FBNUIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNreWdlYXIgPSByZXF1aXJlKCdza3lnZWFyJylcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi9kYicpXG5jb25zdCBSZXBseSA9IHJlcXVpcmUoJy4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFVzZXIge1xuICBjb25zdHJ1Y3RvciAoaWQsIHRlYW0pIHtcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnRlYW0gPSB0ZWFtXG4gIH1cblxuICBnZXQgaXNBZG1pbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVhbS5ib3QuZmV0Y2hVc2VyKHRoaXMuaWQpLnRoZW4odXNlciA9PiB1c2VyLmlzX2FkbWluKVxuICB9XG5cbiAgYXN5bmMgaGFzUmVwbGllZCAoc3VydmV5SUQpIHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBza3lnZWFyLlF1ZXJ5KFJlcGx5LlJlY29yZClcbiAgICBxdWVyeS5lcXVhbFRvKCdzdXJ2ZXknLCBuZXcgc2t5Z2Vhci5SZWZlcmVuY2Uoe1xuICAgICAgaWQ6IHN1cnZleUlEXG4gICAgfSkpXG4gICAgcXVlcnkuZXF1YWxUbygndXNlcklEJywgdGhpcy5pZClcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5KVxuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdXRpcGxlIHJlcGxpZXMgb2YgdXNlciAke3RoaXMuaWR9IGluIHRoZSBzYW1lIHN1cnZleSAke3N1cnZleUlEfWApXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRbMF1cbiAgfVxufVxuIl19