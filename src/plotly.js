const Promise = require('bluebird')
const PLOTLY_USERNAME = require('./config.js').PLOTLY_USERNAME
const PLOTLY_API_KEY = require('./config.js').PLOTLY_API_KEY

const plotly = Promise.promisifyAll(require('plotly'))
Promise.promisifyAll(plotly.prototype)

module.exports = plotly(PLOTLY_USERNAME, PLOTLY_API_KEY)
