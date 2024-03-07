const { createProxyMiddleware } = require('http-proxy-middleware');

import { apiProxy } from './env';

module.exports = function (app) {
    app.use(
        [
            '/api',
            '/static/images'
        ],
        createProxyMiddleware({
            target: apiProxy,
            changeOrigin: true,
            secure: false,
        }),
    );
};