const City = require("../models/City");


async function getAllCities() {
    return City.find({}, { _id: 0, __v: 0 });
}

module.exports = {
    getAllCities
}