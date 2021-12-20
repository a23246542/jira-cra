import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectApi } from 'api/projectReq';
import { RootState } from './store';
import { FetchState } from 'types/common';
import { IProject } from 'types/project';

interface ProjectListScreenSliceState {
  editingProject: IProject | null;
  state: FetchState;
  error: Error | null;
  projectModalOpen: boolean;
}

const initialState: ProjectListScreenSliceState = {
  projectModalOpen: false,
  state: FetchState.IDLE,
  editingProject: null,
  error: null,
};

export const getEditProjectAsync = createAsyncThunk(
  'projectListScreen/getProjectAsync',
  async (id: number) => {
    const res = await projectApi.getProject(id);
    return res.data;
  },
);

export const projectListScreenSlice = createSlice({
  name: 'projectListScreen',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
    clearEditProject(state) {
      state.editingProject = null;
    },
  },
  extraReducers: {
    [getEditProjectAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getEditProjectAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      state.editingProject = action.payload;
      state.error = null;
    },
    [getEditProjectAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const projectListScreenActions = {
  ...projectListScreenSlice.actions,
  getEditProjectAsync,
};

export const selectProjectModalOpen = (state: RootState) =>
  state.projectListScreen.projectModalOpen;

export const selectEditProject = (state: RootState) =>
  state.projectListScreen.editingProject;

export const selectEditProjectState = (state: RootState) =>
  state.projectListScreen.state;
