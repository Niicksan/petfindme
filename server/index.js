require('dotenv').config()
const express = require('express');
const config = require('./config/config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');


async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(config.port, console.log(`REST Service is listening on port ${config.port}! Now it\'s up to you! Open your browser on http://${config.HOST}`));
}

start();