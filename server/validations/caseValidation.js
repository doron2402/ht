const Joi = require('joi');

module.exports = {
  getOne: {
    params: {
      id: Joi
      .number()
      .min(0)
      .max(100000000)
      .required()
      .description('Fetching a case by a id(number)')
    }
  },
  getAll: {
    request: {
      query: {
        limit: Joi.number()
          .integer()
          .min(1)
          .max(100)
          .default(50),
        offset: Joi.number()
          .integer()
          .min(1)
          .max(100)
          .default(0),
        since: Joi.number()
          .default(null),
        status: Joi.string()
          .valid(['open', 'Open', 'closed', 'Closed'])
          .description('status can be open or closed')
          .default(null),
        category: Joi.string().default(null),
        near: Joi.string().regex(/\d{1,4}[,.]\d{1,4}/).default(null),
        radius: Joi.number()
          .min(1)
          .max(500)
          .default(2)
      }
    },
    response: {
      sample: 50,
      schema: Joi.object({
        code: Joi.string().allow('ok', 'error'),
        body: Joi.object({
          cases: Joi.array().items({
            case_id: Joi.number(),
            address: Joi.string().allow(''),
            opened: Joi.date(),
            location: Joi.object({
              x: Joi.number().allow(''),
              y: Joi.number().allow(''),
            }),
            source: Joi.string().allow(''),
            status_notes: Joi.string().allow(''),
            supervisor_district: Joi.number().allow(''),
            human_address: Joi.string().allow(''),
            needs_recoding: Joi.number().allow(''),
            responsible_agency: Joi.string().allow(''),
            neighborhood: Joi.string().allow(''),
            category: Joi.string().allow(''),
            updated: Joi.date().allow(''),
            status: Joi.string().allow(''),
            status_code: Joi.number().allow(''),
            url: Joi.string().allow('')
          })
        })
      })
    }
  }
};
