import { Input, Spin } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addKanbanAsync,
  selectMutateLoading,
} from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { useProjectIdInUrl } from '../hooks/useProjectIdInUrl';
import { KanbanContainer } from './KanbanColumn';

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const isMutateLoading = useSelector(selectMutateLoading);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdInUrl();

  const handleSubmitKanban = () => {
    if (!name || !projectId) {
      return;
    }
    dispatch(addKanbanAsync({ projectId, name }))
      .unwrap()
      .then(() => {
        setName('');
      });
  };

  return (
    <KanbanContainer>
      {isMutateLoading ? (
        <Spin size="small" />
      ) : (
        <Input
          placeholder="新建看板名稱"
          value={name}
          onChange={(evt) => setName(evt.target.value.trim())}
          size="large"
          onPressEnter={handleSubmitKanban}
        />
      )}
    </KanbanContainer>
  );
};
