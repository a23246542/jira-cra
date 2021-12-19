import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { Register, Login } from './components';
import { selectUserError } from 'redux/entities/auth.slice';
import { ErrorBox } from 'components/ErrorBox';
import {
  selectIsRegister,
  selectUnAuthError,
  switchRegisterAction,
} from 'redux/authScreen.slice';
import { useAppDispatch } from 'redux/store';
import { useDocumentTitle } from 'hooks/useDocumentTitle';

export const AuthScreen = () => {
  const isRegister = useSelector(selectIsRegister);
  const authError = useSelector(selectUserError);
  const unAuthError = useSelector(selectUnAuthError);
  useDocumentTitle('Jira任務管理系統');
  const dispatch = useAppDispatch();
  const error = authError || unAuthError;
  return (
    <div>
      <Title>{isRegister ? '請註冊' : '請登入'}</Title>
      {isRegister ? <Register /> : <Login />}
      <Button
        type="link"
        onClick={() => dispatch(switchRegisterAction(!isRegister))}
      >
        {isRegister
          ? '已經有帳號了? 直接登入'
          : '沒有帳號? 註冊新帳號'}
      </Button>
      <ErrorBox error={error} />
    </div>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  letter-spacing: 0.1rem;
  color: rgb(94, 108, 132);
`;
