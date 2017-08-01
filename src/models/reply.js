const skygear = require('skygear')
const db = require('../db.js')

class Reply {
  constructor (record, survey, score) {
    this.record = record || new Reply.Record({
      survey: new skygear.Reference(survey.record),
      score: score
    })
  }

  static get Record () {
    return skygear.Record.extend('reply')
  }

  async save () {
    this.record = await db.save(this.record)
  }
}

module.exports = Reply
