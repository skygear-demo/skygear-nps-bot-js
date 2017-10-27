const message = require('../../message')
const Reply = require('../../reply')

module.exports = async (surveyID, userID, team, choice, triggerID, responseURL) => {
  if (choice === 'yes') {
    team.bot.openSurveyDialog(surveyID, triggerID, responseURL)
  } else {
    await Reply.create(surveyID, userID, null, null)
    return message.survey.farewellText
  }
}
