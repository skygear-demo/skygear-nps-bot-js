'use strict';

let reply = (() => {
  var _ref = _asyncToGenerator(function* (user, replyText) {
    let survey = yield Survey.waitingReply;
    if (survey) {
      let reply = yield Reply.getUserNotCompleted(survey, user);
      if (reply) {
        if (reply.record.reason) {
          return 'You have already finished the survey.';
        } else {
          reply.record.reason = replyText;
          reply.save();
          if (global.scheduled) {
            return `Thank you for the reply. Next survey day will be at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}.`;
          }
          return 'Thank you for the reply.';
        }
      } else {
        return 'Please sumbit a score first.';
      }
    } else {
      return 'No survey is opening now.';
    }
  });

  return function reply(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../../models/survey.js');
const Reply = require('../../models/reply.js');

module.exports = reply;