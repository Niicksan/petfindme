const catalogController = require('express').Router();

const { getAllPetsBySearch, getLatestPets, getLostPets, getFoundPets, getAdoptionPets } = require('../services/petService');
const { parseError } = require('../utils/errorParser');


catalogController.get('/search', async (req, res) => {
    try {
        const search = req.query.search;
        const location = req.query.location;
        const status = req.query.status;
        const page = req.query.page

        const pets = await getAllPetsBySearch(search, location, status, page);
        return res.json(pets);
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        return res.status(400).json({ message });
    }
});

catalogController.get('/latest', async (req, res) => {
    try {
        const latestPets = await getLatestPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

catalogController.get('/lost', async (req, res) => {
    try {
        const latestPets = await getLostPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

catalogController.get('/found', async (req, res) => {
    try {
        const latestPets = await getFoundPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

catalogController.get('/adoption', async (req, res) => {
    try {
        const latestPets = await getAdoptionPets();

        res.json(latestPets);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

module.exports = catalogController;