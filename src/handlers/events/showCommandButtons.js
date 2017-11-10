const message = require('../../message')

module.exports = async (team, channelID) => {
  const attachments = [
    {
      text: message.hi,
      fallback: 'You are unable to issue commands via buttons',
      callback_id: JSON.stringify({
        callback: 'issueCommand'
      }),
      actions: [
        {
          name: 'command',
          text: 'Get help',
          type: 'button',
          value: '/nps-help'
        },
        {
          name: 'command',
          text: 'Show current status',
          type: 'button',
          value: '/nps-status'
        },
        {
          name: 'command',
          text: 'List targets',
          type: 'button',
          value: '/nps-list-targets'
        },
        {
          name: 'command',
          text: 'Get summary of latest survey',
          type: 'button',
          value: '/nps-summary 1'
        },
        {
          name: 'command',
          text: 'Get result of latest survey',
          type: 'button',
          value: '/nps-export-result 1'
        }
      ]
    },
    {
      fallback: 'You are unable to issue commands via buttons',
      callback_id: JSON.stringify({
        callback: 'issueCommand'
      }),
      actions: []
    }
  ]

  const scheduledSurvey = await team.scheduledSurvey
  const activeSurvey = await team.activeSurvey

  if (activeSurvey) {
    attachments[1].actions.push({
      name: 'command',
      text: 'Send reminder',
      type: 'button',
      value: '/nps-send-reminder'
    })
  }

  if (scheduledSurvey || activeSurvey) {
    attachments[1].actions.push({
      name: 'command',
      text: 'Stop survey',
      type: 'button',
      value: '/nps-stop-survey'
    })
  }

  team.bot.sendToChannel(channelID, '', attachments)
}
