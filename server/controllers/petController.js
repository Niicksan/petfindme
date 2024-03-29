const petController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createPet, updatePetById, getPetById, archiveById, activateById, deletePetById, isPetLikedFromUser, addPetToLikedList, removePetFromLikedList } = require('../services/petService');
const { parseError } = require('../utils/errorParser');
const status = require('../enums/petStatus');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');


petController.post('/',
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    check('status').isIn(Object.values(status)).withMessage('Please select a valid status'),
    check('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters'),
    check('geolocation').notEmpty().withMessage('Geolocation must not be empty'),
    check('contactName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    check('phone').matches(/^\+?\d{5,13}$/).withMessage('Please enter a valid phone number'),
    check('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    hasUser(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            if (req.body.imageUrl == '') {
                delete req.body.imageUrl;
            }

            const pet = {
                ...req.body,
                owner: req.session.user.id,
            };

            const item = await createPet(pet);
            return res.json(item);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            return res.status(400).json({ message });
        }
    }
);

petController.get('/:id', preloader(), async (req, res) => {
    try {
        const item = await getPetById(req.params.id);

        return res.json(item);
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        return res.status(400).json({ message });
    }
});

petController.patch('/:id',
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    check('status').isIn(Object.values(status)).withMessage('Please select a valid status'),
    check('location').isLength({ min: 3 }).withMessage('Location must be at least 3 characters long'),
    check('contactName').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('phone').matches(/^\+?\d{5,13}$/).withMessage('Please enter a valid phone number'),
    check('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
    preloader(),
    isOwner(),
    async (req, res) => {
        const pet = res.locals.pet;

        if (req.body.imageUrl == '') {
            req.body.imageUrl = 'default-profile.png';
        }

        try {
            const result = await updatePetById(pet, req.body);
            return res.json(result);
        } catch (error) {
            const message = parseError(error);
            console.log(message);
            return res.status(400).json({ message });
        }
    }
);

petController.patch('/archive/:id', preloader(), isOwner(), async (req, res) => {
    try {
        await archiveById(req.params.id);

        return res.status(200).json({
            messageEn: "Item archived successfully",
            messageBg: "Успешно архивиране!"
        });
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

petController.patch('/activate/:id', preloader(), isOwner(), async (req, res) => {
    try {
        await activateById(req.params.id);

        return res.status(200).json({
            messageEn: "Item activated successfully",
            messageBg: "Успешно активиране!"
        });
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

petController.delete('/:id', preloader(), isOwner(), async (req, res) => {
    try {
        await deletePetById(req.params.id);

        return res.status(200).json({
            messageEn: "Item deleted successfully",
            messageBg: "Успешно изтриване!"
        });
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

petController.get('/favourite/add/:id', preloader(), hasUser(), async (req, res) => {
    try {
        let message = {};
        const isLiked = await isPetLikedFromUser(req.params.id, req.session.user.id);

        if (!isLiked) {
            await addPetToLikedList(req.params.id, req.session.user.id);

            message = {
                messageEn: "Successfully added to favorites",
                messageBg: "Успешно добавяне в Любими!"
            }
        } else {
            message = {
                messageEn: "Item already exists",
                messageBg: "Сигналът вече е добавен в Любими!"
            }
        }

        return res.status(200).json(message);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

petController.get('/favourite/remove/:id', preloader(), hasUser(), async (req, res) => {
    try {
        let message = {};

        const isLiked = await isPetLikedFromUser(req.params.id, req.session.user.id);

        if (isLiked) {
            await removePetFromLikedList(req.params.id, req.session.user.id);

            message = {
                messageEn: "Successfully removed from favorites",
                messageBg: "Успешно премахване от Любими!"
            }

        } else {
            message = {
                messageEn: "Item does't exists",
                messageBg: "сигналът е вече премахнат от Любими!"
            }
        }

        return res.status(200).json(message);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

petController.get('/owner/:id', preloader(), async (req, res) => {
    const isOwner = req.session.user && res.locals.pet.owner == req.session.user.id

    return res.json({ isOwner: isOwner });
});

module.exports = petController;