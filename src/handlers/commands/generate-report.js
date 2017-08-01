const responseWith = require('../../util.js').responseWith

function requestReportType () {
  let body = {
    text: 'Choose a report type',
    attachments: [
      {
        fallback: 'You are unable to select a report type',
        callback_id: 'generate-report',
        actions: [
          {
            name: 'report type',
            text: 'Latest',
            type: 'button',
            value: 'latest'
          },
          {
            name: 'report type',
            text: 'All-time',
            type: 'button',
            value: 'all-time'
          }
        ]
      }
    ]
  }
  return responseWith(body)
}

module.exports = requestReportType
