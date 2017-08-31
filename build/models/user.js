'use strict';

const slack = require('../slack.js');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.is_admin = user.is_admin;
    this.is_bot = user.is_bot;
    this.deleted = user.deleted;
  }
  static get all() {
    return slack.users.list().then(res => res.members.map(user => new User(user)));
  }
  static get users() {
    return User.all.filter(user => !(user.is_bot || user.name === 'slackbot' || user.deleted));
  }
  static getByID(userID) {
    return slack.users.info(userID).then(res => new User(res.user));
  }
  static filteredUsers(exclusion) {
    let usersToFilter = exclusion.match(/<@U[A-Z0-9]{8}\|[a-z0-9._-]*>/g) || [];
    let usersIDToFilter = usersToFilter.map(user => {
      let result = user.match(/U[A-Z0-9]{8}/);
      return result && result[0];
    });
    return User.users.filter(user => !usersIDToFilter.includes(user.id));
  }
}

module.exports = User;