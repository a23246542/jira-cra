import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useAuth } from 'hooks/useAuth';
import { Row } from './UI';

import { ReactComponent as SofewareLogo } from 'assets/software-logo.svg';
import colors from 'theme/colors';

export const AuthHeader = () => {
  const { logout } = useAuth();
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
        <Typography.Text>專案</Typography.Text>
        <Typography.Text>組員</Typography.Text>
      </HeaderLeft>
      <HeaderRight>
        <Button onClick={logout}>登出</Button>
      </HeaderRight>
    </HeaderContentContainer>
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
