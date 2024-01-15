const notFoundController = require('express').Router();


notFoundController.get('/', (req, res) => {
    res.send('<h1>404 Controller Not Found!</h1>');
});

module.exports = notFoundController;