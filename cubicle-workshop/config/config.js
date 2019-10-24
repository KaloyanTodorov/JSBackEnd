const env = process.env.NODE_ENV || 'development';
const dbName = 'cube-workshop';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: `mongodb://localhost:27017/${dbName}`
    },
    production: {}
};

module.exports = config[env];