const skygear = require('skygear')
const db = require('./db')
const Reply = require('./reply')

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
      isSent: false,
      isClosed: false
    }))
    return new Survey(record)
  }

  // read
  get updatedAt () {
    return this._record['updatedAt']
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

  get targetsID () {
    return this._record['targetsID']
  }

  get isSent () {
    return this._record['isSent']
  }

  get isClosed () {
    return this._record['isClosed']
  }

  static get weekly () {
    const query = new skygear.Query(Survey.Record)
    query.equalTo('frequency', 'weekly')
    query.equalTo('isSent', false)
    return db.query(query).then(result => {
      const surveys = []
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]))
      }
      return surveys
    })
  }

  static get monthly () {
    const query = new skygear.Query(Survey.Record)
    query.equalTo('frequency', 'monthly')
    query.equalTo('isSent', false)
    return db.query(query).then(result => {
      const surveys = []
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]))
      }
      return surveys
    })
  }

  static get quarterly () {
    const query = new skygear.Query(Survey.Record)
    query.equalTo('frequency', 'quarterly')
    query.equalTo('isSent', false)
    return db.query(query).then(result => {
      const surveys = []
      for (let i = 0; i < result.length; i++) {
        surveys.push(new Survey(result[i]))
      }
      return surveys
    })
  }

  // update
  set targetsID (newValue) {
    this._record['targetsID'] = newValue
  }

  set isSent (newValue) {
    this._record['isSent'] = newValue
  }

  set isClosed (newValue) {
    this._record['isClosed'] = newValue
  }

  async update () {
    this._record = await db.save(this._record)
  }

  // delete
  delete () {
    db.delete(this._record)
  }

  // misc

  // count both submitted and skipped
  get respondentsID () {
    const query = new skygear.Query(Reply.Record)
    query.equalTo('survey', new skygear.Reference(this._record))

    return db.query(query).then(result => {
      const respondents = []
      for (let i = 0; i < result.length; i++) {
        respondents.push(result[i].userID)
      }
      return respondents
    })
  }

  get stats () {
    const query = new skygear.Query(Reply.Record)
    query.equalTo('survey', new skygear.Reference(this._record))

    return db.query(query).then(result => {
      let sum = 0
      let count = 0
      for (let i = 0; i < result.length; i++) {
        const score = result[i].score
        // submitted: number; skipped: null
        if (Number.isInteger(score)) {
          sum += score
          count += 1
        }
      }
      return {
        submissionCount: count,
        targetsCount: this.targetsID.length,
        responseRate: count / this.targetsID.length, // submitted / targets #,
        averageScore: sum / count // ignore skipped or silent targets
      }
    })
  }

  get replies () {
    const query = new skygear.Query(Reply.Record)
    query.equalTo('survey', new skygear.Reference(this._record))

    return db.query(query).then(result => {
      const replies = []
      for (let i = 0; i < result.length; i++) {
        const reply = result[i]
        if (Number.isInteger(reply.score)) {
          replies.push({
            score: reply.score,
            reason: reply.reason
          })
        }
      }
      return replies
    })
  }

  close () {
    this.isClosed = true
    return this.update()
  }
}
