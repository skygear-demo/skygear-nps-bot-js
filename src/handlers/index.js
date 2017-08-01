const querystring = require('querystring')
const VERIFICATION_TOKEN = require('../config.js').VERIFICATION_TOKEN
const User = require('../models/user.js')

const askNow = require('./commands/ask-now.js')
const requestFrequency = require('./commands/schedule.js')
const stopScheduling = require('./commands/stop-scheduling.js')
const requestReportType = require('./commands/generate-report.js')

const scheduleSurvey = require('./actions/schedule-survey.js')
const submitSurvey = require('./actions/submit-survey.js')
const generateReport = require('./actions/generate-report.js')

function isFromSlack (request) {
  return request.token === VERIFICATION_TOKEN
}

async function isAdmin (userID) {
  let admins = await User.admins
  return admins.some((admin) => admin.id === userID)
}

exports.handleCommand = async (req) => {
  let request = querystring.parse(req.body)
  console.log(request)
  if (isFromSlack(request)) {
    if (await isAdmin(request.user_id)) {
      switch (request.command) {
        case '/ask-now':
          return askNow()
        case '/schedule':
          return requestFrequency()
        case '/stop-scheduling':
          return stopScheduling()
        case '/generate-report':
          return requestReportType()
        default:
          return 'Invalid command'
      }
    } else {
      return 'Permission denied.'
    }
  } else {
    return 'Unknown source'
  }
}

exports.handleAction = (req) => {
  let request = querystring.parse(req.body)
  request = JSON.parse(request.payload)
  console.log(request)
  if (isFromSlack(request)) {
    switch (request.callback_id) {
      case 'submit-survey':
        return submitSurvey(request.actions[0].name, parseInt(request.actions[0].selected_options[0].value))
      case 'schedule-survey':
        return scheduleSurvey(request.actions[0].value)
      case 'generate-report':
        return generateReport(request.actions[0].value, request.response_url)
      default:
        return 'Invalid action'
    }
  } else {
    return 'Unknown source'
  }
}
