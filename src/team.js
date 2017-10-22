const skygear = require('skygear')
const Bot = require('./bot')
const db = require('./db')

module.exports = class Team {
  constructor (record) {
    this._record = record
  }

  // create
  static get Record () {
    return skygear.Record.extend('team')
  }

  static async create (slackID, token, targetsID) {
    const record = await db.save(new Team.Record({ slackID, token, targetsID }))
    return new Team(record)
  }

  // read
  get slackID () {
    return this._record['slackID']
  }

  get token () {
    return this._record['token']
  }

  get targetsID () {
    return this._record['targetsID']
  }

  static async of (slackID) {
    const query = new skygear.Query(Team.Record)
    query.equalTo('slackID', slackID)

    const result = await db.query(query)
    if (result.length > 1) {
      throw new Error(`Mutiple teams with identical slackID ${slackID} found`)
    }
    return result[0] ? new Team(result[0]) : null
  }

  // update
  set token (newValue) {
    this._record['token'] = newValue
  }

  set targetsID (newValue) {
    this._record['targetsID'] = newValue
  }

  async update () {
    this._record = await db.save(this._record)
  }

  // misc
  get bot () {
    return new Bot(this.token)
  }

  get members () {
    return this.bot.fetchUsers()
  }
}
