import { apiUrl } from '../env';

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/pets`;

export const petServiceFactory = () => {
    const request = requestFactory();

    return {
        getPetById: (petId) => request.get(`${baseUrl}/${petId}`),
        createPet: (petData) => request.post(`${baseUrl}`, petData),
        editPet: (petId, petData) => request.patch(`${baseUrl}/${petId}`, petData),
        deletePet: (petId) => request.delete(`${baseUrl}/${petId}`),
        addtoFavourite: (petId) => request.get(`${baseUrl}/favourite/add/${petId}`),
        removeFromFavourite: (petId) => request.get(`${baseUrl}/favourite/remove/${petId}`),
        archivePet: (petId) => request.patch(`${baseUrl}/archive/${petId}`),
        activatePet: (petId) => request.patch(`${baseUrl}/activate/${petId}`),
        checkIsOwner: (petId) => request.get(`${baseUrl}/owner/${petId}`)
    };
};