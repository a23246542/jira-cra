import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  AsyncThunk,
} from '@reduxjs/toolkit';

import { userApi } from 'api/userReq';

import { IUser } from 'types/user';
import { FetchState } from 'types/common';
import { RootState } from 'redux/store';

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

export const getUserListAsync = createAsyncThunk(
  'project/getUserListAsync',
  async (params: Partial<IUser> | undefined, thunkAPI) => {
    const res = await userApi.getUsers(params);
    return res.data;
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;
      if (
        user.state === FetchState.LOADING ||
        user.state === FetchState.SUCCESS
      ) {
        return false;
      }
      if (user.users.length > 0) {
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
    [getUserListAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
    },
    [getUserListAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('user payload 錯誤');
      }
      state.users = action.payload;
      state.error = null;
    },
    [getUserListAsync.rejected.type]: (state, action) => {
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
