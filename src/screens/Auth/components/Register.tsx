import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled';
import { useAuth } from 'hooks/useAuth';

export const Register = () => {
  const { register, isLoginLoading } = useAuth();

  return (
    <Form onFinish={register}>
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '請確認密碼' }]}
      >
        <Input
          placeholder="確認密碼"
          type="password"
          id="cpassword"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <LongButton
          htmlType="submit"
          loading={isLoginLoading}
          type="primary"
        >
          註冊
        </LongButton>
      </Form.Item>
    </Form>
  );
};

const LongButton = styled(Button)`
  width: 100%;
`;
