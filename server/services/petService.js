const Pet = require("../models/Pet");


async function getLatestPets() {
    return Pet.find({}, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getLostPets() {
    return Pet.find({ status: 'lost' }, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getFoundPets() {
    return Pet.find({ status: 'found' }, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getAdoptionPets() {
    return Pet.find({ status: 'adoption' }, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getAllPetsCreatedByUser(userId) {
    return Pet.find({ owner: userId }, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 });
}

async function getAllPetsLikedByUser(userId) {
    return Pet.find({ likedByUsers: userId }, { owner: 0, createdAt: 0, likedByUsers: 0, __v: 0 });
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
    pet.description = data.description;
    pet.updatedAt = new Date().toLocaleString('eu-Eu');

    if (data.imageUrl) {
        pet.imageUrl = data.imageUrl;
    }

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
    getLostPets,
    getFoundPets,
    getAdoptionPets,
    getAllPetsCreatedByUser,
    getAllPetsLikedByUser,
    getPetById,
    createPet,
    updatePetById,
    deletePetById,
    addPetToLikedList
}