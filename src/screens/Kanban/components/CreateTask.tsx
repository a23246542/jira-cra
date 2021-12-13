import { useState } from 'react';
import { Card, Input } from 'antd';
import styled from '@emotion/styled';
import { useAppDispatch } from 'redux/store';
import { addTaskAsync } from 'redux/entities/task.slice';
import { useProjectIdInUrl } from '../../../hooks/useProjectIdInUrl';

interface ICreateTask {
  kanbanId: number;
}

export const CreateTask = ({ kanbanId }: ICreateTask) => {
  const [name, setName] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdInUrl();

  const handleToggleInput = () => {
    setInputMode((inputMode) => !inputMode);
  };

  const handleSubmitTask = () => {
    if (!name) {
      return;
    }
    dispatch(addTaskAsync({ projectId, kanbanId, name }))
      .unwrap()
      .then(() => {
        setInputMode(false);
        setName('');
      });
  };

  if (!inputMode) {
    return (
      <StyleAddTask onClick={handleToggleInput}>
        +創建任務
      </StyleAddTask>
    );
  }
  return (
    <Card>
      <Input
        placeholder="新增任務"
        autoFocus
        value={name}
        onBlur={handleToggleInput}
        onChange={(evt) => setName(evt.target.value.trim())}
        onPressEnter={handleSubmitTask}
      />
    </Card>
  );
};

const StyleAddTask = styled.div`
  padding-left: 1rem;
  cursor: pointer;
`;
