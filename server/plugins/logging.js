const Good = require('good');

const Logging = {
  register: Good,
  options: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
};
module.exports = Logging;
