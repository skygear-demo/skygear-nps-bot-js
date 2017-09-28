const moment = require('moment')
const skygear = require('skygear')
const { DEVELOPMENT_MODE } = require('./config')
const db = require('./db')
const Reply = require('./reply')

class Survey {
  constructor (record) {
    this._record = record
  }

  // create
  static get Record () {
    return skygear.Record.extend('survey')
  }

  static create (teamID, frequency, targetsID, scheduledDatetime) {
    let record = new Survey.Record({
      teamID,
      frequency,
      targetsID,
      scheduledDatetime,
      isSent: false,
      isClosed: false
    })
    return db.save(record).then(record => new Survey(record))
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

  get scheduledDatetime () {
    return this._record['scheduledDatetime']
  }

  get isSent () {
    return this._record['isSent']
  }

  get isClosed () {
    return this._record['isClosed']
  }

  static of (_id) {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('_id', _id)
    return db.query(query).then(result => result[0] ? new Survey(result[0]) : null)
  }

  static get candidatesOfDistribution () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('isSent', false)
    // survey.scheduledDatetime == now, time to send
    // survey.scheduledDatetime < now, delayed
    // now < survey.scheduledDatetime, not yet
    // we want delayed or time to send
    // survey.scheduleDate <= now
    // 'scheduleDate' is at lhs
    query.lessThanOrEqualTo('scheduledDatetime', new Date())
    return db.query(query).then(result => {
      let records = []
      for (let i = 0; i < result.length; i++) {
        records.push(new Survey(result[i]))
      }
      return records
    })
  }

  static get candidatesOfClosing () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('isSent', true)
    query.equalTo('isClosed', false)
    // survey.endTime == now, time to close
    // survey.endTime < now, delayed
    // now < survey.endTime, not yet
    // 'scheduleDate' is at lhs
    // we want delayed or time to close
    // survey.endTime <= now
    // survey.scheduledDatetime + 48 hours <= now
    // survey.scheduledDatetime <= now - 48 hours
    // 'scheduleDate' is at lhs
    if (DEVELOPMENT_MODE) {
      query.lessThanOrEqualTo('scheduledDatetime', moment().subtract(30, 's').toDate())
    } else {
      query.lessThanOrEqualTo('scheduledDatetime', moment().subtract(48, 'h').toDate())
    }
    return db.query(query).then(result => {
      let records = []
      for (let i = 0; i < result.length; i++) {
        records.push(new Survey(result[i]))
      }
      return records
    })
  }

  static get distributed () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('isSent', true)
    query.equalTo('isClosed', false)
    return db.query(query).then(result => {
      let records = []
      for (let i = 0; i < result.length; i++) {
        records.push(new Survey(result[i]))
      }
      return records
    })
  }

  // update

  set isSent (newValue) {
    this._record['isSent'] = newValue
  }

  set isClosed (newValue) {
    this._record['isClosed'] = newValue
  }

  update () {
    return db.save(this._record).then(record => new Survey(record))
  }

  // delete

  delete () {
    return db.delete(this._record)
  }

  // misc
  get replies () {
    return Reply.of(this.id)
  }
}

module.exports = Survey
