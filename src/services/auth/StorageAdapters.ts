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

    getRole(): string | null {
        return localStorage.getItem('auth_role');
    }

    setRole(role: string): void {
        localStorage.setItem('auth_role', role);
    }

    removeRole(): void {
        localStorage.removeItem('auth_role');
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

    private role: string | null = null;
    getRole(): string | null {
        return this.role;
    }

    setRole(role: string): void {
        this.role = role;
    }

    removeRole(): void {
        this.role = null;
    }
}
