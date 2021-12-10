import { authIntance } from './instance';
import qs from 'qs';
import { IProject } from 'types/project';

type getProjectsResponse = {
  data: Array<IProject>;
};

type GetProjectResponse = {
  data: Array<IProject>;
};

type addProjectResponse = {
  data: IProject;
};

type updateProjectResponse = {
  data: IProject;
};

type DeleteProjectResponse = {
  data: { success: boolean };
};

export type addProjectRequestParams = Pick<
  IProject,
  'name' | 'organization' | 'personId'
>;

export const projectApi = {
  getProjects: (
    params?: Partial<IProject>,
  ): Promise<getProjectsResponse> => {
    return authIntance.get(`/projects?${qs.stringify(params)}`);
  },
  getProject: (id: number): Promise<GetProjectResponse> => {
    return authIntance.get(`/projects?${id}`);
  },
  updateProject: (
    params: Partial<IProject> & { id: number },
  ): Promise<updateProjectResponse> => {
    return authIntance.patch(`/projects/${params.id}`, params);
  },
  addProject: (
    params: addProjectRequestParams,
  ): Promise<addProjectResponse> => {
    return authIntance.post(`/projects`, params);
  },
  deleteProject: (id: number): Promise<DeleteProjectResponse> => {
    return authIntance.delete(`/projects/${id}`);
  },
};
