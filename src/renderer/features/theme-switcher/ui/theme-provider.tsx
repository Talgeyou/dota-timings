import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../model';
import useAppSelector from '../../../shared/lib/use-app-selector';
import { selectOverlayConfigTheme } from '../../../shared/lib/overlay-config';

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('light');
  const savedTheme = useAppSelector(selectOverlayConfigTheme);

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [savedTheme]);

  const handleChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);

    window.electron.ipcRenderer.sendMessage(
      'OVERLAY_CONFIG_UPDATE_THEME',
      newTheme,
    );
  }, []);

  const value = useMemo(
    (): [Theme, (theme: Theme) => void] => [theme, handleChange],
    [handleChange, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
