const { Schema, model } = require("mongoose");


const citySchema = new Schema({
    key: { type: String, required: true },
    name: { type: String, required: true }
});

citySchema.index({ key: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const City = model('City', citySchema);

module.exports = City;