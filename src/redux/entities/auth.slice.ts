import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser } from 'types/user';
import type { RootState, AppDispatch } from 'redux/store';
import { authApi } from 'api/authReq';
import { getToken } from 'api/instance';

import { FetchState, AuthForm } from 'types/common';

interface AuthSliceState {
  user: IUser | null;
  initUserState: FetchState;
  loginState: FetchState;
  error: Error | null;
}

const initialState: AuthSliceState = {
  user: null,
  initUserState: FetchState.IDLE,
  loginState: FetchState.IDLE,
  error: null,
};

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (data: AuthForm, thunkAPI) => {
    const res = await authApi.register(data);
    return res.data.user;
  },
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (data: AuthForm) => {
    const res = await authApi.login(data);
    return res.data.user;
  },
);

export const initUserAsync = createAsyncThunk(
  'auth/initUser',
  async () => {
    let user = null;
    const token = getToken();
    if (token) {
      const res = await authApi.getUserData();
      user = res.data.user;
    }
    return user;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // logout
    setUser(state, action) {
      state.user = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    [registerAsync.pending.type]: (state) => {
      state.loginState = FetchState.LOADING;
    },
    [registerAsync.fulfilled.type]: (state, action) => {
      state.loginState = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [registerAsync.rejected.type]: (state, action) => {
      state.loginState = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
    },
    [loginAsync.pending.type]: (state, action) => {
      state.loginState = FetchState.LOADING;
    },
    [loginAsync.fulfilled.type]: (state, action) => {
      state.loginState = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [loginAsync.rejected.type]: (state, action) => {
      state.loginState = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
    },
    [initUserAsync.pending.type]: (state, action) => {
      state.initUserState = FetchState.LOADING;
    },
    [initUserAsync.fulfilled.type]: (state, action) => {
      state.initUserState = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [initUserAsync.rejected.type]: (state, action) => {
      state.initUserState = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
    },
  },
});

export const { setUser, clearAuthError } = authSlice.actions;

export const logoutAction = () => (dispatch: AppDispatch) =>
  authApi.logout().then(() => {
    dispatch(setUser(null));
  });

export const selectUser = (state: RootState) => state.auth.user;
export const selectInitUserState = (state: RootState) =>
  state.auth.initUserState;
export const selectIsLoginLoading = (state: RootState) =>
  state.auth.loginState === FetchState.LOADING;
export const selectUserError = (state: RootState) => state.auth.error;
