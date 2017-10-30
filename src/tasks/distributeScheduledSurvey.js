const Survey = require('../survey')
const Team = require('../team')

module.exports = async frequency => {
  let scheduledSurveys
  switch (frequency) {
    case 'weekly':
      scheduledSurveys = await Survey.weekly
      break
    case 'monthly':
      scheduledSurveys = await Survey.monthly
      break
    case 'quarterly':
      scheduledSurveys = await Survey.quarterly
      break
    default:
      throw new Error('Invalid frequency')
  }

  for (let scheduledSurvey of scheduledSurveys) {
    const team = await Team.of(scheduledSurvey.teamID)
    // close old active survey
    const oldSurvey = await team.activeSurvey
    if (oldSurvey) {
      await oldSurvey.close()
    }
    // send new survey
    team.bot.distribute(scheduledSurvey)
    scheduledSurvey.isSent = true
    await scheduledSurvey.update()
    // clone to reschedule
    await Survey.create(scheduledSurvey.teamID, scheduledSurvey.frequency, scheduledSurvey.targetsID)
  }
}
