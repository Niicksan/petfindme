const config = require('../config/config');

module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.origin);
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
};