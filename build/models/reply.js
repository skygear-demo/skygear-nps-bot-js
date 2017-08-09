'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygear = require('skygear');
const DEV_MODE = require('../config.js').DEV_MODE;
const db = require('../db.js');

class Reply {
  constructor(record, survey, user, score) {
    this.record = record || new Reply.Record({
      survey: new skygear.Reference(survey.record),
      user: user,
      score: score,
      reason: ''
    });
  }

  static get Record() {
    let table = DEV_MODE ? 'dev_reply' : 'reply';
    return skygear.Record.extend(table);
  }

  save() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.record = yield db.save(_this.record);
    })();
  }

  static getByID(id) {
    let query = new skygear.Query(Reply.Record);
    query.equalTo('_id', id);
    return db.query(query).then(records => {
      return records[0] ? new Reply(records[0]) : null;
    });
  }

  static getUserNotCompleted(survey, user) {
    let query = new skygear.Query(Reply.Record).equalTo('survey', survey.record._id).equalTo('user', user);
    return db.query(query).then(records => {
      return records[0] ? new Reply(records[0]) : null;
    });
  }
}

module.exports = Reply;