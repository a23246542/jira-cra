import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser } from 'types/user';
import type { RootState, AppDispatch } from 'redux/store';
import { authApi } from 'api/authReq';
import { getToken } from 'api/instance';

import { FetchState, AuthForm } from 'types/common';

interface State {
  user: IUser | null;
  state: FetchState;
  error: Error | null;
}

const initialState: State = {
  user: null,
  state: FetchState.IDLE,
  error: null,
};

export const registerAsyncAction = createAsyncThunk(
  'auth/register',
  async (data: AuthForm, thunkAPI) => {
    const res = await authApi.register(data);
    console.log('register res data', res.data);

    return res.data.user;
  },
);

export const loginAsyncAction = createAsyncThunk(
  'auth/login',
  async (data: AuthForm) => {
    const res = await authApi.login(data);
    console.log('login res', res);
    return res.data.user;
  },
);

export const initUserAsyncAction = createAsyncThunk(
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
  },
  extraReducers: {
    [registerAsyncAction.pending.type]: (state) => {
      state.state = FetchState.LOADING;
    },
    [registerAsyncAction.fulfilled.type]: (state, action) => {
      console.log('register payload', action.payload);

      state.state = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [registerAsyncAction.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
      alert(action.error.message);
    },
    [loginAsyncAction.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
    },
    [loginAsyncAction.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [loginAsyncAction.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
    },
    [initUserAsyncAction.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
    },
    [initUserAsyncAction.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    [initUserAsyncAction.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.user = null;
      state.error = action.error;
    },
  },
});

const { setUser } = authSlice.actions;

export const logoutAction = () => (dispatch: AppDispatch) =>
  authApi.logout().then(() => {
    dispatch(setUser(null));
  });

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserState = (state: RootState) => state.auth.state;
export const selectUserError = (state: RootState) => state.auth.error;
