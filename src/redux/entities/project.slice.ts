import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { projectApi } from 'api/projectReq';

import { IProject, FetchState } from 'types';
import { RootState } from 'redux/store';

interface ProjectSliceState {
  projects: Array<IProject>;
  state: FetchState;
  error: Error | null;
}

const initialState: ProjectSliceState = {
  projects: [],
  state: FetchState.IDLE,
  error: null,
};

export const getProjectAsync = createAsyncThunk(
  'project/getProjectAsync',
  async (params: Partial<IProject>) => {
    const res = await projectApi.getProjectData(params);
    return res.data;
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [getProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
    },
    [getProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('project payload 錯誤');
      }
      state.projects = action.payload;
      state.error = null;
    },
    [getProjectAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.projects = [];
      state.error = action.error;
    },
  },
});

export const selectProject = (state: RootState) => state.project;
