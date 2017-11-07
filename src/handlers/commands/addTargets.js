const { Set } = require('immutable')
const message = require('../../message')

module.exports = async (team, givenTargets) => {
  const command = message.command['/nps-add-targets']

  if (givenTargets.length === 0) {
    return command.usage
  }

  let givenTargetsID = []
  for (let givenTarget of givenTargets) {
    /**
     * @see https://regex101.com/
     */
    const parse = givenTarget.match(/<@([U|W][0-9A-Z]{8})\|?.*>/)
    if (parse) {
      givenTargetsID.push(parse[1])
    } else {
      return command.error.invalidUser(givenTarget) + '\n' + command.usage
    }
  }
  givenTargetsID = Set(givenTargetsID) // remove duplicates

  const oldTargetsID = Set(team.targetsID)
  const newTargetsID = givenTargetsID.subtract(oldTargetsID) // what are given may be already in the list
  if (newTargetsID.size === 0) {
    const targets = team.targetsID.map(targetID => `<@${targetID}>`)
    return `Nobody added, here is the list of current targets:\n${targets.join('\n')}`
  }
  team.targetsID = oldTargetsID.concat(newTargetsID).toJS()
  await team.update()

  const scheduledSurvey = await team.scheduledSurvey
  if (scheduledSurvey) {
    scheduledSurvey.targetsID = team.targetsID
    await scheduledSurvey.update()
  }

  const newTargets = newTargetsID.map(newTargetID => `<@${newTargetID}>`)
  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  return `${newTargets.join(', ')} added, here is the new list effective in next survey:\n${targets.join('\n')}`
}
