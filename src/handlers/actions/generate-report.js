const skygearCloud = require('skygear/cloud')
const unirest = require('unirest')
const Survey = require('../../models/survey.js')
const Report = require('../../models/report.js')
const plotly = require('../../plotly.js')

async function generateLatestReport (destination, user) {
  let survey = await Survey.lastCompleted
  if (survey) {
    let report = new Report(survey)

    let responseRate = await report.responseRate
    if (responseRate === 0) {
      return 'Response rate: 0%'
    }
    let averageScore = await report.averageScore

    let y = new Array(10).fill(0)
    let scoreCounts = await report.scoreCounts
    scoreCounts.forEach(sc => {
      y[sc.score - 1] = sc.count
    })

    // plot chart
    let data = [
      {
        // labels
        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        y: y,
        type: 'bar'
      }
    ]
    let options = {
      layout: {
        title: 'Score distribution of last completed survey',
        xaxis: {
          title: 'Score',
          dtick: 1,
          tick0: 0
        },
        yaxis: {
          title: 'Count',
          dtick: 1,
          tick0: 0
        }
      },
      filename: 'basic-bar',
      fileopt: 'overwrite'
    }
    // too slow, do not await
    plotly.plotAsync(data, options).then(({ url }) => {
      // slack will cache each url for 24 hours, below is a workaround
      url = `${url}.jpeg?timestamp=${new Date().getTime()}`
      let messages = [
        `Response rate: ${responseRate}%`,
        `Average score: ${averageScore}`,
        `<${url}|Score distribution>:`
      ]
      let body = {
        attachments: [
          {
            fallback: `Fail to show you the report.`,
            title: 'Stats of the latest completed survey',
            image_url: url,
            text: messages.join('\n')
          }
        ]
      }
      // multiple querires and 3rd party plotting take time
      // not reply directly to avoid timeout error in Slack
      unirest.post(destination)
        .headers({'Content-Type': 'application/json'})
        .send(body)
        .end(() => report.uploadTo(user))
    })
    return 'Generating...'
  } else {
    return 'No completed survey'
  }
}

async function generateAllTimeReport (destination) {
  let hasCompletedSurvey = await Survey.lastCompleted
  if (!hasCompletedSurvey) {
    return 'No completed survey'
  }
  // DESC because of limit default 50
  let sql = 'SELECT s._id, s.sent_at, AVG(r.score) FROM app_npsbot.reply r JOIN app_npsbot.survey s ON r.survey=s._id GROUP BY s._id, s.sent_at ORDER BY s.sent_at DESC'
  let records = await skygearCloud.pool.query(sql).then(res => res.rows)
  // reverse to ASC of latest [limit] survey
  records.reverse()
  // console.log('records', records, typeof records[0].avg)
  let dates = records.map(record => record.sent_at)
  let averageScores = records.map(record => record.avg.toFixed(2))

  let data = [
    {
      // labels
      x: dates,
      y: averageScores,
      type: 'scatter'
    }
  ]
  let options = {
    layout: {
      title: 'Average score trend',
      xaxis: {
        title: 'Date of survey distributed'
      },
      yaxis: {
        title: 'Average score',
        range: [1, 10],
        dtick: 1
      }
    },
    filename: 'all-time-report',
    fileopt: 'overwrite'
  }
  plotly.plotAsync(data, options).then((msg) => {
    let url = `${msg.url}.jpeg?timestamp=${new Date().getTime()}`
    let body = {
      attachments: [
        {
          fallback: `See the result at ${url}`,
          title: `Average score trend`,
          title_link: url,
          image_url: url
        }
      ]
    }
    unirest.post(destination)
      .headers({'Content-Type': 'application/json'})
      .send(body)
      .end()
  })

  return 'Generating...'
}

function generateReport (reportType, destination, user) {
  switch (reportType) {
    case 'latest':
      return generateLatestReport(destination, user)
    case 'all-time':
      return generateAllTimeReport(destination)
    default:
      return 'Invalid report type'
  }
}

module.exports = generateReport
