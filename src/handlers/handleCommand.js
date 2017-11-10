/* eslint-disable */
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const User = require('../user')
const { Form, log, verify } = require('../util')
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, exportResult, summary } = require('./commands')

module.exports = async (req, isFromInternal) => {
  if (isFromInternal !== true) { // skygear handler will put an object in 2nd arg
    req = await Form.parse(req)
  }
  
  const {
    team_id: teamID,
    user_id: userID,
    command, text, token
  } = log(req)

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
          case '/nps-export-result':
            return exportResult(team, userID, args)
          case '/nps-help':
            return message.help
          case '/nps-summary':
            return summary(team, args)
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
}
