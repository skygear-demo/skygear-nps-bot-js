const skygear = require('skygear')
const Bot = require('./bot')
const db = require('./db')
const Survey = require('./survey')

class Team {
  constructor (record) {
    this._record = record
  }

  // create
  static get Record () {
    return skygear.Record.extend('team')
  }

  static create (slackID, token) {
    let record = new Team.Record({ slackID, token })
    return db.save(record).then(record => new Team(record))
  }

  // read
  get slackID () {
    return this._record['slackID']
  }

  get token () {
    return this._record['token']
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

  // update
  set token (newValue) {
    this._record['token'] = newValue
  }

  update () {
    return db.save(this._record).then(record => new Team(record))
  }

  // delete

  // misc
  get bot () {
    return new Bot(this.token)
  }

  get members () {
    return this.bot.fetchUsers()
  }

  get scheduledSurvey () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('teamID', this.slackID)
    query.equalTo('isSent', false)
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error(`Mutiple scheduled surveys found for team ${this.slackID}`)
      }
      return result[0] ? new Survey(result[0]) : null
    })
  }

  get distributedSurvey () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('teamID', this.slackID)
    query.equalTo('isSent', true)
    query.equalTo('isClosed', false)
    return db.query(query).then(result => {
      if (result.length > 1) {
        throw new Error(`Mutiple distributed surveys found for team ${this.slackID}`)
      }
      return result[0] ? new Survey(result[0]) : null
    })
  }
}

module.exports = Team
