const { Set } = require('immutable')
const message = require('../../message')
const Team = require('../../team')

module.exports = async team => {
  const survey = await team.lastestSurvey
  if (survey) {
    const silentTargetsID = Set(survey.targetsID).subtract(Set(await survey.respondentsID))
    const team = await Team.of(survey.teamID)
    team.bot.sendToUsers(silentTargetsID, 'Hi! Please submit the NPS survey. We need your opinions to improve:)')
    return message.ok
  } else {
    return 'No scheduled survey'
  }
}
