import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { ITask } from 'types/task';
import { cleanObject } from 'utils/cleanObject';

type GetTasksResponse = Array<ITask>;

type GetTaskResponse = Partial<ITask>;

type createTaskResponse = ITask;

type updateTaskResponse = ITask;

type DeleteTaskResponse = {
  success: boolean;
};

export type CreateTaskInput = Partial<ITask> &
  Pick<ITask, 'projectId' | 'kanbanId' | 'name'>;

export type UpdateTaskInput = Partial<ITask> & Pick<ITask, 'id'>;

export const taskApi = {
  getTasks: (
    params?: Partial<ITask>,
  ): Promise<AxiosResponse<GetTasksResponse>> => {
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
  updateTask: (
    params: UpdateTaskInput,
  ): Promise<AxiosResponse<updateTaskResponse>> => {
    return authIntance.patch(`/tasks/${params.id}`, params);
  },
};
