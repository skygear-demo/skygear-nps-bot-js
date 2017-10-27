const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const User = require('../user')
const { Form, log, verify } = require('../util')
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status } = require('./commands')

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
        const args = text ? text.split(' ') : []
        switch (command) {
          case '/nps-schedule-survey':
            return scheduleSurvey(team, args)
          case '/nps-list-targets':
            return listTargets(team)
          case '/nps-add-targets':
            return addTargets(team, args)
          case '/nps-remove-targets':
            return removeTargets(team, args)
          case '/nps-stop-survey':
            return stopSurvey(team)
          case '/nps-send-reminder':
            return sendReminder(team)
          case '/nps-status':
            return status(team)
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
