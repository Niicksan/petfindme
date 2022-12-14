const { parseToken } = require("../services/authService");
const { authCookieName } = require("../config/auth-config");


module.exports = () => (req, res, next) => {
    //const token = req.cookies[authCookieName];
    let token = req.headers['x-authorization'];

    //token = token.slice(7);

    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (error) {
            res.clearCookie(authCookieName);
            return res.status(401).json({
                messageEn: 'Invalid authorization token',
                messageBg: 'Невалиден тоукън за аутентикация'
            });
        }
    }

    next();
};