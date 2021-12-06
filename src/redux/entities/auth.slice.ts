import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from 'types/user';
import type { RootState } from 'redux/store';

interface State {
  user: IUser | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const selectUser = (state: RootState) => state.auth.user;
