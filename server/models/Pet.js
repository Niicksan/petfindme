const { Schema, model, Types } = require("mongoose");


const petSchema = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    contactName: { type: String, required: true },
    phone: { type: String, required: true },
    imageUrl: { type: String, required: true, default: 'default-pet.png' },
    description: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, required: true, default: true },
    likedByUsers: { type: [Types.ObjectId], ref: 'User', default: [] },
    archivedAt: { type: String, required: true, default: null },
    createdAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) },
    updatedAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) },
});

petSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

petSchema.index({ status: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

petSchema.index({ location: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

petSchema.index({ description: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

petSchema.index({ owner: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

petSchema.index({ isActive: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Pet = model('Pet', petSchema);

module.exports = Pet;