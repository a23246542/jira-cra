import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { projectApi } from 'api/projectReq';

import { IProject, FetchState } from 'types';
import { RootState } from 'redux/store';
import { addProjectRequestParams } from 'api/projectReq';

interface ProjectSliceState {
  projects: Array<IProject>;
  currentProject: IProject | null;
  state: FetchState;
  error: Error | null;
}

const initialState: ProjectSliceState = {
  projects: [],
  currentProject: null,
  state: FetchState.IDLE,
  error: null,
};

export const getProjectListAsync = createAsyncThunk(
  'project/getProjectListAsync',
  async (params?: Partial<IProject>) => {
    const res = await projectApi.getProjects(params);
    return res.data;
  },
);

export const getProjectAsync = createAsyncThunk(
  'project/getProjectAsync',
  async (id: number) => {
    const res = await projectApi.getProject(id);
    if (!Array.isArray(res.data)) {
      return Promise.reject(new Error('get project資料回傳非陣列'));
    }
    return res.data[0];
  },
);

export const editProjectAsync = createAsyncThunk(
  'project/editProjectAsync',
  async (params: Partial<IProject> & { id: number }) => {
    const res = await projectApi.updateProject(params);
    return res.data;
  },
);

export const addProjectAsync = createAsyncThunk(
  'project/addProjectAsync',
  async (params: addProjectRequestParams, thunkAPI) => {
    const res = await projectApi.addProject(params);
    thunkAPI.dispatch(getProjectListAsync());
  },
);

export const deleteProjectAsync = createAsyncThunk(
  'project/deleteProjectAsync',
  async (id: number, { rejectWithValue }) => {
    await projectApi.deleteProject(id);
    return { id };
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
    [getProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      state.currentProject = action.payload;
      state.error = null;
    },
    [getProjectAsync.rejected.type]: (state, action) => {
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
    [addProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [addProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      state.error = null;
    },
    [addProjectAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [deleteProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      const targetIndex = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );
      state.projects.splice(targetIndex, 1);
      state.error = null;
    },
    [deleteProjectAsync.rejected.type]: (state, action) => {
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
