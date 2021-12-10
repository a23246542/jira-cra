import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import { ITaskType } from 'types/taskType';

type GetTaskTypesResponse = Array<ITaskType>;

export const taskTypeApi = {
  getTaskTypes: (): Promise<AxiosResponse<GetTaskTypesResponse>> => {
    return authIntance.get('/taskTypes');
  },
};
