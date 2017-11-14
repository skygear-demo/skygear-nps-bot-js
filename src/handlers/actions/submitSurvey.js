const axios = require('axios')
const message = require('../../message')
const Reply = require('../../reply')
const Survey = require('../../survey')

module.exports = async (surveyID, user, team, responseURL, { score, reason }) => {
  const survey = await Survey.of(surveyID)
  if (survey.isClosed) {
    return 'This survey has closed'
  }

  if (await user.hasReplied(surveyID)) {
    return 'You have already answered'
  }

  score = parseInt(score)
  if (isNaN(score) || score < 1 || score > 10) {
    return {
      errors: [
        {
          name: 'score',
          error: 'Invalid score'
        }
      ]
    }
  }
  await Reply.create(surveyID, user.id, score, reason || '')
  axios.post(responseURL, {
    text: message.survey.acknowledgement
  })
}
