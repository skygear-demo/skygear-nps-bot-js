const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('../config')
const User = require('../user')
const { log, verify } = require('../util')

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
    /* eslint-disable */
    let {
      team_id: teamID,
      user_id: userID,
      command, text, token
    } = log(fields)

    if (verify(token)) {
      if (DEVELOPMENT_MODE && teamID !== DEVELOPMENT_TEAM_ID) {
        return 'Under maintenance'
      } else {
        let user = new User(userID, teamID)
        if (await user.isAdmin) {
          switch (command) {
            default:
              return 'Invalid command'
          }
        } else {
          return 'Denied. Only team admin could issue this command.'
        }
      }
    } else {
      return 'Unknown source' // Please install the app via LANDING_PAGE_URL
    }
  })
}
