const Survey = require('../../models/survey.js')

async function askNow (exclusion) {
  let survey = await Survey.waitingReply
  if (survey) {
    return 'Sorry, only 1 survey is allowed at a time.'
  } else {
    Survey.send(exclusion)
    return 'OK. Survey will be closed after 20 minutes and report will be available afterwards.'
  }
}

module.exports = askNow
