import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'antd';
import styled from '@emotion/styled';
import { useRouteType } from './hooks/useRouteType';
import colors from 'theme/colors';

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      {/* <h1>ProjectScreen</h1> */}
      <Aside>
        <Menu selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任務組</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1); // 只呈現左邊陰影效果
`;

const Aside = styled.aside`
  background-color: ${colors.gray[100]};
`;
