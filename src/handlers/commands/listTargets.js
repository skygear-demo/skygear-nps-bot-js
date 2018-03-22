module.exports = async team => {
  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  let userCount = targets.length
  return `/nps-list-targets: \nNPS survey will be sent to ${userCount} users below:\n${targets.join('\n')}`
}
