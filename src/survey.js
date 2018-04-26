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
      distributionDate: new Date(),
      closingDate: new Date(),
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

  get distributionDate () {
    return this._record['distributionDate']
  }

  get closingDate () {
    return this._record['closingDate']
  }

  get isSent () {
    return this._record['isSent']
  }

  get isClosed () {
    return this._record['isClosed']
  }

  static async of (id) {
    const query = new skygear.Query(Survey.Record)
    query.equalTo('_id', id.substr(7)) // remove 'survey/' prefix

    const result = await db.query(query)
    if (result.length > 1) {
      throw new Error(`Mutiple surveys with identical id ${id} found`)
    }
    return result[0] ? new Survey(result[0]) : null
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

  set distributionDate (newValue) {
    this._record['distributionDate'] = newValue
  }

  set closingDate (newValue) {
    this._record['closingDate'] = newValue
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
    query.limit = 999
    query.equalTo('survey', new skygear.Reference(this._record))

    return db.query(query).then(result => {
      let sum = 0
      let count = 0
      let scoresCount = Array(10).fill(0)
      for (let i = 0; i < result.length; i++) {
        const score = result[i].score
        // submitted: number; skipped: null
        if (Number.isInteger(score)) {
          sum += score
          count += 1
          scoresCount[score - 1] += 1
        }
      }

      // calculate NPS score
      let promoters = result.filter(item => { return item.score > 8 })
      let detractors = result.filter(item => { return item.score < 7 })

      let npsScore = 0
      if (result.length > 0) {
        npsScore = ((promoters.length - detractors.length) / result.length) * 100
      }

      // ⚠️ Danger < 0 / ✅ Good 0 -50 / 🎊 Exellent 50 to 75 / 💯 World Class 75 - 100
      let npsRating = ''
      let npsMessage = ''

      if (npsScore < 0) {
        npsRating = '⚠️ '
        npsMessage = '⚠️  Danger - You have more Detractors than Promoters. Companies in this position tend to see very high churn, low internal opinion, few talent referrals, and basically every negative you would associate with low employee loyalty.'
      } else if (npsScore > 0 && npsScore < 50) {
        npsRating = '✅'
        npsMessage = '✅ Good - Your scores lies in the average range of NPS scores, generally means that your company has met the threshold for employee satisfaction. You don’t have an army of Detractors bad mouthing.'
      } else if (npsScore > 50 && npsScore < 75) {
        npsRating = '🎊'
        npsMessage = '🎊 Exellent - The staff is always attentive, everything’s in order, and there are no major issues. Your company is usually under-promise and over-deliver.'
      } else if (npsScore > 75) {
        npsRating = '💯'
        npsMessage = '💯 World Class - Off-the-charts levels of employee loyalty. Keep it up!'
      }

      return {
        submissionCount: count,
        targetsCount: this.targetsID.length,
        responseRate: count / this.targetsID.length, // submitted / targets #,
        averageScore: sum / count, // ignore skipped or silent targets
        npsScore: npsScore,
        npsMessage: npsMessage,
        npsRating: npsRating,
        scoresCount
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
    this.closingDate = new Date()
    return this.update()
  }
}
