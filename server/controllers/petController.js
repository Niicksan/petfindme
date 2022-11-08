// TODO Implement Pet Controller
const petController = require('express').Router();

const { body, validationResult } = require('express-validator');
const { createPet } = require('../services/petService');
const { parseError } = require('../utils/errorParser');
const status = require('../enums/petStatus');
const { hasUser } = require('../middlewares/guards');


petController.post('/create',
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('status').isIn(Object.values(status)).withMessage('Please select a valid status'),
    body('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters long'),
    body('contactName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('phone').isMobilePhone().withMessage('Please type a valid number'),
    body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
    hasUser(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const pet = {
                ...req.body,
                owner: req.user._id,
            };

            const item = await createPet(pet);
            res.json(item);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    });

module.exports = petController;