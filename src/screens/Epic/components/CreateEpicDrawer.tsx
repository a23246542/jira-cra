import { Button, Drawer, DrawerProps, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { DrawerContentContainer } from 'components/UI';
import { IEpic } from 'types/epic';
import { useAppDispatch } from 'redux/store';
import {
  addEpicAsync,
  selectEpicMutateLoading,
} from 'redux/entities/epic.slice';
import { useProjectIdInUrl } from 'hooks/useProjectIdInUrl';
import { useEffect } from 'react';

type FormValue = Pick<IEpic, 'name'>;

export const CreateEpicDrawer = ({
  visible,
  onClose,
}: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
  const isMutateLoading = useSelector(selectEpicMutateLoading);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdInUrl();

  const [form] = Form.useForm();

  const handleSubmitEpic = (value: FormValue) => {
    dispatch(
      addEpicAsync({
        projectId,
        name: value.name,
        start: new Date().getTime(),
        end: new Date().getTime(),
      }),
    )
      .unwrap()
      .then(() => {
        onClose();
      });
  };

  useEffect(() => {
    form.resetFields();
  }, [visible, form]);

  return (
    <Drawer
      forceRender
      visible={visible}
      onClose={onClose}
      width="100%"
    >
      <DrawerContentContainer>
        <h1>創建任務組</h1>
        <Form
          form={form}
          onFinish={handleSubmitEpic}
          layout="vertical"
          style={{ width: '40rem' }}
        >
          <Form.Item
            label="名稱"
            name="name"
            rules={[{ required: true, message: '請輸入任務組名稱' }]}
          >
            <Input placeholder="請輸入任務組名稱" />
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
      </DrawerContentContainer>
    </Drawer>
  );
};
