import { useMemo } from 'react';
import { useParams } from 'react-router';
import { ITask } from 'types/task';

export const useTaskSearchParams = () => {
  const { id: projectId } = useParams();
  return useMemo(
    () => ({
      projectId: Number(projectId),
    }),
    [projectId],
  );
};
