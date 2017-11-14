const message = require('../../message')
const { toLocalDate } = require('../../util')

const VALID_OPTIONS = [
  '--all'
]

module.exports = async (team, [$1, ...rest]) => {
  const command = message.command['/nps-summary']

  if ($1 && rest.length === 0) {
    const numberOfSurveys = parseInt($1)

    let surveys
    if (numberOfSurveys) { // if $1 is a number, parse != NaN
      surveys = await team.getSurveys(numberOfSurveys)
    } else if (VALID_OPTIONS.includes($1)) {
      surveys = await team.getSurveys()
    } else {
      return command.usage
    }

    if (surveys.length < 1) {
      return '/nps-summary: No closed survey found'
    }

    const attachments = []
    for (let survey of surveys) {
      const stats = await survey.stats
      const summary = {
        title: `Summary of survey sent at ${toLocalDate(survey.distributionDate)}`,
        fields: [
          {
            title: 'Response rate',
            value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
            short: true
          },
          {
            title: 'Average score',
            value: stats.averageScore.toFixed(2),
            short: true
          },
          {
            title: 'Closed at',
            value: toLocalDate(survey.closingDate)
          }
        ]
      }
      attachments.push(summary)
    }

    return {
      text: '/nps-summary:',
      attachments
    }
  } else {
    return command.usage
  }
}
