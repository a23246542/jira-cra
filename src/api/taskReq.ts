import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { ITask } from 'types/task';

type GetTasksResponse = Array<ITask>;

type GetTaskResponse = ITask;

type createTaskResponse = ITask;

type updateTaskResponse = ITask;

type DeleteTaskResponse = {
  success: boolean;
};

export type CreateTaskInput = Partial<ITask> &
  Pick<ITask, 'projectId' | 'kanbanId' | 'name'>;

export const taskApi = {
  getTasks: (
    params?: Partial<ITask>,
  ): Promise<AxiosResponse<GetTaskResponse>> => {
    return authIntance.get(`/tasks?${qs.stringify(params)}`);
  },
  getTask: (id: number): Promise<AxiosResponse<GetTaskResponse>> => {
    return authIntance.get(`tasks/${id}`);
  },
  createTask: (
    params: CreateTaskInput,
  ): Promise<AxiosResponse<createTaskResponse>> => {
    return authIntance.post('/tasks', params);
  },
};
