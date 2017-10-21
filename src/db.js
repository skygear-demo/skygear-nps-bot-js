const skygearCloud = require('skygear/cloud')

/**
 * @see https://docs.skygear.io/guides/cloud-function/calling-skygear-api/js/#skygear-container
 */
const container = new skygearCloud.CloudCodeContainer()
container.apiKey = skygearCloud.settings.masterKey
container.endPoint = skygearCloud.settings.skygearEndpoint + '/'

module.exports = container.publicDB
