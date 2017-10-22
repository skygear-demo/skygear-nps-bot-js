const message = require('../../message')

module.exports = async team => {
  const surveys = await team.scheduledSurveys

  if (surveys.length === 0) {
    return 'No scheduled survey'
  }

  for (let survey of surveys) {
    await survey.delete()
  }
  return message.ok
}
