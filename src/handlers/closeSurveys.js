const Survey = require('../survey')
const Team = require('../team')
const { extractIDs } = require('../util')

module.exports = async () => {
  let closingSurveys = await Survey.timeToClose
  closingSurveys.forEach(async survey => {
    let team = await Team.of(survey.teamID)
    let replies = await survey.replies
    // Send notification to who did not completed the reply
    let surveyTargetsID = extractIDs(await team.members).filter(memberID => !survey.excludedUsersID.includes(memberID))
    let completedReplies = replies.filter(reply => reply.isCompleted)
    let usersIDOfcompletedReplies = completedReplies.map(reply => reply.respondent)
    let targetsID = surveyTargetsID.filter(targetID => !usersIDOfcompletedReplies.includes(targetID))
    team.bot.sendToUsers(targetsID, 'Survey has closed.')

    // close all reply
    replies.forEach(reply => {
      reply.isCompleted = true
      reply.update()
    })
    survey.isClosed = true
    survey.update()
  })
}
