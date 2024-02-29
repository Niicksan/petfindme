import { apiUrl } from '../env';
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/location`;

export const locationServiceFactory = () => {
    const request = requestFactory();

    return {
        getAllCities: () => request.get(`${baseUrl}/cities`),
    };
};