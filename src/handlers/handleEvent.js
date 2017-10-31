/* eslint-disable */
const message = require('../message')
const { log, verify } = require('../util')

module.exports = req => {
  /**
   * @see https://api.slack.com/events-api#receiving_events
   */
  const {
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
      text, type
    } = event
    switch (type) {
      default:
        break
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
}
