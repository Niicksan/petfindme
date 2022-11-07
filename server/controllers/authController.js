const authController = require('express').Router();

const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/authService');
const { parseError } = require('../utils/errorParser');


authController.post('/register',
    body('email').isEmail().withMessage('Невалиден имейл!'),
    body('password').isLength({ min: 3 }).withMessage('Паролата трябва да е поне 8 символа!'),
    body('repass').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Въведените пароли не съвпадат!');
        }

        return true;
    }),
    isGuest(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(req.body.email, req.body.password);
            res.json(token);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        res.status(401).json({ message });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;