const skygear = require('skygear')
const CronJob = require('cron').CronJob
const User = require('./user.js')
const Reply = require('./reply.js')
const db = require('../db.js')
const slack = require('../slack.js')
const question = require('../config.js').question
const DEV_MODE = require('../config.js').DEV_MODE
const timezone = require('../config.js').timezone
const frequency = require('../frequency.js')

class Survey {
  constructor (record, targetsCount) {
    this.record = record || new Survey.Record({
      sent_at: new Date(),
      targets_count: targetsCount,
      is_completed: false
    })
  }

  static get Record () {
    return skygear.Record.extend('survey')
  }

  get attachment () {
    return {
      fallback: 'You are unable to fill in survey',
      callback_id: 'submit-survey',
      actions: [
        {
          name: this.record._id,
          text: 'Choose a score...',
          type: 'select',
          options: [
            {
              text: '10 (Highest)',
              value: '10'
            },
            {
              text: '9',
              value: '9'
            },
            {
              text: '8',
              value: '8'
            },
            {
              text: '7',
              value: '7'
            },
            {
              text: '6',
              value: '6'
            },
            {
              text: '5',
              value: '5'
            },
            {
              text: '4',
              value: '4'
            },
            {
              text: '2',
              value: '2'
            },
            {
              text: '1 (Lowest)',
              value: '1'
            }
          ]
        }
      ]
    }
  }

  get replies () {
    if (this.record.is_completed) {
      let query = new skygear.Query(Reply.Record)
      query.equalTo('survey', this.record._id)
      return db.query(query)// .map(record => new Reply(record))
    } else {
      throw new Error('The survey has not yet closed.')
    }
  }

  async save () {
    this.record = await db.save(this.record)
  }

  static getByID (id) {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('_id', id)
    return db.query(query).then((records) => {
      return records[0] ? new Survey(records[0]) : null
    })
  }

  static get lastCompleted () {
    let query = new skygear.Query(Survey.Record)
    query.equalTo('is_completed', true)
    query.addDescending('_updated_at')
    return db.query(query).then((records) => {
      return records[0] ? new Survey(records[0]) : null
    })
  }

  static async send () {
    let targets = await User.humans
    let survey = new Survey(null, targets.length)
    await survey.save()
    let opts = {
      as_user: true,
      attachments: [
        survey.attachment
      ]
    }
    targets.forEach((target) => slack.chat.postMessage(target.id, question, opts))
    let delay = DEV_MODE ? 1000 * 30 : 1000 * 60 * 20
    setTimeout(survey.completed.bind(survey), delay)
  }

  completed () {
    this.record.is_completed = true
    this.save()
  }

  static schedule (f) {
    let cron = frequency[f]
    if (cron) {
      if (global.scheduled instanceof CronJob) {
        global.scheduled.stop()
      }
      global.scheduled = new CronJob(cron, Survey.send, null, true, timezone)
    } else {
      throw new Error('cron not defined')
    }
  }
}

module.exports = Survey
