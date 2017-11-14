const skygear = require('skygear')
const db = require('./db')
const Reply = require('./reply')

module.exports = class User {
  constructor (id, team) {
    this.id = id
    this.team = team
  }

  get isAdmin () {
    return this.team.bot.fetchUser(this.id).then(user => user.is_admin)
  }

  async hasReplied (surveyID) {
    const query = new skygear.Query(Reply.Record)
    query.equalTo('survey', new skygear.Reference({
      id: surveyID
    }))
    query.equalTo('userID', this.id)

    const result = await db.query(query)
    if (result.length > 1) {
      throw new Error(`Mutiple replies of user ${this.id} in the same survey ${surveyID}`)
    }
    return result[0]
  }
}
