'use strict';

const skygearCloud = require('skygear/cloud');

const container = new skygearCloud.CloudCodeContainer();
container.apiKey = skygearCloud.settings.masterKey;
container.endPoint = skygearCloud.settings.skygearEndpoint + '/';
container.asUserId = 'admin';

// workaround, .db.public may become .publicDB, consult david for more info
module.exports = container.db.public;