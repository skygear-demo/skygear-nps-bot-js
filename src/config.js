/*
The environment variables are created in:
https://portal.skygear.io/app/npsbot/settings/advanced
you may create one yourself when necessary
noted that they are String
*/
const DEVELOPMENT_MODE = (process.env.DEVELOPMENT_MODE === 'true') || false
const SLACK_BOT_TOKEN = DEVELOPMENT_MODE ? process.env.TEST_BOT_TOKEN : process.env.SLACK_BOT_TOKEN
const VERIFICATION_TOKEN = DEVELOPMENT_MODE ? process.env.TEST_VERIFICATION_TOKEN : process.env.VERIFICATION_TOKEN

exports.APP_NAME = process.env.APP_NAME || ''
exports.APP_IS_ON = (process.env.APP_IS_ON === 'true') || false
exports.DEV_MODE = DEVELOPMENT_MODE
// you should obtain token and allow necessary scopes in Slack:
// https://api.slack.com/apps/A683YABMW/oauth
exports.SLACK_BOT_TOKEN = SLACK_BOT_TOKEN || ''
// for verifying slash commands and interactive messages is issued by Slack
exports.VERIFICATION_TOKEN = VERIFICATION_TOKEN || ''
// https://plot.ly/settings/api
exports.PLOTLY_USERNAME = process.env.PLOTLY_USERNAME || ''
exports.PLOTLY_API_KEY = process.env.PLOTLY_API_KEY || ''
// change this if you don't like
exports.QUESTION = 'How likely is it you would recommend this company as a place to work?'
exports.FOLLOW_UP_QUESTION = 'Tell us a bit more about why you rated that score?'
exports.TIMEZONE = 'Asia/Hong_Kong'
// your name in the Slack team
exports.DEVELOPERS = ['zephyrwong', 'davidng']
