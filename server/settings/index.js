module.exports = {
  PORT: process.env.PORT || 3000,
  mysql: {
    connection: {
      host     : '192.168.99.100',
      port     : '32770',
      user     : 'root',
      password : 'password',
      database : 'hoteltonight',
      charset  : 'utf8'
    },
    casesTable: 'cases'
  }
};
