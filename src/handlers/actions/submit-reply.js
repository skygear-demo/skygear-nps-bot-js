const slack = require('../../slack.js')
const Reply = require('../../models/reply.js')

function nextQuestion () {
  return 'Thank you for the reply.'
}

async function submitReply (action, replyID, channel, thread) {
  console.log('submitReply', action, replyID, channel, thread)
  if (action === 'next') {
    let messages = (await slack.im.replies(channel, thread)).messages
    // remove the parent message
    messages.shift()
    // if answered
    if (messages[0]) {
      let reply = await Reply.getByID(replyID)
      reply.record.reason = messages[0].text || ''
      reply.save()
    } else {
      return ''
    }
  }
  return nextQuestion()
}

module.exports = submitReply
