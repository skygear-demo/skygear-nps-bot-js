# Slack app - NPS bot
A Slack bot allow you to create a survey and periodically asks your team members to fill in.

## Demonstrated Skygear Features
This is a Skygear JS Cloud Code demo of the following cloud code features:
* Cloud functions
* Handlers
* Cloud DB

## User Guide

### Available commands
* /create-survey
* /schedule-survey
* /stop-scheduled-survey
* /ask-now
* /generate-report

## Developer Guide

### Recommended Dependencies
* [curl](https://curl.haxx.se/)

### Quick Start

```bash
git clone
npm install
```

```bash
# deploy to skygear, make sure to add your ssh key in portal
npm run deploy
# you may need to wait for a few seconds after deploying
# below command help you to check whether the app has already up and running
curl https://npsbot.skygeario.com/ping
# initialize the schema before start using the database
curl https://npsbot.skygeario.com/init
```

### Technical Details
Skygear Cloud Functions doc:
> https://doc.esdoc.org/github.com/skygeario/skygear-SDK-JS/function/index.html

Skygear Node version: 6.7.0, doc:
> https://nodejs.org/docs/v6.7.0/api/

Slack client:
> https://github.com/slackapi/node-slack-sdk
>
> https://slackapi.github.io/node-slack-sdk

### Troubleshooting
If you see errors in console like `error: Response not OK:  missing_scope`, follow steps below:
1. find out which scopes are required: https://api.slack.com/docs/oauth-scopes
2. add permission at https://api.slack.com/apps/A683YABMW/oauth
3. reinstall the app to the team

### Future Improvement
* testing locally
