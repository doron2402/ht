const caseCtrl = require('../controllers/caseCtrl');
const caseValidation = require('../validations/caseValidation');

module.exports = [
  {
    // Get single users
    method: 'GET',
    path: '/case/{id}',
    handler: caseCtrl.getOne,
    config: {
      description: 'Get Case By Id',
      notes: 'This end point will get an Id (int) and will fetch it from the database (postgresql)',
      tags: ['api', 'cases', 'case', 'get', 'getbyid', 'single'],
      validate: caseValidation.getOne
    }
  },
  // Get all users
  {
    method: 'GET',
    path: '/cases',
    handler: caseCtrl.getAll,
    config: {
      description: 'Get all cases',
      notes: 'Get all cases',
      tags: ['api', 'cases', 'case', 'get', 'getall', 'multiple'],
      validate: caseValidation.getAll.request
    }
  }
];
