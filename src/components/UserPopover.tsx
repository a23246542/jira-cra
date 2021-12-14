import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { List, Popover, Typography } from 'antd';
import { selectUsers } from 'redux/entities/user.slice';

export const UserPopover = () => {
  const userList = useSelector(selectUsers);

  const content = (
    <Container>
      <Typography.Text type="secondary">組員列表</Typography.Text>
      <List>
        {userList?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </Container>
  );
  return (
    <Popover content={content} placement="bottom">
      <span>組員</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 30rem;
`;
