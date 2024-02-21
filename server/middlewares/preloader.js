const { getPetByIdRaw } = require("../services/petService");
const { parseError } = require("../utils/errorParser");


module.exports = () => async (req, res, next) => {
    try {
        res.locals.pet = await getPetByIdRaw(req.params.id);

        if (res.locals.pet == null) {
            throw new Error("Item doesn't exist");
        }
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        return res.status(404).json({
            messageEn: "Item doesn't exist",
            messageBg: "Несъществуващ елемент"
        });
    }

    next();
};