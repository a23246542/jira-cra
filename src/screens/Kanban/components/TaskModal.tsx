import { Button, Col, Form, Input, Modal, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { EpicSelect } from 'components/EpicSelect';
import { TaskTypeSelect } from 'components/TaskTypeSelect';
import { UserSelect } from 'components/UserSelect';
import { useEffect } from 'react';
import {
  deleteTaskAsync,
  editTaskAsync,
} from 'redux/entities/task.slice';
import { useAppDispatch } from 'redux/store';
import { useTaskModal } from '../hooks/useTaskModal';

const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

export const TaskModal = () => {
  const { isOpen, editingTask, close, isLoading, mutateLoading } =
    useTaskModal();
  const [form] = useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    editingTask && form.setFieldsValue(editingTask);
  }, [editingTask, form]);

  const handleClose = () => {
    close();
    form.resetFields();
  };

  const handleOk = () => {
    dispatch(
      editTaskAsync({
        ...editingTask,
        ...form.getFieldsValue(),
      }),
    )
      .unwrap()
      .then(() => {
        handleClose();
      });
  };

  const handleDeleteBtnClick = () => {
    if (!editingTask) return;

    Modal.confirm({
      title: `確定刪除${editingTask.name}`,
      okText: '確定',
      cancelText: '取消',
      onOk() {
        return dispatch(deleteTaskAsync(editingTask.id))
          .unwrap()
          .then(() => {
            handleClose();
          });
      },
    });
  };

  return (
    <Modal
      visible={isOpen}
      title="編輯任務"
      okText="確認"
      cancelText="取消"
      onCancel={handleClose}
      onOk={handleOk}
      confirmLoading={mutateLoading}
    >
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : (
        <Form form={form} {...formLayout}>
          <Form.Item
            label="任務名"
            name="name"
            rules={[{ required: true, message: '請輸入任務名稱' }]}
          >
            <Input placeholder="輸入任務名" />
          </Form.Item>
          <Form.Item label="任務組" name="epicId">
            <EpicSelect defaultOptionName="任務組" />
          </Form.Item>
          <Form.Item label="經辦人" name="processorId">
            <UserSelect defaultOptionName="經辦人" />
          </Form.Item>
          <Form.Item
            label="任務類型"
            name="typeId"
            rules={[{ required: true, message: '請選擇任務類型' }]}
          >
            <TaskTypeSelect />
          </Form.Item>
          <Col span="22" style={{ textAlign: 'right' }}>
            <Button onClick={handleDeleteBtnClick} size="small">
              刪除
            </Button>
          </Col>
        </Form>
      )}
    </Modal>
  );
};
