import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ProjectListScreenSliceState {
  projectModalOpen: boolean;
}

const initialState: ProjectListScreenSliceState = {
  projectModalOpen: false,
};

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
  },
});

export const projectListScreenActions =
  projectListScreenSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectListScreen.projectModalOpen;
