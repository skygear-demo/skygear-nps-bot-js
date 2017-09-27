const { closeSurveys, distributeScheduledSurveys } = require('./tasks')

module.exports = function executeScheduledTasks () {
  closeSurveys()
  distributeScheduledSurveys()
}
