const catalogController = require('../controllers/catalogController');
const authController = require('../controllers/authController');
const petController = require('../controllers/petController');
const profileController = require('../controllers/profileController');
const contactUsController = require('../controllers/contactUsController');

const { hasUser } = require('../middlewares/guards');
const session = require('../middlewares/session');


module.exports = (app) => {
    // Routes
    app.get('/', (req, res) => {
        res.json({ message: 'REST Service is running' });
    });

    app.use('/api/catalog', catalogController);
    app.use('/api/auth', authController);
    app.use('/api/pet', petController);
    app.use('/api/user/profile', session(), profileController);
    app.use('/api/contact-us', contactUsController);
};