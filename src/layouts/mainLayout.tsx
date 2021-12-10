import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthHeader } from 'components/Header';

export const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);
  return (
    <Container>
      <Header>
        <AuthHeader />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export const headerHeight = '5rem';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: ${headerHeight} 1fr;
`;

const Header = styled.header`
  height: ${headerHeight};
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Main = styled.main`
  display: flex; // 使子內容滿高
  overflow: hidden;
`;
