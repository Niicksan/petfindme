const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const petController = require('../controllers/petController');

const { hasUser } = require('../middlewares/guards');


module.exports = (app) => {
    // Routes
    app.get('/', (req, res) => {
        res.json({ message: 'REST Service is running' });
    });

    app.use('/', homeController);
    app.use('/api/auth', authController);
    app.use('/api/pet', petController);
};