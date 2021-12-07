import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser } from 'types/user';
import type { RootState, AppDispatch } from 'redux/store';
import { authApi } from 'api';

enum FetchState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

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
  async (data: { username: string; password: string }) => {
    const res = await authApi.register(data);
    return res.data;
  },
);

// export const logoutAsyncAction = createAsyncThunk(
//   'auth/logout',
//   async () => {
//     const res = await authApi.logout();
//     return res;
//   },
// );

export const loginAsyncAction = createAsyncThunk(
  'auth/login',
  async (data: { username: string; password: string }) => {
    const res = await authApi.login(data);
    return res;
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
  },
});

const { setUser } = authSlice.actions;

export const logoutAction = () => (dispatch: AppDispatch) =>
  authApi.logout().then(() => {
    dispatch(setUser(null));
  });

export const selectUser = (state: RootState) => state.auth.user;
