const { log, verify } = require('../util')
const { saveReason } = require('./events')

module.exports = req => {
  /**
   * @see https://api.slack.com/events-api#receiving_events
   */
  let {
    team_id: teamID,
    challenge, event, token
  } = log(JSON.parse(req.body))

  if (verify(token)) {
    // one-time verification to enable event subscription
    if (challenge) {
      return challenge
    }

    let {
      channel: channelID,
      user: userID,
      text: reason,
      type
    } = event
    switch (type) {
      case 'message':
        // ignore bot messages, avoid loop with self
        return userID ? saveReason(teamID, userID, reason, channelID) : ''
      default:
        return 'Invalid event type'
    }
  } else {
    return 'Unknown source' // Please install the app via LANDING_PAGE_URL
  }
}
