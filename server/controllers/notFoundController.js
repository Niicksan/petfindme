const notFoundController = require('express').Router();

const cityTableImport = require('../utils/cityTableImport');


notFoundController.get('/', (req, res) => {
    cityTableImport();
    res.send('<h1>404 Controller Not Found!</h1>');
});

module.exports = notFoundController;