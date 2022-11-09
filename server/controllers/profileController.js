const profileController = require('express').Router();

const { getAllPetsCreatedByUser, getAllPetsLikedByUser } = require('../services/petService');
const { parseError } = require('../utils/errorParser');


profileController.get('/', async (req, res) => {
    try {
        const userPets = await getAllPetsCreatedByUser(req.user._id);
        const userLiked = await getAllPetsLikedByUser(req.user._id);

        const user = {
            user: req.user,
            userPets,
            userLiked
        }
        res.json(user);
    } catch (error) {
        const message = parseErroreError(error);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = profileController;