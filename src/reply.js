const skygear = require('skygear')
const db = require('./db')

module.exports = class Reply {
  constructor (record) {
    this._record = record
  }

  // create
  static get Record () {
    return skygear.Record.extend('reply')
  }

  static async create (surveyID, userID, score, reason) {
    const record = await db.save(new Reply.Record({
      survey: new skygear.Reference({
        id: surveyID
      }),
      userID,
      score,
      reason
    }))
    return new Reply(record)
  }
}
