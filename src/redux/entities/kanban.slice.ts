import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  kanbanApi,
  CreateKanbanInput,
  GetKanbanListInput,
} from 'api/kanbanReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { IKanban } from 'types/kanban';
import { KanbanSortProps } from 'types/sort';
import { reorder } from 'utils/reorder';

interface KanbanSliceState {
  kanbans: Array<IKanban>;
  preKanbans: Array<IKanban>;
  state: FetchState;
  mutateState: FetchState;
  error: Error | null;
}

const initialState: KanbanSliceState = {
  kanbans: [],
  preKanbans: [],
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  error: null,
};

export const getKanbansAsync = createAsyncThunk(
  'kanban/getKanbansAsync',
  async (params: GetKanbanListInput, thunkAPI) => {
    const res = await kanbanApi.getKanbans(params);
    return res.data;
  },
);

export const addKanbanAsync = createAsyncThunk(
  'kanban/addKanbanAsync',
  async (params: CreateKanbanInput) => {
    const res = await kanbanApi.createKanban(params);
    return res.data;
  },
);

export const deleteKanbanAsync = createAsyncThunk(
  'kanban/deleteKanban',
  async (id: number, thunkAPI) => {
    const res = await kanbanApi.deleteKanban(id);
    if (res.data.success) {
      thunkAPI.dispatch(
        getKanbansAsync({
          //@ts-ignore
          projectId: thunkAPI.getState().project.currentProject.id,
        }),
      );
    }
  },
);

export const reorderKanbanAsync = createAsyncThunk(
  'kanban/reorderKanban',
  async (params: KanbanSortProps, { dispatch, getState }) => {
    await kanbanApi.reorderKanban(params);
  },
);

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setKanbanList: (state, action: PayloadAction<IKanban[]>) => {
      state.kanbans = action.payload;
    },
    setPreKanbanList: (state, action: PayloadAction<IKanban[]>) => {
      state.preKanbans = action.payload;
    },
  },
  extraReducers: {
    [getKanbansAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getKanbansAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('kanbans payload 錯誤');
      }
      state.kanbans = action.payload;
      state.error = null;
    },
    [getKanbansAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      // state.kanbans = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addKanbanAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [addKanbanAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.kanbans.push(action.payload);
      state.error = null;
    },
    [addKanbanAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteKanbanAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [deleteKanbanAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.error = null;
    },
    [deleteKanbanAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [reorderKanbanAsync.pending.type]: (state, action) => {
      // state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [reorderKanbanAsync.fulfilled.type]: (state, action) => {
      // state.mutateState = FetchState.SUCCESS;
      // state.kanbans = action.payload;
      state.error = null;
    },
    [reorderKanbanAsync.rejected.type]: (state, action) => {
      // state.mutateState = FetchState.FAILED;
      state.kanbans = state.preKanbans;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const { setKanbanList, setPreKanbanList } =
  kanbanSlice.actions;

export const reorderKanbanActionAsync =
  (params: KanbanSortProps) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const oldList = getState().kanban.kanbans;
    const newList = reorder({
      list: oldList,
      ...params,
    }) as Array<IKanban>;
    dispatch(setKanbanList(newList));
    dispatch(setPreKanbanList(oldList));
    dispatch(reorderKanbanAsync(params));
  };
export const selectKanbans = (state: RootState) =>
  state.kanban.kanbans;

export const selectKanbanFetchLoading = (state: RootState) =>
  state.kanban.state === FetchState.LOADING;

export const selectMutateLoading = (state: RootState) =>
  state.kanban.mutateState === FetchState.LOADING;
