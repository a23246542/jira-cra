import { useEffect, useState } from 'react';

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //每次value變化設置一個定時器設值
      setDebounceValue(value);
    }, delay || 200);
    return () => {
      //在執行下一次setTimeout前清除之前的
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};
