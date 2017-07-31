const Survey = require('../../models/survey.js')

function askNow () {
  Survey.send()
  return 'OK'
}

module.exports = askNow
