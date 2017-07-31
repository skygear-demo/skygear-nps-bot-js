'use strict';

const skygearCloud = require('skygear/cloud');

exports.responseWith = body => new skygearCloud.SkygearResponse({
  body: JSON.stringify(body),
  // workaround, ['application/json'] may become 'application/json', consult david for more info
  headers: { 'Content-Type': ['application/json'] }
});

// // this is useful when testing async things
// // exports.fakeAsyncOperation = (returnData) => new Promise(resolve => setTimeout(resolve(returnData), 1000))

// exports.average = (scores) => {
//   let count = scores.length
//   let total = scores.reduce((sum, score) => sum + score)
//   return (total / count).toFixed(2)
// }