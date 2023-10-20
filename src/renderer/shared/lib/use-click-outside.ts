import { RefObject, useEffect } from 'react';

type ClickOutsideHookParams<T> = {
  ref: RefObject<T>;
  callback: () => void;
};

export function useClickOutside<T extends HTMLElement>({
  ref,
  callback,
}: ClickOutsideHookParams<T>) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
