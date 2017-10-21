const { WebClient } = require('@slack/client')
const message = require('./message')
const { extractIDs } = require('./util')

/**
 * @see https://api.slack.com/methods
 */
module.exports = class Bot {
  constructor (token) {
    this._client = new WebClient(token)
  }

  // API wrappers
  async fetchUsers () {
    const res = await this._client.users.list()
    // neither a bot or a former member
    return res.members.filter(member => !(member.is_bot || member.name === 'slackbot' || member.deleted))
  }

  async fetchUser (id) {
    const res = await this._client.users.info(id)
    return res.user
  }

  async fetchIMs () {
    const res = await this._client.im.list()
    return res.ims
  }

  sendToChannel (id, message, attachments = []) {
    this._client.chat.postMessage(id, message, { attachments })
  }

  // Derived methods
  async fetchIMsOf (usersID) {
    const ims = await this.fetchIMs()
    return ims.filter(im => usersID.includes(im.user))
  }

  async sendToUsers (usersID, message, attachments = []) {
    const ims = await this.fetchIMsOf(usersID)
    const imsID = extractIDs(ims)
    for (let imID of imsID) {
      this.sendToChannel(imID, message, attachments)
    }
  }

  async distribute (survey) {
    return this.sendToUsers(survey.targetsID, '', [
      {
        title: message.survey.title,
        fallback: 'You are unable to answer the survey',
        callback_id: JSON.stringify({
          callback: 'answerSurvey',
          id: survey.id
        }),
        actions: [
          {
            name: 'choice',
            text: 'Answer',
            type: 'button',
            value: 'Answer',
            style: 'primary'
          },
          {
            name: 'choice',
            text: 'Skip',
            type: 'button',
            value: 'Skip',
            style: 'danger',
            confirm: {
              title: 'Are you sure?',
              text: 'The team needs your opinions to improve!',
              ok_text: 'Maybe next time'
            }
          }
        ]
      }
    ])
  }
}
