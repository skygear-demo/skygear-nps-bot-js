const moment = require('moment')
const { DEVELOPMENT_MODE } = require('../../config')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async () => {
  let surveys = await Survey.candidatesOfDistribution
  for (let survey of surveys) {
    let team = await Team.of(survey.teamID)
    team.bot.distribute(survey)

    // re-schedule
    let nextDistributionDate
    switch (survey.frequency) {
      case 'Weekly':
        nextDistributionDate = DEVELOPMENT_MODE ? moment().add(1, 'm').second(15).startOf('second') : moment().add(1, 'w').day(5).hour(10).startOf('hour')
        break
      default:
        return
    }
    await Survey.create(survey.teamID, survey.frequency, survey.targetsID, nextDistributionDate.toDate())
  }
}
