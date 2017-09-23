const { WebClient } = require('@slack/client')
const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } = require('../config')
const Bot = require('../bot')
const Team = require('../team')
const { log } = require('../util')

let welcomingMessage = `\
Greeting from NPS bot! I am helpful for collecting NPS of your team members.
• To schedule a survey: /nps-schedule-survey
• To remove the scheduled survey: /nps-remove-scheduled-survey
• To see this help message again: /nps-help
`
let errorMessage = 'Installation error. Please report to the development team.'

async function createOrUpdateTeam (teamID, token) {
  let team = await Team.of(teamID)
  if (team) {
    team.token = token
    return team.update()
  } else {
    return Team.create(teamID, token)
  }
}

/**
 * @see https://api.slack.com/docs/oauth
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 */
module.exports = req => {
  let { code, error } = req.url.query
  if (!error) {
    new WebClient().oauth.access(SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, code).then(async res => {
      let {
        bot: { bot_access_token: token },
        team_id: teamID,
        user_id: userID
      } = log(res)
      let bot = new Bot(token)
      try {
        await createOrUpdateTeam(teamID, token)
        bot.sendToAdmins(welcomingMessage)
      } catch (error) {
        bot.sendToUser(userID, errorMessage)
      }
    })
  }
}
