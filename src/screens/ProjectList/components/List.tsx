import { Table } from 'antd';
import { IProject } from 'types/project';

// import db from 'db.json';
// const {Users} = db;

export const List = () => {
  return (
    <div>
      <Table
        rowKey="id"
        dataSource={projects}
        columns={[
          {
            title: '名稱',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: '負責人',
            render(value, project) {
              return (
                users.find((user) => user.id === project.id)?.name ||
                '未知'
              );
            },
          },
        ]}
        pagination={false}
      />
    </div>
  );
};

const projects: Array<Omit<IProject, 'pin'>> = [
  {
    id: 1,
    name: '骑手管理',
    personId: 1,
    organization: '外卖组',
    created: 1604989757139,
  },
  {
    id: 2,
    name: '团购 APP',
    personId: 2,
    organization: '团购组',
    created: 1604989757139,
  },
  {
    id: 3,
    name: '物料管理系统',
    personId: 2,
    organization: '物料组',
    created: 1546300800000,
  },
  {
    id: 4,
    name: '总部管理系统',
    personId: 3,
    organization: '总部',
    created: 1604980000011,
  },
  {
    id: 5,
    name: '送餐路线规划系统',
    personId: 4,
    organization: '外卖组',
    created: 1546900800000,
  },
];

const users = [
  {
    id: 1,
    name: '高修文',
  },
  {
    id: 2,
    name: '熊天成',
  },
  {
    id: 3,
    name: '郑华',
  },
  {
    id: 4,
    name: '王文静',
  },
];
