module.exports = async team => {
  const activeSurvey = await team.activeSurvey
  const scheduledSurvey = await team.scheduledSurvey

  if (activeSurvey) {
    await activeSurvey.close()
    return 'Survey closed'
  } else if (scheduledSurvey) {
    await scheduledSurvey.delete()
    return 'Survey unscheduled'
  } else {
    return 'No scheduled survey'
  }
}
