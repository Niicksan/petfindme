const homeController = require('express').Router();

const { getLatestPets } = require('../services/petService');
const { parseError } = require('../utils/errorParser');


homeController.get('/latest', async (req, res) => {
    try {
        const latestPets = await getLatestPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = homeController;