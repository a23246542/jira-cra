import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListScreenActions,
  selectEditProject,
  selectEditProjectState,
  selectProjectModalOpen,
} from 'redux/projectListScreen.slice';
import { selectIsMutateProjectLoading } from 'redux/entities/project.slice';
import { FetchState } from 'types';

export const useProjectDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectProjectModalOpen);
  const editingProject = useSelector(selectEditProject);
  const editingProjectState = useSelector(selectEditProjectState);
  const isMutateProjectLoading = useSelector(
    selectIsMutateProjectLoading,
  );

  const startEdit = useCallback(
    (id: number) => {
      dispatch(projectListScreenActions.openProjectModal());
      dispatch(projectListScreenActions.getEditProjectAsync(id));
    },
    [dispatch],
  );

  const open = useCallback(() => {
    dispatch(projectListScreenActions.openProjectModal());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(projectListScreenActions.closeProjectModal());
    dispatch(projectListScreenActions.clearEditProject());
  }, [dispatch]);

  return {
    isOpen,
    open,
    startEdit,
    close,
    editingProject,
    isLoading: editingProjectState === FetchState.LOADING,
    isMutateLoading: isMutateProjectLoading,
  };
};
