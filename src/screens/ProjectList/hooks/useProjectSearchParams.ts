import { useMemo } from 'react';
import { useUrlQueryParams } from 'hooks/useUrlQueryParams';

export const useProjectSearchParams = () => {
  const [params, setSearchParams] = useUrlQueryParams(['name', 'personId']);

  const projectParams = useMemo(() => {
    const a = { ...params, personId: Number(params.personId) || undefined };
    return a;
  }, [params]);

  return [projectParams, setSearchParams];
};
