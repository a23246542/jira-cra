import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  CreateTaskInput,
  GetTaskListInput,
  taskApi,
  UpdateTaskInput,
} from 'api/taskReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { ITask } from 'types/task';
import { stat } from 'fs';

interface TaskSliceState {
  tasks: Array<ITask>;
  currentTask: ITask | null;
  state: FetchState;
  mutateState: FetchState;
  currentTaskState: FetchState;
  taskProjectId: number | null;
  fetchingTasksProjectId: number | null;
  error: Error | null;
}

const initialState: TaskSliceState = {
  tasks: [],
  currentTask: null,
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  currentTaskState: FetchState.IDLE,
  taskProjectId: null,
  fetchingTasksProjectId: null,
  error: null,
};

export const getTasksAsync = createAsyncThunk(
  'task/getTasksAsync',
  async (params: GetTaskListInput, thunkAPI) => {
    const res = await taskApi.getTasks(params);
    return res.data;
  },
  {
    condition(params, { getState }) {
      //@ts-ignore
      const taskEntity = getState().task;
      if (
        taskEntity.state === FetchState.LOADING ||
        taskEntity.state === FetchState.SUCCESS
      ) {
        return false;
      }
      if (
        // @ts-ignore
        params.projectId === getState().task.fetchingTasksProjectId
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

export const getTaskAsync = createAsyncThunk(
  'task/getTaskAsync',
  async (id: number) => {
    const res = await taskApi.getTask(id);
    return res.data;
  },
  {
    condition(params, { getState }) {
      if (
        // @ts-ignore
        getState().task.currentTaskState === FetchState.LOADING
      ) {
        return false;
      }
    },
  },
);

export const addTaskAsync = createAsyncThunk(
  'task/addTaskAsync',
  async (params: CreateTaskInput) => {
    const res = await taskApi.createTask(params);
    return res.data;
  },
);

export const editTaskAsync = createAsyncThunk(
  'task/editTaskAsync',
  async (params: UpdateTaskInput) => {
    const res = await taskApi.updateTask(params);
    return res.data;
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'task/deleteTaskAsync',
  async (id: number, { dispatch, getState }) => {
    const res = await taskApi.deleteTask(id);
    if (res.data.success) {
      //@ts-ignore
      const projectId = getState().project.currentProject.id;
      dispatch(getTasksAsync({ projectId }));
    }
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
      state.fetchingTasksProjectId = action.meta.projectId;
      state.error = null;
    },
    [getTasksAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('tasks payload 錯誤');
      }
      state.tasks = action.payload;
      state.error = null;
      state.fetchingTasksProjectId = null;
    },
    [getTasksAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      // state.tasks = [];
      state.fetchingTasksProjectId = null;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [getTaskAsync.pending.type]: (state, action) => {
      state.currentTaskState = FetchState.LOADING;
      state.currentTask = null;
      state.error = null;
    },
    [getTaskAsync.fulfilled.type]: (state, action) => {
      state.currentTaskState = FetchState.SUCCESS;
      state.currentTask = action.payload;
      state.error = null;
    },
    [getTaskAsync.rejected.type]: (state, action) => {
      state.currentTaskState = FetchState.FAILED;
      state.currentTask = null;
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
    [editTaskAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [editTaskAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.tasks.forEach((task, index) => {
        if (task.id === action.payload.id) {
          state.tasks[index] = action.payload;
        }
      });
      state.error = null;
    },
    [editTaskAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteTaskAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [deleteTaskAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.error = null;
    },
    [deleteTaskAsync.rejected.type]: (state, action) => {
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

export const selectCurrentTask = (state: RootState) =>
  state.task.currentTask;

export const selectCurrentTaskState = (state: RootState) =>
  state.task.currentTaskState;

export const selectTaskFetchLoading = (state: RootState) =>
  state.task.state === FetchState.LOADING;

export const selectTaskMutateState = (state: RootState) =>
  state.task.mutateState;

export const selectTasksByKanbanId =
  (id: number) => (state: RootState) => {
    // console.log(
    //   '重新計算',
    //   state.task.tasks.filter((item) => item.kanbanId === id),
    // );

    return state.task.tasks.filter((item) => item.kanbanId === id);
  };

export const selectTasksByEpicId =
  (id: number) => (state: RootState) => {
    return state.task.tasks.filter((item) => item.epicId === id);
  };
