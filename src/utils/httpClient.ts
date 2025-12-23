import { fetchUtils } from 'react-admin';
import { tokenService } from '../services/auth/TokenService';

export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = tokenService.getToken();
    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options).then((response) => {
        if (response.json && response.json.data && response.json.success) {
            response.json = response.json.data;
        }
        return response;
    });
};

// TODO: Update this port if the backend runs on a different port
export const API_URL = 'http://localhost:8080/v1';
