const skygear = require('skygear')
const User = require('./user.js')
const db = require('../db.js')
const slack = require('../slack.js')
const question = require('../config.js').question
const DEV_MODE = require('../config.js').DEV_MODE

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
      attachments: [
        {
          fallback: 'You are unable to fill in survey',
          callback_id: 'submit_survey',
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
      ]
    }
  }

  async save () {
    this.record = await db.save(this.record)
  }

  static async send () {
    let targets = await User.humans
    let survey = new Survey(null, targets.length)
    await survey.save()
    targets.forEach((target) => slack.chat.postMessage(target.id, question, survey.attachment))
    let delay = DEV_MODE ? 1000 * 30 : 1000 * 60 * 20
    setTimeout(survey.completed.bind(survey), delay)
  }

  completed () {
    this.record.is_completed = true
    this.save()
  }
}

module.exports = Survey
