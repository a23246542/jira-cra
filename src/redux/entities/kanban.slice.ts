import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  kanbanApi,
  CreateKanbanInput,
  GetKanbanListInput,
} from 'api/kanbanReq';
import { FetchState } from 'types/common';
import { RootState, AppDispatch } from 'redux/store';
import { IKanban } from 'types/kanban';
import { KanbanSortProps } from 'types/sort';
import { reorder } from 'utils/reorder';

interface KanbanSliceState {
  kanbans: Array<IKanban | CreateKanbanInput>;
  preKanbans: Array<IKanban | CreateKanbanInput>;
  state: FetchState;
  mutateState: FetchState;
  error: Error | null;
}

const initialState: KanbanSliceState = {
  kanbans: [],
  preKanbans: [],
  state: FetchState.IDLE,
  mutateState: FetchState.IDLE,
  error: null,
};

export const getKanbansAsync = createAsyncThunk(
  'kanban/getKanbansAsync',
  async (params: GetKanbanListInput, thunkAPI) => {
    const res = await kanbanApi.getKanbans(params);
    return res.data;
  },
);

export const addKanbanAsync = createAsyncThunk(
  'kanban/addKanbanAsync',
  async (params: CreateKanbanInput, { dispatch, getState }) => {
    const res = await kanbanApi.createKanban(params);
    // const {kanban} = getState() as RootState
    // dispatch(setPreKanbanList(kanban.kanbans))
    // const newKanbanList = [...kanban.kanbans,{...params}]
    // //@ts-ignore
    // setKanbanList(newKanbanList)
    return res.data;
  },
);

export const deleteKanbanAsync = createAsyncThunk(
  'kanban/deleteKanban',
  async (id: number, { dispatch, getState }) => {
    console.log('id', id);

    const res = await kanbanApi.deleteKanban(id);
    console.log('res', res);
    return res.data;

    // if (!res.data.success) {
    //   return Promise.reject();
    // }

    // return res.data;
    // const { project } = getState() as RootState;
    // if (!project.currentProject) return;
    // if (res.data.success) {
    //   dispatch(
    //     getKanbansAsync({
    //       projectId: project.currentProject.id,
    //     }),
    //   );
    // }
  },
  {
    getPendingMeta({ arg: kanbanId }) {
      return {
        kanbanId,
      };
    },
  },
);

export const reorderKanbanAsync = createAsyncThunk(
  'kanban/reorderKanban',
  async (params: KanbanSortProps, { dispatch, getState }) => {
    await kanbanApi.reorderKanban(params);
  },
);

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setKanbanList: (
      state,
      action: PayloadAction<Array<IKanban | CreateKanbanInput>>,
    ) => {
      state.kanbans = action.payload;
    },
    setPreKanbanList: (
      state,
      action: PayloadAction<Array<IKanban | CreateKanbanInput>>,
    ) => {
      state.preKanbans = action.payload;
    },
  },
  extraReducers: {
    [getKanbansAsync.pending.type]: (state, action) => {
      state.state = FetchState.LOADING;
      state.error = null;
    },
    [getKanbansAsync.fulfilled.type]: (state, action) => {
      state.state = FetchState.SUCCESS;
      if (!Array.isArray(action.payload)) {
        console.error('kanbans payload 錯誤');
      }
      state.kanbans = action.payload;
      state.error = null;
    },
    [getKanbansAsync.rejected.type]: (state, action) => {
      state.state = FetchState.FAILED;
      // state.kanbans = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [addKanbanAsync.pending.type]: (state, action) => {
      console.log('pending action', action);
      const newKanbanList = [...state.kanbans, action.meta.arg];
      state.preKanbans = state.kanbans;
      state.kanbans = newKanbanList;
      state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [addKanbanAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      // state.kanbans.push(action.payload);
      console.log(
        'action',
        action,
        state.kanbans.map((kanban) => {
          if (kanban.id === action.payload.id) {
            return action.payload;
          }
          return kanban;
        }),
      );

      const targeIndex = state.kanbans.findIndex(
        (kanban) => kanban.id === action.payload.id,
      );
      state.kanbans.splice(targeIndex, 1, action.payload);

      // state.kanbans = state.kanbans.map((kanban) => {
      //   if (kanban.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return kanban;
      // });

      // const newKanbanList = state.kanbans.map((kanban) => {
      //   if (kanban.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return kanban;
      // });
      // state.kanbans = newKanbanList;
      state.preKanbans = [];
      state.error = null;
    },
    [addKanbanAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      state.kanbans = state.preKanbans;
      state.preKanbans = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [deleteKanbanAsync.pending.type]: (state, action) => {
      state.mutateState = FetchState.LOADING;
      // state.preKanbans = state.kanbans;
      // state.kanbans = state.kanbans.filter(
      //   (kanban) => kanban.id !== action.meata.kanbanId,
      // );
      state.error = null;
    },
    [deleteKanbanAsync.fulfilled.type]: (state, action) => {
      state.mutateState = FetchState.SUCCESS;
      state.preKanbans = [];
      state.error = null;
    },
    [deleteKanbanAsync.rejected.type]: (state, action) => {
      state.mutateState = FetchState.FAILED;
      state.kanbans = state.preKanbans;
      state.preKanbans = [];
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
    [reorderKanbanAsync.pending.type]: (state, action) => {
      // state.mutateState = FetchState.LOADING;
      state.error = null;
    },
    [reorderKanbanAsync.fulfilled.type]: (state, action) => {
      // state.mutateState = FetchState.SUCCESS;
      // state.kanbans = action.payload;
      state.error = null;
    },
    [reorderKanbanAsync.rejected.type]: (state, action) => {
      // state.mutateState = FetchState.FAILED;
      state.kanbans = state.preKanbans;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    },
  },
});

export const { setKanbanList, setPreKanbanList } =
  kanbanSlice.actions;

export const addKanbanActionAsync =
  (params: CreateKanbanInput) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    // const kanban = getState().kanban;
    dispatch(addKanbanAsync(params));
    // const newKanbanList = [...kanban.kanbans, { ...params }];
    // dispatch(setPreKanbanList(kanban.kanbans));
    // dispatch(setKanbanList(newKanbanList));
  };

export const deleteKanbanActionAsync =
  (id: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const kanban = getState().kanban;
    dispatch(deleteKanbanAsync(id));
    dispatch(setPreKanbanList(kanban.kanbans));
    const newKanbanList = kanban.kanbans.filter(
      (item) => item.id !== id,
    );
    dispatch(setKanbanList(newKanbanList));
  };

export const reorderKanbanActionAsync =
  (params: KanbanSortProps) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const oldList = getState().kanban.kanbans as Array<IKanban>;
    const newList = reorder({
      list: oldList,
      ...params,
    }) as Array<IKanban>;
    dispatch(setKanbanList(newList));
    dispatch(setPreKanbanList(oldList));
    dispatch(reorderKanbanAsync(params));
  };
export const selectKanbans = (state: RootState) =>
  // state.kanban.kanbans.filter((kanban) => !!kanban.id) as IKanban[];
  state.kanban.kanbans;

export const selectKanbanFetchLoading = (state: RootState) =>
  state.kanban.state === FetchState.LOADING;

export const selectMutateLoading = (state: RootState) =>
  state.kanban.mutateState === FetchState.LOADING;
