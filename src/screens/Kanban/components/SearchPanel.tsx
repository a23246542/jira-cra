import { Row } from 'components/UI';
import { Input } from 'antd';
import { UserSelect } from 'components/UserSelect';
import { TaskTypeSelect } from 'components/TaskTypeSelect';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';

export const SearchPanel = () => {
  const [{ name, processerId, typeId }, updateTaskParams] =
    useTaskSearchParams();

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateTaskParams({ name: evt.target.value });
  };
  const handleUserSelectChange = (userId: number | undefined) => {
    updateTaskParams({ processerId: userId });
  };
  const handleTaskTypeSelectChange = (
    taskTypeId: number | undefined,
  ) => {
    updateTaskParams({ typeId: taskTypeId });
  };
  return (
    <Row gap marginBottom={4}>
      <Input
        placeholder="任務名"
        value={name}
        onChange={handleInputChange}
        style={{ width: '20rem' }}
      />
      <UserSelect
        defaultOptionName="經辦人"
        value={processerId}
        onChange={handleUserSelectChange}
      />
      <TaskTypeSelect
        defaultOptionName="類型"
        value={typeId}
        onChange={handleTaskTypeSelectChange}
      />
    </Row>
  );
};
