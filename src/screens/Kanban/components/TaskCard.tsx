import { Card } from 'antd';
import { useTaskModal } from '../hooks/useTaskModal';
import { ITask } from 'types/task';
import { TaskTypeIcon } from './TaskTypeIcon';
import { MarkWord } from 'components/MarkWord';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';

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
    <Card
      key={task.id}
      onClick={handleTaskCardClick}
      style={{ marginBottom: '.5rem' }}
    >
      <MarkWord name={task.name} keyword={keyword} />
      <TaskTypeIcon typeId={task.typeId} />
    </Card>
  );
};
