const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const User = require('../user')
const { log, verify } = require('../util')
const { scheduleSurvey } = require('./actions')

module.exports = req => {
  function parseForm () {
    return new Promise((resolve, reject) => {
      req.form((formError, fields) => {
        if (formError) {
          reject(formError)
        }
        resolve(fields)
      })
    })
  }

  return parseForm().then(async fields => {
    /**
     * @see https://api.slack.com/docs/message-buttons
     */
    let { payload } = fields
    payload = log(JSON.parse(payload))

    let {
      team: { id: teamID },
      user: { id: userID },
      callback_id: callback,
      actions, token
    } = payload

    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return 'Under maintenance'
      } else {
        let user = new User(userID, teamID)
        if (await user.isAdmin) {
          let value
          if (actions[0].type === 'button') {
            value = JSON.parse(actions[0].value)
          } else if (actions[0].type === 'select') {
            value = JSON.parse(actions[0].selected_options[0].value)
          } else {
            return 'Invalid action type'
          }
          switch (callback) {
            case 'scheduleSurvey':
              return scheduleSurvey(teamID, value)
            default:
              return 'Invalid action callback'
          }
        } else {
          return 'Denied. Only team admin could issue this action.'
        }
      }
    } else {
      return 'Unknown source' // Please install the app via LANDING_PAGE_URL
    }
  })
}
