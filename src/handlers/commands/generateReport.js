const message = require('../../message')

const VALID_OPTIONS = [
  '--all'
]

async function reportOf (survey) {
  const replies = (await survey.replies).map(reply => `${reply.score} ${reply.reason}`)
  return 'score reason\n' + replies.join('\n')
}

module.exports = async (team, [$1, ...rest]) => {
  const command = message.command['/nps-generate-report']

  if ($1 && rest.length === 0) {
    if (VALID_OPTIONS.includes($1)) {
      const report = {
        text: 'Report of all survey:',
        attachments: []
      }
      const surveys = await team.getAllSurveys()
      for (let survey of surveys) {
        report.attachments.push({
          title: 'Survey at ' + survey.updatedAt,
          text: await reportOf(survey)
        })
      }
      return report
    } else if (parseInt($1)) {
      const report = {
        text: `Report of last ${$1} survey:`,
        attachments: []
      }
      const surveys = await team.getSurveys(parseInt($1))
      for (let survey of surveys) {
        report.attachments.push({
          title: 'Survey at ' + survey.updatedAt,
          text: await reportOf(survey)
        })
      }
      return report
    } else {
      return command.usage
    }
  } else {
    return command.usage
  }
}
