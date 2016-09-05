const Joi = require('joi');

module.exports = [
    // Get single users
  {
    method: 'GET',
    path: '/case/{id}',
    handler: (request, reply) =>
      reply({ code: 'ok',
        body: { case: { id: 1 } }
      }),
    config: {
      description: 'Get Case By Id',
      notes: 'This end point will get an Id (int) and will fetch it from the database (postgresql)',
      tags: ['api', 'cases', 'case', 'get', 'getbyid', 'single'],
      validate: {
        params: {
          id: Joi
            .number()
            .min(0)
            .max(100000000)
            .required()
            .description('Fetching a case by a id(number)')
        }
      }
    }
  },
  // Get all users
  {
    method: 'GET',
    path: '/cases',
    handler: (request, reply) =>
      reply({
        code: 'ok',
        body: {
          cases: [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
          ]
        }
      }),
    config: {
      description: 'Get all cases',
      notes: 'Get all cases',
      tags: ['api', 'cases', 'case', 'get', 'getall', 'multiple'],
      validate: {},
      response: {
        sample: 50,
        schema: Joi.object({
          code: Joi.string().allow('ok', 'error'),
          body: Joi.object({
            users: Joi.array().items({
              id: Joi.number(),
              name: Joi.string()
            })
          })
        })
      }
    }
  }
];
