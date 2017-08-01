const responseWith = require('../../util.js').responseWith

function requestFrequency () {
  let body = {
    text: 'Choose a frequency',
    attachments: [
      {
        fallback: 'You are unable to choose a frequecny',
        callback_id: 'schedule-survey',
        actions: [
          {
            name: 'frequency',
            text: 'Weekly',
            type: 'button',
            value: 'weekly'
          },
          {
            name: 'frequency',
            text: 'Monthly',
            type: 'button',
            value: 'monthly'
          },
          {
            name: 'frequency',
            text: 'Quarterly',
            type: 'button',
            value: 'quarterly'
          }
        ]
      }
    ]
  }
  return responseWith(body)
}

module.exports = requestFrequency
