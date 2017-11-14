const { Set } = require('immutable')
const message = require('../../message')
const Team = require('../../team')

module.exports = async team => {
  const activeSurvey = await team.activeSurvey
  if (activeSurvey) {
    const silentTargetsID = Set(activeSurvey.targetsID).subtract(Set(await activeSurvey.respondentsID))
    const team = await Team.of(activeSurvey.teamID)
    team.bot.sendToUsers(silentTargetsID, 'Hi! Please submit the NPS survey. We need your opinions to improve:)')
    team.bot.distribute(activeSurvey, silentTargetsID)
    return `/nps-send-reminder: ${message.ok}`
  } else {
    return '/nps-send-reminder: No active survey'
  }
}
