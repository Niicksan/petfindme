const { Schema, model } = require("mongoose");


const contactUsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) }
});

contactUsSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactUsSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactUsSchema.index({ subject: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const ContactUs = model('ContactUs', contactUsSchema);

module.exports = ContactUs;