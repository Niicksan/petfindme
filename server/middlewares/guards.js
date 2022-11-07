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

// function isOwner() {
//     return (req, res, next) => {
//         if (req.user && res.locals.book.owner.toString() == req.user._id.toString()) {
//             res.locals.isOwner = true;
//             next();
//         } else {
//             res.redirect('/auth/login');
//         }
//     };
// }

module.exports = {
    hasUser,
    isGuest
};