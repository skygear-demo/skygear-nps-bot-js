'use strict';

let submitSurvey = (() => {
  var _ref = _asyncToGenerator(function* (surveyID, userID, score) {
    let survey = yield Survey.getByID(surveyID);
    // if survey exist
    if (survey) {
      if (survey.record.is_completed) {
        return 'This survey has already closed.';
      } else {
        let reply = new Reply(null, survey, userID, score);
        yield reply.save();
        let opts = {
          as_user: true
        };
        slack.chat.postMessage(userID, FOLLOW_UP_QUESTION, opts);
        return 'OK';
      }
    } else {
      return `Survey ${surveyID} does not exsist.`;
    }
  });

  return function submitSurvey(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../../models/survey.js');
const Reply = require('../../models/reply.js');
const responseWith = require('../../util.js').responseWith;
const FOLLOW_UP_QUESTION = require('../../config.js').FOLLOW_UP_QUESTION;
const slack = require('../../slack.js');

module.exports = submitSurvey;