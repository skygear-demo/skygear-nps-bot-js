const WebClient = require('@slack/client').WebClient
const SLACK_BOT_TOKEN = require('./config.js').SLACK_BOT_TOKEN

module.exports = new WebClient(SLACK_BOT_TOKEN)
