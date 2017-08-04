'use strict';

const CronJob = require('cron').CronJob;

function stopScheduling() {
  if (global.scheduled instanceof CronJob) {
    global.scheduled.stop();
    global.scheduled = null;
    return 'OK';
  }
  return 'No scheduled survey';
}

module.exports = stopScheduling;