import styled from '@emotion/styled';
import { Button, Dropdown, Typography, Menu } from 'antd';
import { useNavigate } from 'react-router';
import { useAuth } from 'hooks/useAuth';
import { Row } from './UI';

import { ReactComponent as SofewareLogo } from 'assets/software-logo.svg';
import colors from 'theme/colors';
import { UserPopover } from './UserPopover';
import { ProjectPopover } from './ProjectPopover';

export const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <HeaderContentContainer between>
      <HeaderLeft gap>
        <SofewareLogo
          onClick={() => navigate('/')}
          width="18rem"
          color={colors.primary}
          style={{ cursor: 'pointer' }}
        />
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </HeaderContentContainer>
  );
};

const User = () => {
  const { user, logout } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button onClick={logout} type="link">
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const HeaderContentContainer = styled(Row)`
  width: 100%;
  padding-left: 3.2rem;
  padding-right: 3.2rem;
`;

const HeaderLeft = styled(Row)`
  display: flex;
`;

const HeaderRight = styled(Row)`
  display: flex;
`;
