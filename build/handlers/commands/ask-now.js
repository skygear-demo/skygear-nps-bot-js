'use strict';

let askNow = (() => {
  var _ref = _asyncToGenerator(function* (exclusion) {
    let survey = yield Survey.waitingReply;
    if (survey) {
      return 'Sorry, only 1 survey is allowed at a time.';
    } else {
      Survey.send(exclusion);
      return 'OK. Survey will be closed after 20 minutes and report will be available afterwards.';
    }
  });

  return function askNow(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Survey = require('../../models/survey.js');

module.exports = askNow;