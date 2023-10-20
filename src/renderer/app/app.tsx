import { useCallback, useEffect } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Overlay } from '~/overlay/pages/overlay';
import { DotaNewData } from '~/types';
import { useAppDispatch } from '~/overlay/shared/lib/use-app-dispatch';
import { useDotaNewData } from '~/overlay/shared/lib/use-dota-new-data';
import { setNewData } from '~/overlay/shared/lib/dota-data';
import { setConfig } from '~/overlay/shared/lib/overlay-config';
import './app.css';

const router = createMemoryRouter([
  {
    path: '',
    Component: Overlay,
  },
]);

export function App() {
  const dispatch = useAppDispatch();

  const handleNewData = useCallback(
    (data: DotaNewData) => {
      dispatch(setNewData(data));
    },
    [dispatch],
  );

  useDotaNewData(handleNewData);

  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on(
      'OVERLAY_CONFIG_LOADED',
      (config) => {
        dispatch(setConfig(config));
      },
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
