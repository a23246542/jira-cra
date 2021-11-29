import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import styled from '@emotion/styled';

import { Row } from 'components/UI/Row';

export const ScreenContainer = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Main>
    </Container>
  );
};

const PageHeader = () => (
  <Header>
    <HeaderContentContainer between>
      <HeaderLeft spacing={true}>
        <h2>logo</h2>
        <h2>用戶</h2>
        <h2>列表</h2>
      </HeaderLeft>
      <HeaderRight>
        <Button>登出</Button>
      </HeaderRight>
    </HeaderContentContainer>
  </Header>
);

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
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderLeft = styled(Row)`
  display: flex;
`;

const HeaderRight = styled(Row)`
  display: flex;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
  border: 1px solid green;
`;

const ContentContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  border: 1px solid red;
`;
