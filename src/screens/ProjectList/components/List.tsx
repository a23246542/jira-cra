import { Table, Dropdown, Button, Menu, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { Pin } from 'components/Pin';
import { editProjectAsync } from 'redux/entities/project.slice';
import { ButtonNoPadding } from 'components/UI';
import { IProject, IUser } from 'types';

interface ListProps extends TableProps<IProject> {
  users: Array<IUser>;
}

export const List = ({ users = [], dataSource = [] }: ListProps) => {
  const dispatch = useDispatch();
  const handlePinProject = (id: number) => (pin: boolean) => {
    dispatch(editProjectAsync({ id, pin }));
  };

  return (
    <div>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={[
          {
            title: <Pin checked disabled />,
            render(value, project) {
              return (
                <Pin
                  checked={project.pin}
                  onCheckChange={handlePinProject(project.id)}
                />
              );
            },
          },
          {
            title: '名稱',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: '部分',
            dataIndex: 'organization',
          },
          {
            title: '負責人',
            render(value, project) {
              return (
                users.find((user) => user.id === project.personId)
                  ?.name || '未知'
              );
            },
          },
          {
            title: '創建時間',
            render(value, project) {
              return (
                <span>
                  {project.created
                    ? dayjs(project.created).format('YYYY-MM-DD')
                    : '無'}
                </span>
              );
            },
          },
          {
            render(value, project) {
              return <More project={project} />;
            },
          },
        ]}
        pagination={false}
      />
    </div>
  );
};

const More = ({ project }: { project: IProject }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">編輯</Menu.Item>
          <Menu.Item key="delete">刪除</Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
