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
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy90YXNrcy9yZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJyZW1pbmRVbmNvbXBsZXRlZFJlc3BvbmRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBSZXBseSA9IHJlcXVpcmUoJy4uLy4uL3JlcGx5Jylcbi8vIGNvbnN0IFN1cnZleSA9IHJlcXVpcmUoJy4uLy4uL3N1cnZleScpXG4vLyBjb25zdCBUZWFtID0gcmVxdWlyZSgnLi4vLi4vdGVhbScpXG4vLyBjb25zdCB7IGV4dHJhY3RJRHMgfSA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IGFzeW5jIGZ1bmN0aW9uIHJlbWluZFVuY29tcGxldGVkUmVzcG9uZGVudCAoKSB7XG4vLyAgIGxldCBvcGVuaW5nU3VydmV5cyA9IGF3YWl0IFN1cnZleS5jYW5kaWRhdGVzT2ZEaXN0cmlidXRpb25cbi8vICAgb3BlbmluZ1N1cnZleXMuZm9yRWFjaChhc3luYyBzdXJ2ZXkgPT4ge1xuLy8gICAgIGxldCB0ZWFtID0gYXdhaXQgVGVhbS5vZihzdXJ2ZXkudGVhbUlEKVxuLy8gICAgIGxldCBzdXJ2ZXlUYXJnZXRzSUQgPSBzdXJ2ZXkudGFyZ2V0c0lEXG4vLyAgICAgc3VydmV5VGFyZ2V0c0lELmZvckVhY2goYXN5bmMgdGFyZ2V0SUQgPT4ge1xuLy8gICAgICAgbGV0IHJlcGx5ID0gYXdhaXQgUmVwbHkub2Yoc3VydmV5LmlkLCB0YXJnZXRJRClcbi8vICAgICAgIGlmIChyZXBseSkge1xuLy8gICAgICAgICBpZiAocmVwbHkuaXNDb21wbGV0ZWQpIHtcbi8vICAgICAgICAgICAvLyByZW1pbmQgd2hvIGRpZCBub3Qgc3VibWl0IHJlYXNvblxuLy8gICAgICAgICAgIHRlYW0uYm90LnNlbmRUb1VzZXIodGFyZ2V0SUQsICdIaSEgS2luZGx5IGJlIHJlbWluZGVkIHRvIHByb3ZpZGUgYSByZWFzb24uIE9yIGZlZWwgZnJlZSB0byBza2lwIGl0IGlmIHlvdSB3aXNoLicpXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIC8vIFRPRE86IGlzc3VlICM5XG4vLyAgICAgICAgIC8vIHJlbWluZCB3aG8gZGlkIG5vdCBzdWJtaXQgc2NvcmUsIGkuZS4gaXNUYXJnZXQgJiYgIXJlcGx5XG4vLyAgICAgICAgIHRlYW0uYm90LnNlbmRUb1VzZXIodGFyZ2V0SUQsICdIaSEgS2luZGx5IGJlIHJlbWluZGVkIHRvIHByb3ZpZGUgYSBzY29yZS4nKVxuLy8gICAgICAgfVxuLy8gICAgIH0pXG4vLyAgIH0pXG4vLyB9XG4iXX0=