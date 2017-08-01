'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const db = require('../db.js');

class Reply {
  constructor(record, survey, score) {
    this.record = record || new Reply.Record({
      survey: new skygear.Reference(survey.record),
      score: score
    });
  }

  static get Record() {
    return skygear.Record.extend('reply');
  }

  save() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.record = yield db.save(_this.record);
    })();
  }
}

module.exports = Reply;