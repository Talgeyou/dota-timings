import { cn } from '@nextui-org/system';
import { Chip, Kbd } from '@nextui-org/react';
import { useIsOverlayActive } from '~/overlay/shared/lib/use-is-overlay-active';
import { ThemeSwitcher, useTheme } from '~/overlay/features/theme-switcher';
import { AegisTimer } from '~/overlay/widgets/aegis-timer';
import { BountyTimer } from '~/overlay/widgets/bounty-timer';
import { ExperiencePerMinute } from '~/overlay/widgets/experience-per-minute';
import { GoldPerMinute } from '~/overlay/widgets/gold-per-minute';
import { LotusTimer } from '~/overlay/widgets/lotus-timer';
import { RoshanTimer } from '~/overlay/widgets/roshan-timer';
import { WisdomTimer } from '~/overlay/widgets/wisdom-timer';

export function Overlay() {
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
