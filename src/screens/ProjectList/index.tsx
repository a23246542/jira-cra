import { useEffect } from 'react';
import { List, SearchPanel } from './components';
import { ContentContainer } from 'components/UI';
import { useProjectSearchParams } from './hooks/useProjectSearchParams';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProjectListAsync,
  selectIsProjectLoading,
  selectProjectList,
} from 'redux/entities/project.slice';
import { getUserAsync, selectUsers } from 'redux/entities/user.slice';
import { ProjectDrawer } from './components';
import { Row, ButtonNoPadding } from 'components/UI';
import { useProjectDrawer } from './hooks/useProjectDrawer';
import { useAppDispatch } from 'redux/store';
import { useDebounce } from 'hooks/useDebounce';

export const ProjectListScreen = () => {
  const [searchParams, setSearchParams] = useProjectSearchParams();
  const debounceProjectParams = useDebounce(searchParams);
  const dispatch = useAppDispatch();
  const users = useSelector(selectUsers);
  const projectList = useSelector(selectProjectList);
  const isProjectLoading = useSelector(selectIsProjectLoading);
  const { open } = useProjectDrawer();

  useEffect(() => {
    dispatch(getProjectListAsync(debounceProjectParams));
  }, [debounceProjectParams, dispatch]);

  useEffect(() => {
    const resultAction = dispatch(getUserAsync());
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
        <List
          dataSource={projectList}
          users={users}
          loading={isProjectLoading}
        />
      </ContentContainer>
      <ProjectDrawer />
    </>
  );
};

ProjectListScreen.whyDidYouRender = false;
