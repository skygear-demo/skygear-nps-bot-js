module.exports = async team => {
  const scheduledSurvey = await team.scheduledSurvey
  const activeSurvey = await team.activeSurvey
  const status = {
    attachments: [
      {
        title: 'Scheduled survey',
        color: 'good'
      },
      {
        title: 'Active survey',
        color: 'good'
      }
    ]
  }

  if (scheduledSurvey) {
    status.attachments[0].fields = [
      {
        title: 'Frequency',
        value: scheduledSurvey.frequency,
        short: true
      },
      {
        title: 'Will be distributed at',
        value: 'date',
        short: true
      }
    ]
  } else {
    status.attachments[0].text = 'None'
    status.attachments[0].footer = 'You may create one by /nps-schedule-survey'
  }

  if (activeSurvey) {
    const stats = await activeSurvey.stats
    status.attachments[1].fields = [
      {
        title: 'Response rate',
        value: `${stats.submissionCount} out of ${stats.targetsCount}, ${(stats.responseRate * 100).toFixed(2)}%`,
        short: true
      }
    ]
    if (stats.averageScore) {
      status.attachments[1].fields.push({
        title: 'Average score',
        value: stats.averageScore.toFixed(2),
        short: true
      })
    }
  } else {
    status.attachments[1].text = 'None'
  }

  return status
}
