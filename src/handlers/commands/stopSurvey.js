const message = require('../../message')

module.exports = async team => {
  const activeSurvey = await team.activeSurvey
  const scheduledSurvey = await team.scheduledSurvey

  if (activeSurvey || scheduledSurvey) {
    if (activeSurvey) {
      await activeSurvey.close()
    }
    if (scheduledSurvey) {
      await scheduledSurvey.delete()
    }
    return `/nps-stop-survey: ${message.ok}. You can use \`/nps-summary 1\` to view the result of the latest survey.`
  } else {
    return '/nps-stop-survey: No active or scheduled survey.'
  }
}
