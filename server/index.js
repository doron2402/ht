const settings = require('./settings');
// Node Modules
const Hapi = require('hapi');
const Inert = require('inert');
const lout = require('lout');
const vision = require('vision');
const cron = require('../scripts/cron');
const initDB = require('../scripts/db');

const server = new Hapi.Server();
server.connection({ port: settings.PORT });

// Plugins
const Logging = require('./plugins/logging');
const Swagger = require('./plugins/swagger');
const Mysql = require('./plugins/mysql');

// Routes
const routes = require('./routes');

// Load Hapi Plugins
server.register([vision, Logging, Inert, lout, Swagger, Mysql], (err) => {
  if (err) {
    throw new Error(err);
  }
  server.route(routes);

  // Start server
  server.start((startServerError) => {
    if (startServerError) {
      throw new Error(startServerError);
    }
    // INIT DB
    initDB()
      .then(() => {
        console.log('create table!');
        cron.start();
      })
      .catch(dbErr => {
        console.error(dbErr);
      });
    cron.run(); // Run cron job
    console.log('Server running at:', server.info.uri);
  });
});
