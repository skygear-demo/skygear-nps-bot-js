// const Reply = require('../../reply')
// const Survey = require('../../survey')
// const Team = require('../../team')
// const { extractIDs } = require('../../util')

// module.exports = async function remindUncompletedRespondent () {
//   let openingSurveys = await Survey.candidatesOfDistribution
//   openingSurveys.forEach(async survey => {
//     let team = await Team.of(survey.teamID)
//     let surveyTargetsID = survey.targetsID
//     surveyTargetsID.forEach(async targetID => {
//       let reply = await Reply.of(survey.id, targetID)
//       if (reply) {
//         if (reply.isCompleted) {
//           // remind who did not submit reason
//           team.bot.sendToUser(targetID, 'Hi! Kindly be reminded to provide a reason. Or feel free to skip it if you wish.')
//         }
//       } else {
//         // TODO: issue #9
//         // remind who did not submit score, i.e. isTarget && !reply
//         team.bot.sendToUser(targetID, 'Hi! Kindly be reminded to provide a score.')
//       }
//     })
//   })
// }
