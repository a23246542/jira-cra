import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListScreenActions,
  selectProjectModalOpen,
} from 'redux/projectListScreen.slice';
import {
  getProjectAsync,
  selectProject,
} from 'redux/entities/project.slice';
import { FetchState } from 'types';

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectProjectModalOpen);
  const {
    currentProject: editingProject,
    state,
    mutateState,
  } = useSelector(selectProject);

  const startEdit = useCallback(
    (id: number) => {
      dispatch(projectListScreenActions.openProjectModal());
      dispatch(getProjectAsync(id));
    },
    [dispatch],
  );

  const open = useCallback(() => {
    dispatch(projectListScreenActions.openProjectModal());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(projectListScreenActions.closeProjectModal());
  }, [dispatch]);

  return {
    isOpen,
    open,
    startEdit,
    close,
    editingProject,
    isLoading: state === FetchState.LOADING,
    isMutateLoading: mutateState === FetchState.LOADING,
  };
};
