import { authIntance } from './instance';
import qs from 'qs';
import { IProject } from 'types/project';

type GetProjectRequest = {
  data: Array<IProject>;
};

export const projectApi = {
  getProjects: (params?: Partial<IProject>) => {
    return authIntance.get(`/projects?${qs.stringify(params)}`);
  },
  getProject: (id: number): Promise<GetProjectRequest> => {
    return authIntance.get(`/projects?${id}`);
  },
  updateProject: (params: Partial<IProject> & { id: number }) => {
    return authIntance.patch(`/projects/${params.id}`, params);
  },
  AddProject: (params: IProject) => {
    return authIntance.post(`/projects`, params);
  },
  deleteProject: (id: number) => {
    return authIntance.delete(`/projects/${id}`);
  },
};
