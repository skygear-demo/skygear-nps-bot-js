# Npsbot - Skygear JS Cloud Code Demo
A Slack app for team admins to measure employees happiness quickly and easily.

## Demonstrated Skygear Features
* Cloud Database
    * container: SDK-like query
    * pool: raw SQL query
* Cloud Functions
    * JavaScript
    * HTTP Endpoint

## User Guide

### Installation
Check out [Installation Guide](./doc/installation.md)

### Available commands
* /nps-ask-now
* /nps-schedule
* /nps-stop-scheduling
* /nps-generate-report

## Developer Guide

### Dependencies
* @slack/client
* node-cron
* plotly
* unirest
* json2csv
* moment-timezone

### Quick Start

```bash
git clone
npm install
git remote add skygear <your-cloud-func-url>
# modify constants in /src/config.js if necessary, such as DEVELOPERS as the backdoor of admin identity check 
```

```bash
# deploy to skygear, make sure to add your ssh key in portal
npm run deploy
# you may need to wait for a minute after deploying
# below command help you to check whether the app has already up and running
curl https://npsbot.skygeario.com/ping
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
