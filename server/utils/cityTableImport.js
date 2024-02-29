const City = require("../models/City");

const cities = require('../enums/cities');

module.exports = async () => {
    for (var i = 0; i < cities.length; i++) {
        const city = await City.create({ key: i, name: cities[i] });
        console.log(city);
    }
};
