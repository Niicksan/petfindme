import { apiUrl } from '../env';

import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/catalog`;

export const catalogServiceFactory = () => {
    const request = requestFactory();

    return {
        getCatalogSearchResults: (queryParams) => request.get(`${baseUrl}/search${queryParams}`),
        getLatestPets: () => request.get(`${baseUrl}/latest`),
        getLostPets: () => request.get(`${baseUrl}/lost`),
        geFoundPets: () => request.get(`${baseUrl}/found`),
        getAdoptionPets: () => request.get(`${baseUrl}/adoption`),
    };
};