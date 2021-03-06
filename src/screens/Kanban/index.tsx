import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  getKanbanListAsync,
  selectKanbanFetchLoading,
  selectKanbans,
} from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { ContentContainer } from 'components/UI';
import {
  getProjectAsync,
  selectCurrentProject,
} from 'redux/entities/project.slice';
import { KanbanColumn } from './components/KanbanColumn';
import { useKanbanSearchParams } from './hooks/useKanbanSearchParams';
import { SearchPanel } from './components/SearchPanel';
import { CreateKanban } from './components/CreateKanban';
import { TaskModal } from './components/TaskModal';
import { Spin } from 'antd';
import {
  getTaskListAsync,
  selectTaskFetchLoading,
} from 'redux/entities/task.slice';
import {
  Drag,
  Drop,
  DropChild,
  DragChild,
} from 'components/DragDrop';
import { useDragEnd } from './hooks/useDragEnd';
import { TypeId } from 'types/sort';
import { useTaskSearchParams } from './hooks/useTaskSearchParams';
import { useDebounce } from 'hooks/useDebounce';
import { selectIsKanbanInitLoading } from 'redux/kanbanScreen.slice';
import { IKanban } from 'types/kanban';
import { useDocumentTitle } from 'hooks/useDocumentTitle';

export const KanbanScreen = () => {
  const dispatch = useAppDispatch();
  const kanbans = useSelector(selectKanbans);
  const isKanbanFetchLoading = useSelector(selectKanbanFetchLoading);
  const isTaskFetchLoading = useSelector(selectTaskFetchLoading);
  const isKanbanInitLoading = useSelector(selectIsKanbanInitLoading);
  const currentProject = useSelector(selectCurrentProject);
  useDocumentTitle('看板列表', true);
  const { id: projectId } = useParams();
  const kanbanParams = useKanbanSearchParams();
  const [taskParams] = useTaskSearchParams();
  const debounceTaskParams = useDebounce(taskParams);
  const onDragEnd = useDragEnd();
  useEffect(() => {
    projectId && dispatch(getProjectAsync(Number(projectId)));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getKanbanListAsync(kanbanParams));
  }, [kanbanParams, dispatch]);

  useEffect(() => {
    dispatch(getTaskListAsync(debounceTaskParams));
  }, [debounceTaskParams, dispatch]);

  const isKanbanLoading = isKanbanFetchLoading || isTaskFetchLoading;

  const isKanbanType = (value: any): value is IKanban => value?.id;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <ContentContainer>
          {isKanbanInitLoading ? (
            <StyleSpin size="large" />
          ) : (
            <>
              <h1>{currentProject?.name}看板</h1>
              <SearchPanel />
              {isKanbanLoading ? (
                <Spin size="large" />
              ) : (
                <ColumnsContainer>
                  <Drop
                    type={TypeId.COLUMN}
                    droppableId="kanbanContainer"
                    direction="horizontal"
                  >
                    <DropChild style={{ display: 'flex' }}>
                      {kanbans?.map((kanban, index) => (
                        <Drag
                          key={kanban.id || `${index}_${kanban.name}`}
                          draggableId={`kanban_${kanban.id}`}
                          index={index}
                        >
                          <DragChild>
                            {/* {isKanbanType(kanban) && ( */}
                            <KanbanColumn kanban={kanban} />
                            {/* )} */}
                          </DragChild>
                        </Drag>
                      ))}
                    </DropChild>
                  </Drop>
                  <CreateKanban />
                </ColumnsContainer>
              )}
            </>
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

const StyleSpin = styled(Spin)`
  margin-top: 30rem;
  transform: scale(1.2);
`;
