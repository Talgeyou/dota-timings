import { Chip } from '@nextui-org/chip';
import { useMemo } from 'react';
import Widget from '../../../shared/ui/widget';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectCurrentClockTime,
  selectGameState,
} from '../../../shared/lib/dota-data';
import { DotaMapGameState } from '../../../../types';

const BOUNTY_INTERVAL = 3 * 60;
const NOTIFY_DURATION = 10;
const WIDGET_KEY = 'bounty-timer';

export default function BountyTimer() {
  const currentClockTime = useAppSelector(selectCurrentClockTime);
  const gameState = useAppSelector(selectGameState);

  const nextRuneTimeLeft =
    BOUNTY_INTERVAL -
    (typeof currentClockTime === 'number' && currentClockTime > 0
      ? currentClockTime % BOUNTY_INTERVAL
      : 0);

  const isNotify =
    typeof currentClockTime === 'number' &&
    BOUNTY_INTERVAL - nextRuneTimeLeft < NOTIFY_DURATION;

  const color = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'default';
    }

    if (nextRuneTimeLeft === 0 || isNotify) {
      return 'success';
    }

    if (nextRuneTimeLeft < 30) {
      return 'warning';
    }

    return 'default';
  }, [gameState, isNotify, nextRuneTimeLeft]);

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    if (isNotify) {
      return 'Pick up bounty rune';
    }

    return `${nextRuneTimeLeft}s`;
  }, [gameState, isNotify, nextRuneTimeLeft]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Bounty: {text}
      </Chip>
    </Widget>
  );
}
