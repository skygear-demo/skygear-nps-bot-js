'use strict';

/*
The environment variables are created in:
https://portal.skygear.io/app/npsbot/settings/advanced
you may create one yourself when necessary
noted that they are String
*/
exports.APP_IS_ON = process.env.APP_IS_ON === 'true' || false;
exports.DEV_MODE = false; // (process.env.DEV_MODE === 'true') || false
// you should obtain token and allow necessary scopes in Slack:
// https://api.slack.com/apps/A683YABMW/oauth
exports.SLACK_API_TOKEN = process.env.SLACK_API_TOKEN || '';
exports.SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || '';
// for verifying slash commands and interactive messages is issued by Slack
exports.VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN || '';
// https://plot.ly/settings/api
exports.PLOTLY_USERNAME = process.env.PLOTLY_USERNAME || '';
exports.PLOTLY_API_KEY = process.env.PLOTLY_API_KEY || '';
// change this if you don't like
exports.question = 'How likely is it you would recommend this company as a place to work?';
exports.followUpQuestion = 'Tell us a bit more about why you rated that score?';
exports.timezone = 'Asia/Hong_Kong';
// your name in the Slack team
exports.DEVELOPERS = ['zephyrwong', 'davidng'];