import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  CreateTaskInput,
  GetTaskListInput,
  taskApi,
  UpdateTaskInput,
} from 'api/taskReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { ITask } from 'types/task';
import { TaskSortProps } from 'types/sort';
import { reorder } from 'utils/reorder';

interface TaskSliceState {
  tasks: Array<ITask | CreateTaskInput>;
  currentTask: ITask | null;
  preTasks: Array<ITask | CreateTaskInput>;
  state: FetchState;
  mutateState: FetchState;
  deleteState: FetchState;
  currentTaskState: FetchState;
  taskProjectId: number | null;
  fetchingTasksProjectId: number | null;
  error: Error | null;
}

const initialState: TaskSliceState = {
  tasks: [],
  currentTask: null,
  preTasks: [],
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  deleteState: FetchState.IDLE,
  currentTaskState: FetchState.IDLE,
  taskProjectId: null,
  fetchingTasksProjectId: null,
  error: null,
};

export const getTaskListAsync = createAsyncThunk(
  'task/getTaskListAsync',
  async (params: GetTaskListInput, thunkAPI) => {
    const res = await taskApi.getTasks(params);
    return res.data;
  },
  {
    condition(params, { getState }) {
      const { task } = getState() as RootState;
      if (task.state === FetchState.LOADING) {
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
      const { task } = getState() as RootState;
      if (task.currentTaskState === FetchState.LOADING) {
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
    if (!res.data.success) {
      return Promise.reject('伺服器存取錯誤');
    }
    return res.data;
  },
);

export const reorderTaskAsync = createAsyncThunk(
  'task/reorderTask',
  async (params: TaskSortProps, { dispatch, getState }) => {
    await taskApi.reorderTask(params);
  },
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
    setPreTaskList: (state, action: PayloadAction<ITask[]>) => {
      state.preTasks = action.payload;
    },
  },
  extraReducers: {
    [getTaskListAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.fetchingTasksProjectId = action.meta.projectId;
      state.error = null;
    },
    [getTaskListAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('tasks payload 錯誤');
      }
      state.tasks = action.payload;
      state.error = null;
      state.fetchingTasksProjectId = null;
    },
    [getTaskListAsync.rejected.type]: (state, action) => {
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
      const { arg: newTaskInput }: { arg: CreateTaskInput } =
        action.meta;
      state.tasks.push(newTaskInput);
      state.error = null;
    },
    [addTaskAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.tasks.splice(state.tasks.length - 1, 1, action.payload);
      state.error = null;
    },
    [addTaskAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      state.tasks.pop();
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
          state.tasks[index] = { ...task, ...action.payload };
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
      state.deleteState = FetchState.LOADING;
      state.error = null;
    },
    [deleteTaskAsync.fulfilled.type]: (state, action) => {
      state.deleteState = FetchState.SUCCESS;
      const { arg: id } = action.meta;
      const targetIndex = state.tasks.findIndex(
        (task) => task.id === id,
      );
      state.tasks.splice(targetIndex, 1);
      state.error = null;
    },
    [deleteTaskAsync.rejected.type]: (state, action) => {
      state.deleteState = FetchState.FAILED;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [reorderTaskAsync.pending.type]: (state, action) => {
      // state.mutateState = FetchState.LOADING;
      // state.state = FetchState.IDLE;
      state.error = null;
    },
    [reorderTaskAsync.fulfilled.type]: (state, action) => {
      // state.mutateState = FetchState.SUCCESS;
      // state.tasks = action.payload;
      state.error = null;
    },
    [reorderTaskAsync.rejected.type]: (state, action) => {
      // state.mutateState = FetchState.FAILED;
      state.tasks = state.preTasks;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const { setTaskList, setPreTaskList } = taskSlice.actions;

export const reorderTaskActionAsync =
  (params: TaskSortProps) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const oldList = getState().task.tasks as Array<ITask>;
    const orderedList = reorder({
      list: oldList,
      ...params,
    }) as Array<ITask>;
    const newList = orderedList.map((item) =>
      item.id === params.fromId
        ? { ...item, kanbanId: params.toKanbanId }
        : item,
    );
    dispatch(setTaskList(newList));
    dispatch(setPreTaskList(oldList));
    dispatch(reorderTaskAsync(params));
  };

export const selectTasks = (state: RootState) => state.task.tasks;

export const selectCurrentTask = (state: RootState) =>
  state.task.currentTask;

export const selectCurrentTaskState = (state: RootState) =>
  state.task.currentTaskState;

export const selectTaskFetchLoading = (state: RootState) =>
  state.task.state === FetchState.LOADING;

export const selectTaskMutateState = (state: RootState) =>
  state.task.mutateState;

export const selectTaskDeleteState = (state: RootState) =>
  state.task.deleteState;

export const selectTasksByKanbanId =
  (id: number) => (state: RootState) => {
    return state.task.tasks.filter((item) => item.kanbanId === id);
  };

export const selectTasksByEpicId =
  (id: number) => (state: RootState) => {
    return state.task.tasks.filter((item) => item.epicId === id);
  };
