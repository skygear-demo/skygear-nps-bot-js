'use strict';

/*
cron syntax:
https://github.com/kelektiv/node-cron
https://crontab.guru/
*/
const DEV_MODE = require('./config.js').DEV_MODE;

var frequency;
if (DEV_MODE) {
  frequency = {
    // every 10s
    weekly: '*/10 * * * * *',
    // every 20s
    monthly: '*/20 * * * * *',
    // every 30s
    quarterly: '*/30 * * * * *'
  };
} else {
  frequency = {
    // at 09:00 on every Friday
    weekly: '0 0 9 * * 5',
    // at 09:00 on the 1st of each month
    monthly: '0 0 9 1 * *',
    // at 09:00 on the 1st of every 3 months
    quarterly: '0 0 9 1 */3 *'
  };
}

module.exports = frequency;