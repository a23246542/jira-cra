import { authIntance } from './instance';
import qs from 'qs';
import { IProject } from 'types/project';

export const projectApi = {
  getProjectData: (params?: Partial<IProject>) => {
    return authIntance.get(`/projects?${qs.stringify(params)}`);
  },
};
