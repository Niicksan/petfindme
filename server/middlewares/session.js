const { parseToken } = require("../services/authService");
const { authCookieName } = require("../config/auth-config");


module.exports = () => (req, res, next) => {
    const cookie = req.cookies[authCookieName];
    let token = req.headers['x-authorization'];
    console.log(cookie)
    console.log(token)
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