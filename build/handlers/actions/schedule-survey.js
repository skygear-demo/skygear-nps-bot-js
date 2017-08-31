'use strict';

const Survey = require('../../models/survey.js');

function scheduleSurvey(options) {
  let { frequency, exclusion } = JSON.parse(options);
  exclusion = exclusion.replace(/&lt;/g, '<');
  exclusion = exclusion.replace(/&gt;/g, '>');
  Survey.schedule(frequency, exclusion);
  return `OK. Next survey is scheduled at ${global.scheduled && global.scheduled.nextDate().format('Do MMM YYYY, HH:mm:ss')}. Survey will be closed after 20 minutes and report will be available afterwards.`;
}

module.exports = scheduleSurvey;