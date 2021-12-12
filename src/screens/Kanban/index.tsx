import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  getKanbansAsync,
  selectKanbanFetchLoading,
  selectKanbans,
} from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { ContentContainer } from 'components/UI';
import {
  getProjectAsync,
  selectProject,
} from 'redux/entities/project.slice';
import { KanbanColumn } from './components/KanbanColumn';
import { useKanbanSearchParams } from './hooks/useKanbanSearchParams';
import { SearchPanel } from './components/SearchPanel';
import { CreateKanban } from './components/CreateKanban';
import { TaskModal } from './components/TaskModal';
import { FetchState } from 'types';
import { Spin } from 'antd';
import { selectTaskFetchLoading } from 'redux/entities/task.slice';

export const KanbanScreen = () => {
  const dispatch = useAppDispatch();
  const kanbans = useSelector(selectKanbans);
  const isKanbanFetchLoading = useSelector(selectKanbanFetchLoading);
  const isTaskFetchLoading = useSelector(selectTaskFetchLoading);
  const { currentProject } = useSelector(selectProject);
  const { id: projectId } = useParams();
  const kanbanParams = useKanbanSearchParams();
  useEffect(() => {
    projectId && dispatch(getProjectAsync(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getKanbansAsync(kanbanParams));
  }, [kanbanParams, dispatch]);

  const isLoading = isKanbanFetchLoading || isTaskFetchLoading;

  return (
    <>
      <ContentContainer>
        <h1>{currentProject?.name}</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnsContainer>
            {kanbans?.map((kanban) => (
              <KanbanColumn key={kanban.id} kanban={kanban} />
            ))}
            <CreateKanban />
          </ColumnsContainer>
        )}
      </ContentContainer>
      <TaskModal />
    </>
  );
};

const ColumnsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
`;
