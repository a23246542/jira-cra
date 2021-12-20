import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  CreateEpicInput,
  epicApi,
  GetEpicListInput,
} from 'api/epicReq';
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

export const getEpicListAsync = createAsyncThunk(
  'epic/getEpicListAsync',
  async (params: GetEpicListInput, thunkAPI) => {
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

export const deleteEpicAsync = createAsyncThunk(
  'epic/deleteEpicAsync',
  async (id: number, { rejectWithValue }) => {
    await epicApi.deleteEpic(id);
    return { id };
  },
);

export const epicSlice = createSlice({
  name: 'epic',
  initialState,
  reducers: {},
  extraReducers: {
    [getEpicListAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      // state.fetchingEpicsEpicId = action.meta.epicId;
      state.error = null;
    },
    [getEpicListAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('epics payload 錯誤');
      }
      state.epics = action.payload;
      state.error = null;
      // state.fetchingEpicsEpicId = null;
    },
    [getEpicListAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      // state.epics = [];
      // state.fetchingEpicsEpicId = null;
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
    [deleteEpicAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [deleteEpicAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      const targetIndex = state.epics.findIndex(
        (epic) => epic.id === action.payload.id,
      );
      state.epics.splice(targetIndex, 1);
      state.error = null;
    },
    [deleteEpicAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const actions = epicSlice.actions;

export const selectEpicList = (state: RootState) => state.epic.epics;

export const selectEpicMutateLoading = (state: RootState) =>
  state.epic.mutateState === FetchState.LOADING;
