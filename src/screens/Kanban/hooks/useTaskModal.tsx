import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUrlQueryParams } from 'hooks/useUrlQueryParams';
import { useAppDispatch } from 'redux/store';
import {
  getTaskAsync,
  selectCurrentTask,
  selectCurrentTaskState,
} from 'redux/entities/task.slice';
import { FetchState } from 'types';

export const useTaskModal = () => {
  const [{ editingTaskId }, setParams] = useUrlQueryParams([
    'editingTaskId',
  ]);
  const editingTask = useSelector(selectCurrentTask);
  const currentTaskState = useSelector(selectCurrentTaskState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    editingTaskId && dispatch(getTaskAsync(Number(editingTaskId)));
  }, [editingTaskId, dispatch]);

  const startEditTask = useCallback(
    (id: number) => {
      setParams({
        editingTaskId: id,
      });
    },
    [setParams],
  );

  const close = useCallback(() => {
    setParams({
      editingTaskId: '',
    });
  }, [setParams]);

  return {
    isOpen: !!editingTaskId,
    isLoading: currentTaskState === FetchState.LOADING,
    editingTaskId,
    editingTask,
    startEditTask,
    close,
  };
};
