const { Schema, model, Types } = require("mongoose");


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    imageUrl: { type: String, required: true, default: 'default-profile.png' },
    myPets: { type: [Types.ObjectId], ref: 'Pet', default: [] },
    likedPets: { type: [Types.ObjectId], ref: 'Pet', default: [] },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] },
    createdAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) },
    updatedAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;