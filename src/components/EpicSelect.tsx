import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getEpicsAsync,
  selectEpics,
} from 'redux/entities/epic.slice';
import { useAppDispatch } from 'redux/store';
import { useProjectIdInUrl } from 'screens/Kanban/hooks/useProjectIdInUrl';
import { IdSelect } from './IdSelect';

interface IEpicSelect extends React.ComponentProps<typeof IdSelect> {}

export const EpicSelect = (props: IEpicSelect) => {
  const epicList = useSelector(selectEpics);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdInUrl();

  useEffect(() => {
    dispatch(
      getEpicsAsync({
        projectId,
      }),
    );
  }, [projectId, dispatch]);

  return (
    <div>
      <IdSelect options={epicList} {...props} />
    </div>
  );
};
