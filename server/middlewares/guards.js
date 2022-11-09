function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.status(400).json({ message: 'You are already logged in' });
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
            return res.status(403).json({ message: "Access denied! You don't have rights to access this page!" });
        }
    };
}

module.exports = {
    hasUser,
    isGuest,
    isOwner
};