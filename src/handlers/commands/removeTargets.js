const { Set } = require('immutable')
const message = require('../../message')

module.exports = async (team, givenTargets) => {
  const command = message.command['/nps-remove-targets']

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
  const targetsIDToBeRemoved = oldTargetsID.intersect(givenTargetsID) // what are given may not in the list
  if (targetsIDToBeRemoved.size === 0) {
    const targets = team.targetsID.map(targetID => `<@${targetID}>`)
    return `/nps-remove-targets: Nobody removed, here is the list of current targets:\n${targets.join('\n')}`
  }
  team.targetsID = oldTargetsID.subtract(targetsIDToBeRemoved).toJS()
  await team.update()

  const scheduledSurvey = await team.scheduledSurvey
  if (scheduledSurvey) {
    scheduledSurvey.targetsID = team.targetsID
    await scheduledSurvey.update()
  }

  const targetsToBeRemoved = targetsIDToBeRemoved.map(targetIDToBeRemoved => `<@${targetIDToBeRemoved}>`)
  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  return `/nps-remove-targets: ${targetsToBeRemoved.join(', ')} removed, here is the new list effective in next survey:\n${targets.join('\n')}`
}
