const profileController = require('express').Router();

const { getAllPetsCreatedByUser, getAllPetsLikedByUser } = require('../services/petService');
const { getUserInfo } = require('../services/userService');
const { parseError } = require('../utils/errorParser');


profileController.get('/user-info', async (req, res) => {
    try {
        const user = await getUserInfo(req.session.user.id);
        const userPets = await getAllPetsCreatedByUser(req.session.user.id);
        const userLikedPets = await getAllPetsLikedByUser(req.session.user.id);

        userPets.map(pet => {
            user.myPets.push(pet);
        });

        userLikedPets.map(pet => {
            user.likedPets.push(pet);
        });

        res.json(user);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

profileController.get('/user-pets', async (req, res) => {
    try {
        const userPets = await getAllPetsCreatedByUser(req.session.user.id);

        res.json(userPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

profileController.get('/user-liked', async (req, res) => {
    try {
        const userLiked = await getAllPetsLikedByUser(req.session.user.id);

        res.json(userLiked);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

module.exports = profileController;