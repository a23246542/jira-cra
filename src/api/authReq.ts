import axios, { AxiosResponse } from 'axios';

import { AuthForm } from 'types/common';

const apiUrl = process.env.REACT_APP_API_URL;

const storageAuthKey = '__auth_provider_token__';

const handleUserResponse = (res: AxiosResponse) => {
  window.localStorage.setItem(
    storageAuthKey,
    res.data.user.token || '',
  );
  return res;
};

export const getToken = () =>
  window.localStorage.getItem(storageAuthKey);

const unAuthIntance = axios.create({
  baseURL: apiUrl,
  headers: { 'content-Type': 'application/json' },
});

unAuthIntance.interceptors.response.use(
  (response) => {
    return handleUserResponse(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

const authIntance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'content-Type': 'application/json',
  },
});

authIntance.interceptors.request.use(
  (request) => {
    if (!getToken()) return;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
      return await authIntance.get(`${apiUrl}/me`);
    } catch (error) {
      window.localStorage.removeItem(storageAuthKey);
      return Promise.reject(error);
    }
  },
};
