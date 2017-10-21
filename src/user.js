module.exports = class User {
  constructor (id, team) {
    this.id = id
    this.team = team
  }

  get isAdmin () {
    return this.team.bot.fetchUser(this.id).then(user => user.is_admin)
  }
}
