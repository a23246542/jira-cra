import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button, Typography } from 'antd';
import styled from '@emotion/styled';
import { Row } from 'components/UI/Row';

import { useAuth } from 'hooks/useAuth';

import { ReactComponent as SofewareLogo } from 'assets/software-logo.svg';
import colors from 'theme/color';

export const ScreenContainer = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname]);
  return (
    <Container>
      <PageHeader />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout } = useAuth();
  return (
    <Header>
      <HeaderContentContainer between>
        <HeaderLeft spacing={true}>
          <SofewareLogo width="18rem" color={colors.primary} />
          <Typography.Text>專案</Typography.Text>
          <Typography.Text>組員</Typography.Text>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
        </HeaderRight>
      </HeaderContentContainer>
    </Header>
  );
};

const headerHeight = '5rem';

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

const HeaderContentContainer = styled(Row)`
  width: 100%;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`;

const HeaderLeft = styled(Row)`
  display: flex;
`;

const HeaderRight = styled(Row)`
  display: flex;
`;

const Main = styled.main`
  display: flex; // 使子內容滿高
  overflow: hidden;
`;
