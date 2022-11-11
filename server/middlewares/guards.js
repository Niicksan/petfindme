function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({
                messageEn: 'Please log in',
                messageBg: 'Влезте в профила си'
            });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({
                messageEn: 'You are already logged in',
                messageBg: 'Вече сте влезли в профила си'
            });
        } else {
            next();
        }
    };
}

function isOwner() {
    return (req, res, next) => {
        if (req.user && res.locals.pet.owner == req.user._id) {
            res.locals.isOwner = true;
            next();
        } else {
            return res.status(403).json({
                messageEn: "Access denied! You don't have rights to access this page!",
                messageBg: "Нямате права да достъпите тази страница!",
            });
        }
    };
}

module.exports = {
    hasUser,
    isGuest,
    isOwner
};