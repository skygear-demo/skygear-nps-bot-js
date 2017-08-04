const skygearCloud = require('skygear/cloud')

const container = new skygearCloud.CloudCodeContainer()
container.apiKey = skygearCloud.settings.masterKey
container.endPoint = skygearCloud.settings.skygearEndpoint + '/'

// workaround, .db.public may become .publicDB, consult david for more info
module.exports = container.db.public
