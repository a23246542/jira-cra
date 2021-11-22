import { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { Register, Login } from './components';

export const AuthScreen = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      <Title>{isRegister ? '請註冊' : '請登入'}</Title>
      {isRegister ? <Register /> : <Login />}
      <Button
        type="link"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? '已經有帳號了? 直接登入'
          : '沒有帳號? 註冊新帳號'}
      </Button>
    </div>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
