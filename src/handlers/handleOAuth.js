const { WebClient } = require('@slack/client')
const { SkygearResponse } = require('skygear/cloud')
const Bot = require('../bot')
const { APP_NAME, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config')
const Team = require('../team')
const { extractIDs, log } = require('../util')

/**
 * @see https://api.slack.com/docs/oauth
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 */
module.exports = req => {
  const { code, error } = req.url.query

  if (code && !error) {
    return new WebClient().oauth.access(SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, code).then(async res => {
      const {
        bot: { bot_access_token: token },
        team_id: teamID
      } = log(res)

      const bot = new Bot(token)
      const targetsID = extractIDs(await bot.fetchUsers())

      const team = await Team.of(teamID)
      if (team) {
        team.token = token
        await team.update()
      } else {
        await Team.create(teamID, token, targetsID)
      }

      // redirect to tutorial page
      console.log('asascaxz', `https://${APP_NAME}.skygeario.com/static/tutorial.html`)
      return new SkygearResponse({
        statusCode: 303,
        headers: {
          'Location': `https://${APP_NAME}.skygeario.com/static/tutorial.html`
        }
      })
    })
  } else {
    // redirect to error page
  }
}
