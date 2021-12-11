import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  getKanbansAsync,
  selectKanbans,
} from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { ContentContainer } from 'components/UI';
import {
  getProjectAsync,
  selectProject,
} from 'redux/entities/project.slice';
import { KanbanColumsn } from './components/KanbanColumsn';
import { useKanbanSearchParams } from './hooks/useKanbanSearchParams';
import { SearchPanel } from './components/SearchPanel';

export const KanbanScreen = () => {
  const dispatch = useAppDispatch();
  const kanbans = useSelector(selectKanbans);
  const { currentProject } = useSelector(selectProject);
  const { id: projectId } = useParams();
  const kanbanParams = useKanbanSearchParams();

  useEffect(() => {
    projectId && dispatch(getProjectAsync(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getKanbansAsync(kanbanParams));
  }, [kanbanParams, dispatch]);

  return (
    <ContentContainer>
      <h1>{currentProject?.name}</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumsn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </ContentContainer>
  );
};

const ColumnsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
`;
