import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getKanbansAsync,
  selectKanbans,
} from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { ContentContainer } from 'components/UI';

export const KanbanScreen = () => {
  const dispatch = useAppDispatch();
  const kanbans = useSelector(selectKanbans);

  useEffect(() => {
    dispatch(getKanbansAsync());
  }, []);

  return (
    <ContentContainer>
      <h1>KanbanScreen</h1>
      {kanbans?.map((kanban) => (
        <div>{kanban.name}</div>
      ))}
    </ContentContainer>
  );
};
