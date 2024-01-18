const cors = require('cors');
const express = require('express');
const session = require('express-session');
const config = require('./config');
const corsMiddleware = require('../middlewares/corsMiddleware');
const trimBody = require('../middlewares/trimBody');
const { parseError } = require('../utils/errorParser');
const { sessionConfig } = require('./session-config');

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

    // Setup CORS
    app.use(cors({
        origin: config.origin,
        methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }));

    app.use(session(sessionConfig));

    app.use(trimBody('password'));
};