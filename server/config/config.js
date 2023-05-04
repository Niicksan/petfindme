const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        host: 'localhost',
        port: process.env.PORT || 3030,
        // dbURL: 'mongodb://localhost:27017/petfindme',
        dbURL: 'mongodb://127.0.0.1:27017/petfindme',
        origin: ['http://localhost:4200']
    },
    production: {
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        dbURL: process.env.DATABASE_URL,
        origin: ['https://petfindme.onrender.com/']
    }
};

module.exports = config[env];