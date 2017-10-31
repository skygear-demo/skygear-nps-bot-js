const message = require('../../message')

module.exports = (team, channelID) => {
  team.bot.sendToChannel(channelID, '', [
    {
      text: message.hi,
      fallback: 'You are unable to select the survey',
      callback_id: JSON.stringify({
        callback: 'issueCommand'
      }),
      actions: [
        {
          name: 'command',
          text: 'help',
          type: 'button',
          value: '/nps-help'
        },
        {
          name: 'command',
          text: 'show current status',
          type: 'button',
          value: '/nps-status'
        },
        {
          name: 'command',
          text: 'list targets',
          type: 'button',
          value: '/nps-list-targets'
        },
        {
          name: 'command',
          text: 'get latest report',
          type: 'button',
          value: '/nps-generate-report 1'
        },
        {
          name: 'command',
          text: 'send reminder',
          type: 'button',
          value: '/nps-send-reminder'
        }
      ]
    }
  ])
}
