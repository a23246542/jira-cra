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

export const getProjectListAsync = createAsyncThunk(
  'project/getProjectListAsync',
  async (params: Partial<IProject>) => {
    const res = await projectApi.getProjects(params);
    return res.data;
  },
);

export const getProjectAsync = createAsyncThunk(
  'project/getProjectAsync',
  async (id: number) => {
    const res = await projectApi.getProject(id);
    return res.data;
  },
);

export const editProjectAsync = createAsyncThunk(
  'project/editProjectAsync',
  async (params: Partial<IProject>) => {
    const res = await projectApi.updateProject(params);
    return res.data;
  },
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action) {
      state.projects = action.payload;
    },
  },
  extraReducers: {
    [getProjectListAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getProjectListAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('project payload 錯誤');
      }
      state.projects = action.payload;
      state.error = null;
    },
    [getProjectListAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.projects = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [editProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [editProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      const targetIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );
      state.projects[targetIndex] = action.payload;
      state.error = null;
    },
    [editProjectAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const selectProject = (state: RootState) => state.project;
