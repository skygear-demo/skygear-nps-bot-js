const Reply = require('../../reply')

module.exports = async (userID, { surveyID }) => {
  let reply = await Reply.of(surveyID, userID)
  reply.isCompleted = true
  reply.update()
  return 'Thank you for your reply.'
}
