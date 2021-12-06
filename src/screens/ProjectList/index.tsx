import { List, SearchPanel } from './components';
import {ContentContainer} from 'components/UI'

export const ProjectListScreen = () => {
  return (
    <ContentContainer>
      <h1>項目列表</h1>
      <SearchPanel />
      <List />
    </ContentContainer>
  );
};
