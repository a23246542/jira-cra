import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getTasksAsync,
  selectTasksByKanbanId,
} from 'redux/entities/task.slice';
import { useAppDispatch } from 'redux/store';
import { IKanban } from 'types/kanban';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';
import colors from 'theme/colors';
import { CreateTask } from './CreateTask';
import { TaskCard } from './TaskCard';

interface IKanbanColumns {
  kanban: IKanban;
}

export const KanbanColumsn = ({ kanban }: IKanbanColumns) => {
  const [taskParams] = useTaskSearchParams();

  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasksByKanbanId(kanban.id));

  useEffect(() => {
    dispatch(getTasksAsync(taskParams));
  }, [taskParams, dispatch]);

  return (
    <KanbanContainer>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => {
          return <TaskCard task={task} />;
        })}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </KanbanContainer>
  );
};

export const KanbanContainer = styled.div`
  min-width: 27rem;
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  background-color: ${colors.gray[100]};
`;

const TasksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
