import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectScreenActions,
  selectProjectModalOpen,
} from 'redux/projectScreen';
import {
  getProjectAsync,
  selectProject,
} from 'redux/entities/project.slice';
import { FetchState } from 'types';

export const useProjectModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectProjectModalOpen);
  const { currentProject: editingProject, state } =
    useSelector(selectProject);

  const startEdit = useCallback(
    (id: number) => {
      dispatch(projectScreenActions.openProjectModal());
      dispatch(getProjectAsync(id));
    },
    [dispatch],
  );

  const open = useCallback(() => {
    dispatch(projectScreenActions.openProjectModal());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(projectScreenActions.closeProjectModal());
  }, [dispatch]);

  return {
    isOpen,
    open,
    startEdit,
    close,
    editingProject,
    isLoading: state === FetchState.LOADING,
  };
};
