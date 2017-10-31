const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const { Form, log, verify } = require('../util')
const { answerSurvey, submitSurvey } = require('./actions')
const { scheduleSurvey, listTargets, addTargets, removeTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands')

module.exports = req => Form.parse(req).then(async fields => {
  /**
   * @see https://api.slack.com/docs/message-buttons
   */
  const {
    team: { id: teamID },
    user: { id: userID },
    callback_id: callbackID,
    trigger_id: triggerID,
    response_url: responseURL,
    actions, submission, token
  } = log(JSON.parse(fields.payload))
  const { callback, id, url } = JSON.parse(callbackID)

  if (verify(token)) {
    if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
      return message.error.underMaintenance
    } else {
      let chosen
      if (actions) {
        const action = actions[0]
        if (action.type === 'button') {
          chosen = action.value
        } else if (action.type === 'select') {
          chosen = action.selected_options[0].value
        } else {
          throw new Error(message.error.invalidActionType)
        }
      }

      const team = await Team.of(teamID)
      switch (callback) {
        case 'answerSurvey':
          return answerSurvey(id, userID, team, chosen, triggerID, responseURL)
        case 'submitSurvey':
          return submitSurvey(id, userID, url, submission)
        case 'issueCommand':
          const [command, ...args] = chosen.split(' ')
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
            case '/nps-generate-report':
              return generateReport(team, userID, args)
            case '/nps-help':
              return message.help
            default:
              throw new Error(message.error.invalidCommand)
          }
        default:
          throw new Error(message.error.invalidActionCallback)
      }
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
})
