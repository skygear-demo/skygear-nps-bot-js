'use strict';

let isAdmin = (() => {
  var _ref = _asyncToGenerator(function* (userID) {
    let admins = yield User.admins;
    return admins.some(function (admin) {
      return admin.id === userID;
    });
  });

  return function isAdmin(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const querystring = require('querystring');
const VERIFICATION_TOKEN = require('../config.js').VERIFICATION_TOKEN;
const User = require('../models/user.js');

const askNow = require('./commands/ask-now.js');
const requestFrequency = require('./commands/schedule.js');

const scheduleSurvey = require('./actions/schedule-survey.js');

function isFromSlack(request) {
  return request.token === VERIFICATION_TOKEN;
}

exports.handleCommand = (() => {
  var _ref2 = _asyncToGenerator(function* (req) {
    let request = querystring.parse(req.body);
    console.log(request);
    if (isFromSlack(request)) {
      if (yield isAdmin(request.user_id)) {
        switch (request.command) {
          case '/ask-now':
            return askNow();
          case '/schedule':
            return requestFrequency();
          default:
            return 'Invalid command';
        }
      } else {
        return 'Permission denied.';
      }
    } else {
      return 'Unknown source';
    }
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.handleAction = req => {
  let request = querystring.parse(req.body);
  request = JSON.parse(request.payload);
  console.log(request);
  if (isFromSlack(request)) {
    switch (request.callback_id) {
      // case 'distribute-survey':
      //   return distributeSurvey(request.actions[0].selected_options[0].value)
      case 'schedule-survey':
        return scheduleSurvey(request.actions[0].value);
      default:
        return 'Invalid action';
    }
  } else {
    return 'Unknown source';
  }
};