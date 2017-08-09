'use strict';

const Survey = require('../../models/survey.js');

function scheduleSurvey(frequency) {
  Survey.schedule(frequency);
  return `OK. Next survey is scheduled at ${global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}. Survey will be closed after 20 minutes and report will be available afterwards.`;
}

module.exports = scheduleSurvey;