import Cookies from 'js-cookie';

const request = async (method, url, data) => {
    const options = {
        credentials: 'include',
    };

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
        Cookies.remove('session-cookie');
        localStorage.setItem('auth', '{}');
        window.location.pathname = '/auth/login';
    }

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const requestFactory = () => {
    return {
        get: request.bind(null, 'GET'),
        post: request.bind(null, 'POST'),
        put: request.bind(null, 'PUT'),
        patch: request.bind(null, 'PATCH'),
        delete: request.bind(null, 'DELETE'),
    };
};