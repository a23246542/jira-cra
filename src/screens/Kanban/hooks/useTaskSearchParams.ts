import { useUrlQueryParams } from 'hooks/useUrlQueryParams';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { ITask } from 'types/task';

export const useTaskSearchParams = () => {
  const { id: projectId } = useParams();
  const [{ name, processerId, typeId }, updateParams] =
    useUrlQueryParams(['name', 'processerId', 'typeId']);
  return [
    useMemo(
      () => ({
        projectId: Number(projectId),
        name,
        processerId: Number(processerId) || undefined,
        typeId: Number(typeId) || undefined,
      }),
      [projectId, name, processerId, typeId],
    ),
    updateParams,
  ] as const;
};
