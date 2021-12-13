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
import { ProjectDrawer } from './components';
import { Row, ButtonNoPadding } from 'components/UI';
import { useProjectModal } from './hooks/useProjectModal';
import { useAppDispatch } from 'redux/store';

export const ProjectListScreen = () => {
  const [searchParams, setSearchParams] = useProjectSearchParams();
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const { projects, state } = useSelector(selectProject);
  const { open } = useProjectModal();

  useEffect(() => {
    dispatch(getProjectListAsync(searchParams));
  }, [searchParams, dispatch]);

  useEffect(() => {
    const resultAction = dispatch(getUserAsync());
    console.log('user resultAction', resultAction);
    // if(getUserAsync.fulfilled.match(resultAction)){
    //   console.log('成功');
    // }
    return () => {
      resultAction.abort();
    };
  }, [dispatch]);

  const handleOpenProjectModal = () => open();

  return (
    <>
      <ContentContainer>
        <Row between marginBottom={2}>
          <h1>專案列表</h1>
          <ButtonNoPadding
            type="link"
            onClick={handleOpenProjectModal}
          >
            創建專案
          </ButtonNoPadding>
        </Row>
        <SearchPanel
          users={users}
          params={searchParams}
          setParams={setSearchParams}
        />
        <List dataSource={projects} users={users} />
      </ContentContainer>
      <ProjectDrawer />
    </>
  );
};

ProjectListScreen.whyDidYouRender = false;
