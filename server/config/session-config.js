const MongoStore = require('connect-mongo');

const config = require('./config');
const { sessionCookieName } = require('./auth-config');

const sessionConfig = {
    name: sessionCookieName,
    secret: config.sessionSecret,
    resave: false, // whether to save the session if it wasn't modified during the request
    rolling: true, // whether to (re-)set cookie on every response
    saveUninitialized: false, // whether to save empty sessions to the store
    cookie: {
        domain: config.domain,
        httpOnly: true,
        secure: config.isSessionSecure,
        maxAge: config.sessionMaxAge,
        sameSite: 'none',
    },
    store: MongoStore.create({
        mongoUrl: config.dbURL
    }),
    proxy: config.isSessionProxyEnabled
}

module.exports = {
    sessionConfig,
}