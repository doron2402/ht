
module.exports = {
    register: require('hapi-node-postgres'),
    options: {
        connectionString: 'postgres://username:password@localhost/database',
        native: true
    }
};
