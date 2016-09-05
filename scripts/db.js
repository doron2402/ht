const config = require('../server/settings');
const knex = require('knex');

module.exports = (() =>
  knex({
    client: 'mysql',
    connection: config.mysql.connection
  })
)();
