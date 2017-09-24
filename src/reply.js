const skygear = require('skygear')
const db = require('./db')

class Reply {
  constructor (record) {
    this._record = record
  }

  static get Record () {
    return skygear.Record.extend('reply')
  }

  static async create (surveyID, userID, score) {
    let record = new Reply.Record({
      survey: new skygear.Reference({
        id: surveyID
      }),
      respondent: userID,
      score,
      reason: '',
      isCompleted: false
    })
    return db.save(record).then(record => new Reply(record))
  }

  get respondent () {
    return this._record['respondent']
  }

  get isCompleted () {
    return this._record['isCompleted']
  }

  static of (surveyID, userID) {
    let query = new skygear.Query(Reply.Record)
    query.equalTo('survey', new skygear.Reference({
      id: surveyID
    }))
    if (userID) {
      query.equalTo('respondent', userID)
      return db.query(query).then(result => result[0] ? new Reply(result[0]) : null)
    } else {
      return db.query(query).then(result => {
        let records = []
        for (let i = 0; i < result.length; i++) {
          records.push(new Reply(result[i]))
        }
        return records
      })
    }
  }

  set reason (newValue) {
    this._record['reason'] = newValue
  }

  set isCompleted (newValue) {
    this._record['isCompleted'] = newValue
  }

  update () {
    return db.save(this._record).then(record => new Reply(record))
  }
}

module.exports = Reply
