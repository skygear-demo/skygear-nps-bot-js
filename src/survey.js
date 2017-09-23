const skygear = require('skygear')
const db = require('./db')

class Survey {
  constructor (record) {
    this._record = record
  }

  static get Record () {
    return skygear.Record.extend('survey')
  }

  static create (teamID, excludedUsersID, scheduledDatetime) {
    let isSent = false
    let record = new Survey.Record({ teamID, excludedUsersID, scheduledDatetime, isSent })
    return db.save(record).then(record => new Survey(record))
  }

  static scheduledBy (teamID) {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('teamID', teamID)
    query.equalTo('isSent', false)
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error(`Mutiple scheduled surveys found for team ${teamID}`)
      }
      return result[0] ? new Survey(result[0]) : null
    })
  }
}

module.exports = Survey
