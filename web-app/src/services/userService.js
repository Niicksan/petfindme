import { apiUrl } from '../env'
import { requestFactory } from './requester';

const baseUrl = `${apiUrl}/user/profile`;

export const userServiceFactory = () => {
    const request = requestFactory();

    return {
        getUserInfo: () => request.get(`${baseUrl}/user-info`),
    };
};