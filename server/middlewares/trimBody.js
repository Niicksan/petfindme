const { parseError } = require("../utils/errorParser");

module.exports = (...excludedKeys) => (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (excludedKeys.includes(key) === false) {
                try {
                    req.body[key] = req.body[key].trim();

                } catch (error) {
                    const message = parseError(error);
                    console.log(message);
                }
            }
        }
    }

    next();
};