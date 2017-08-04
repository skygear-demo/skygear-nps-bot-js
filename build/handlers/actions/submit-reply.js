'use strict';

let submitReply = (() => {
  var _ref = _asyncToGenerator(function* (action, replyID, channel, since) {
    console.log('submitReply', action, replyID, channel, since);
    if (action === 'submit') {
      let opts = {
        count: 1,
        oldest: since
      };
      let messages = (yield slack.im.history(channel, opts)).messages;
      if (messages.length < 1) {
        return '';
      }
      let reply = yield Reply.getByID(replyID);
      reply.record.reason = messages[0].text || '';
      reply.save();
    }
    if (global.scheduled) {
      return `Thank you for the reply. Next survey day will be at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}.`;
    }
    return 'Thank you for the reply.';
  });

  return function submitReply(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const slack = require('../../slack.js');
const Reply = require('../../models/reply.js');

module.exports = submitReply;