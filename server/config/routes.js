const catalogController = require('../controllers/catalogController');
const authController = require('../controllers/authController');
const petController = require('../controllers/petController');
const profileController = require('../controllers/profileController');
const contactUsController = require('../controllers/contactUsController');
const locationController = require('../controllers/locationController');
const notFoundController = require('../controllers/notFoundController');

const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    // Routes
    app.get('/', (req, res) => {
        res.json({ message: 'REST Service is running' });
    });

    app.use('/api/catalog', catalogController);
    app.use('/api/auth', authController);
    app.use('/api/pets', petController);
    app.use('/api/user/profile', hasUser(), profileController);
    app.use('/api/contact-us', contactUsController);
    app.use('/api/location', locationController);
    app.use('*', notFoundController);
};