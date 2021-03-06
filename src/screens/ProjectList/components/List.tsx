import { Table, Dropdown, Button, Menu, TableProps } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pin } from 'components/Pin';
import {
  deleteProjectAsync,
  editProjectAsync,
} from 'redux/entities/project.slice';
import { useProjectDrawer } from '../hooks/useProjectDrawer';
import { ButtonNoPadding } from 'components/UI';
import { IUser } from 'types/user';
import { IProject } from 'types/project';
import { useAppDispatch } from 'redux/store';

interface ListProps extends TableProps<IProject> {
  users: Array<IUser>;
}

export const List = ({
  users = [],
  dataSource = [],
  ...restProps
}: ListProps) => {
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
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return (
                <Link to={`../project/${project.id}`}>
                  {project.name}
                </Link>
              );
            },
          },
          {
            title: '部門',
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
            title: '操作',
            render(value, project) {
              return <More project={project} />;
            },
          },
        ]}
        pagination={false}
        {...restProps}
      />
    </div>
  );
};

const More = ({ project }: { project: IProject }) => {
  const { startEdit } = useProjectDrawer();
  const dispatch = useAppDispatch();

  const handleEditProject = () => {
    startEdit(project.id);
  };

  const handleDeleteProject = () => {
    dispatch(deleteProjectAsync(project.id));
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit" onClick={handleEditProject}>
            編輯
          </Menu.Item>
          <Menu.Item key="delete" onClick={handleDeleteProject}>
            刪除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
