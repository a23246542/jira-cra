import { Button, List, Typography } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ContentContainer, Row } from 'components/UI';
import {
  getProjectAsync,
  selectCurrentProject,
} from 'redux/entities/project.slice';
import { useAppDispatch } from 'redux/store';
import { useProjectIdInUrl } from 'hooks/useProjectIdInUrl';
import {
  getEpicListAsync,
  selectEpicList,
} from 'redux/entities/epic.slice';
import { IEpic } from 'types/epic';
import {
  getTasksAsync,
  selectTasks,
} from 'redux/entities/task.slice';
import { Link } from 'react-router-dom';

export const EpicScreen = () => {
  const currentProject = useSelector(selectCurrentProject);
  const taskList = useSelector(selectTasks);
  const epicList = useSelector(selectEpicList);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdInUrl();

  useEffect(() => {
    dispatch(getProjectAsync(projectId));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getEpicListAsync({ projectId }));
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch(getTasksAsync({ projectId }));
  });

  const renderItem = useCallback(
    (epic: IEpic) => (
      <List.Item>
        <List.Item.Meta
          title={
            <Row between>
              <Typography.Title level={5}>
                {epic?.name}
              </Typography.Title>
              <Button type="link">刪除</Button>
            </Row>
          }
          description={
            <div>
              <div>
                開始時間 : {''}
                {epic?.start &&
                  dayjs(epic?.start).format('YYYY-MM-DD')}
              </div>
              <div>
                結束時間 : {''}
                {epic?.end && dayjs(epic?.end).format('YYYY-MM-DD')}
              </div>
            </div>
          }
        />
        <div>
          <ul>
            {taskList
              ?.filter((task) => task.epicId === epic.id)
              .map((task) => (
                <li style={{ marginBottom: '.7rem' }}>
                  <Link
                    to={`/project/${projectId}/kanban?editingTaskId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </List.Item>
    ),
    [projectId, taskList],
  );

  return (
    <ContentContainer>
      <Row between marginBottom={2}>
        <h1>{currentProject && `${currentProject.name}任務組`}</h1>
        <Button type="link">創建任務組</Button>
      </Row>
      <List
        dataSource={epicList}
        renderItem={renderItem}
        itemLayout="vertical"
        style={{ overflowY: 'scroll', flex: '1' }}
      />
    </ContentContainer>
  );
};
