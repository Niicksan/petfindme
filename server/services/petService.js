const Pet = require("../models/Pet");


async function getLatestPets() {
    return Pet.find({}, { contactName: 0, phone: 0, owner: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getLostPets() {
    return Pet.find({ status: 'Изгубено' }, { contactName: 0, phone: 0, owner: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getFoundPets() {
    return Pet.find({ status: 'Намерено' }, { contactName: 0, phone: 0, owner: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getAdoptionPets() {
    return Pet.find({ status: 'За осиновяване' }, { contactName: 0, phone: 0, owner: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 }).limit(12);
}

async function getAllPetsCreatedByUser(userId) {
    return Pet.find({ owner: userId }, { owner: 0, contactName: 0, phone: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
}

async function getAllPetsLikedByUser(userId) {
    return Pet.find({ likedByUsers: userId }, { owner: 0, contactName: 0, phone: 0, description: 0, likedByUsers: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
}

async function getPetById(id) {
    return Pet.findById(id, { owner: 0, likedByUsers: 0, updatedAt: 0, __v: 0 });
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

    pet.likedByUsers.push(userId);
    return pet.save();
}

async function removePetFromLikedList(petId, userId) {
    const pet = await getPetById(petId);

    pet.likedByUsers.remove(userId);
    return pet.save();
}

async function isPetLikedFromUser(petId, userId) {
    const pet = await getPetById(petId);

    return pet.likedByUsers.includes(userId);
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
    addPetToLikedList,
    removePetFromLikedList,
    isPetLikedFromUser
}