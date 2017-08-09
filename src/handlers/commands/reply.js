const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')

async function reply (user, replyText) {
  let survey = await Survey.waitingReply
  if (survey) {
    let reply = await Reply.getUserNotCompleted(survey, user)
    if (reply) {
      if (reply.record.reason) {
        return 'You have already finished the survey.'
      } else {
        reply.record.reason = replyText
        reply.save()
        if (global.scheduled) {
          return `Thank you for the reply. Next survey day will be at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}.`
        }
        return 'Thank you for the reply.'
      }
    } else {
      return 'Please sumbit a score first.'
    }
  } else {
    return 'No survey is opening now.'
  }
}

module.exports = reply
