import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ProjectScreenSliceState {
  projectModalOpen: boolean;
}

const initialState: ProjectScreenSliceState = {
  projectModalOpen: false,
};

export const projectScreenSlice = createSlice({
  name: 'projectScreen',
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

export const projectScreenActions = projectScreenSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectScreen.projectModalOpen;
