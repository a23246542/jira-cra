import { Row } from 'components/UI';
import { Input } from 'antd';
import { UserSelect } from 'components/UserSelect';
import { TaskTypeSelect } from 'components/TaskTypeSelect';

export const SearchPanel = () => {
  return (
    <Row gap marginBottom={4}>
      <Input placeholder="任務名" style={{ width: '20rem' }} />
      <UserSelect defaultOptionName="經辦人" />
      <TaskTypeSelect defaultOptionName="類型" />
    </Row>
  );
};
