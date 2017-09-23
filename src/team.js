const skygear = require('skygear')
const Bot = require('./bot')
const db = require('./db')
const Survey = require('./survey')

class Team {
  constructor (record) {
    this._record = record
  }

  static get Record () {
    return skygear.Record.extend('team')
  }

  static create (slackID, token) {
    let record = new Team.Record({ slackID, token })
    return db.save(record).then(record => new Team(record))
  }

  static of (slackID) {
    let query = new skygear.Query(Team.Record)
    query.equalTo('slackID', slackID)
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error('Mutiple identical team records found')
      }
      return result[0] ? new Team(result[0]) : null
    })
  }

  get slackID () {
    return this._record['slackID']
  }

  get token () {
    return this._record['token']
  }

  set token (newValue) {
    this._record['token'] = newValue
  }

  update () {
    return db.save(this._record).then(record => new Team(record))
  }

  get bot () {
    return new Bot(this.token)
  }

  get scheduledSurvey () {
    return Survey.scheduledBy(this.slackID)
  }
}

module.exports = Team
