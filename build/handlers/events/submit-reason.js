'use strict';

let submitReason = (() => {
  var _ref = _asyncToGenerator(function* (userID, reason) {
    let message;
    let survey = yield Survey.waitingReply;
    if (survey) {
      let reply = yield Reply.getUserNotCompleted(survey, userID);
      if (reply) {
        if (reply.record.reason) {
          message = 'You have already finished the survey.';
        } else {
          reply.record.reason = reason;
          yield reply.save();
          if (global.scheduled) {
            message = `Thank you for the reply. Next survey day will be at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}.`;
          } else {
            message = 'Thank you for the reply.';
          }
        }
      } else {
        message = 'Please sumbit a score first.';
      }
    } else {
      message = 'No survey is opening now.';
    }

    let opts = {
      as_user: true
    };
    slack.chat.postMessage(userID, message, opts);
  });

  return function submitReason(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../../models/survey.js');
const Reply = require('../../models/reply.js');
const slack = require('../../slack.js');

module.exports = submitReason;