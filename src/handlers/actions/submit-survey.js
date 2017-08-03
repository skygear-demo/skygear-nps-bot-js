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
            title: `Reply below, then submit`,
            actions: [
              {
                name: reply.record._id,
                text: 'Submit',
                type: 'button',
                value: 'submit'
              },
              {
                name: reply.record._id,
                text: 'Skip',
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
