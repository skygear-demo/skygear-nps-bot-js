'use strict';

/*
The environment variables are created in:
https://portal.skygear.io/app/npsbot/settings/advanced
you may create one yourself when necessary
noted that they are String
*/
exports.APP_IS_ON = process.env.APP_IS_ON === 'true' || false;
exports.DEV_MODE = process.env.DEV_MODE === 'true' || false;
// you should obtain token and allow necessary scopes in Slack:
// https://api.slack.com/apps/A683YABMW/oauth
exports.TOKEN = process.env.SLACK_API_TOKEN || '';
// for verifying slash commands and interactive messages is issued by Slack
exports.VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN || '';
// change this if you don't like
exports.question = 'To what extend you feel happy in the team?';