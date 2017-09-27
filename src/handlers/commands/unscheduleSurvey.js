const Team = require('../../team')

module.exports = async function unscheduleSurvey (teamID) {
  let team = await Team.of(teamID)
  let scheduledSurvey = await team.scheduledSurvey
  if (scheduledSurvey) {
    await scheduledSurvey.delete()
    return 'Done'
  } else {
    return 'No scheduled survey, you may create one via /nps-schedule-survey.'
  }
}
