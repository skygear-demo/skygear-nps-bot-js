const { Set } = require('immutable')
const message = require('../../message')
const Team = require('../../team')

module.exports = async team => {
  const activeSurvey = await team.activeSurvey
  if (activeSurvey) {
    const command = message.command['/nps-send-reminder']
    const silentTargetsID = Set(activeSurvey.targetsID).subtract(Set(await activeSurvey.respondentsID))
    const team = await Team.of(activeSurvey.teamID)
    team.bot.sendToUsers(silentTargetsID, command.messages[Math.floor(Math.random() * command.messages.length)])
    team.bot.distribute(activeSurvey, silentTargetsID)
    return `/nps-send-reminder: ${message.ok} Reminders sent!`
  } else {
    return '/nps-send-reminder: There is no active survey.'
  }
}
