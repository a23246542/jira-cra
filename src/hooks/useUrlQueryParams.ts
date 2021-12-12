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
  const [keysState] = useState(keys);

  const paramsObj = useMemo(() => {
    const obj = keysState.reduce((pre, key) => {
      return {
        ...pre,
        [key]: searchParams.get(key) || undefined,
      };
    }, {} as { [key in K]: string });
    return obj;
  }, [keysState, searchParams]);

  const setParams = useCallback(
    (updateParams: Partial<{ [key in K]: unknown }>) => {
      setSearchParams(
        cleanObject({
          ...paramsObj,
          ...updateParams,
        }) as URLSearchParamsInit,
      );
    },
    [],
  );

  return [paramsObj, setParams] as const;
};
