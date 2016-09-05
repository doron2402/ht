const settings = require('./settings');
// Node Modules
const Hapi = require('hapi');
const Inert = require('inert');
const lout = require('lout');
const vision = require('vision');

const server = new Hapi.Server();
server.connection({ port: settings.PORT });

// Plugins
const Logging = require('./plugins/logging');
const Swagger = require('./plugins/swagger');
const Pg = require('./plugins/postgres');

// Load Hapi Plugins
server.register([vision, Logging, Inert, lout, Swagger, Pg]);

// Routes
const routes = require('./routes');

server.route(routes);

// Start server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
