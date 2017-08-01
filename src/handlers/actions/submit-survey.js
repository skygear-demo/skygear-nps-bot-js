const Survey = require('../../models/survey.js')
const Reply = require('../../models/reply.js')

async function submitSurvey (surveyID, score) {
  let survey = await Survey.getByID(surveyID)
  // if survey exist
  if (survey) {
    if (survey.record.is_completed) {
      return 'This survey has already closed.'
    } else {
      let reply = new Reply(null, survey, score)
      reply.save()
      return 'OK'
    }
  } else {
    return `Survey ${surveyID} does not exsist.`
  }
}

module.exports = submitSurvey
