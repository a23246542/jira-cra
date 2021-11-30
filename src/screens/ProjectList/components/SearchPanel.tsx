/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { IdSelect } from './IdSelect';
import db from 'db.json';

const { users } = db;

export const SearchPanel = () => {
  const [searchInput, setSearchInput] = useState<string>();
  return (
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          type="search"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value.trim())
          }
          placeholder="輸入專案名稱或負責人"
          maxLength={10}
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          value={searchInput}
          options={users}
          defaultOptionName="負責人"
          onChange={(value) => value && setSearchInput(value.toString())}
        />
        {/* <Select placeholder="負責人">
          {users.map((user) => (
            <Select.Option value={user.id}>{user.name}</Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
