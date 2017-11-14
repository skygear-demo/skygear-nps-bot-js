const moment = require('moment')
const { toLocalDate } = require('../../util')

module.exports = async team => {
  const scheduledSurvey = await team.scheduledSurvey
  const activeSurvey = await team.activeSurvey
  const status = {
    text: '/nps-status:',
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
    let distributionDate
    switch (scheduledSurvey.frequency) {
      case 'weekly':
        distributionDate = moment().add(1, 'w').startOf('week')
        break
      case 'monthly':
        distributionDate = moment().add(1, 'M').startOf('month')
        break
      case 'quarterly':
        distributionDate = moment().add(1, 'Q').startOf('quarter')
        break
      default:
        throw new Error('Invalid freqency')
    }

    status.attachments[0].fields = [
      {
        title: 'Frequency',
        value: scheduledSurvey.frequency,
        short: true
      },
      {
        title: 'Will be distributed at',
        value: toLocalDate(distributionDate),
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
