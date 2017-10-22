const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const message = require('../message')
const { Form, log, verify } = require('../util')

module.exports = req => Form.parse(req).then(async fields => {
  /**
   * @see https://api.slack.com/docs/message-buttons
   */
  /* eslint-disable */
  const {
    team: { id: teamID },
    callback_id: callbackID,
    trigger_id: triggerID,
    response_url: responseURL,
    actions, submission, token
  } = log(JSON.parse(fields.payload))
  const { callback, id, url } = JSON.parse(callbackID)
  /* eslint-enable */
  if (verify(token)) {
    if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
      return message.error.underMaintenance
    } else {
      let choice // eslint-disable-line
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

      switch (callback) {
        default:
          throw new Error(message.error.invalidActionCallback)
      }
    }
  } else {
    throw new Error(message.error.invalidSource)
  }
})
