import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getTaskTypeListAsync,
  selectTaskTypes,
} from 'redux/entities/taskType.slice';
import { useAppDispatch } from 'redux/store';
import { IdSelect } from './IdSelect';

interface ITaskType extends React.ComponentProps<typeof IdSelect> {}

export const TaskTypeSelect = (props: ITaskType) => {
  const dispatch = useAppDispatch();
  const taskTypes = useSelector(selectTaskTypes);

  useEffect(() => {
    dispatch(getTaskTypeListAsync());
  }, [dispatch]);
  return <IdSelect options={taskTypes} {...props} />;
};
