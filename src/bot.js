const { WebClient } = require('@slack/client')
const { extractIDs } = require('./util')

/**
 * @see https://api.slack.com/methods
 */
class Bot {
  constructor (token) {
    this._client = new WebClient(token)
  }

  fetchUser (id) {
    return this._client.users.info(id).then(res => res.user)
  }

  fetchUsers () {
    // neither a bot or a former employee
    return this._client.users.list().then(res => res.members.filter(member => !(member.is_bot || member.name === 'slackbot' || member.deleted)))
  }

  fetchAdmins () {
    return this.fetchUsers().then(users => users.filter(user => user.is_admin))
  }

  fetchIMs () {
    return this._client.im.list().then(res => res.ims)
  }

  fetchIMOf (userID) {
    return this.fetchIMs().then(ims => ims.find(im => im.user === userID))
  }

  fetchIMsOf (usersID) {
    return this.fetchIMs().then(ims => ims.filter(im => usersID.includes(im.user)))
  }

  async sendToAdmins (message) {
    let adminsID = extractIDs(await this.fetchAdmins())
    let targetsIMID = extractIDs(await this.fetchIMsOf(adminsID))
    targetsIMID.forEach(targetIMID => this._client.chat.postMessage(targetIMID, message))
  }

  async sendToUser (id, message) {
    let targetIMID = await this.fetchIMOf(id)
    this._client.chat.postMessage(targetIMID, message)
  }

  sendToChannel (id, message) {
    this._client.chat.postMessage(id, message)
  }

  async distribute (survey) {
    let targetsID = extractIDs(await this.fetchUsers()).filter(targetID => !survey.excludedUsersID.includes(targetID))
    let targetsIMID = extractIDs(await this.fetchIMsOf(targetsID))
    targetsIMID.forEach(targetIMID => {
      this._client.chat.postMessage(targetIMID, survey.q1.text, {
        attachments: survey.q1.attachments
      })
    })
    survey.isSent = true
    survey.update()
  }
}

module.exports = Bot
