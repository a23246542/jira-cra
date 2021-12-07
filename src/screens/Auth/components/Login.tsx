import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';
import { loginAsyncAction } from 'redux/entities/auth.slice';

export const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (value: {
    username: string;
    password: string;
  }) => {
    console.log('login', value);
    dispatch(loginAsyncAction(value));
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '請輸入用戶名',
          },
        ]}
      >
        <Input placeholder="用戶名" type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '請輸入密碼',
          },
        ]}
      >
        <Input placeholder="密碼" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登入
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
