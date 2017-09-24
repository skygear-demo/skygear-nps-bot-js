'use strict';

const { log, verify } = require('../util');
const { saveReason } = require('./events');

module.exports = req => {
  let {
    team_id: teamID,
    challenge, event, token
  } = log(JSON.parse(req.body));

  if (verify(token)) {
    // one-time verification to enable event subscription
    if (challenge) {
      return challenge;
    }

    let {
      channel: channelID,
      user: userID,
      text: reason,
      type
    } = event;
    switch (type) {
      case 'message':
        // ignore bot messages, avoid loop with self
        return userID ? saveReason(teamID, userID, reason, channelID) : '';
      default:
        return 'Invalid event type';
    }
  } else {
    return 'Unknown source'; // Please install the app via LANDING_PAGE_URL
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJsb2ciLCJ2ZXJpZnkiLCJyZXF1aXJlIiwic2F2ZVJlYXNvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJ0ZWFtX2lkIiwidGVhbUlEIiwiY2hhbGxlbmdlIiwiZXZlbnQiLCJ0b2tlbiIsIkpTT04iLCJwYXJzZSIsImJvZHkiLCJjaGFubmVsIiwiY2hhbm5lbElEIiwidXNlciIsInVzZXJJRCIsInRleHQiLCJyZWFzb24iLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBRUEsR0FBRixFQUFPQyxNQUFQLEtBQWtCQyxRQUFRLFNBQVIsQ0FBeEI7QUFDQSxNQUFNLEVBQUVDLFVBQUYsS0FBaUJELFFBQVEsVUFBUixDQUF2Qjs7QUFFQUUsT0FBT0MsT0FBUCxHQUFrQkMsR0FBRCxJQUFTO0FBQ3hCLE1BQUk7QUFDRkMsYUFBU0MsTUFEUDtBQUVGQyxhQUZFLEVBRVNDLEtBRlQsRUFFZ0JDO0FBRmhCLE1BR0FYLElBQUlZLEtBQUtDLEtBQUwsQ0FBV1AsSUFBSVEsSUFBZixDQUFKLENBSEo7O0FBS0EsTUFBSWIsT0FBT1UsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCO0FBQ0EsUUFBSUYsU0FBSixFQUFlO0FBQ2IsYUFBT0EsU0FBUDtBQUNEOztBQUVELFFBQUk7QUFDRk0sZUFBU0MsU0FEUDtBQUVGQyxZQUFNQyxNQUZKO0FBR0ZDLFlBQU1DLE1BSEo7QUFJRkM7QUFKRSxRQUtBWCxLQUxKO0FBTUEsWUFBUVcsSUFBUjtBQUNFLFdBQUssU0FBTDtBQUNFO0FBQ0EsZUFBT0gsU0FBU2YsV0FBV0ssTUFBWCxFQUFtQlUsTUFBbkIsRUFBMkJFLE1BQTNCLEVBQW1DSixTQUFuQyxDQUFULEdBQXlELEVBQWhFO0FBQ0Y7QUFDRSxlQUFPLG9CQUFQO0FBTEo7QUFPRCxHQW5CRCxNQW1CTztBQUNMLFdBQU8sZ0JBQVAsQ0FESyxDQUNtQjtBQUN6QjtBQUNGLENBNUJEIiwiZmlsZSI6ImhhbmRsZUV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBsb2csIHZlcmlmeSB9ID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5jb25zdCB7IHNhdmVSZWFzb24gfSA9IHJlcXVpcmUoJy4vZXZlbnRzJylcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxKSA9PiB7XG4gIGxldCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIGNoYWxsZW5nZSwgZXZlbnQsIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShyZXEuYm9keSkpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAvLyBvbmUtdGltZSB2ZXJpZmljYXRpb24gdG8gZW5hYmxlIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgIGlmIChjaGFsbGVuZ2UpIHtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2VcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgY2hhbm5lbDogY2hhbm5lbElELFxuICAgICAgdXNlcjogdXNlcklELFxuICAgICAgdGV4dDogcmVhc29uLFxuICAgICAgdHlwZVxuICAgIH0gPSBldmVudFxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIC8vIGlnbm9yZSBib3QgbWVzc2FnZXMsIGF2b2lkIGxvb3Agd2l0aCBzZWxmXG4gICAgICAgIHJldHVybiB1c2VySUQgPyBzYXZlUmVhc29uKHRlYW1JRCwgdXNlcklELCByZWFzb24sIGNoYW5uZWxJRCkgOiAnJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdJbnZhbGlkIGV2ZW50IHR5cGUnXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnVW5rbm93biBzb3VyY2UnIC8vIFBsZWFzZSBpbnN0YWxsIHRoZSBhcHAgdmlhIExBTkRJTkdfUEFHRV9VUkxcbiAgfVxufVxuIl19