module.exports = async team => {
  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  return `/nps-list-targets: Users below will receive NPS survey:\n${targets.join('\n')}`
}
