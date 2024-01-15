// const { parseToken } = require("../services/authService");
// const { sessionCookieName } = require("../config/auth-config");


// module.exports = () => (req, res, next) => {
//     // let token = req.headers['x-authorization'];
//     const cookie = req.cookies[sessionCookieName];
//     console.log(cookie);
//     if (token) {
//         try {
//             const payload = parseToken(token);
//             req.user = payload;
//             req.token = token;
//         } catch (error) {
//             res.clearCookie(sessionCookieName);
//             return res.status(401).json({
//                 messageEn: 'Invalid authorization token',
//                 messageBg: 'Невалиден тоукън за аутентикация'
//             });
//         }
//     }

//     next();
// };