import { cn } from '@nextui-org/system';
import { Chip, Kbd } from '@nextui-org/react';
import ThemeSwitcher, { useTheme } from '../features/theme-switcher';
import useIsOverlayActive from '../shared/lib/use-is-overlay-active';
import AegisTimer from '../widgets/aegis-timer';
import BountyTimer from '../widgets/bounty-timer';
import ExperiencePerMinute from '../widgets/experience-per-minute';
import GoldPerMinute from '../widgets/gold-per-minute';
import RoshanTimer from '../widgets/roshan-timer';
import WisdomTimer from '../widgets/wisdom-timer';
import LotusTimer from '../widgets/lotus-timer';

export default function Overlay() {
  const isOverlayActive = useIsOverlayActive();
  const [theme] = useTheme();

  return (
    <div
      className={cn('h-screen w-full overflow-hidden text-foreground', {
        'bg-transparent': !isOverlayActive,
        'bg-neutral-900/30': isOverlayActive,
        dark: theme === 'dark',
      })}
    >
      <div className="w-full h-full overflow-hidden flex flex-col justify-center gap-4">
        <GoldPerMinute />
        <ExperiencePerMinute />
        <BountyTimer />
        <WisdomTimer />
        <LotusTimer />
        <AegisTimer />
        <RoshanTimer />
        <div
          className={cn('fixed top-4 left-1/2 -translate-x-1/2 ', {
            'opacity-0': !isOverlayActive,
          })}
        >
          <ThemeSwitcher />
        </div>
        <div
          className={cn('fixed top-4 left-4 ', {
            'opacity-0': !isOverlayActive,
          })}
        >
          <Chip color="primary" startContent={<Kbd>Ctrl+F12</Kbd>}>
            <span>to hide the overlay</span>
          </Chip>
        </div>
      </div>
    </div>
  );
}
