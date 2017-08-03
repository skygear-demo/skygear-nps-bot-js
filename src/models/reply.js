const skygear = require('skygear')
const db = require('../db.js')

class Reply {
  constructor (record, survey, score) {
    this.record = record || new Reply.Record({
      survey: new skygear.Reference(survey.record),
      score: score,
      reason: ''
    })
  }

  static get Record () {
    return skygear.Record.extend('reply')
  }

  async save () {
    this.record = await db.save(this.record)
  }

  static getByID (id) {
    let query = new skygear.Query(Reply.Record)
    query.equalTo('_id', id)
    return db.query(query).then((records) => {
      return records[0] ? new Reply(records[0]) : null
    })
  }
}

module.exports = Reply
