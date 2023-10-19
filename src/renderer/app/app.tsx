import { useCallback, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Overlay from '../pages/overlay';
import useAppDispatch from '../shared/lib/use-app-dispatch';
import useDotaNewData from '../shared/lib/use-dota-new-data';
import { setNewData } from '../shared/lib/dota-data';
import { DotaNewData } from '../../types';
import './app.css';
import { setConfig } from '../shared/lib/overlay-config';

export default function App() {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overlay />} />
      </Routes>
    </Router>
  );
}
