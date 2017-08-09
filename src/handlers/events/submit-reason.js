const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')
const slack = require('../../slack.js')

async function submitReason (userID, reason) {
  let message
  let survey = await Survey.waitingReply
  if (survey) {
    let reply = await Reply.getUserNotCompleted(survey, userID)
    if (reply) {
      if (reply.record.reason) {
        message = 'You have already finished the survey.'
      } else {
        reply.record.reason = reason
        await reply.save()
        if (global.scheduled) {
          message = `Thank you for the reply. Next survey day will be at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}.`
        } else {
          message = 'Thank you for the reply.'
        }
      }
    } else {
      message = 'Please sumbit a score first.'
    }
  } else {
    message = 'No survey is opening now.'
  }

  let opts = {
    as_user: true
  }
  slack.chat.postMessage(userID, message, opts)
}

module.exports = submitReason
