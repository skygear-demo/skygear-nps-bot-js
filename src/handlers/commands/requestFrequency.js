module.exports = function requestFrequency (excludedUsersID) {
  let message = {
    text: 'How often do you want me to conduct a survey?',
    attachments: [
      {
        fallback: 'You are unable to choose a frequency',
        callback_id: 'scheduleSurvey',
        actions: [
          {
            name: 'frequency',
            text: 'Once Now',
            type: 'button',
            value: JSON.stringify({
              excludedUsersID,
              frequency: 'Once Now'
            })
          },
          {
            name: 'frequency',
            text: 'Weekly',
            type: 'button',
            value: JSON.stringify({
              excludedUsersID,
              frequency: 'Weekly'
            })
          },
          {
            name: 'frequency',
            text: 'Monthly',
            type: 'button',
            value: JSON.stringify({
              excludedUsersID,
              frequency: 'Monthly'
            })
          },
          {
            name: 'frequency',
            text: 'Quarterly',
            type: 'button',
            value: JSON.stringify({
              excludedUsersID,
              frequency: 'Quarterly'
            })
          }
        ]
      }
    ]
  }
  return message
}
