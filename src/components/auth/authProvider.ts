import type { AuthProvider } from 'react-admin';
import { API_URL } from '../../utils/httpClient';
import { tokenService } from '../../services/auth/TokenService';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    try {
      const response = await fetch(request);
      const auth = await response.json();
      if (response.status < 200 || response.status >= 300) {
        // Provide a generic message for security, or extract from response if needed for debugging
        // The user requested a generic problem message
        throw new Error('Invalid email or password');
      }

      // Backend returns: { success: true, message: "...", data: { token: "..." } }
      const token = auth.data.token;
      tokenService.setToken(token);
      localStorage.setItem('username', username);
      return Promise.resolve();
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },
  logout: () => {
    tokenService.removeToken();
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      tokenService.removeToken();
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    // Check if token exists in our service
    return tokenService.isAuthenticated() ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: () => {
    const username = localStorage.getItem('username');
    return Promise.resolve({
      id: 'user',
      fullName: username || 'User',
    });
  }
};