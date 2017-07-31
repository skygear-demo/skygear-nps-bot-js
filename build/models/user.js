'use strict';

const slack = require('../slack.js');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.is_admin = user.is_admin;
    this.is_bot = user.is_bot;
  }
  static get all() {
    return slack.users.list().then(res => res.members.map(user => new User(user)));
  }
  static get humans() {
    return User.all.filter(user => !(user.is_bot || user.name === 'slackbot'));
  }
  static get admins() {
    return User.all.filter(user => user.is_admin);
  }
}

module.exports = User;