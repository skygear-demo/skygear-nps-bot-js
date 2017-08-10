'use strict';

let generateLatestReport = (() => {
  var _ref = _asyncToGenerator(function* (destination, user) {
    let survey = yield Survey.lastCompleted;
    if (survey) {
      let report = new Report(survey);

      let responseRate = yield report.responseRate;
      if (responseRate === 0) {
        return 'Response rate: 0%';
      }
      let averageScore = yield report.averageScore;

      let y = new Array(10).fill(0);
      let scoreCounts = yield report.scoreCounts;
      scoreCounts.forEach(function (sc) {
        y[sc.score - 1] = sc.count;
      });

      // plot chart
      let data = [{
        // labels
        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        y: y,
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
      };plotly.plotAsync(data, options).then(function ({ url }) {
        // slack will cache each url for 24 hours, below is a workaround
        url = `${url}.jpeg?timestamp=${new Date().getTime()}`;
        let messages = [`Response rate: ${responseRate}%`, `Average score: ${averageScore}`, `<${url}|Score distribution>:`];
        let body = {
          attachments: [{
            fallback: `Fail to show you the report.`,
            title: `Stats of the latest completed survey at ${moment(survey.record.sent_at).tz(TIMEZONE).format('Do MMM YYYY, HH:mm:ss')}`,
            image_url: url,
            text: messages.join('\n')
          }]
          // multiple querires and 3rd party plotting take time
          // not reply directly to avoid timeout error in Slack
        };unirest.post(destination).headers({ 'Content-Type': 'application/json' }).send(body).end(function () {
          return report.uploadTo(user);
        });
      });
      return 'Generating...';
    } else {
      return 'No completed survey';
    }
  });

  return function generateLatestReport(_x, _x2) {
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
    let sql;
    if (DEV_MODE) {
      sql = 'SELECT s._id, s.sent_at, AVG(r.score) FROM app_npsbot.dev_reply r JOIN app_npsbot.dev_survey s ON r.survey=s._id GROUP BY s._id, s.sent_at ORDER BY s.sent_at DESC';
    } else {
      sql = 'SELECT s._id, s.sent_at, AVG(r.score) FROM app_npsbot.reply r JOIN app_npsbot.survey s ON r.survey=s._id GROUP BY s._id, s.sent_at ORDER BY s.sent_at DESC';
    }
    let records = yield skygearCloud.pool.query(sql).then(function (res) {
      return res.rows;
    });
    // reverse to ASC of latest [limit] survey
    records.reverse();
    // console.log('records', records, typeof records[0].avg)
    let dates = records.map(function (record) {
      return moment(record.sent_at).tz(TIMEZONE).format('Do MMM YYYY, HH:mm:ss');
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

  return function generateAllTimeReport(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const skygearCloud = require('skygear/cloud');
const moment = require('moment-timezone');
const unirest = require('unirest');
const Survey = require('../../models/survey.js');
const Report = require('../../models/report.js');
const plotly = require('../../plotly.js');
const TIMEZONE = require('../../config.js').TIMEZONE;
const DEV_MODE = require('../../config.js').DEV_MODE;

function generateReport(reportType, destination, user) {
  switch (reportType) {
    case 'latest':
      return generateLatestReport(destination, user);
    case 'all-time':
      return generateAllTimeReport(destination);
    default:
      return 'Invalid report type';
  }
}

module.exports = generateReport;