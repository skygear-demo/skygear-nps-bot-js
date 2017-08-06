# Slack app - NPS bot
A Slack bot for team admins to measure employees happiness quick and easy.

## Demonstrated Skygear Features
* Cloud Database
    * container: SDK-like query
    * pool: SQL query
* Cloud Functions
    * JavaScript
    * HTTP Endpoint

## User Guide

### Installation
Plotly:
1. create an account

Slack:
1. create a Slack App for your team
2. enable bot user, always show online
3. enable Interactive Messages, Request URL set to <your-skygear-endpoint>/action
4. enable Slash Commands, create following commands, each Request URL set to <your-skygear-endpoint>/command
    * /nps-ask-now
    * /nps-schedule
    * /nps-stop-scheduling
    * /nps-generate-report
5. Permit following scopes:
    * chat:write:bot
    * chat:write:user
    * files:write:user
    * im:history
    * users:read

Skygear
1. create a Skygear account
2. create a Skygear App
3. Add environment variables in Settings/Advanced
    * `APP_IS_ON`: true
    * `DEV_MODE`: false
    * `SLACK_API_TOKEN`: find it in Slack App
    * `SLACK_BOT_TOKEN`: find it in Slack App
    * `VERIFICATION_TOKEN`: find it in Slack App
    * `PLOTLY_USERNAME`: find it in Plotly
    * `PLOTLY_API_KEY`: find it in Plotly
4. set up your ssh key
5. clone this project
6. update remote repo to your skygear cloud function endpoint
7. push to server

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
