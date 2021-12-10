import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { ITask } from 'types/task';

type GetTaskResponse = Array<ITask>;

export const taskApi = {
  getTasks: (
    params?: Partial<ITask>,
  ): Promise<AxiosResponse<GetTaskResponse>> => {
    return authIntance.get(`/tasks?${qs.stringify(params)}`);
  },
};
