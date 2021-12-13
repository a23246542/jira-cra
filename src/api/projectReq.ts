import axios, { AxiosResponse } from 'axios';
import { authGetIntance, authIntance } from './instance';
import qs from 'qs';
import { IProject } from 'types/project';

type GetProjectsResponse = Array<IProject>;

type GetProjectResponse = IProject;

type createProjectResponse = IProject;

type updateProjectResponse = IProject;

type DeleteProjectResponse = {
  success: boolean;
};

export type createProjectInput = Pick<
  IProject,
  'name' | 'organization' | 'personId'
>;

export type updateProjectInput = Partial<IProject> & { id: number };

export const projectApi = {
  getProjects: (
    params?: Partial<IProject>,
  ): Promise<AxiosResponse<GetProjectResponse>> => {
    return authGetIntance.get(`/projects?${qs.stringify(params)}`);
  },
  getProject: (
    id: number,
  ): Promise<AxiosResponse<GetProjectResponse>> => {
    return authGetIntance.get(`/projects/${id}`);
  },
  createProject: (
    params: createProjectInput,
  ): Promise<AxiosResponse<createProjectResponse>> => {
    return authIntance.post(`/projects`, params);
  },
  updateProject: (
    params: updateProjectInput,
  ): Promise<AxiosResponse<updateProjectResponse>> => {
    return authIntance.patch(`/projects/${params.id}`, params);
  },
  deleteProject: (
    id: number,
  ): Promise<AxiosResponse<DeleteProjectResponse>> => {
    return authIntance.delete(`/projects/${id}`);
  },
};
