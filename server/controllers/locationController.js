const locationController = require('express').Router();

const { getAllCities } = require('../services/locationService');
const { parseError } = require('../utils/errorParser');


locationController.get('/cities', async (req, res) => {
    try {
        const cities = await getAllCities();

        res.json(cities);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        res.status(400).json({ message });
    }
});

module.exports = locationController;
