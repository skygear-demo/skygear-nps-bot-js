const Survey = require('../../models/survey.js')

function askNow () {
  Survey.send()
  return 'OK. Survey will be closed after 20 minutes and report will be available afterwards.'
}

module.exports = askNow
