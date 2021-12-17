import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Button, Divider, List, Popover, Typography } from 'antd';
import { selectProjectList } from 'redux/entities/project.slice';
import { useProjectDrawer } from 'screens/ProjectList/hooks/useProjectDrawer';
import { Link } from 'react-router-dom';

export const ProjectPopover = () => {
  const projectList = useSelector(selectProjectList);
  const pinProjectList = projectList?.filter(
    (project) => project.pin,
  );
  const { open } = useProjectDrawer();

  const content = (
    <Container>
      <Typography.Text type="secondary">收藏專案</Typography.Text>
      <List>
        {pinProjectList?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta
              title={
                <Link to={`/project/${project.id}`}>
                  {project.name}
                </Link>
              }
            />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button onClick={open} type="link">
        創建專案
      </Button>
    </Container>
  );
  return (
    <Popover content={content} placement="bottom">
      <span>專案</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;
