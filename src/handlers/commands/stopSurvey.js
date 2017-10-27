const message = require('../../message')

module.exports = async team => {
  const survey = await team.scheduledSurvey
  if (survey) {
    await survey.delete()
    return message.ok
  } else {
    return 'No scheduled survey'
  }
}
