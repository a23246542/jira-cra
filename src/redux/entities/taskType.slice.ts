import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { taskTypeApi } from 'api/taskTypeReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { ITaskType } from 'types/taskType';

interface TaskTypeSliceState {
  taskTypes: Array<ITaskType>;
  state: FetchState;
  error: Error | null;
}

const initialState: TaskTypeSliceState = {
  taskTypes: [],
  state: FetchState.IDLE,
  error: null,
};

export const getTaskTypesAsync = createAsyncThunk(
  'taskType/getTaskTypesAsync',
  async () => {
    const res = await taskTypeApi.getTaskTypes();
    return res.data;
  },
  {
    condition(_, { getState }) {
      const { taskType } = getState() as RootState;
      if (taskType.taskTypes.length > 0) {
        return false;
      }
      if (taskType.state === FetchState.LOADING) {
        return false;
      }
    },
  },
);

export const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState,
  reducers: {},
  extraReducers: {
    [getTaskTypesAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getTaskTypesAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('taskTypes payload 錯誤');
      }
      state.taskTypes = action.payload;
      state.error = null;
    },
    [getTaskTypesAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.taskTypes = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const selectTaskTypes = (state: RootState) =>
  state.taskType.taskTypes;
