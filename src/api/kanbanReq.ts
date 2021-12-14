import { AxiosResponse } from 'axios';
import { authGetIntance, authIntance } from './instance';
import qs from 'qs';
import { IKanban } from 'types/kanban';
import { SortProps } from 'types/sort';

type GetKanbansResponse = Array<IKanban>;

type createKanbanResponse = IKanban;

type reorderKanbanResponse = Array<IKanban>;

type DeleteKanbanResponse = {
  success: boolean;
};

export type GetKanbanListInput = Partial<IKanban> &
  Pick<IKanban, 'projectId'>;

export type CreateKanbanInput = Partial<IKanban> &
  Pick<IKanban, 'projectId' | 'name'>;

export type RecordKanbanInput = SortProps;

export const kanbanApi = {
  getKanbans: (
    params?: GetKanbanListInput,
  ): Promise<AxiosResponse<GetKanbansResponse>> => {
    return authGetIntance.get(`/kanbans?${qs.stringify(params)}`);
  },
  createKanban: (
    params: CreateKanbanInput,
  ): Promise<AxiosResponse<createKanbanResponse>> => {
    return authIntance.post('/kanbans', params);
  },
  deleteKanban: (
    id: number,
  ): Promise<AxiosResponse<DeleteKanbanResponse>> => {
    return authIntance.delete(`/kanbans/${id}`);
  },
  reorderKanban: (
    params: RecordKanbanInput,
  ): Promise<AxiosResponse<reorderKanbanResponse>> => {
    return authIntance.post('/kanbans/reorder', params);
  },
};
