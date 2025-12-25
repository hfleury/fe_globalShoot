import { fetchUtils, HttpError } from 'react-admin';
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
    }).catch((error) => {
        if (error.status === 409 && error.body && error.body.errors) {
            // Map backend errors to React Admin format
            // Backend format: [{ type: "duplicate_entry", field: "email", message: "...", code: "..." }]
            // React Admin format: { email: "message", ... }
            const fieldErrors = error.body.errors.reduce((acc: any, err: any) => {
                if (err.field) {
                    acc[err.field] = err.message;
                }
                return acc;
            }, {});

            throw new HttpError(
                error.body.message || 'Validation error',
                error.status,
                fieldErrors
            );
        }
        throw error;
    });
};

// TODO: Update this port if the backend runs on a different port
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/v1';
