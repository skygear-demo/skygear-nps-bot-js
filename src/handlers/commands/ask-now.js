const Survey = require('../../models/survey.js')

async function askNow () {
  let survey = await Survey.waitingReply
  if (survey) {
    return 'Sorry, only 1 survey is allowed at a time.'
  } else {
    Survey.send()
    return 'OK. Survey will be closed after 20 minutes and report will be available afterwards.'
  }
}

module.exports = askNow
