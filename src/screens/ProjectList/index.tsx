import { List, SearchPanel } from './components';
import { ContentContainer } from 'components/UI';
import { useProjectSearchParams } from './hooks/useProjectSearchParams';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/entities/auth.slice';

export const ProjectListScreen = () => {
  const [searchParams, setSearchParams] = useProjectSearchParams();
  const user = useSelector(selectUser);
  console.log('user', user);

  return (
    <ContentContainer>
      <h1>項目列表</h1>
      <SearchPanel
        params={searchParams}
        setParams={setSearchParams}
      />
      <List />
    </ContentContainer>
  );
};
