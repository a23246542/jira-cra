import { useEffect, useRef } from 'react';

export const useDocumentTitle = (
  title: string,
  keepOnUnmounted: boolean = false,
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmounted) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmounted, oldTitle]);
};
