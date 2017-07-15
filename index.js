const skygearCloud = require('skygear/cloud');

// quick test of availability
skygearCloud.handler('test', function(req) {
  return "Hello, world!\n";
}, {
  method: ['GET'],
  userRequired: false
});
