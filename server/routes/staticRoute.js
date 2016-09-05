module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, reply) => {
      reply.file('./static/dashboard.html');
    }
  }
];
