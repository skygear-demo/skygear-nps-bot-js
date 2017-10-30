const message = require('../../message')
const Reply = require('../../reply')
const Survey = require('../../survey')

module.exports = async (surveyID, userID, team, choice, triggerID, responseURL) => {
  const survey = await Survey.of(surveyID)
  if (survey.isClosed) {
    return 'This survey has closed'
  }

  if (choice === 'yes') {
    team.bot.openSurveyDialog(surveyID, triggerID, responseURL)
  } else {
    await Reply.create(surveyID, userID, null, null)
    return message.survey.farewellText
  }
}
