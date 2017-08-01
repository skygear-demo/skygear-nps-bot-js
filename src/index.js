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
  const querystring = require('querystring')
  const responseWith = require('./util.js').responseWith
  let body = querystring.parse(req.body)

  const skygear = require('skygear')
  const db = require('./db.js')
  const Survey = require('./models/survey.js')
  let survey = await Survey.lastCompleted
  let Reply = skygear.Record.extend('reply')
  db.save(new Reply({
    survey: new skygear.Reference(survey.record),
    score: parseInt(body.score)
  }))
  return responseWith(body)
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
