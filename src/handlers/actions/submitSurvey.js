const axios = require('axios')
const message = require('../../message')
const Reply = require('../../reply')

module.exports = async (surveyID, userID, responseURL, { score, reason }) => {
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
  await Reply.create(surveyID, userID, score, reason || '')
  axios.post(responseURL, {
    text: message.survey.acknowledgement
  })
}
