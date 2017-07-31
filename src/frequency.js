/*
cron syntax:
https://github.com/node-schedule/node-schedule
https://crontab.guru/
*/
const DEV_MODE = require('./config.js').DEV_MODE

var frequency
if (DEV_MODE) {
  frequency = {
    // every 20s
    weekly: '*/20 * * * * *',
    // every 30s
    monthly: '*/30 * * * * *',
    // every 40s
    quarterly: '*/40 * * * * *'
  }
} else {
  frequency = {
    // at 09:00 on every Friday
    weekly: '0 9 * * 5',
    // at 09:00 on the 1st of each month
    monthly: '0 9 1 * *',
    // at 09:00 on the 1st of every 3 months
    quarterly: '0 9 1 */3 *'
  }
}

module.exports = frequency
