// TODO Implement Pet Controller
const petController = require('express').Router();


petController.post('/create', async (req, res) => {
    try {
        const padst = Object.assign({ _ownerId: req.user._id }, req.body);

        const pet = {
            ...req.body,
            owner: req.user._id,
        };
        console.log(pet);
        return;
        const item = await create(pet);
        res.json(item);
    } catch (error) {
        const message = parseError(error);
        console.log(pet);

        res.status(400).json({ message });
    }
});

module.exports = petController;