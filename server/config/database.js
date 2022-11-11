const mongoose = require('mongoose');
const config = require('./config');

module.exports = async (app) => {
    try {
        await mongoose.connect(config.dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error initializing database');
        console.error(error.message);
        process.exit(1);
    }
};