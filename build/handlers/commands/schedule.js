'use strict';

const responseWith = require('../../util.js').responseWith;

function requestFrequency(exclusion) {
  let body = {
    text: 'Choose a frequency',
    attachments: [{
      fallback: 'You are unable to choose a frequecny',
      callback_id: 'schedule-survey',
      actions: [{
        name: 'frequency',
        text: 'Weekly',
        type: 'button',
        value: JSON.stringify({
          frequency: 'weekly',
          exclusion: exclusion
        })
      }, {
        name: 'frequency',
        text: 'Monthly',
        type: 'button',
        value: JSON.stringify({
          frequency: 'monthly',
          exclusion: exclusion
        })
      }, {
        name: 'frequency',
        text: 'Quarterly',
        type: 'button',
        value: JSON.stringify({
          frequency: 'quarterly',
          exclusion: exclusion
        })
      }]
    }]
  };
  return responseWith(body);
}

module.exports = requestFrequency;