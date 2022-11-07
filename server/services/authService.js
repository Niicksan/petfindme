const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'aGf23FgTahf232HafaGj45hjh435adsfgadFjaD';
const tokenBlacklist = new Set();

async function register(email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Имейл адресът е зает');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword
    });

    return createToke(user);
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

    return createToke(user);
}

async function logout(token) {
    tokenBlacklist.add(token);
}

function createToke({ _id, email }) {
    const payload = {
        _id,
        email
    };

    return {
        _id,
        email,
        accessToken: jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h'
        })
    };
}

function parseToke(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    logout,
    parseToke
};