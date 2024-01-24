import { apiUrl } from '../env';
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/auth`;

export const authServiceFactory = () => {
    const request = requestFactory();

    return {
        login: (data) => request.post(`${baseUrl}/login`, data),
        register: (data) => request.post(`${baseUrl}/register`, data),
        logout: () => request.get(`${baseUrl}/logout`),
    };
};