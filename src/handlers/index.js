const querystring = require('querystring')
const VERIFICATION_TOKEN = require('../config.js').VERIFICATION_TOKEN
const User = require('../models/user.js')

const askNow = require('./commands/ask-now.js')
const requestFrequency = require('./commands/schedule.js')

const scheduleSurvey = require('./actions/schedule-survey.js')

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
      // case 'distribute-survey':
      //   return distributeSurvey(request.actions[0].selected_options[0].value)
      case 'schedule-survey':
        return scheduleSurvey(request.actions[0].value)
      default:
        return 'Invalid action'
    }
  } else {
    return 'Unknown source'
  }
}
