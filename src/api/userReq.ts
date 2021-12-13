import qs from 'qs';
import { authGetIntance } from './instance';
import { IUser } from 'types';

export const userApi = {
  getUserData: (params?: Partial<IUser>) => {
    return authGetIntance.get(`/users?${qs.stringify(params)}`);
  },
};
