/*
Report of a survey
*/
const skygearCloud = require('skygear/cloud')
const json2csv = require('json2csv')
const Survey = require('./survey.js')
const slack = require('../slack.js')

class Report {
  constructor (survey) {
    if (survey instanceof Survey) {
      this.survey = survey
    } else {
      throw new TypeError()
    }
  }

  get responseRate () {
    let sql = `\
    SELECT COUNT(score) \
    FROM app_npsbot.reply \
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
    let sql = `\
    SELECT AVG(score) \
    FROM app_npsbot.reply \
    WHERE survey='${this.survey.record._id}' \
    `
    return skygearCloud.pool.query(sql).then(res => res.rows[0] && res.rows[0].avg && res.rows[0].avg.toFixed(2))
  }

  get scoreCounts () {
    let sql = `\
    SELECT score, COUNT(score) \
    FROM app_npsbot.reply \
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
          Date: records[i].updatedAt.toDateString(),
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
    let filename = `${this.survey.record.sent_at.toDateString()}-survey-report.csv`
    let opts = {
      title: `Report of survey at ${this.survey.record.sent_at.toDateString()}`,
      content: await this.csv,
      channels: channels
    }
    slack.files.upload(filename, opts)
  }
}

module.exports = Report
