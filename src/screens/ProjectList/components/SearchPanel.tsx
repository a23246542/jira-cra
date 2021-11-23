import { Form, Input, Select } from 'antd';
import db from 'db.json';

const { users } = db;

export const SearchPanel = () => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          type="search"
          placeholder="輸入專案名稱或負責人"
          maxLength={10}
        />
      </Form.Item>
      <Form.Item>
        <Select placeholder="負責人">
          {users.map((user) => (
            <Select.Option value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
