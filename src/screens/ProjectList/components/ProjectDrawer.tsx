import { Drawer, Form, Input, Button, Spin } from 'antd';
import styled from '@emotion/styled';
import { UserSelect } from 'components/UserSelect';
import { useProjectDrawer } from '../hooks/useProjectDrawer';
import { useEffect } from 'react';
import {
  addProjectAsync,
  editProjectAsync,
} from 'redux/entities/project.slice';
import { useAppDispatch } from 'redux/store';
import { createProjectInput } from 'api/projectReq';
import { DrawerContentContainer } from 'components/UI';

type FormValue = createProjectInput;

export const ProjectDrawer = () => {
  const {
    isOpen,
    close,
    editingProject,
    isLoading,
    isMutateLoading,
  } = useProjectDrawer();
  const dispatch = useAppDispatch();

  const title = editingProject ? '編輯專案' : '新增專案';

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const handleCloseProjectModal = () => {
    form.resetFields();
    close();
  };

  const handleSubmitProject = (value: FormValue) => {
    const isEdit = !!editingProject;

    if (isEdit) {
      dispatch(editProjectAsync({ id: editingProject.id, ...value }))
        .unwrap()
        .then(() => {
          form.resetFields();
          close();
        });
    } else {
      dispatch(addProjectAsync(value))
        .unwrap()
        .then(() => {
          form.resetFields();
          close();
        });
    }
  };

  return (
    <Drawer
      visible={isOpen}
      onClose={handleCloseProjectModal}
      forceRender
      // destroyOnClose
      width="100%"
    >
      <DrawerContentContainer>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <Form
              form={form}
              onFinish={handleSubmitProject}
              layout="vertical"
              style={{ width: '40rem' }}
            >
              <Form.Item
                label="名稱"
                name="name"
                rules={[
                  { required: true, message: '請輸入專案名稱' },
                ]}
              >
                <Input
                  placeholder="請輸入專案名稱"
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item
                label="部門"
                name="organization"
                rules={[{ required: true, message: '請輸入部門名' }]}
              >
                <Input
                  placeholder="請輸入專案名稱"
                  autoComplete="off"
                />
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
                  loading={isMutateLoading}
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
