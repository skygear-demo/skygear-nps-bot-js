const message = require('../../message')
const Survey = require('../../survey')

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
      const survey = await Survey.create(team.slackID, frequency, team.targetsID) // eslint-disable-line
      if (frequency === 'now') {
        team.bot.distribute(survey)
        survey.isSent = true
        survey.update()
      }
      return message.ok
    } else {
      return command.error.illegalOption($1) + '\n' + command.usage
    }
  } else {
    return command.usage
  }
}
