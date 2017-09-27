const Team = require('../../team')
const Reply = require('../../reply')

module.exports = async (teamID, userID, reason, IMID) => {
  let team = await Team.of(teamID)
  let survey = await team.distributedSurvey
  if (survey) {
    // check survey has closed
    if (survey.isClosed) {
      return team.bot.sendToChannel(IMID, 'Survey has already closed.')
    }
    // check has submitted score
    let reply = await Reply.of(survey.id, userID)
    if (reply) {
      // check has replied reason
      if (reply.isCompleted) {
        return team.bot.sendToChannel(IMID, 'You have already finish the survey.')
      } else {
        reply.reason = reason
        reply.isCompleted = true
        reply.update()
        return team.bot.sendToChannel(IMID, 'Thank you for your reply.')
      }
    }
    // else ignore
  } else {
    return team.bot.sendToChannel(IMID, 'No survey is opening now.')
  }
}
