const Team = require('./team')

class User {
  constructor (id, teamID) {
    this.id = id
    this.teamID = teamID
  }

  get isAdmin () {
    return Team.of(this.teamID).then(team => {
      if (team) {
        return team.bot.fetchUser(this.id).then(user => user.is_admin)
      } else {
        throw new Error(`${this.teamID} doest not exist`)
      }
    })
  }
}

module.exports = User
