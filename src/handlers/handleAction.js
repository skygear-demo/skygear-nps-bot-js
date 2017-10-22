const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const Team = require('../team')
const { Form, log, verify } = require('../util')
const { submitSurvey } = require('./actions')

module.exports = req => Form.parse(req).then(async fields => {
  /**
   * @see https://api.slack.com/docs/message-buttons
   */
  const {
    team: { id: teamID },
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
      let choice
      if (actions) {
        const action = actions[0]
        if (action.type === 'button') {
          choice = action.value
        } else if (action.type === 'select') {
          choice = action.selected_options[0].value
        } else {
          throw new Error(message.error.invalidActionType)
        }
      }

      const team = await Team.of(teamID)
      switch (callback) {
        case 'answerSurvey':
          if (choice === 'Answer') {
            team.bot.openSurveyDialog(id, triggerID, responseURL)
            return
          } else {
            return message.survey.farewellText
          }
        case 'submitSurvey':
          return submitSurvey(id, url, submission)
        default:
          throw new Error(message.error.invalidActionCallback)
      }
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
})
