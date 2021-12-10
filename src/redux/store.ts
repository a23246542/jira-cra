import { useCallback } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './entities/auth.slice';
import { projectSlice } from './entities/project.slice';
import { userSlice } from './entities/user.slice';
import { projectScreenSlice } from './projectScreen';

import { useDispatch, useSelector } from 'react-redux';

const rootReducer = {
  auth: authSlice.reducer,
  project: projectSlice.reducer,
  user: userSlice.reducer,
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
