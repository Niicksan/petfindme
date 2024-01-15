const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        sessionSecret: 'petfindme',
        isSessionSecure: false,
        sessionMaxAge: 24 * (60 * 60 * 1000), // 1 day of inactivity
        host: 'localhost',
        port: process.env.PORT || 3030,
        // dbURL: 'mongodb://localhost:27017/petfindme',
        dbURL: 'mongodb://127.0.0.1:27017/petfindme',
        origin: ['http://localhost:4200']
    },
    production: {
        sessionSecret: process.env.SESSIONSECRET,
        isSessionSecure: true,
        sessionMaxAge: 30 * 60 * 1000, // 30 minutes of inactivity
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        dbURL: process.env.DATABASE_URL,
        origin: ['https://petfindme.onrender.com/']
    }
};

module.exports = config[env];