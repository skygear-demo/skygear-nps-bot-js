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

  async sendToUser (id, message) {
    let targetIMID = (await this.fetchIMOf(id)).id
    this._client.chat.postMessage(targetIMID, message)
  }

  async sendToUsers (ids, message) {
    let targetsIMID = extractIDs(await this.fetchIMsOf(ids))
    targetsIMID.forEach(targetIMID => {
      this._client.chat.postMessage(targetIMID, message)
    })
  }

  async sendToAdmins (message) {
    let adminsID = extractIDs(await this.fetchAdmins())
    this.sendToUsers(adminsID, message)
  }

  sendToChannel (id, message) {
    this._client.chat.postMessage(id, message)
  }

  async distribute (survey) {
    let targetsIMID = extractIDs(await this.fetchIMsOf(survey.targetsID))
    targetsIMID.forEach(targetIMID => {
      this._client.chat.postMessage(targetIMID, 'How likely is it you would recommend this company as a place to work', {
        attachments: [
          {
            text: 'Choose a score from 10 (hightest) to 1 (lowest)',
            fallback: 'You are unable to select a score',
            callback_id: 'saveScoreAndRequestReason',
            actions: [
              {
                name: 'scores',
                type: 'select',
                options: [
                  {
                    text: '10',
                    value: JSON.stringify({
                      score: 10,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '9',
                    value: JSON.stringify({
                      score: 9,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '8',
                    value: JSON.stringify({
                      score: 8,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '7',
                    value: JSON.stringify({
                      score: 7,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '6',
                    value: JSON.stringify({
                      score: 6,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '5',
                    value: JSON.stringify({
                      score: 5,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '4',
                    value: JSON.stringify({
                      score: 4,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '3',
                    value: JSON.stringify({
                      score: 3,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '2',
                    value: JSON.stringify({
                      score: 2,
                      surveyID: survey.id
                    })
                  },
                  {
                    text: '1',
                    value: JSON.stringify({
                      score: 1,
                      surveyID: survey.id
                    })
                  }
                ]
              }
            ]
          }
        ]
      })
    })
    survey.isSent = true
    survey.update()
  }
}

module.exports = Bot
