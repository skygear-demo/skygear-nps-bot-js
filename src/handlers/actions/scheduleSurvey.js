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

    let nextDistributionDate = moment()
    switch (frequency) {
      case 'Once Now':
        let survey = await Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate())
        team.bot.distribute(survey)
        return 'Distributing. Your team members will have 48 hours to respond.'
      case 'Weekly':
        if (DEVELOPMENT_MODE) {
          // distribute and re-schedule survey at next minute 10s
          let this15s = moment().second(15).startOf('second')
          nextDistributionDate = moment().isBefore(this15s) ? this15s : moment().add(1, 'm').second(15).startOf('second')
        } else {
          // distribute and re-schedule survey at next friday 10:00
          let thisFriday = moment().day(5).hour(10).startOf('hour')
          nextDistributionDate = moment().isBefore(thisFriday) ? thisFriday : moment().add(1, 'w').day(5).hour(10).startOf('hour')
        }
        await Survey.create(teamID, frequency, targetsID, nextDistributionDate.toDate())
        return `Survey will be distributed every Fridays at 10:00 since <!date^${nextDistributionDate.unix()}^{date_short} at {time}|${nextDistributionDate.format()}>`
      default:
        return 'Invalid frequency'
    }
  }
}
