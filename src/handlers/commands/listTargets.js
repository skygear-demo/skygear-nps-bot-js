module.exports = async team => {
  const targets = team.targetsID.map(targetID => `<@${targetID}>`)
  return `Users below will receive NPS survey:\n${targets.join('\n')}`
}
