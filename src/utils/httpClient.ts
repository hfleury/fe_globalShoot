import { fetchUtils, HttpError } from 'react-admin';
import { tokenService } from '../services/auth/TokenService';

export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = tokenService.getToken();
    console.log(`[HttpClient] URL: ${url}, Token available: ${!!token}`);
    if (token) {
        if (options.headers instanceof Headers) {
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            options.headers = new Headers(options.headers);
            options.headers.set('Authorization', `Bearer ${token}`);
        }
        console.log('[HttpClient] Authorization header set.');
    } else {
        console.warn('[HttpClient] No token found in storage.');
    }
    return fetchUtils.fetchJson(url, options).then((response) => {
        if (response.json && response.json.data && response.json.success) {
            console.log('Unwrapping response:', response.json);
            response.json = response.json.data;
        } else {
            console.log('Response format mismatch or failed unwrap condition:', response.json);
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
