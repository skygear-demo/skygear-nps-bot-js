const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const User = require('../user')
const { Form, log, verify } = require('../util')

module.exports = req => Form.parse(req).then(async fields => {
  const {
    team_id: teamID,
    user_id: userID,
    command, text, token
  } = log(fields)

  if (verify(token)) {
    if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
      return message.error.underMaintenance
    } else {
      const team = await Team.of(teamID)
      const user = new User(userID, team)
      if (await user.isAdmin) {
        const args = text ? text.split(' ') : [] // eslint-disable-line
        switch (command) {
          default:
            throw new Error(message.error.invalidCommand)
        }
      } else {
        return message.error.notAdmin
      }
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
})
