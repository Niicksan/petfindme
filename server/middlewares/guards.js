function hasUser() {
    return (req, res, next) => {
        if (req.session.user) {
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
        if (!req.session.user) {
            next();
        } else {
            res.status(400).json({
                messageEn: 'You are already logged in',
                messageBg: 'Вече сте влезли в профила си'
            });
        }
    };
}

function isOwner() {
    return (req, res, next) => {
        if (req.session.user && res.locals.pet.owner == req.session.user.id) {
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