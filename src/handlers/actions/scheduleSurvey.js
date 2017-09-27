/* eslint-disable */
const { Set } = require('immutable')
const moment = require('moment')
const { DEVELOPMENT_MODE } = require('../../config')
const Survey = require('../../survey')
const Team = require('../../team')
const { extractIDs } = require('../../util')

module.exports = async function scheduleSurvey (teamID, { frequency, excludedUsersID }) {
  let team = await Team.of(teamID)
  if (await team.scheduledSurvey) {
    return 'Denied. Only one scheduled survey is allowed.'
  } else if (await team.distributedSurvey) {
    return 'Denied. There is a survey still open for answering.'
  } else {
    let membersID = Set(extractIDs(await team.members))
    let idsToExclude = Set(excludedUsersID.match(/U[A-Z0-9]{8}/g) || [])
    let targetsID = membersID.subtract(idsToExclude).toArray()

    switch (frequency) {
      case 'Once Now':
        let survey = await Survey.create(teamID, frequency, targetsID, new Date())
        team.bot.distribute(survey)
        return 'Distributing. Your team members will have 48 hours to respond.'
      case 'Weekly':
        // next friday
        let nextDistributionDate = DEVELOPMENT_MODE ? moment().add(7, 's') : moment().day(5)
        await Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate())
        return `Survey will be distributed at <!date^${nextDistributionDate.unix()}^{date_short} at {time}|${nextDistributionDate.format()}>`
      default:
        return 'Invalid frequency'
    }
  }
}
