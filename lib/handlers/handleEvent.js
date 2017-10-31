'use strict';

/* eslint-disable */
const message = require('../message');
const { log, verify } = require('../util');

module.exports = req => {
  /**
   * @see https://api.slack.com/events-api#receiving_events
   */
  const {
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
      text, type
    } = event;
    switch (type) {
      default:
        break;
    }
  } else {
    throw new Error(message.error.invalidSource);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9oYW5kbGVFdmVudC5qcyJdLCJuYW1lcyI6WyJtZXNzYWdlIiwicmVxdWlyZSIsImxvZyIsInZlcmlmeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXEiLCJ0ZWFtX2lkIiwidGVhbUlEIiwiY2hhbGxlbmdlIiwiZXZlbnQiLCJ0b2tlbiIsIkpTT04iLCJwYXJzZSIsImJvZHkiLCJjaGFubmVsIiwiY2hhbm5lbElEIiwidXNlciIsInVzZXJJRCIsInRleHQiLCJ0eXBlIiwiRXJyb3IiLCJlcnJvciIsImludmFsaWRTb3VyY2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxNQUFNQSxVQUFVQyxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxNQUFNLEVBQUVDLEdBQUYsRUFBT0MsTUFBUCxLQUFrQkYsUUFBUSxTQUFSLENBQXhCOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCQyxPQUFPO0FBQ3RCOzs7QUFHQSxRQUFNO0FBQ0pDLGFBQVNDLE1BREw7QUFFSkMsYUFGSSxFQUVPQyxLQUZQLEVBRWNDO0FBRmQsTUFHRlQsSUFBSVUsS0FBS0MsS0FBTCxDQUFXUCxJQUFJUSxJQUFmLENBQUosQ0FISjs7QUFLQSxNQUFJWCxPQUFPUSxLQUFQLENBQUosRUFBbUI7QUFDakI7QUFDQSxRQUFJRixTQUFKLEVBQWU7QUFDYixhQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGTSxlQUFTQyxTQURQO0FBRUZDLFlBQU1DLE1BRko7QUFHRkMsVUFIRSxFQUdJQztBQUhKLFFBSUFWLEtBSko7QUFLQSxZQUFRVSxJQUFSO0FBQ0U7QUFDRTtBQUZKO0FBSUQsR0FmRCxNQWVPO0FBQ0wsVUFBTSxJQUFJQyxLQUFKLENBQVVyQixRQUFRc0IsS0FBUixDQUFjQyxhQUF4QixDQUFOO0FBQ0Q7QUFDRixDQTNCRCIsImZpbGUiOiJoYW5kbGVFdmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5jb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vbWVzc2FnZScpXG5jb25zdCB7IGxvZywgdmVyaWZ5IH0gPSByZXF1aXJlKCcuLi91dGlsJylcblxubW9kdWxlLmV4cG9ydHMgPSByZXEgPT4ge1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2FwaS5zbGFjay5jb20vZXZlbnRzLWFwaSNyZWNlaXZpbmdfZXZlbnRzXG4gICAqL1xuICBjb25zdCB7XG4gICAgdGVhbV9pZDogdGVhbUlELFxuICAgIGNoYWxsZW5nZSwgZXZlbnQsIHRva2VuXG4gIH0gPSBsb2coSlNPTi5wYXJzZShyZXEuYm9keSkpXG5cbiAgaWYgKHZlcmlmeSh0b2tlbikpIHtcbiAgICAvLyBvbmUtdGltZSB2ZXJpZmljYXRpb24gdG8gZW5hYmxlIGV2ZW50IHN1YnNjcmlwdGlvblxuICAgIGlmIChjaGFsbGVuZ2UpIHtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2VcbiAgICB9XG5cbiAgICBsZXQge1xuICAgICAgY2hhbm5lbDogY2hhbm5lbElELFxuICAgICAgdXNlcjogdXNlcklELFxuICAgICAgdGV4dCwgdHlwZVxuICAgIH0gPSBldmVudFxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZXJyb3IuaW52YWxpZFNvdXJjZSlcbiAgfVxufVxuIl19