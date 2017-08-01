'use strict';

const Job = require('node-schedule').Job;

function stopScheduling() {
  if (global.scheduled instanceof Job) {
    global.scheduled.cancel();
    global.scheduled = null;
    return 'OK';
  }
  return 'No scheduled survey';
}

module.exports = stopScheduling;