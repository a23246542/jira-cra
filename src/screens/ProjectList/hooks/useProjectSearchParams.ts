import { useMemo } from 'react';
import { useUrlQueryParams } from 'hooks/useUrlQueryParams';

export const useProjectSearchParams = () => {
  const [params, setSearchParams] = useUrlQueryParams([
    'name',
    'personId',
  ]);

  const projectParams = useMemo(() => {
    return {
      ...params,
      personId: Number(params.personId) || undefined,
    };
  }, [params]);

  return [projectParams, setSearchParams] as const;
};
