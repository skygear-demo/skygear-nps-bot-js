'use strict';

const Survey = require('../../models/survey.js');

function scheduleSurvey(frequency) {
  Survey.schedule(frequency);
  return 'OK';
}

module.exports = scheduleSurvey;