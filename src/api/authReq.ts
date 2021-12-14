import axios from 'axios';
import {
  unAuthIntance,
  authIntance,
  storageAuthKey,
} from './instance';
import { AuthForm } from 'types/common';

export const authApi = {
  register: async (data: AuthForm) => {
    return await unAuthIntance
      .post('/register', data)
      .then(async (res) => {
        await convertStorage();
        window.location.reload();
        return res;
      });
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

enum storageKey {
  PROJECT = '__jira__project',
  USER = '__jira__user',
  KANBAN = '__jira__kanban',
  TASK = '__jira__task',
  EPIC = '__jira__epic',
}

const convertStorage = async () => {
  await Promise.all(
    Object.entries(storageKey).map(
      async ([_, storageKey]) =>
        await axios
          .post('https://api.zhconvert.org/convert', {
            text: localStorage.getItem(storageKey),
            converter: 'Traditional',
          })
          .then((res) => {
            localStorage.setItem(storageKey, res.data.data.text);
            return `更新${storageKey}成功`;
          }),
    ),
  );
};
