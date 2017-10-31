const axios = require('axios')
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const { Form, log, verify } = require('../util')
const { answerSurvey, submitSurvey } = require('./actions')
const { listTargets, stopSurvey, sendReminder, status, generateReport } = require('./commands')
const { showCommandButtons } = require('./events')

module.exports = req => Form.parse(req).then(async fields => {
  /**
   * @see https://api.slack.com/docs/message-buttons
   */
  const {
    team: { id: teamID },
    channel: { id: channelID },
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
            case '/nps-list-targets':
              axios.post(responseURL, {
                text: await listTargets(team)
              })
              break
            case '/nps-stop-survey':
              axios.post(responseURL, {
                text: await stopSurvey(team)
              })
              break
            case '/nps-send-reminder':
              axios.post(responseURL, {
                text: await sendReminder(team)
              })
              break
            case '/nps-status':
              axios.post(responseURL, await status(team))
              break
            case '/nps-generate-report':
              axios.post(responseURL, {
                text: await generateReport(team, userID, args)
              })
              break
            case '/nps-help':
              axios.post(responseURL, {
                text: message.help
              })
              break
            default:
              throw new Error(message.error.invalidCommand)
          }
          showCommandButtons(team, channelID)
          break
        default:
          throw new Error(message.error.invalidActionCallback)
      }
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
})
