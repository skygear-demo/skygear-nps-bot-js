const message = require('../message')
const Team = require('../team')
const User = require('../user')
const { log, verify } = require('../util')
const { showCommandButtons } = require('./events')

module.exports = async req => {
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
      type
    } = event

    const team = await Team.of(teamID)
    switch (type) {
      case 'message':
        // ignore bot messages, avoid loop with self
        if (userID) {
          const user = new User(userID, team)
          if (await user.isAdmin) {
            showCommandButtons(team, channelID)
          }
        }
        break
      default:
        break
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
}
