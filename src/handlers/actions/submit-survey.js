const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')
const responseWith = require('../../util.js').responseWith
const followUpQuestion = require('../../config.js').followUpQuestion

async function submitSurvey (surveyID, score) {
  let survey = await Survey.getByID(surveyID)
  // if survey exist
  if (survey) {
    if (survey.record.is_completed) {
      return 'This survey has already closed.'
    } else {
      let reply = new Reply(null, survey, score)
      await reply.save()
      let body = {
        text: followUpQuestion,
        attachments: [
          {
            fallback: 'You are unable to answer the question',
            callback_id: 'submit-reply',
            title: `Reply this in a new thread, then submit via button 'NEXT'`,
            actions: [
              {
                name: reply.record._id,
                text: 'NEXT',
                type: 'button',
                value: 'next'
              },
              {
                name: reply.record._id,
                text: 'SKIP',
                type: 'button',
                value: 'skip'
              }
            ]
          }
        ]
      }
      return responseWith(body)
    }
  } else {
    return `Survey ${surveyID} does not exsist.`
  }
}

module.exports = submitSurvey
