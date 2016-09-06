module.exports = {
  PORT: process.env.PORT || 3000,
  mysql: {
    connection: {
      host: process.env.DB_HOST || '192.168.99.100',
      port: process.env.DB_PORT || '32771',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: 'hoteltonight',
      charset: 'utf8',
      connectionLimit: 10
    },
    casesTable: 'cases'
  },
  url: 'http://data.sfgov.org/resource/vw6y-z8j6.json' // url to fetch data from
};
