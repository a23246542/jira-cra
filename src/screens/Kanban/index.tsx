import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { DragDropContext } from 'react-beautiful-dnd';
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
import {
  Drag,
  Drop,
  DropChild,
  DragChild,
} from 'components/DragDrop';
import { useDragEnd } from './hooks/useDragEnd';

export const KanbanScreen = () => {
  const dispatch = useAppDispatch();
  const kanbans = useSelector(selectKanbans);
  const isKanbanFetchLoading = useSelector(selectKanbanFetchLoading);
  const isTaskFetchLoading = useSelector(selectTaskFetchLoading);
  const { currentProject } = useSelector(selectProject);
  const { id: projectId } = useParams();
  const kanbanParams = useKanbanSearchParams();
  const onDragEnd = useDragEnd();
  useEffect(() => {
    projectId && dispatch(getProjectAsync(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getKanbansAsync(kanbanParams));
  }, [kanbanParams, dispatch]);

  const isLoading = isKanbanFetchLoading || isTaskFetchLoading;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ContentContainer>
          <h1>{currentProject?.name}</h1>
          <SearchPanel />
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <ColumnsContainer>
              <Drop
                type="column"
                droppableId="kanbanContainer"
                direction="horizontal"
              >
                <DropChild style={{ display: 'flex' }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag
                      key={kanban.id}
                      draggableId={`kanban_${kanban.id}`}
                      index={index}
                    >
                      <DragChild>
                        <KanbanColumn kanban={kanban} />
                      </DragChild>
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
        </ContentContainer>
      </DragDropContext>
      <TaskModal />
    </>
  );
};

const ColumnsContainer = styled.div`
  flex: 1;
  display: flex;
  overflow-x: auto;
`;
