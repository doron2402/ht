const Hoek = require('hoek');
const pkg = require('../../package.json');

const details = function (request, reply) {
  var a = request.pg.client;
  return reply({
    code: 'ok',
    body: { version: pkg.version, name: pkg.name }
  });
};
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply({ code: 'ok', body: 'works!' })
  },
  {
    method: 'GET',
    path: '/health',
    handler: details
  }, {
    method: 'GET',
    path: '/version',
    handler: details
  }];
Hoek.merge(routes, require('./casesRoute'));
Hoek.merge(routes, require('./staticRoute'));

module.exports = routes;
