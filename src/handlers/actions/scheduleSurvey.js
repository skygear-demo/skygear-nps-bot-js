const moment = require('moment')
const { DEVELOPMENT_MODE } = require('../../config')
const Survey = require('../../survey')
const Team = require('../../team')

module.exports = async function scheduleSurvey (teamID, { frequency, excludedUsersID }) {
  let team = await Team.of(teamID)
  if (await team.scheduledSurvey) {
    return 'Denied. Only one scheduled survey is allowed.'
  } else {
    excludedUsersID = excludedUsersID.match(/U[A-Z0-9]{8}/g) || []
    switch (frequency) {
      case 'Once Now':
        let survey = await Survey.create(teamID, excludedUsersID, new Date())
        team.bot.distribute(survey)
        return 'Distributing. Your team members will have 48 hours to respond.'
      case 'Weekly':
        // next friday
        let nextDistributionDate = DEVELOPMENT_MODE ? moment().add(7, 's') : moment().day(5)
        await Survey.create(teamID, excludedUsersID, nextDistributionDate.toDate())
        return `Survey will be distributed at <!date^${nextDistributionDate.unix()}^{date_short} at {time}|${nextDistributionDate.format()}>`
      default:
        return 'Invalid frequency'
    }
  }
}
