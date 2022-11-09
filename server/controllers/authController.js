const authController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const { register, login, logout } = require('../services/authService');
const { parseError } = require('../utils/errorParser');


authController.post('/register',
    check('email').isEmail().withMessage('Невалиден имейл!'),
    check('password').isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        .escape(),
    check('repass').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Въведените пароли не съвпадат!');
        }

        return true;
    }),

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

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        res.status(401).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

module.exports = authController;