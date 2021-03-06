import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { useAuth } from 'hooks/useAuth';
import { AuthForm } from 'types/common';

export const Login = () => {
  const { login, isLoginLoading } = useAuth();

  const handleSubmit = (value: AuthForm) => {
    login(value);
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
        <Input placeholder="用戶名" type="text" autoComplete="off" />
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
        <Input
          placeholder="密碼"
          type="password"
          id="password"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <LongButton
          htmlType="submit"
          loading={isLoginLoading}
          type="primary"
        >
          登入
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
