import { useEffect } from 'react';
import { List, SearchPanel } from './components';
import { ContentContainer } from 'components/UI';
import { useProjectSearchParams } from './hooks/useProjectSearchParams';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProjectListAsync,
  selectProject,
} from 'redux/entities/project.slice';
import { getUserAsync, selectUsers } from 'redux/entities/user.slice';

export const ProjectListScreen = () => {
  const [searchParams, setSearchParams] = useProjectSearchParams();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const { projects, state } = useSelector(selectProject);

  useEffect(() => {
    dispatch(getProjectListAsync(searchParams));
  }, [searchParams, dispatch]);

  useEffect(() => {
    const resultAction = dispatch(getUserAsync());
    console.log('user resultAction', resultAction);
    // if(getUserAsync.fulfilled.match(resultAction)){
    //   console.log('成功');
    // }
    // return () => {
    //   resultAction?.abort();
    // };
  }, [dispatch]);

  return (
    <ContentContainer>
      <h1>項目列表</h1>
      <SearchPanel
        users={users}
        params={searchParams}
        setParams={setSearchParams}
      />
      <List dataSource={projects} users={users} />
    </ContentContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
