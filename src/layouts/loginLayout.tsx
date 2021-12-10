import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Card } from 'antd';

import logo from 'assets/logo.svg';
import LeftBg from 'assets/login-left.svg';
import RightBg from 'assets/login-right.svg';

export const LoginLayout = () => {
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Outlet />
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 10rem;
  background: url(${logo}) no-repeat;
  background-size: 8rem;
  background-position: center;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${LeftBg}), url(${RightBg});
`;
