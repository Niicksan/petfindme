const ContactUs = require("../models/ContactUs");

async function createContact(contact) {
    return ContactUs.create(contact);
}

module.exports = {
    createContact
}