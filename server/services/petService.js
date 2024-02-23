const Pet = require("../models/Pet");


async function getLatestPets() {
    return Pet.find({ isActive: true }, { _id: 1, title: 1, status: 1, location: 1, imageUrl: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(12);
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
    return Pet.find({ owner: userId }, { _id: 1, title: 1, status: 1, location: 1, imageUrl: 1, isActive: 1, createdAt: 1 }).sort({ createdAt: -1 });
}

async function getAllPetsLikedByUser(userId) {
    return Pet.find({ likedByUsers: userId }, { _id: 1, title: 1, status: 1, location: 1, imageUrl: 1, createdAt: 1 }).sort({ createdAt: -1 });
}

async function getPetById(id) {
    return Pet.findById(id, { owner: 0, likedByUsers: 0, updatedAt: 0, __v: 0 });
}

async function getPetByIdRaw(id) {
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

async function archiveById(id) {
    const update = {
        isActive: false,
        archivedAt: new Date().toLocaleString('eu-Eu'),
        updatedAt: new Date().toLocaleString('eu-Eu')
    };

    return Pet.findByIdAndUpdate(id, update);
}

async function activateById(id) {
    const update = {
        isActive: true,
        archivedAt: null,
        updatedAt: new Date().toLocaleString('eu-Eu')
    };

    return Pet.findByIdAndUpdate(id, update);
}

async function deletePetById(id) {
    return Pet.findByIdAndDelete(id);
}

async function addPetToLikedList(petId, userId) {
    const pet = await getPetByIdRaw(petId);

    pet.likedByUsers.push(userId);
    pet.updatedAt = new Date().toLocaleString('eu-Eu');
    return pet.save();
}

async function removePetFromLikedList(petId, userId) {
    const pet = await getPetByIdRaw(petId);

    pet.likedByUsers.remove(userId);
    pet.updatedAt = new Date().toLocaleString('eu-Eu');
    return pet.save();
}

async function isPetLikedFromUser(petId, userId) {
    const pet = await getPetByIdRaw(petId);

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
    getPetByIdRaw,
    createPet,
    updatePetById,
    archiveById,
    activateById,
    deletePetById,
    addPetToLikedList,
    removePetFromLikedList,
    isPetLikedFromUser
}