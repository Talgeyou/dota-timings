import { useEffect, useState } from 'react';

export function useIsOverlayActive() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on(
      'OVERLAY_STATE_CHANGE',
      setIsActive,
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return isActive;
}
