const slack = require('../../slack.js')
const Reply = require('../../models/reply.js')

async function submitReply (action, replyID, channel, since) {
  console.log('submitReply', action, replyID, channel, since)
  if (action === 'submit') {
    let opts = {
      count: 1,
      oldest: since
    }
    let messages = (await slack.im.history(channel, opts)).messages
    if (messages.length < 1) {
      return ''
    }
    let reply = await Reply.getByID(replyID)
    reply.record.reason = messages[0].text || ''
    reply.save()
  }
  return 'Thank you for the reply.'
}

module.exports = submitReply
