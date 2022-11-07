const Pet = require("../models/Pet");


async function getLatestPets() {
    return Pet.find({}).sort({ _id: -1 }).limit(12);
}

async function getAllPetsCreatedByUser(userId) {
    return Pet.find({ owner: userId }).lean();
}

async function getAllPetsLikedByUser(userId) {
    return Pet.find({ likedByUsers: userId }).lean();
}

async function getPetById(id) {
    return Pet.findById(id);
}

async function createPet(pet) {
    return Pet.create(pet);
}

async function updatePetById(pet, data) {
    pet.title = data.title;
    pet.status = data.status;
    pet.location = data.location;
    pet.contactName = data.contactName;
    pet.phone = data.phone;
    pet.imageUrl = data.imageUrl;
    pet.description = data.description;
    pet.updatedAt = new Date().toLocaleString('eu-Eu');

    return pet.save();
}

async function deletePetById(id) {
    return Pet.findByIdAndDelete(id);
}

async function addPetToLikedList(petId, userId) {
    const pet = await getPetById(petId);

    pet.likedByUsers.push(userId)
    return pet.save();
}

module.exports = {
    getLatestPets,
    getAllPetsCreatedByUser,
    getAllPetsLikedByUser,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
    addPetToLikedList
}