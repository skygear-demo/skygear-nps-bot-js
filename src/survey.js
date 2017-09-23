const skygear = require('skygear')
const db = require('./db')

class Survey {
  constructor (record) {
    this._record = record
  }

  static get Record () {
    return skygear.Record.extend('survey')
  }

  static create (teamID, frequency, excludedUsersID, scheduledDatetime) {
    let isSent = false
    let record = new Survey.Record({ teamID, frequency, excludedUsersID, scheduledDatetime, isSent })
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

  static get readyToSend () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('isSent', false)
    query.lessThanOrEqualTo('scheduledDatetime', new Date())
    return db.query(query).then(result => {
      let records = []
      for (let i = 0; i < result.length; i++) {
        records.push(new Survey(result[i]))
      }
      return records
    })
  }

  get id () {
    return this._record['id']
  }

  get teamID () {
    return this._record['teamID']
  }

  get frequency () {
    return this._record['frequency']
  }

  get excludedUsersID () {
    return this._record['excludedUsersID']
  }

  get scheduledDatetime () {
    return this._record['scheduledDatetime']
  }

  set isSent (flag) {
    this._record['isSent'] = flag
    db.save(this._record)
  }

  get q1 () {
    return {
      text: 'How likely is it you would recommend this company as a place to work?',
      attachments: [
        {
          text: 'Choose a score from 10 (hightest) to 1 (lowest)',
          fallback: 'You are unable to select a score',
          callback_id: 'saveScoreAndRequestReason',
          actions: [
            {
              name: 'scores',
              type: 'select',
              options: [
                {
                  text: '10',
                  value: JSON.stringify({
                    score: 10,
                    surveyID: this.id
                  })
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

module.exports = Survey
