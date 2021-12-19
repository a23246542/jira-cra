import { Card, Typography } from 'antd';
import { useTaskModal } from '../hooks/useTaskModal';
import { ITask } from 'types/task';
import { TaskTypeIcon } from './TaskTypeIcon';
import { MarkWord } from 'components/MarkWord';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';
import styled from '@emotion/styled';
import { CreateTaskInput } from 'api/taskReq';

interface ITaskCard {
  task: ITask | CreateTaskInput;
}

export const TaskCard = ({ task }: ITaskCard) => {
  const { startEditTask } = useTaskModal();
  const [{ name: keyword }] = useTaskSearchParams();

  const handleTaskCardClick = () => {
    if (!task.id) return;
    startEditTask(task.id);
  };

  return (
    <StyleCard
      key={task.id || `${task.kanbanId}_${task.name}`}
      onClick={handleTaskCardClick}
    >
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
