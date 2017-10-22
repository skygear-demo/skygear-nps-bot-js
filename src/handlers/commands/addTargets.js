const { Set } = require('immutable')
const message = require('../../message')

module.exports = async (team, givenTargets) => {
  const command = message.command['/nps-add-targets']

  if (givenTargets.length === 0) {
    return command.usage
  }

  const givenTargetsID = []
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

  team.targetsID = team.targetsID.concat(givenTargetsID)
  team.targetsID = Set(team.targetsID).toJS() // remove duplicates
  await team.update()

  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  return `Users below will receive NPS survey:\n${targets.join('\n')}`
}
