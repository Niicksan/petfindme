const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        sessionSecret: 'petfindme',
        isSessionSecure: false,
        sessionMaxAge: 24 * (60 * 60 * 1000), // 1 day of inactivity
        isSessionProxyEnabled: false,
        host: 'localhost',
        port: process.env.PORT || 3030,
        // dbURL: 'mongodb://localhost:27017/petfindme',
        dbURL: 'mongodb://127.0.0.1:27017/petfindme',
        domain: 'localhost',
        origin: ['http://localhost:3000']
    },
    production: {
        sessionSecret: process.env.SESSION_SECRET,
        isSessionSecure: !!process.env.IS_SESSION_SECURE,
        sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE),
        isSessionProxyEnabled: !!process.env.IS_SESSION_PROXY_ENABLED,
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        dbURL: process.env.DATABASE_URL,
        domain: process.env.DOMAIN,
        origin: ['https://petfindme.onrender.com']
    }
};

module.exports = config[env];