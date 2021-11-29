import { useMemo } from 'react';
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom';
import { cleanObject } from 'utils/cleanObject';

export const useUrlQueryParams = <K extends string>(keys: Array<K>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsObj = useMemo(() => {
    const obj = keys.reduce((pre, key) => {
      return {
        ...pre,
        [key]: searchParams.get(key),
      };
    }, {} as { [key in K]: string });
    return obj;
  }, [keys, searchParams]);

  return [
    paramsObj,
    (updateParams: Partial<{ [key in K]: unknown }>) =>
      setSearchParams(cleanObject({ ...paramsObj, ...updateParams }) as URLSearchParamsInit),
  ] as const;
};
