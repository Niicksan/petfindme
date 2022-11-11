const { Schema, model } = require("mongoose");


const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: String, required: true, default: () => (new Date().toLocaleString('eu-Eu')) }
});

contactSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

contactSchema.index({ subject: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const ContactSchema = model('ContactsSchema', contactSchema);

module.exports = ContactSchema;