import { CgSun, CgMoon } from 'react-icons/cg';
import { useCallback } from 'react';
import { Switch, SwitchThumbIconProps } from '@nextui-org/react';
import { useTheme } from '../model';

function ThemeSwitcherThumb({ isSelected, className }: SwitchThumbIconProps) {
  return isSelected ? (
    <CgMoon className={className} />
  ) : (
    <CgSun className={className} />
  );
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();

  const handleChange = useCallback(
    (isSelected: boolean) => {
      const newTheme = isSelected ? 'dark' : 'light';

      setTheme(newTheme);
    },
    [setTheme],
  );

  return (
    <Switch
      defaultSelected
      size="lg"
      color="secondary"
      isSelected={theme === 'dark'}
      onValueChange={handleChange}
      thumbIcon={ThemeSwitcherThumb}
    />
  );
}
