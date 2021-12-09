import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from 'api/userReq';

import { IUser } from 'types/user';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';

interface UserSliceState {
  users: Array<IUser>;
  state: FetchState;
  error: Error | null;
}

const initialState: UserSliceState = {
  users: [],
  state: FetchState.IDLE,
  error: null,
};

export const getUserAsync = createAsyncThunk(
  // <
  // IUser,
  // Partial<IUser>,
  // { dispatch: AppDispatch; state: RootState }
  // >
  // export const getUserAsync = createAsyncThunk(
  'project/getUserAsync',
  async (params: Partial<IUser> | undefined, thunkAPI) => {
    const res = await userApi.getUserData(params);
    return res.data;
  },
  {
    condition: (_, { getState }) => {
      // @ts-ignore
      if (getState().user.users.length > 0) {
        return false;
      }
    },
  },
);

export const userSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
    },
    [getUserAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      console.log('getUserAsync payload', action);

      if (!Array.isArray(action.payload)) {
        console.error('user payload 錯誤');
      }
      state.users = action.payload;
      state.error = null;
    },
    [getUserAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.users = [];
      // state.error = action.error;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const selectUsers = (state: RootState) => state.user.users;
