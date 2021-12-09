/** @jsxImportSource @emotion/react */
import { Form, Input } from 'antd';

import { IProject } from 'types/project';
import { IUser } from 'types/user';

import { IdSelect } from '../../../components/IdSelect';

interface ISearchPanel {
  users: Array<IUser>;
  params: Partial<Pick<IProject, 'name' | 'personId'>>;
  setParams: (params: ISearchPanel['params']) => void;
}

export const SearchPanel = ({
  users,
  params,
  setParams,
}: ISearchPanel) => {
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setParams({ ...params, name: e.target.value.trim() });
  };

  const handlePersonIdChange = (value?: number) => {
    setParams({ ...params, personId: value });
  };
  return (
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          type="search"
          value={params.name}
          onChange={handleNameChange}
          placeholder="輸入專案名稱或負責人"
          maxLength={10}
        />
      </Form.Item>
      <Form.Item>
        <IdSelect
          value={params.personId}
          options={users}
          defaultOptionName="負責人"
          onChange={handlePersonIdChange}
        />
      </Form.Item>
    </Form>
  );
};
