const skygear = require('skygear')
const db = require('./db')

module.exports = class Survey {
  constructor (record) {
    this._record = record
  }

  // create
  static get Record () {
    return skygear.Record.extend('survey')
  }

  static async create (teamID, frequency, targetsID) {
    const record = await db.save(new Survey.Record({
      teamID,
      frequency,
      targetsID,
      isSent: false
    }))
    return new Survey(record)
  }

  // read
  get id () {
    return this._record['id']
  }

  get teamID () {
    return this._record['teamID']
  }

  get frequency () {
    return this._record['frequency']
  }

  get targetsID () {
    return this._record['targetsID']
  }

  get isSent () {
    return this._record['isSent']
  }

  // update
  set isSent (newValue) {
    this._record['isSent'] = newValue
  }

  async update () {
    this._record = await db.save(this._record)
  }
}
