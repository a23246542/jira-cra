import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { kanbanApi } from 'api/kanbanReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { IKanban } from 'types/kanban';

interface KanbanSliceState {
  kanbans: Array<IKanban>;
  state: FetchState;
  error: Error | null;
}

const initialState: KanbanSliceState = {
  kanbans: [],
  state: FetchState.IDLE,
  error: null,
};

export const getKanbansAsync = createAsyncThunk(
  'project/getKanbansAsync',
  async (params: Partial<IKanban> | undefined, thunkAPI) => {
    const res = await kanbanApi.getKanbans(params);
    return res.data;
  },
  // {
  //   condition: (_, { getState }) => {
  //     // @ts-ignore
  //     if (getState().kanban.kanbans.length > 0) {
  //       return false;
  //     }
  //   },
  // },
);

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {},
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
      state.kanbans = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const selectKanbans = (state: RootState) =>
  state.kanban.kanbans;
