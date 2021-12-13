import { useParams } from 'react-router';

export const useProjectIdInUrl = () => {
  const { id: projectId } = useParams();
  return Number(projectId);
};
