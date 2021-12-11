import { Row } from 'components/UI';
import { Button, Input } from 'antd';
import { UserSelect } from 'components/UserSelect';
import { TaskTypeSelect } from 'components/TaskTypeSelect';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';

export const SearchPanel = () => {
  const [{ name, processorId, typeId }, updateTaskParams] =
    useTaskSearchParams();

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateTaskParams({ name: evt.target.value });
  };
  const handleUserSelectChange = (userId: number | undefined) => {
    updateTaskParams({ processorId: userId });
  };
  const handleTaskTypeSelectChange = (
    taskTypeId: number | undefined,
  ) => {
    updateTaskParams({ typeId: taskTypeId });
  };

  const handleResetBtnClick = () => {
    updateTaskParams({
      typeId: undefined,
      processorId: undefined,
      name: undefined,
    });
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
        value={processorId}
        onChange={handleUserSelectChange}
      />
      <TaskTypeSelect
        defaultOptionName="類型"
        value={typeId}
        onChange={handleTaskTypeSelectChange}
      />
      <Button onClick={handleResetBtnClick}>重置篩選器</Button>
    </Row>
  );
};
