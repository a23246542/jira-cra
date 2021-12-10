import qs from 'qs';
import { authIntance } from './instance';
import { IUser } from 'types';

export const userApi = {
  getUserData: (params?: Partial<IUser>) => {
    return authIntance.get(`/users?${qs.stringify(params)}`);
  },
};