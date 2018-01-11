const skygearCloud = require('skygear/cloud')
const { DEVELOPMENT_MODE, DEVELOPMENT_TEAM_ID } = require('./config')
const { handleOAuth, handleCommand, handleAction, handleEvent } = require('./handlers')
const { distributeScheduledSurvey } = require('./tasks')

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

skygearCloud.every(DEVELOPMENT_MODE && DEVELOPMENT_TEAM_ID ? '@every 30s' : '@weekly', distributeScheduledSurvey.bind(null, 'weekly'))

skygearCloud.every(DEVELOPMENT_MODE && DEVELOPMENT_TEAM_ID ? '@every 40s' : '@monthly', distributeScheduledSurvey.bind(null, 'monthly'))

skygearCloud.every(DEVELOPMENT_MODE && DEVELOPMENT_TEAM_ID ? '@every 50s' : '0 0 0 1 */3 *', distributeScheduledSurvey.bind(null, 'quarterly'))
