const User = require('../models/User');
const TokenBlacklist = require('../models/tokenBlacklistModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authCookieName } = require('../config/auth-config');


const JWT_SECRET = 'aGf23FgTahf232HafaGj45hjh435adsfgadFjaD';
const tokenBlacklist = new Set();

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

    return createToken(user);
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

    return createToken(user);
}

async function logout(token) {
    await TokenBlacklist.create({ token });
}

function createToken({ _id, email }) {
    const payload = {
        _id,
        email
    };

    return {
        _id,
        email,
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        authToken: jwt.sign(payload, JWT_SECRET, {
            // expiresIn: '1h'
        })
    };
}

function parseToken(token) {
    if (tokenBlacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }

    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    logout,
    parseToken
};