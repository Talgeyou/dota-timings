import { useCallback, useState } from 'react';

export default function useToggle(defaultToggle = false) {
  const [toggledOn, setToggledOn] = useState(defaultToggle);

  const toggle = useCallback(() => {
    setToggledOn((prev) => !prev);
  }, []);

  return [toggledOn, toggle] as const;
}
