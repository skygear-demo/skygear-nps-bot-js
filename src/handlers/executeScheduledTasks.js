const { closeSurveys, distributeScheduledSurveys, remindUncompletedRespondents } = require('./tasks')

module.exports = async function executeScheduledTasks () {
  console.log(new Date())
  await closeSurveys()
  await remindUncompletedRespondents()
  await distributeScheduledSurveys()
}
