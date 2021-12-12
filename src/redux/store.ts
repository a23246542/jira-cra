import { useCallback } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './entities/auth.slice';
import { projectSlice } from './entities/project.slice';
import { userSlice } from './entities/user.slice';
import { kanbanSlice } from './entities/kanban.slice';
import { taskSlice } from './entities/task.slice';
import { taskTypeSlice } from './entities/taskType.slice';
import { epicSlice } from './entities/epic.slice';
import { projectScreenSlice } from './projectScreen';

import { useDispatch, useSelector } from 'react-redux';

const rootReducer = {
  auth: authSlice.reducer,
  project: projectSlice.reducer,
  user: userSlice.reducer,
  kanban: kanbanSlice.reducer,
  task: taskSlice.reducer,
  epic: epicSlice.reducer,
  taskType: taskTypeSlice.reducer,
  projectScreen: projectScreenSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useStoreSelector = (
  selector: (state: RootState) => unknown,
) => useSelector<RootState>(selector);
