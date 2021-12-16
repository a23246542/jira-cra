import axios, { AxiosResponse, AxiosError } from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const storageAuthKey = '__auth_provider_token__';

export const getToken = () =>
  window.localStorage.getItem(storageAuthKey);

const handleUserResponse = (res: AxiosResponse) => {
  window.localStorage.setItem(
    storageAuthKey,
    res.data.user.token || '',
  );
  return res;
};

export const unAuthIntance = axios.create({
  baseURL: apiUrl,
  headers: { 'content-Type': 'application/json' },
});

export const authIntance = axios.create({
  baseURL: apiUrl,
});

const hasErrorResponse = (
  err: any,
): err is AxiosError<{ status: number; message: string }> =>
  err?.response;

unAuthIntance.interceptors.response.use(
  (response) => {
    return handleUserResponse(response);
  },
  (error) => {
    console.error('unAuthIntance api error', error);
    if (hasErrorResponse(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  },
);

authIntance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authIntance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    console.error('authIntance api error', error);
    if (hasErrorResponse(error)) {
      return Promise.reject(error.response?.data);
    }
    return Promise.reject(error);
  },
);
