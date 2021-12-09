import { Drawer, Form, Input, Button, Spin } from 'antd';
import styled from '@emotion/styled';
import { UserSelect } from 'components/UserSelect';

export const ProjectModal = () => {
  const isLoading = false;
  return (
    <Drawer visible={true} onClose={() => {}} width="100%">
      <DrawerContentContainer>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>編輯專案</h1>
            <Form layout="vertical" style={{ width: '40rem' }}>
              <Form.Item
                label="名稱"
                name="name"
                rules={[
                  { required: true, message: '請輸入專案名稱' },
                ]}
              >
                <Input placeholder="請輸入專案名稱" />
              </Form.Item>

              <Form.Item
                label="部門"
                name="organization"
                rules={[{ required: true, message: '請輸入部門名' }]}
              >
                <Input placeholder="請輸入專案名稱" />
              </Form.Item>

              <Form.Item
                label="負責人"
                name="personId"
                rules={[{ required: true, message: '請選擇負責人' }]}
              >
                <UserSelect defaultOptionName="負責人" />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={false}
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </DrawerContentContainer>
    </Drawer>
  );
};

const DrawerContentContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
