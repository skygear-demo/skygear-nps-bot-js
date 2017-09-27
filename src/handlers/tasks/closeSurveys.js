const { Set } = require('immutable')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async () => {
  let surveys = await Survey.candidatesOfClosing
  surveys.forEach(async survey => {
    let team = await Team.of(survey.teamID)
    let replies = await survey.replies

    // Send notification to who did not complete the reply
    let targetsID = Set(survey.targetsID)
    let completedRespondentsID = Set(replies.filter(reply => reply.isCompleted).map(reply => reply.respondent))
    let uncompletedRespondentsID = targetsID.subtract(completedRespondentsID)
    team.bot.sendToUsers(uncompletedRespondentsID.toArray(), 'Survey has closed.')

    // close survey
    survey.isClosed = true
    survey.update()

    // close all uncompleted replies
    replies.forEach(reply => {
      if (!reply.isCompleted) {
        reply.isCompleted = true
        reply.update()
      }
    })
  })
}
