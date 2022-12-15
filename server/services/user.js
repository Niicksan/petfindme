const User = require("../models/User");


async function getUserInfo(id) {
    return User.findById(id, { email: 1, name: 1, imageUrl: 1 });
}

module.exports = {
    getUserInfo
}