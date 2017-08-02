'use strict';

let generateLatestReport = (() => {
  var _ref = _asyncToGenerator(function* (destination) {
    let survey = yield Survey.lastCompleted;
    if (survey) {
      // data retrieval
      let sql = `SELECT score, COUNT(score) FROM app_npsbot.reply WHERE survey='${survey.record._id}' GROUP BY score ORDER BY score ASC`;
      // [{"score":3,"count":"2"},{"score":5,"count":"1"}]
      let distribution = yield skygearCloud.pool.query(sql).then(function (res) {
        return res.rows;
      });
      // console.log('distribution', distribution, typeof distribution[0].count)
      // [score1count, score2count, ...]
      let counts = new Array(10).fill(0);
      distribution.forEach(function (d) {
        // count is string
        counts[d.score - 1] = parseInt(d.count);
      });
      sql = `SELECT AVG(score) FROM app_npsbot.reply WHERE survey='${survey.record._id}'`;
      let averageScore = yield skygearCloud.pool.query(sql).then(function (res) {
        return parseFloat(res.rows[0].avg);
      });

      // plot chart
      let numberOfReplies = counts.reduce(function (sum, value) {
        return sum + value;
      }, 0);
      let data = [{
        // labels
        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        y: counts,
        type: 'bar'
      }];
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
        // too slow, do not await
      };plotly.plotAsync(data, options).then(function (msg) {
        // slack will cache each url for 24 hours, below is a hack
        let url = `${msg.url}.jpeg?timestamp=${new Date().getTime()}`;
        let messages = [`Response rate: ${(numberOfReplies / survey.record.targets_count * 100).toFixed(2)}%`, `Average score: ${averageScore.toFixed(2)}`];
        let body = {
          attachments: [{
            fallback: `See the result at ${url}`,
            title: `Score distribution of survey at ${survey.record.sent_at.toDateString()}`,
            title_link: url,
            image_url: url,
            text: messages.join('\n')
          }]
          // not reply directly because it will timeout due to multiple querires and 3rd party plotting
        };unirest.post(destination).headers({ 'Content-Type': 'application/json' }).send(body).end();
      });

      return 'Generating...';
    } else {
      return 'No completed survey';
    }
  });

  return function generateLatestReport(_x) {
    return _ref.apply(this, arguments);
  };
})();

let generateAllTimeReport = (() => {
  var _ref2 = _asyncToGenerator(function* (destination) {
    let hasCompletedSurvey = yield Survey.lastCompleted;
    if (!hasCompletedSurvey) {
      return 'No completed survey';
    }
    // DESC because of limit default 50
    let sql = 'SELECT s._id, s.sent_at, AVG(r.score) FROM app_npsbot.reply r JOIN app_npsbot.survey s ON r.survey=s._id GROUP BY s._id, s.sent_at ORDER BY s.sent_at DESC';
    let records = yield skygearCloud.pool.query(sql).then(function (res) {
      return res.rows;
    });
    // reverse to ASC of latest [limit] survey
    records.reverse();
    // console.log('records', records, typeof records[0].avg)
    let dates = records.map(function (record) {
      return record.sent_at;
    });
    let averageScores = records.map(function (record) {
      return record.avg.toFixed(2);
    });

    let data = [{
      // labels
      x: dates,
      y: averageScores,
      type: 'scatter'
    }];
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
    };
    plotly.plotAsync(data, options).then(function (msg) {
      let url = `${msg.url}.jpeg?timestamp=${new Date().getTime()}`;
      let body = {
        attachments: [{
          fallback: `See the result at ${url}`,
          title: `Average score trend`,
          title_link: url,
          image_url: url
        }]
      };
      unirest.post(destination).headers({ 'Content-Type': 'application/json' }).send(body).end();
    });

    return 'Generating...';
  });

  return function generateAllTimeReport(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygearCloud = require('skygear/cloud');
const unirest = require('unirest');
const Survey = require('../../models/survey.js');
const plotly = require('../../plotly.js');

function generateReport(reportType, destination) {
  switch (reportType) {
    case 'latest':
      return generateLatestReport(destination);
    case 'all-time':
      return generateAllTimeReport(destination);
    default:
      return 'Invalid report type';
  }
}

module.exports = generateReport;