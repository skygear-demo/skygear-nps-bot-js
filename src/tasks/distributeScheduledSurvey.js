const Survey = require('../survey')
const Team = require('../team')

module.exports = async frequency => {
  let surveys
  switch (frequency) {
    case 'weekly':
      surveys = await Survey.weekly
      break
    case 'monthly':
      surveys = await Survey.monthly
      break
    case 'quarterly':
      surveys = await Survey.quarterly
      break
    default:
      throw new Error('Invalid frequency')
  }

  for (let survey of surveys) {
    const team = await Team.of(survey.teamID)
    team.bot.distribute(survey)
    survey.isSent = true
    survey.update()
    // clone the old one to reschedule
    Survey.create(survey.teamID, survey.frequency, survey.targetsID)
  }
}
