import type { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('username', username);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  },
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(undefined),
  getUserIdentity: () =>
    Promise.resolve({
      id: 'user',
      fullName: localStorage.getItem('username') || 'Anonymous',
    }),
};