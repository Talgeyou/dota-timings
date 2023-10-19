import { useEffect } from 'react';
import { DotaNewData } from '../../../types';

export default function useDotaNewData(callback: (data: DotaNewData) => void) {
  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on('NEW_DATA', (data) => {
      callback(data);
    });

    return () => {
      unsubscribe();
    };
  }, [callback]);
}
