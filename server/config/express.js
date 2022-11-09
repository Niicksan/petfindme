const express = require('express');
const { parseError } = require('../utils/errorParser');
const cors = require('../middlewares/cors');
const trimBody = require('../middlewares/trimBody');
const session = require('../middlewares/session');


module.exports = (app) => {
    // Setup the body parser
    app.use(express.json({
        verify: (req, res, buf, encoding) => {
            try {
                JSON.parse(buf);
            } catch (error) {
                const message = parseError(error);
                console.log(message);
                res.status(400).json({ message: "Invalid data format" });
            }
        }
    }));
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());
    app.use(trimBody('password'));
    app.use(session());
};