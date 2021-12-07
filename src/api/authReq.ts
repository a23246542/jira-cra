import axios, { AxiosResponse } from 'axios';
import { IUser } from 'types/user';

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

const authIntance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'content-Type': 'application/json',
  },
});

unAuthIntance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return handleUserResponse(response);
  },
  (error) => {
    // console.log('攔截器error', error);
    return Promise.reject(error);
  },
);

unAuthIntance.interceptors.request.use(
  (request) => {
    if (!getToken()) return;
  },
  (error) => {},
);

export const authApi = {
  // register: async (data: { username: string; password: string }) => {
  //   try {
  //     const res = await authIntance.post('register', data);
  //     return res;
  //   } catch (error: any) {
  //     console.log('try catch error', error?.message);
  //     return Promise.reject(error);
  //   }
  // },
  register: async (data: { username: string; password: string }) => {
    return await unAuthIntance.post('register', data);
  },

  // .then((res) => {
  //   console.log('data', data);
  //   // if(res.ok){

  //   // }
  //   return handleUserResponse(res.data);
  // }),
  login: async (data: { username: string; password: string }) =>
    await unAuthIntance.post('login', data),
  logout: async () => {
    window.localStorage.removeItem(storageAuthKey);
  },
  getUserData: async () => {
    // console.log('getUserData', token);

    try {
      return await authIntance.get(`${apiUrl}/me`);
    } catch (error) {
      window.localStorage.removeItem(storageAuthKey);
      return Promise.reject(error);
    }
  },
};
