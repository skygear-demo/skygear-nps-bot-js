'use strict';

const WebClient = require('@slack/client').WebClient;
const TOKEN = require('./config.js').TOKEN;

module.exports = new WebClient(TOKEN);