import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { IEpic } from 'types/epic';

type GetEpicsResponse = Array<IEpic>;

type createEpicResponse = IEpic;

type DeleteEpicResponse = {
  success: boolean;
};

export type CreateEpicInput = Omit<IEpic, 'id'>;

export const epicApi = {
  getEpics: (
    params?: Partial<IEpic>,
  ): Promise<AxiosResponse<GetEpicsResponse>> => {
    return authIntance.get(`/epics?${qs.stringify(params)}`);
  },
  createEpic: (
    params: CreateEpicInput,
  ): Promise<AxiosResponse<createEpicResponse>> => {
    return authIntance.post('/epics', params);
  },
};