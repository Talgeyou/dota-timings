import { useCallback, useMemo, useState } from 'react';

export function useNotify(notifyTime = 10) {
  const [isNotifying, setIsNotifying] = useState(false);

  const notify = useCallback(() => {
    setIsNotifying(true);

    setTimeout(() => {
      setIsNotifying(false);
    }, notifyTime * 1000);
  }, [notifyTime]);

  return useMemo(
    () => ({
      isNotifying,
      notify,
    }),
    [isNotifying, notify],
  );
}
