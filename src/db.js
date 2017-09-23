const skygearCloud = require('skygear/cloud')

const container = new skygearCloud.CloudCodeContainer()
container.apiKey = skygearCloud.settings.masterKey
container.endPoint = skygearCloud.settings.skygearEndpoint + '/'

module.exports = container.publicDB
