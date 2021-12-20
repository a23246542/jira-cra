import qs from 'qs';
import { authIntance } from './instance';
import { IUser } from 'types/user';

export const userApi = {
  getUsers: (params?: Partial<IUser>) => {
    return authIntance.get(`/users?${qs.stringify(params)}`);
  },
};
