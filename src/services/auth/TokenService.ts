import type { ITokenStorage } from './ITokenStorage';
import { LocalStorageAdapter } from './StorageAdapters';

/**
 * TokenService (Singleton).
 * Centralized point for token management.
 * Follows Single Responsibility Principle (managing token lifecycle).
 */
class TokenService {
    private static instance: TokenService;
    private storage: ITokenStorage;

    private constructor() {
        // Default to LocalStorage for now (UX > strict security for this phase)
        // This is where dependency injection would usually happen
        this.storage = new LocalStorageAdapter();
    }

    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    /**
     * Set a new storage strategy at runtime (Strategy Pattern).
     * Useful for testing or switching security modes.
     */
    public setStorageStrategy(storage: ITokenStorage): void {
        // Migration logic could go here (e.g., move token from old to new)
        const currentToken = this.storage.getToken();
        if (currentToken) {
            storage.setToken(currentToken);
            this.storage.removeToken();
        }
        this.storage = storage;
    }

    public setToken(token: string): void {
        this.storage.setToken(token);
    }

    public getToken(): string | null {
        return this.storage.getToken();
    }

    public removeToken(): void {
        this.storage.removeToken();
    }

    public isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const tokenService = TokenService.getInstance();
