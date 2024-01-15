const User = require('../models/User');
const bcrypt = require('bcrypt');


async function register(email, name, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Имейл адресът е зает');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        name,
        hashedPassword
    });

    return userInfo(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Невалиден имейл или парола');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Невалиден имейл или парола');
    }

    return userInfo(user);
}

function userInfo({ _id, email }) {
    return {
        id: _id.toString(),
        email
    };
}

module.exports = {
    register,
    login,
};