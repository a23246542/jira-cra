import { createSlice } from '@reduxjs/toolkit';
import { FetchState } from 'types/common';
import { RootState } from './store';

interface kanbanScreenSliceState {}

const initialState: kanbanScreenSliceState = {};

export const kanbanScreenSlice = createSlice({
  name: 'kanbanScreen',
  initialState,
  reducers: {},
});

export const selectIsKanbanInitLoading = (state: RootState) => {
  return (
    state.project.state === FetchState.LOADING ||
    state.user.state === FetchState.LOADING ||
    state.taskType.state === FetchState.LOADING
    // state.kanban.state === FetchState.LOADING ||
    // state.task.state === FetchState.LOADING
  );
};
