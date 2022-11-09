// TODO Implement Pet Controller
const petController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createPet, getPetById, updatePetById, deletePetById } = require('../services/petService');
const { parseError } = require('../utils/errorParser');
const status = require('../enums/petStatus');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');


petController.post('/create',
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    check('status').isIn(Object.values(status)).withMessage('Please select a valid status'),
    check('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters'),
    check('contactName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    check('phone').isNumeric().withMessage('Please type a valid number'),
    check('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
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
    }
);

petController.get('/:id', preloader(), async (req, res) => {
    const item = res.locals.pet;
    res.json(item);
});

petController.put('/:id',
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    check('status').isIn(Object.values(status)).withMessage('Please select a valid status'),
    check('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters long'),
    check('contactName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('phone').isNumeric().withMessage('Please type a valid number'),
    check('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
    preloader(),
    isOwner(),
    async (req, res) => {
        const pet = res.locals.pet;

        try {
            const result = await updatePetById(pet, req.body);
            res.json(result);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            res.status(400).json({ message });
        }
    }
);

petController.delete('/:id', preloader(), isOwner(), async (req, res) => {
    try {
        await deletePetById(req.params.id);
        res.status(204).json({ message: "Item deleted successfully" });
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

module.exports = petController;