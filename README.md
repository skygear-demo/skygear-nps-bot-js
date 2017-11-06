# NPS Bot - Skygear JS Cloud Code Demo
A Slack app for team admins to measure members' happiness quickly and easily.

## Demonstrated Skygear Features
* Cloud Functions
  * JavaScript
  * HTTP Endpoint
  * Scheduled Task

## User Guide
[Installation](https://npsbottest.skygeario.com/static/)

[Tutorial](https://npsbottest.skygeario.com/static/tutorial.html)

## Developer Guide
* npsbottest: development server
* npsbot: production server

### Dependencies
using yarn instead of npm
* @slack/client
* axios
* json2csv
* moment

## Quick Start
```bash
git clone https://github.com/skygear-demo/skygear-nps-bot-js.git
yarn install
git remote add skygear-dev ssh://git@git.skygeario.com/npsbottest.git
```

```bash
# deploy to skygear, make sure that you have submitted your ssh key in portal
yarn run deploy:dev
# you may need to wait for a minute after deploying
# below command help you to check whether the app has already up and running
curl https://npsbot.skygeario.com/ping
```