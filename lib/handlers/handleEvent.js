'use strict';

const { log, verify } = require('../util');
const { saveReason } = require('./events');

module.exports = req => {
  /**
   * @see https://api.slack.com/events-api#receiving_events
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJsb2ciLCJ2ZXJpZnkiLCJyZXF1aXJlIiwic2F2ZVJlYXNvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJ0ZWFtX2lkIiwidGVhbUlEIiwiY2hhbGxlbmdlIiwiZXZlbnQiLCJ0b2tlbiIsIkpTT04iLCJwYXJzZSIsImJvZHkiLCJjaGFubmVsIiwiY2hhbm5lbElEIiwidXNlciIsInVzZXJJRCIsInRleHQiLCJyZWFzb24iLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBRUEsR0FBRixFQUFPQyxNQUFQLEtBQWtCQyxRQUFRLFNBQVIsQ0FBeEI7QUFDQSxNQUFNLEVBQUVDLFVBQUYsS0FBaUJELFFBQVEsVUFBUixDQUF2Qjs7QUFFQUUsT0FBT0MsT0FBUCxHQUFpQkMsT0FBTztBQUN0Qjs7O0FBR0EsTUFBSTtBQUNGQyxhQUFTQyxNQURQO0FBRUZDLGFBRkUsRUFFU0MsS0FGVCxFQUVnQkM7QUFGaEIsTUFHQVgsSUFBSVksS0FBS0MsS0FBTCxDQUFXUCxJQUFJUSxJQUFmLENBQUosQ0FISjs7QUFLQSxNQUFJYixPQUFPVSxLQUFQLENBQUosRUFBbUI7QUFDakI7QUFDQSxRQUFJRixTQUFKLEVBQWU7QUFDYixhQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGTSxlQUFTQyxTQURQO0FBRUZDLFlBQU1DLE1BRko7QUFHRkMsWUFBTUMsTUFISjtBQUlGQztBQUpFLFFBS0FYLEtBTEo7QUFNQSxZQUFRVyxJQUFSO0FBQ0UsV0FBSyxTQUFMO0FBQ0U7QUFDQSxlQUFPSCxTQUFTZixXQUFXSyxNQUFYLEVBQW1CVSxNQUFuQixFQUEyQkUsTUFBM0IsRUFBbUNKLFNBQW5DLENBQVQsR0FBeUQsRUFBaEU7QUFDRjtBQUNFLGVBQU8sb0JBQVA7QUFMSjtBQU9ELEdBbkJELE1BbUJPO0FBQ0wsV0FBTyxnQkFBUCxDQURLLENBQ21CO0FBQ3pCO0FBQ0YsQ0EvQkQiLCJmaWxlIjoiaGFuZGxlRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcbmNvbnN0IHsgc2F2ZVJlYXNvbiB9ID0gcmVxdWlyZSgnLi9ldmVudHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcSA9PiB7XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9ldmVudHMtYXBpI3JlY2VpdmluZ19ldmVudHNcbiAgICovXG4gIGxldCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIGNoYWxsZW5nZSwgZXZlbnQsIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShyZXEuYm9keSkpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAvLyBvbmUtdGltZSB2ZXJpZmljYXRpb24gdG8gZW5hYmxlIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgIGlmIChjaGFsbGVuZ2UpIHtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2VcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgY2hhbm5lbDogY2hhbm5lbElELFxuICAgICAgdXNlcjogdXNlcklELFxuICAgICAgdGV4dDogcmVhc29uLFxuICAgICAgdHlwZVxuICAgIH0gPSBldmVudFxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIC8vIGlnbm9yZSBib3QgbWVzc2FnZXMsIGF2b2lkIGxvb3Agd2l0aCBzZWxmXG4gICAgICAgIHJldHVybiB1c2VySUQgPyBzYXZlUmVhc29uKHRlYW1JRCwgdXNlcklELCByZWFzb24sIGNoYW5uZWxJRCkgOiAnJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdJbnZhbGlkIGV2ZW50IHR5cGUnXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAnVW5rbm93biBzb3VyY2UnIC8vIFBsZWFzZSBpbnN0YWxsIHRoZSBhcHAgdmlhIExBTkRJTkdfUEFHRV9VUkxcbiAgfVxufVxuIl19