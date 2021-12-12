import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { IProject } from 'types/project';

type GetProjectsResponse = Array<IProject>;

type GetProjectResponse = IProject;

type addProjectResponse = IProject;

type updateProjectResponse = IProject;

type DeleteProjectResponse = {
  success: boolean;
};

export type addProjectRequestParams = Pick<
  IProject,
  'name' | 'organization' | 'personId'
>;

export const projectApi = {
  getProjects: (
    params?: Partial<IProject>,
  ): Promise<AxiosResponse<GetProjectsResponse>> => {
    return authIntance.get(`/projects?${qs.stringify(params)}`);
  },
  getProject: (
    id: number,
  ): Promise<AxiosResponse<GetProjectResponse>> => {
    return authIntance.get(`/projects/${id}`);
  },
  updateProject: (
    params: Partial<IProject> & { id: number },
  ): Promise<AxiosResponse<addProjectResponse>> => {
    return authIntance.patch(`/projects/${params.id}`, params);
  },
  addProject: (
    params: addProjectRequestParams,
  ): Promise<AxiosResponse<updateProjectResponse>> => {
    return authIntance.post(`/projects`, params);
  },
  deleteProject: (
    id: number,
  ): Promise<AxiosResponse<DeleteProjectResponse>> => {
    return authIntance.delete(`/projects/${id}`);
  },
};
