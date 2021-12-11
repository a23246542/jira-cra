import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getTaskTypesAsync,
  selectTaskTypes,
} from 'redux/entities/taskType.slice';
import { useAppDispatch } from 'redux/store';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';

interface ITaskTypeIcon {
  typeId: number;
}

export const TaskTypeIcon = ({ typeId }: ITaskTypeIcon) => {
  const dispatch = useAppDispatch();
  const taskTypes = useSelector(selectTaskTypes);

  const name = taskTypes?.find(
    (taskType) => taskType.id === typeId,
  )?.name;

  const svgIcon = name === 'task' ? taskIcon : bugIcon;

  useEffect(() => {
    dispatch(getTaskTypesAsync());
  }, [dispatch]);

  if (!name) {
    return null;
  }

  return <img alt="類型" src={svgIcon} />;
};
