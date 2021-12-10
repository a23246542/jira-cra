import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { IKanban } from 'types/kanban';

type GetKanbansResponse = Array<IKanban>;

export const kanbanApi = {
  getKanbans: (
    params?: Partial<IKanban>,
  ): Promise<AxiosResponse<GetKanbansResponse>> => {
    return authIntance.get(`/kanbans?${qs.stringify(params)}`);
  },
};
