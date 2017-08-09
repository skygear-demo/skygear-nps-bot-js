const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')
const responseWith = require('../../util.js').responseWith
const FOLLOW_UP_QUESTION = require('../../config.js').FOLLOW_UP_QUESTION

async function submitSurvey (surveyID, user, score) {
  let survey = await Survey.getByID(surveyID)
  // if survey exist
  if (survey) {
    if (survey.record.is_completed) {
      return 'This survey has already closed.'
    } else {
      let reply = new Reply(null, survey, user, score)
      await reply.save()
      let body = {
        text: FOLLOW_UP_QUESTION,
        attachments: [
          {
            fallback: 'Reply below by /nps-reply, e.g. /nps-reply Because of cats!',
            footer: 'Reply below by /nps-reply, e.g. /nps-reply Because of cats!'
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
