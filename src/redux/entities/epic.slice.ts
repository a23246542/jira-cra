import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CreateEpicInput, epicApi } from 'api/epicReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { IEpic } from 'types/epic';

interface EpicSliceState {
  epics: Array<IEpic>;
  state: FetchState;
  mutateState: FetchState;
  error: Error | null;
}

const initialState: EpicSliceState = {
  epics: [],
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  error: null,
};

export const getEpicsAsync = createAsyncThunk(
  'epic/getEpicsAsync',
  async (
    params: Partial<IEpic> & Pick<IEpic, 'projectId'>,
    thunkAPI,
  ) => {
    const res = await epicApi.getEpics(params);
    return res.data;
  },
);

export const addEpicAsync = createAsyncThunk(
  'epic/addEpicAsync',
  async (params: CreateEpicInput) => {
    const res = await epicApi.createEpic(params);
    return res.data;
  },
);

export const epicSlice = createSlice({
  name: 'epic',
  initialState,
  reducers: {},
  extraReducers: {
    [getEpicsAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      // state.fetchingEpicsProjectId = action.meta.projectId;
      state.error = null;
    },
    [getEpicsAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('epics payload 錯誤');
      }
      state.epics = action.payload;
      state.error = null;
      // state.fetchingEpicsProjectId = null;
    },
    [getEpicsAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      // state.epics = [];
      // state.fetchingEpicsProjectId = null;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addEpicAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [addEpicAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.epics.push(action.payload);
      state.error = null;
    },
    [addEpicAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const actions = epicSlice.actions;

export const selectEpics = (state: RootState) => state.epic.epics;
