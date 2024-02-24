/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect, MouseEvent } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const targetNode = event.target as Node;

      if (ref.current && !ref.current.contains(targetNode)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return ref;
};
