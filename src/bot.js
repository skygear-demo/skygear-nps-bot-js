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

  async openSurveyDialog (surveyID, triggerId, responseURL) {
    let dialog = {
      callback_id: JSON.stringify({
        callback: 'submitSurvey',
        id: surveyID,
        url: responseURL
      }),
      title: message.survey.title,
      elements: [
        {
          label: 'Score',
          name: 'score',
          type: 'select',
          hint: message.survey.questions[0],
          options: [
            {
              label: '10 (most recommended)',
              value: '10'
            },
            {
              label: '9',
              value: '9'
            },
            {
              label: '8',
              value: '8'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '7',
              value: '7'
            },
            {
              label: '6',
              value: '6'
            },
            {
              label: '5',
              value: '5'
            },
            {
              label: '4',
              value: '4'
            },
            {
              label: '3',
              value: '3'
            },
            {
              label: '2',
              value: '2'
            },
            {
              label: '1 (least recommened)',
              value: '1'
            }
          ]
        },
        {
          label: 'Reason',
          name: 'reason',
          type: 'textarea',
          optional: true,
          max_length: 500,
          hint: message.survey.questions[1]
        }
      ]
    }
    return this._client.dialog.open(JSON.stringify(dialog), triggerId)
  }
}
