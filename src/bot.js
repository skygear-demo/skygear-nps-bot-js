const { WebClient } = require('@slack/client')

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
}
