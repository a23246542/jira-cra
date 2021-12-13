import { Card, Typography } from 'antd';
import { useTaskModal } from '../hooks/useTaskModal';
import { ITask } from 'types/task';
import { TaskTypeIcon } from './TaskTypeIcon';
import { MarkWord } from 'components/MarkWord';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';
import styled from '@emotion/styled';

interface ITaskCard {
  task: ITask;
}

export const TaskCard = ({ task }: ITaskCard) => {
  const { startEditTask } = useTaskModal();
  const [{ name: keyword }] = useTaskSearchParams();

  const handleTaskCardClick = () => {
    startEditTask(task.id);
  };

  return (
    <StyleCard key={task.id} onClick={handleTaskCardClick}>
      <div>
        <Typography.Text ellipsis>
          <MarkWord name={task.name} keyword={keyword} />
        </Typography.Text>
      </div>
      <TaskTypeIcon typeId={task.typeId} />
    </StyleCard>
  );
};

const StyleCard = styled(Card)`
  margin-bottom: 0.6rem;
  cursor: pointer;
`;
