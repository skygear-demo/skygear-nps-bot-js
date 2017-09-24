const Reply = require('../../reply')
const Survey = require('../../survey')

/**
 * id: 'survey/3b9f8f98-f993-4e1d-81c3-a451e483306b', for skygear.Reference
 * _id: '3b9f8f98-f993-4e1d-81c3-a451e483306b', for query
 */
module.exports = async (userID, { surveyID, score }) => {
  // check survey has closed
  let survey = await Survey.of(surveyID.substring(7)) // id => _id
  if (survey.isClosed) {
    return 'Survey has already closed.'
  }

  // check has replied score
  let reply = await Reply.of(surveyID, userID)
  if (reply) {
    return 'You have already replied the question.'
  }

  // create reply record
  reply = await Reply.create(surveyID, userID, score)
  return {
    text: `Great! Now please tell me a bit more about why you rated ${score}?`,
    attachments: [
      {
        fallback: 'You are unable to skip this question.',
        callback_id: 'completeReply',
        actions: [
          {
            name: 'Skip',
            text: 'Skip',
            type: 'button',
            value: JSON.stringify({
              surveyID
            })
          }
        ]
      }
    ]
  }
}
