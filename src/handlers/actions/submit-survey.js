const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')
const responseWith = require('../../util.js').responseWith
const FOLLOW_UP_QUESTION = require('../../config.js').FOLLOW_UP_QUESTION
const slack = require('../../slack.js')

async function submitSurvey (surveyID, userID, score) {
  let survey = await Survey.getByID(surveyID)
  // if survey exist
  if (survey) {
    if (survey.record.is_completed) {
      return 'This survey has already closed.'
    } else {
      let reply = new Reply(null, survey, userID, score)
      await reply.save()
      let opts = {
        as_user: true
      }
      slack.chat.postMessage(userID, FOLLOW_UP_QUESTION, opts)
      return 'OK'
    }
  } else {
    return `Survey ${surveyID} does not exsist.`
  }
}

module.exports = submitSurvey
