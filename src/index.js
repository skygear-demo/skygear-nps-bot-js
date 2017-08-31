/*
App's entry point
mainly for global definition
*/
const skygearCloud = require('skygear/cloud')
const APP_IS_ON = require('./config.js').APP_IS_ON
const handleCommand = require('./handlers').handleCommand
const handleAction = require('./handlers').handleAction
const handleEvent = require('./handlers').handleEvent

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

  // handle event
  skygearCloud.handler('event', handleEvent, {
    method: ['POST'],
    userRequired: false
  })
}

/*
quickly test any functions
*/
skygearCloud.handler('test', req => {
  console.log(`Version: ${process.version}`)
  return ''
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
