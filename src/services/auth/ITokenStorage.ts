/**
 * Interface for Token Storage Strategy (Dependency Inversion Principle).
 * Allows swapping between LocalStorage, SessionStorage, Memory, or Cookies
 * without affecting the consumer code.
 */
export interface ITokenStorage {
    getToken(): string | null;
    setToken(token: string): void;
    removeToken(): void;
}
