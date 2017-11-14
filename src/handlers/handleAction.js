const axios = require('axios')
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const User = require('../user')
const { Form, log, verify } = require('../util')
const { answerSurvey, submitSurvey } = require('./actions')
const { showCommandButtons } = require('./events')
const handleCommand = require('./handleCommand')

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
      const user = new User(userID, team)
      switch (callback) {
        case 'answerSurvey':
          return answerSurvey(id, user, team, chosen, triggerID, responseURL)
        case 'submitSurvey':
          return submitSurvey(id, user, team, url, submission)
        case 'issueCommand':
          const [command, ...args] = chosen.split(' ')
          let result = await handleCommand({
            team_id: teamID,
            user_id: userID,
            text: args.join(' '),
            command,
            token
          }, true)

          if (typeof result === 'string') {
            result = {
              text: result
            }
          }

          await axios.post(responseURL, result)
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
