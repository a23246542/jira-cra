import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IKanban } from 'types/kanban';

export const useKanbanSearchParams = () => {
  const { id: projectId } = useParams();

  return useMemo(
    () => ({
      projectId: Number(projectId),
    }),
    [projectId],
  );
};
