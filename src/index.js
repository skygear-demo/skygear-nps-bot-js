const skygearCloud = require('skygear/cloud')
const { DEVELOPMENT_MODE } = require('./config')
const { distributeScheduledSurveys, handleOAuth, handleCommand, handleAction, handleEvent } = require('./handlers')

/**
 * Check availability after a git push
 */
skygearCloud.handler('ping', req => 'Hello, world\n', {
  method: ['GET'],
  userRequired: false
})

/**
 * Test any new feature here
 */
skygearCloud.handler('dev', req => {

}, {
  method: ['GET'],
  userRequired: false
})

let interval = DEVELOPMENT_MODE ? '@every 10s' : '@daily'
skygearCloud.every(interval, distributeScheduledSurveys)

skygearCloud.handler('oauth', handleOAuth, {
  method: ['GET'],
  userRequired: false
})

skygearCloud.handler('command', handleCommand, {
  method: ['POST'],
  userRequired: false
})

skygearCloud.handler('action', handleAction, {
  method: ['POST'],
  userRequired: false
})

skygearCloud.handler('event', handleEvent, {
  method: ['POST'],
  userRequired: false
})
