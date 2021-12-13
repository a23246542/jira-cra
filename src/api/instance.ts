import axios, { AxiosResponse } from 'axios';

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

unAuthIntance.interceptors.response.use(
  (response) => {
    return handleUserResponse(response);
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const authIntance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'content-Type': 'application/json',
  },
});

export const authGetIntance = axios.create({
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
    console.error('api有誤', error);
    return Promise.reject(error);
  },
);

authIntance.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      return Promise.reject({ message: '請重新登入' });
    }
    return response;
  },
  (error) => {
    console.error('api失敗', error);
    return Promise.reject(error);
  },
);

authGetIntance.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      return Promise.reject({ message: '請重新登入' });
    }
    const res = await axios.post(
      'https://api.zhconvert.org/convert',
      {
        text: JSON.stringify(response.data),
        converter: 'Traditional',
      },
    );
    return { ...response, data: JSON.parse(res.data.data.text) };
  },
  (error) => {
    console.error('api失敗', error);
    return Promise.reject(error);
  },
);
