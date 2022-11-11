const homeController = require('express').Router();

const { getLatestPets, getLostPets, getFoundPets, getAdoptionPets } = require('../services/petService');
const { parseError } = require('../utils/errorParser');


homeController.get('/latest', async (req, res) => {
    try {
        const latestPets = await getLatestPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

homeController.get('/lost', async (req, res) => {
    try {
        const latestPets = await getLostPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

homeController.get('/found', async (req, res) => {
    try {
        const latestPets = await getFoundPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

homeController.get('/adoption', async (req, res) => {
    try {
        const latestPets = await getAdoptionPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

module.exports = homeController;