const message = require('../../message')
const Reply = require('../../reply')
const Survey = require('../../survey')

module.exports = async (surveyID, user, team, choice, triggerID, responseURL) => {
  const survey = await Survey.of(surveyID)
  if (survey.isClosed) {
    return 'This survey has closed'
  }

  if (await user.hasReplied(surveyID)) {
    return 'You have already answered'
  }

  if (choice === 'yes') {
    team.bot.openSurveyDialog(surveyID, triggerID, responseURL)
  } else {
    await Reply.create(surveyID, user.id, null, null)
    return message.survey.farewellText
  }
}
