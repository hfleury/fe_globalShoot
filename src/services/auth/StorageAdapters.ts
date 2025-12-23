import type { ITokenStorage } from './ITokenStorage';

/**
 * LocalStorage Adapter.
 * Pros: Persists across tabs and browser restarts.
 * Cons: Vulnerable to XSS.
 */
export class LocalStorageAdapter implements ITokenStorage {
    private key = 'auth_token';

    getToken(): string | null {
        return localStorage.getItem(this.key);
    }

    setToken(token: string): void {
        localStorage.setItem(this.key, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.key);
    }
}

/**
 * Memory Adapter.
 * Pros: More secure against XSS (token not on disk/storage).
 * Cons: Lost on refresh.
 */
export class MemoryAdapter implements ITokenStorage {
    private token: string | null = null;

    getToken(): string | null {
        return this.token;
    }

    setToken(token: string): void {
        this.token = token;
    }

    removeToken(): void {
        this.token = null;
    }
}
