import { List, SearchPanel } from './components';
import {ContentContainer} from 'components/UI'
import { useProjectSearchParams } from './hooks/useProjectSearchParams';

export const ProjectListScreen = () => {
  const [searchParams,setSearchParams] = useProjectSearchParams();

  return (
    <ContentContainer>
      <h1>項目列表</h1>
      <SearchPanel params={searchParams} setParams={setSearchParams} />
      <List />
    </ContentContainer>
  );
};
