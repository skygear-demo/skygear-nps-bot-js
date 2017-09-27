const moment = require('moment')
const { DEVELOPMENT_MODE } = require('../../config')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async () => {
  let surveys = await Survey.candidatesOfDistribution
  surveys.forEach(async survey => {
    let team = await Team.of(survey.teamID)
    team.bot.distribute(survey)
    // re-schedule
    let nextDistributionDate
    switch (survey.frequency) {
      case 'Weekly':
        nextDistributionDate = DEVELOPMENT_MODE ? moment(survey.scheduledDatetime).add(7, 's') : moment(survey.scheduledDatetime).day(5)
        break
      default:
        return
    }
    Survey.create(survey.teamID, survey.frequency, survey.targetsID, nextDistributionDate.toDate())
  })
}
