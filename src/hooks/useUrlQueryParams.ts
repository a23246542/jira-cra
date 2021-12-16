import { useCallback, useMemo, useState } from 'react';
import {
  useSearchParams,
  URLSearchParamsInit,
} from 'react-router-dom';
import { cleanObject } from 'utils/cleanObject';

export const useUrlQueryParams = <K extends string>(
  keys: Array<K>,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [querykeys] = useState(keys);

  const paramsObj = useMemo(() => {
    const obj = querykeys.reduce(
      (pre, key) => {
        return {
          ...pre,
          [key]: searchParams.get(key) || undefined,
        };
      },
      { ...Object.fromEntries(searchParams) } as {
        [key in K]: string;
      },
    );
    return obj;
  }, [querykeys, searchParams]);

  const setParams = useCallback(
    (updateParams: Partial<{ [key in K]: unknown }>) => {
      setSearchParams(
        cleanObject({
          ...paramsObj,
          ...updateParams,
        }) as URLSearchParamsInit,
      );
    },
    [paramsObj, setSearchParams],
  );

  return [paramsObj, setParams] as const;
};
