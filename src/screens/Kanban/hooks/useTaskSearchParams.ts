import { useUrlQueryParams } from 'hooks/useUrlQueryParams';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import { ITask } from 'types/task';

export const useTaskSearchParams = () => {
  const { id: projectId } = useParams();
  const [{ name, processorId, typeId }, updateParams] =
    useUrlQueryParams(['name', 'processorId', 'typeId']);
  return [
    useMemo(
      () => ({
        projectId: Number(projectId),
        name,
        processorId: Number(processorId) || undefined,
        typeId: Number(typeId) || undefined,
      }),
      [projectId, name, processorId, typeId],
    ),
    updateParams,
  ] as const;
};
