'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
App's entry point
mainly for global definition
*/
const skygearCloud = require('skygear/cloud');
const APP_IS_ON = require('./config.js').APP_IS_ON;
const handleCommand = require('./handlers').handleCommand;
const handleAction = require('./handlers').handleAction;

if (APP_IS_ON) {
  global.scheduled = null;

  // handle slash command
  skygearCloud.handler('command', handleCommand, {
    method: ['POST'],
    userRequired: false
  });

  // handle interactive message
  skygearCloud.handler('action', handleAction, {
    method: ['POST'],
    userRequired: false
  });
}

/*
quickly test any functions
*/
skygearCloud.handler('test', (() => {
  var _ref = _asyncToGenerator(function* (req) {
    const responseWith = require('./util.js').responseWith;
    const User = require('./models/user.js');
    return responseWith((yield User.humans));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})(), {
  method: ['GET'],
  userRequired: false
});

/*
quick check of availability
curl https://npsbot.skygeario.com/ping
*/
skygearCloud.handler('ping', req => 'Hello, world\n', {
  method: ['GET'],
  userRequired: false
});