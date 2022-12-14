const express = require('express');
const { parseError } = require('../utils/errorParser');
const cors = require('../middlewares/cors');
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');
const config = require('./config');
const cookieSecret = process.env.COOKIESECRET || 'petfindme';

module.exports = (app) => {
    // Setup the body parser
    app.use(express.json({
        verify: (req, res, buf, encoding) => {
            try {
                JSON.parse(buf);
            } catch (error) {
                const message = parseError(error);
                console.error(message);
                res.status(400).json({ message: "Invalid data format" });
            }
        }
    }));
    app.use(express.urlencoded({ extended: true }));

    // Setup the static files
    app.use('/static', express.static('static'));

    app.use(cors({
        origin: config.origin
    }));
    app.use(cookieParser(cookieSecret));
    app.use(session());
    app.use(trimBody('password'));
};