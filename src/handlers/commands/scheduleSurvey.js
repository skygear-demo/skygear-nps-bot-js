const moment = require('moment')
const message = require('../../message')
const Survey = require('../../survey')
const { toLocalDate } = require('../../util')

const VALID_OPTIONS = [
  '--now',
  '--weekly',
  '--monthly',
  '--quarterly'
]

// imitate shell script
module.exports = async (team, [$1, ...rest]) => {
  const command = message.command['/nps-schedule-survey']

  if ($1 && rest.length === 0) {
    if (VALID_OPTIONS.includes($1)) {
      const frequency = $1.substr(2) // remove prefix "--"

      if (await team.activeSurvey) {
        return command.error.activeSurveyExists
      }

      if (await team.scheduledSurvey) {
        return command.error.alreadyScheduled
      }

      const survey = await Survey.create(team.slackID, frequency, team.targetsID) // eslint-disable-line
      let distributionDate
      switch (frequency) {
        case 'now':
          team.bot.distribute(survey)
          survey.distributionDate = new Date()
          survey.isSent = true
          survey.update()
          return message.ok + ' The survey will be distributed now.'
        case 'weekly':
          distributionDate = moment().add(1, 'w').startOf('week')
          break
        case 'monthly':
          distributionDate = moment().add(1, 'M').startOf('month')
          break
        case 'quarterly':
          distributionDate = moment().add(1, 'Q').startOf('quarter')
          break
        default:
          throw new Error('Invalid frequency')
      }
      return `/nps-schedule-survey: The survey will be distributed at ${toLocalDate(distributionDate)}.`
    } else {
      return command.error.illegalOption($1) + '\n' + command.usage
    }
  } else {
    return command.usage
  }
}
