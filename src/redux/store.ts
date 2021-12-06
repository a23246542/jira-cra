import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './entities/auth.slice';

const rootReducer = {
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
