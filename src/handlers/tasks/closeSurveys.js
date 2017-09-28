const { Set } = require('immutable')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async () => {
  let surveys = await Survey.candidatesOfClosing
  for (let survey of surveys) {
    let team = await Team.of(survey.teamID)
    let replies = await survey.replies

    // close survey
    survey.isClosed = true
    await survey.update()

    // Send notification to who did not complete the reply
    let targetsID = Set(survey.targetsID)
    let completedRespondentsID = Set(replies.filter(reply => reply.isCompleted).map(reply => reply.respondent))
    let uncompletedRespondentsID = targetsID.subtract(completedRespondentsID)
    team.bot.sendToUsers(uncompletedRespondentsID.toArray(), 'Survey has closed.')

    // close all uncompleted replies
    for (let reply of replies) {
      if (!reply.isCompleted) {
        reply.isCompleted = true
        await reply.update()
      }
    }
  }
}
