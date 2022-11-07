const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');


const port = 3030;

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(port, console.log(`REST Service is listening on port ${port}! Now it\'s up to you...`));
}

start();