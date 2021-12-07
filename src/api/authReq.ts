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

const getIdToken = window.localStorage.getItem(storageAuthKey);

const authIntance = axios.create({
  baseURL: apiUrl,
  headers: { 'content-Type': 'application/json' },
});

authIntance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return handleUserResponse(response);
  },
  (error) => {
    // console.log('攔截器error', error);
    return Promise.reject(error);
  },
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
    return await authIntance.post('register', data);
  },

  // .then((res) => {
  //   console.log('data', data);
  //   // if(res.ok){

  //   // }
  //   return handleUserResponse(res.data);
  // }),
  login: async (data: { username: string; password: string }) =>
    await authIntance.post('login', data),
  logout: async () => {
    window.localStorage.removeItem(storageAuthKey);
  },
};
