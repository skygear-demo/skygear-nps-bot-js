/*
App's entry point
mainly for global definition
*/
const skygearCloud = require('skygear/cloud')
const APP_IS_ON = require('./config.js').APP_IS_ON
const handleCommand = require('./handlers').handleCommand
const handleAction = require('./handlers').handleAction

if (APP_IS_ON) {
  global.scheduled = null

  // handle slash command
  skygearCloud.handler('command', handleCommand, {
    method: ['POST'],
    userRequired: false
  })

  // handle interactive message
  skygearCloud.handler('action', handleAction, {
    method: ['POST'],
    userRequired: false
  })
}

/*
quickly test any functions
*/
skygearCloud.handler('test', async (req) => {
  const Survey = require('./models/survey.js')
  const Report = require('./models/report.js')
  let survey = await Survey.getByID('c876c16d-a35d-4b58-948a-65bb63747722')
  let report = new Report(survey)
  report.uploadTo('@zephyrwong')
  return report.csv
}, {
  method: ['POST'],
  userRequired: false
})

/*
quick check of availability
curl https://npsbot.skygeario.com/ping
*/
skygearCloud.handler('ping', (req) => 'Hello, world\n', {
  method: ['GET'],
  userRequired: false
})
