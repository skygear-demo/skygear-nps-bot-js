const moment = require('moment')
const message = require('../../message')

const VALID_OPTIONS = [
  '--all'
]

module.exports = async (team, userID, [$1, ...rest]) => {
  const command = message.command['/nps-export-result']

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
      return '/nps-export-result: No closed survey found'
    }

    for (let survey of surveys) {
      const replies = (await survey.replies).map(reply => `\r\n${reply.score},${reply.reason}`)
      const stats = await survey.stats
      await team.bot.upload('score,reason' + replies, `Response rate: ${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%\nAverage score: ${stats.averageScore.toFixed(2)}`, `report-${moment(survey.distributionDate).format('YYYY-MM-DD')}`, userID)
    }

    return '/nps-export-result:'
  } else {
    return command.usage
  }
}
