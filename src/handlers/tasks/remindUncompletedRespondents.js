const { Set } = require('immutable')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async () => {
  let surveys = await Survey.distributed
  for (let survey of surveys) {
    let team = await Team.of(survey.teamID)
    let replies = await survey.replies

    // Send notification to who did not submit a score, i.e. is target && no reply record
    let targetsID = Set(survey.targetsID)
    let respondentsID = Set(replies.map(reply => reply.respondent))
    let unresponedUsersID = targetsID.subtract(respondentsID)
    team.bot.sendToUsers(unresponedUsersID.toArray(), 'Please rate a score to help improve the team :) Your identity will be confidential.')

    // Sned notification to who did not provide a reason, i.e. replied but not completed
    let uncompletedRespondentsID = replies.filter(reply => !reply.isCompleted).map(reply => reply.respondent)
    team.bot.sendToUsers(uncompletedRespondentsID, 'Would you like to tell me the reason? Or you might simply skip the question.')
  }
}
