const message = require('../../message')

const VALID_OPTIONS = [
  '--all'
]

module.exports = async (team, userID, [$1, ...rest]) => {
  const command = message.command['/nps-generate-report']

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

    for (let survey of surveys) {
      const replies = (await survey.replies).map(reply => `\r\n${reply.score},${reply.reason}`)
      await team.bot.upload('score,reason' + replies, 'report', userID)
    }
  } else {
    return command.usage
  }
}
