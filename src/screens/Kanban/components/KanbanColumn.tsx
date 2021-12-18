import React from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Badge, Button, Dropdown, Menu, Modal } from 'antd';
import { useSelector } from 'react-redux';
import {
  getTasksAsync,
  selectTasksByKanbanId,
} from 'redux/entities/task.slice';
import { deleteKanbanAsync } from 'redux/entities/kanban.slice';
import { useAppDispatch } from 'redux/store';
import { IKanban } from 'types/kanban';
import { useTaskSearchParams } from '../hooks/useTaskSearchParams';
import colors from 'theme/colors';
import { CreateTask } from './CreateTask';
import { TaskCard } from './TaskCard';
import { Row } from 'components/UI/Row';
import {
  Drop,
  DropChild,
  Drag,
  DragChild,
} from 'components/DragDrop';
import { TypeId } from 'types/sort';
import { CreateKanbanInput } from 'api/kanbanReq';

interface IKanbanColumn {
  kanban: IKanban | CreateKanbanInput;
}

export const KanbanColumn = ({ kanban }: IKanbanColumn) => {
  // const [taskParams] = useTaskSearchParams();
  // const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasksByKanbanId(kanban?.id || 0));

  // useEffect(() => {
  //   dispatch(getTasksAsync(taskParams));
  // }, [taskParams, dispatch]);

  return (
    <KanbanContainer>
      <Row between marginBottom={0.5}>
        <KanbanTitle>
          <h3>{kanban.name}</h3>
          <StyleBadge count={tasks.length} offset={[6, 2]} />
        </KanbanTitle>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        <Drop
          type={TypeId.ROW}
          droppableId={`taskContainer_${kanban.id}`}
          direction="vertical"
        >
          <DropChild style={{ minHeight: '1rem' }}>
            {tasks?.map((task, index) => {
              return (
                <Drag
                  key={task.id}
                  draggableId={`task_${task.id}`}
                  index={index}
                >
                  <DragChild>
                    <TaskCard task={task} />
                  </DragChild>
                </Drag>
              );
            })}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban?.id || 0} />
      </TasksContainer>
    </KanbanContainer>
  );
};

const More = ({
  kanban,
}: {
  kanban: IKanban | CreateKanbanInput;
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteBtnClick = () => {
    Modal.confirm({
      title: `刪除${kanban.name}看板`,
      okText: '確定',
      cancelText: '取消',
      onOk() {
        return dispatch(deleteKanbanAsync(kanban?.id || 0));
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item key="delete">
        <Button type="link" onClick={handleDeleteBtnClick}>
          刪除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const KanbanContainer = styled.div`
  height: 97%;
  min-width: 27rem;
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  background-color: ${colors.gray[100]};
`;

const TasksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const KanbanTitle = styled.div`
  display: flex;
`;

export const StyleBadge = styled(Badge)`
  sup {
    background-color: #c9c5c5;
  }
`;
