import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<[Theme, (theme: Theme) => void]>([
  'light',
  () => {},
]);

export function useTheme() {
  return useContext(ThemeContext);
}
