const Reply = require('../../reply')
const Survey = require('../../survey')

module.exports = async (userID, { surveyID }) => {
  let survey = await Survey.of(surveyID.substring(7)) // id => _id
  if (survey.isClosed) {
    return 'Survey has already closed.'
  }

  let reply = await Reply.of(surveyID, userID)
  reply.isCompleted = true
  reply.update()
  return 'Thank you for your reply.'
}
