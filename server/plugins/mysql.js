const mysql = require('hapi-plugin-mysql');
const settings = require('../settings');

const plugin = {
  register: mysql,
  options: settings.mysql.connection
};

module.exports = plugin;
