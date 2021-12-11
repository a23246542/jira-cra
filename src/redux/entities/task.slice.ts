import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CreateTaskInput, taskApi } from 'api/taskReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { ITask } from 'types/task';

interface TaskSliceState {
  tasks: Array<ITask>;
  state: FetchState;
  mutateState: FetchState;
  taskProjectId: number | null;
  fetchingTaskProjectId: number | null;
  error: Error | null;
}

const initialState: TaskSliceState = {
  tasks: [],
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  taskProjectId: null,
  fetchingTaskProjectId: null,
  error: null,
};

export const getTasksAsync = createAsyncThunk(
  'task/getTasksAsync',
  async (
    params: Partial<ITask> & Pick<ITask, 'projectId'>,
    thunkAPI,
  ) => {
    const res = await taskApi.getTasks(params);
    return res.data;
  },
  {
    condition(params, { getState }) {
      if (
        // @ts-ignore
        params.projectId === getState().task.fetchingTaskProjectId
      ) {
        return false;
      }
    },
    getPendingMeta({ arg, requestId }, { getState, extra }) {
      return {
        projectId: arg.projectId,
      };
    },
  },
);

export const addTaskAsync = createAsyncThunk(
  'kanban/addKanbanAsync',
  async (params: CreateTaskInput) => {
    const res = await taskApi.createTask(params);
    return res.data;
  },
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    [getTasksAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.fetchingTaskProjectId = action.meta.projectId;
      state.error = null;
    },
    [getTasksAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('tasks payload 錯誤');
      }
      state.tasks = action.payload;
      state.error = null;
      state.fetchingTaskProjectId = null;
    },
    [getTasksAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      state.tasks = [];
      state.fetchingTaskProjectId = null;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addTaskAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [addTaskAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.tasks.push(action.payload);
      state.error = null;
    },
    [addTaskAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const actions = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export const selectTasksByKanbanId =
  (id: number) => (state: RootState) => {
    console.log(
      '重新計算',
      state.task.tasks.filter((item) => item.kanbanId === id),
    );

    return state.task.tasks.filter((item) => item.kanbanId === id);
  };
