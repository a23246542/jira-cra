import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { taskApi } from 'api/taskReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { ITask } from 'types/task';

interface TaskSliceState {
  tasks: Array<ITask>;
  state: FetchState;
  error: Error | null;
}

const initialState: TaskSliceState = {
  tasks: [],
  state: FetchState.IDLE,
  error: null,
};

export const getTasksAsync = createAsyncThunk(
  'project/getTasksAsync',
  async (params: Partial<ITask> | undefined, thunkAPI) => {
    const res = await taskApi.getTasks(params);
    return res.data;
  },
  // {
  //   condition: (_, { getState }) => {
  //     // @ts-ignore
  //     if (getState().kanban.kanbans.length > 0) {
  //       return false;
  //     }
  //   },
  // },
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasksAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getTasksAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('tasks payload 錯誤');
      }
      state.tasks = action.payload;
      state.error = null;
    },
    [getTasksAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.tasks = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const selectTasks = (state: RootState) => state.task.tasks;
