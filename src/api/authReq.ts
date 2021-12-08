import {
  unAuthIntance,
  authIntance,
  storageAuthKey,
} from './instance';
import { AuthForm } from 'types/common';

export const authApi = {
  register: async (data: AuthForm) => {
    return await unAuthIntance.post('/register', data);
  },
  login: async (data: AuthForm) =>
    await unAuthIntance.post('/login', data),
  logout: async () => {
    window.localStorage.removeItem(storageAuthKey);
  },
  getUserData: async () => {
    try {
      return await authIntance.get(`/me`);
    } catch (error) {
      window.localStorage.removeItem(storageAuthKey);
      return Promise.reject(error);
    }
  },
};
