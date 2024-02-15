const User = require("../models/User");


async function getUserInfo(id) {
    return await User.findById(id, { hashedPassword: 0, updatedAt: 0, __v: 0 }).populate('myPets');
}

module.exports = {
    getUserInfo
}