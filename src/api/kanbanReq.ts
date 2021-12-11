import { AxiosResponse } from 'axios';
import { authIntance } from './instance';
import qs from 'qs';
import { IKanban } from 'types/kanban';

type GetKanbansResponse = Array<IKanban>;

type GetKanbanResponse = Array<IKanban>;

type createKanbanResponse = IKanban;

type updateKanbanResponse = IKanban;

type DeleteKanbanResponse = {
  success: boolean;
};

export type CreateKanbanInput = Partial<IKanban> &
  Pick<IKanban, 'projectId' | 'name'>;

export const kanbanApi = {
  getKanbans: (
    params?: Partial<IKanban>,
  ): Promise<AxiosResponse<GetKanbansResponse>> => {
    return authIntance.get(`/kanbans?${qs.stringify(params)}`);
  },
  createKanban: (
    params: CreateKanbanInput,
  ): Promise<AxiosResponse<createKanbanResponse>> => {
    return authIntance.post('/kanbans', params);
  },
};
