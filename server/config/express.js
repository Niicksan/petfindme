const express = require('express');
const cors = require('../middlewares/cors');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');


module.exports = (app) => {
    // Setup the body parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors());
    app.use(session());
    app.use(trimBody('password'));
};