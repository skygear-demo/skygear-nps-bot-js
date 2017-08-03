'use strict';

let submitReply = (() => {
  var _ref = _asyncToGenerator(function* (action, replyID, channel, thread) {
    console.log('submitReply', action, replyID, channel, thread);
    if (action === 'next') {
      let messages = (yield slack.im.replies(channel, thread)).messages;
      // remove the parent message
      messages.shift();
      // if answered
      if (messages[0]) {
        let reply = yield Reply.getByID(replyID);
        reply.record.reason = messages[0].text || '';
        reply.save();
      } else {
        return '';
      }
    }
    return nextQuestion();
  });

  return function submitReply(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const slack = require('../../slack.js');
const Reply = require('../../models/reply.js');

function nextQuestion() {
  return 'Thank you for the reply.';
}

module.exports = submitReply;