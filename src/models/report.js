/*
Report of a survey
*/
const skygearCloud = require('skygear/cloud')
const moment = require('moment-timezone')
const json2csv = require('json2csv')
const Survey = require('./survey.js')
const slack = require('../slack.js')
const TIMEZONE = require('../config.js').TIMEZONE
const DEV_MODE = require('../config.js').DEV_MODE

class Report {
  constructor (survey) {
    if (survey instanceof Survey) {
      this.survey = survey
    } else {
      throw new TypeError()
    }
  }

  get responseRate () {
    let table = DEV_MODE ? 'dev_reply' : 'reply'
    let sql = `\
    SELECT COUNT(score) \
    FROM app_npsbot.${table} \
    WHERE survey='${this.survey.record._id}' \
    `
    return skygearCloud.pool.query(sql).then(res => {
      let numberOfReplies = parseInt(res.rows[0].count)
      if (numberOfReplies === 0) {
        return 0
      }
      return (numberOfReplies / this.survey.record.targets_count * 100).toFixed(2)
    })
  }

  get averageScore () {
    let table = DEV_MODE ? 'dev_reply' : 'reply'
    let sql = `\
    SELECT AVG(score) \
    FROM app_npsbot.${table} \
    WHERE survey='${this.survey.record._id}' \
    `
    return skygearCloud.pool.query(sql).then(res => res.rows[0] && res.rows[0].avg && res.rows[0].avg.toFixed(2))
  }

  get scoreCounts () {
    let table = DEV_MODE ? 'dev_reply' : 'reply'
    let sql = `\
    SELECT score, COUNT(score) \
    FROM app_npsbot.${table} \
    WHERE survey='${this.survey.record._id}' \
    GROUP BY score \
    ORDER BY score ASC \
    `
    return skygearCloud.pool.query(sql).then(res => res.rows.map(row => {
      // workaround, count is strangely as a String
      row.count = parseInt(row.count)
      return row
    }))
    // [{ score: 5, count: 1}]
  }

  get csv () {
    return this.survey.replies.then(records => {
      let replies = []
      for (let i = 0; i < records.length; i++) {
        replies.push({
          Date: moment(records[i].updatedAt).tz(TIMEZONE).format('Do MMM YYYY, HH:mm:ss'),
          Score: records[i].score,
          Reason: records[i].reason
        })
      }
      let csv = json2csv({
        fields: ['Date', 'Score', 'Reason'],
        data: replies
      })

      console.log('csv', csv)
      return csv
    })
  }

  async uploadTo (channels) {
    let datetime = moment(this.survey.record.sent_at).tz(TIMEZONE).format('YYYY-MMM-DD')
    let filename = `${datetime}-survey-report.csv`
    let opts = {
      title: `Report of survey at ${datetime}`,
      content: await this.csv,
      channels: channels
    }
    slack.files.upload(filename, opts)
  }
}

module.exports = Report
